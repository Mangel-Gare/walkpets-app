# 🐕 WalkPets - Arquitectura y Modelo de Negocio
> **Caso Práctico de Arquitectura de Software:** Plataforma diseñada para conectar dueños de perros con paseadores responsables, utilizando un modelo de negocio estilo "Wallapop" (cero comisiones para el paseador, micro-cuota de seguro para el dueño).
## 🚀 El Proyecto
WalkPets nace de la necesidad de solucionar la inseguridad jurídica e informalidad en el sector de los paseadores de perros, pero sin asfixiarlos con comisiones abusivas de marketplaces tradicionales.
**Características Clave del Negocio:**
- **Contratos Dinámicos:** Generación de contratos legales al momento de recogida con validación estricta (el paseador debe escribir "acepto" y subir foto geolocalizada).
- **Seguimiento GPS (PostGIS):** Tracking en vivo de las rutas usando el GPS del móvil del paseador o triangulación GSM.
- **Split Routing Payments:** 100% de la tarifa va al paseador; la plataforma cobra ~1€ al dueño en concepto de seguro/tecnología.
---
## 🏗️ Arquitectura de Software (Monorepo)
El proyecto está diseñado usando **Arquitectura Limpia (Clean Architecture)** y **Domain-Driven Design (DDD)** para aislar las reglas de negocio de la infraestructura tecnológica.
### 1. Base de Datos (Supabase + PostgreSQL)
Ubicada en la nube, con extensiones espaciales avanzadas:
- **`PostGIS`**: Habilitado para almacenar y calcular distancias de los puntos geográficos (`location_points`).
- **`JSONB`**: Usado en la tabla `contract_events` para almacenar cláusulas dinámicas (ej. bozales obligatorios) según normativas municipales cambiantes, evitando esquemas rígidos.
### 2. Backend (Node.js / TypeScript)
Estructurado en capas para garantizar mantenibilidad a largo plazo:
- **Dominio Pura:** Entidades como `ContractEvent.ts` blindan la lógica legal (no se puede iniciar paseo sin firma explícita y URL de foto).
- **Casos de Uso:** Orquestación con el patrón `Result` para manejar los errores de negocio de forma elegante sin lanzar excepciones incontroladas.
### 3. Frontend Móvil (React Native + Expo)
Interfaces UI nativas (iOS y Android) enfocadas en la calle y la rapidez visual:
- **DogProfileScreen:** Componentes visuales dinámicos (IconGrid) que cargan advertencias por raza.
- **LiveTrackingScreen:** Diseño Glassmorphism oscuro HUD superpuesto en el mapa para reducir el gasto de batería y evitar reflejos en la calle.
- **ContractAcceptanceScreen:** Validación rigurosa que bloquea el flujo hasta cumplir los requisitos legales.
---
## 📁 Estructura General y Procesos

Para una visión detallada y exhaustiva de todos los archivos, carpetas y la explicación de los procesos de negocio que forman esta arquitectura, consulta el documento adjunto:

👉 **[Inventario del Proyecto (project_inventory.md)](./project_inventory.md)**

---
## 🛠️ Tecnologías Utilizadas
- **Base de Datos:** PostgreSQL, Supabase, PostGIS.
- **Backend:** Node.js, TypeScript, Arquitectura Limpia.
- **Frontend:** React Native, Expo, React Native Maps, Lucide Icons.
- **Pagos (Diseño):** Stripe Split Routing.
