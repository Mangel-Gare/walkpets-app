# Inventario del Proyecto WalkPets

Este documento contiene un inventario exhaustivo de los archivos del proyecto y un resumen de los procesos de negocio y técnicos, basándonos en la documentación actual del proyecto.

## 📁 Inventario de Archivos y Carpetas

A continuación se detalla la estructura completa del proyecto (excluyendo dependencias como `node_modules` y directorios ocultos de control de versiones).

### 📂 Raíz del Proyecto
- [`.gitignore`](file:///c:/ARQUITECTURA-SOFT/caso-práctico-paseador-pets/.gitignore)
- [`caso practico paseador de mascotas.txt`](file:///c:/ARQUITECTURA-SOFT/caso-práctico-paseador-pets/caso%20practico%20paseador%20de%20mascotas.txt) - *Documento original con la idea de negocio.*
- [`README.md`](file:///c:/ARQUITECTURA-SOFT/caso-práctico-paseador-pets/README.md) - *Documentación principal de arquitectura.*

### 📂 Backend (`/backend`)
Construido con Node.js y TypeScript, estructurado utilizando Arquitectura Limpia y Domain-Driven Design (DDD).

- **Configuración:**
  - [`backend/.env`](file:///c:/ARQUITECTURA-SOFT/caso-práctico-paseador-pets/backend/.env)
  - [`backend/package.json`](file:///c:/ARQUITECTURA-SOFT/caso-práctico-paseador-pets/backend/package.json)
  - [`backend/tsconfig.json`](file:///c:/ARQUITECTURA-SOFT/caso-práctico-paseador-pets/backend/tsconfig.json)
  
- **Código Fuente (`src`):**
  - [`main.ts`](file:///c:/ARQUITECTURA-SOFT/caso-práctico-paseador-pets/backend/src/main.ts) - *Punto de entrada de la aplicación.*
  - **Aplicación (Casos de Uso):**
    - [`AcceptContract.ts`](file:///c:/ARQUITECTURA-SOFT/caso-práctico-paseador-pets/backend/src/application/use-cases/AcceptContract.ts) - *Lógica para la aceptación de contratos.*
    - [`StartWalk.ts`](file:///c:/ARQUITECTURA-SOFT/caso-práctico-paseador-pets/backend/src/application/use-cases/StartWalk.ts) - *Lógica para el inicio del paseo.*
  - **Dominio (Entidades y Errores):**
    - [`ContractEvent.ts`](file:///c:/ARQUITECTURA-SOFT/caso-práctico-paseador-pets/backend/src/domain/entities/ContractEvent.ts)
    - [`Document.ts`](file:///c:/ARQUITECTURA-SOFT/caso-práctico-paseador-pets/backend/src/domain/entities/Document.ts)
    - [`Pet.ts`](file:///c:/ARQUITECTURA-SOFT/caso-práctico-paseador-pets/backend/src/domain/entities/Pet.ts)
    - [`DomainError.ts`](file:///c:/ARQUITECTURA-SOFT/caso-práctico-paseador-pets/backend/src/domain/errors/DomainError.ts)
  - **Infraestructura:**
    - [`schema.sql`](file:///c:/ARQUITECTURA-SOFT/caso-práctico-paseador-pets/backend/src/infrastructure/database/schema.sql) - *Definición de tablas para Supabase / PostgreSQL.*
    - [`server.ts`](file:///c:/ARQUITECTURA-SOFT/caso-práctico-paseador-pets/backend/src/infrastructure/http/server.ts) - *Configuración del servidor HTTP.*
  - **Compartido (`shared`):**
    - [`result.ts`](file:///c:/ARQUITECTURA-SOFT/caso-práctico-paseador-pets/backend/src/shared/result.ts) - *Implementación del patrón Result para manejo funcional de errores.*

### 📂 Frontend (`/frontend`)
Aplicación móvil cliente desarrollada en React Native y Expo.

- **Configuración:**
  - [`frontend/app.json`](file:///c:/ARQUITECTURA-SOFT/caso-práctico-paseador-pets/frontend/app.json)
  - [`frontend/babel.config.js`](file:///c:/ARQUITECTURA-SOFT/caso-práctico-paseador-pets/frontend/babel.config.js)
  - [`frontend/package.json`](file:///c:/ARQUITECTURA-SOFT/caso-práctico-paseador-pets/frontend/package.json)
  - [`frontend/App.tsx`](file:///c:/ARQUITECTURA-SOFT/caso-práctico-paseador-pets/frontend/App.tsx) - *Componente raíz.*

- **Código Fuente (`src`):**
  - **Componentes Reutilizables:**
    - [`IconGrid.tsx`](file:///c:/ARQUITECTURA-SOFT/caso-práctico-paseador-pets/frontend/src/components/IconGrid.tsx)
  - **Pantallas (`screens`):**
    - [`ContractAcceptanceScreen.tsx`](file:///c:/ARQUITECTURA-SOFT/caso-práctico-paseador-pets/frontend/src/screens/ContractAcceptanceScreen.tsx)
    - [`DogProfileScreen.tsx`](file:///c:/ARQUITECTURA-SOFT/caso-práctico-paseador-pets/frontend/src/screens/DogProfileScreen.tsx)
    - [`LiveTrackingScreen.tsx`](file:///c:/ARQUITECTURA-SOFT/caso-práctico-paseador-pets/frontend/src/screens/LiveTrackingScreen.tsx)
    - [`PaymentSummaryScreen.tsx`](file:///c:/ARQUITECTURA-SOFT/caso-práctico-paseador-pets/frontend/src/screens/PaymentSummaryScreen.tsx)

---

## 📝 Resumen de Procesos y Lógica de Negocio

He leído los documentos principales ([`README.md`](file:///c:/ARQUITECTURA-SOFT/caso-práctico-paseador-pets/README.md) y el [documento del caso práctico](file:///c:/ARQUITECTURA-SOFT/caso-práctico-paseador-pets/caso%20practico%20paseador%20de%20mascotas.txt)). La aplicación **WalkPets** se fundamenta en los siguientes procesos core:

### 1. Modelo de Negocio Diferencial
*   **Comisión 0% para el trabajador:** El 100% de la tarifa va para el paseador.
*   **Micro-cuota de Protección:** La plataforma se monetiza cobrando al dueño una cuota de ~1€ por concepto de seguro tecnológico.

### 2. Procesos Operativos
*   **Gestión Documental Confiable:** La app alberga fichas completas de la mascota y del dueño. Guarda en la nube documentos exigibles (pasaporte, vacunas, seguro, advertencias de PPP - Perros Potencialmente Peligrosos) listos para mostrarse ante cualquier requerimiento policial.
*   **Contratos Dinámicos de Entrega y Recogida:**
    *   La app bloquea el inicio de cualquier servicio si no se formaliza el acuerdo en ese mismo momento.
    *   Se requiere una **validación estricta**: escribir "acepto" de forma manual y aportar una fotografía geolocalizada como prueba de que el perro se entrega en condiciones óptimas.
*   **Tracking GPS en Vivo y Métricas:**
    *   El paseador emite un rastreo continuo que el dueño puede consultar.
    *   Se procesan métricas exactas (distancia, tiempo invertido, velocidad media) imitando una app deportiva. El diseño visual se ha adaptado (fondos oscuros) para minimizar el gasto de batería durante el trayecto.
*   **Flujo de Pagos Ultrasónico:** Diseñado para el final del servicio. Aprovecha esquemas como Bizum o el Split Routing de Stripe para transferir el dinero casi en tiempo real tras la finalización del contrato.

### 3. Cimientos Técnicos
*   **Flexibilidad Legal (JSONB):** Los eventos de contratos en la base de datos están adaptados a cambios legales. Si un ayuntamiento impone que ciertas razas necesitan nuevos certificados, se inyectan en campos JSONB sin destrozar la base de datos.
*   **PostGIS:** Extensión geoespacial dentro de PostgreSQL para un cálculo matemático eficiente de la ubicación.
*   **Domain-Driven Design puro:** Las reglas operativas que dictaminan que "no hay paseo sin foto" viven en el Dominio del backend (`ContractEvent.ts`), lo que blinda a la plataforma de usos malintencionados independientemente de lo que la UI o los controladores traten de inyectar.
