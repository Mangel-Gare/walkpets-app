-- Habilitar extensión PostGIS para cálculos espaciales
CREATE EXTENSION IF NOT EXISTS postgis;

-- Tipos enumerados
CREATE TYPE user_role AS ENUM ('ADMIN', 'WALKER', 'CLIENT');
CREATE TYPE walk_status AS ENUM ('SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');
CREATE TYPE contract_type AS ENUM ('PICKUP', 'DROPOFF');
CREATE TYPE location_source AS ENUM ('MOBILE_GPS', 'COLLAR_GPS', 'GSM_TRIANGULATION');
CREATE TYPE document_type AS ENUM ('VACCINE', 'PASSPORT', 'INSURANCE');
CREATE TYPE subscription_period AS ENUM ('WEEKLY', 'MONTHLY', 'QUARTERLY');

-- Tabla de Usuarios (Paseadores, Dueños, Admins)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(50),
    role user_role NOT NULL,
    stripe_account_id VARCHAR(100), -- Para pasarela de pagos (Split Routing)
    stripe_customer_id VARCHAR(100), -- Para cobros a clientes
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Mascotas
CREATE TABLE pets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    breed VARCHAR(100),
    is_ppp BOOLEAN DEFAULT FALSE,
    docs_validated BOOLEAN DEFAULT FALSE, -- 100% validado por el paseador
    current_gps_collar_id VARCHAR(100), -- ID del collar físico asignado temporalmente
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Documentos Legales de la Mascota
CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pet_id UUID NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
    type document_type NOT NULL,
    url_storage VARCHAR(500) NOT NULL, -- URL en S3/GCS
    validated_by_walker_id UUID REFERENCES users(id),
    validated_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Suscripciones (Contratos recurrentes para saltar pago diario)
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES users(id),
    walker_id UUID NOT NULL REFERENCES users(id),
    period subscription_period NOT NULL,
    stripe_subscription_id VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Paseos
CREATE TABLE walks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    walker_id UUID NOT NULL REFERENCES users(id),
    status walk_status DEFAULT 'SCHEDULED',
    start_time TIMESTAMP WITH TIME ZONE,
    end_time TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Relación Paseo <-> Perros (Máximo 3 por aplicación, validado en lógica de negocio)
CREATE TABLE walk_pets (
    walk_id UUID NOT NULL REFERENCES walks(id) ON DELETE CASCADE,
    pet_id UUID NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
    PRIMARY KEY (walk_id, pet_id)
);

-- Puntos de Geolocalización (Tracking) con PostGIS (geometry(Point, 4326))
CREATE TABLE location_points (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    walk_id UUID NOT NULL REFERENCES walks(id) ON DELETE CASCADE,
    geom geometry(Point, 4326) NOT NULL, -- Coordenadas (Lat, Lng) espacialmente indexadas
    source location_source NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
-- Índices para búsquedas espaciales súper rápidas
CREATE INDEX idx_location_points_geom ON location_points USING GIST(geom);
CREATE INDEX idx_location_points_walk ON location_points(walk_id);

-- Contratos Dinámicos de Entrega/Recogida (JSONB)
CREATE TABLE contract_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    walk_id UUID NOT NULL REFERENCES walks(id) ON DELETE CASCADE,
    pet_id UUID NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
    type contract_type NOT NULL,
    accepted_text VARCHAR(50) NOT NULL, -- "acepto" manual
    photo_url VARCHAR(500) NOT NULL, -- Foto de estado geolocalizada
    clauses JSONB NOT NULL, -- JSON dinámico: {"bozal": true, "correa": true, "comida": false}
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Transacciones Económicas (Pagos únicos y Comisiones de la App)
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    walk_id UUID REFERENCES walks(id),
    total_amount DECIMAL(10, 2) NOT NULL,
    platform_fee DECIMAL(10, 2) NOT NULL,
    walker_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
