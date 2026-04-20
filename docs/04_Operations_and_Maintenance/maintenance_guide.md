# Guía de Mantenimiento y Comprensión del Programa

Este documento está diseñado para ayudar a los desarrolladores y mantenedores futuros a comprender rápidamente el sistema y realizar tareas de mantenimiento, solución de problemas y mejoras sin violar los principios de diseño.

## 1. Mantenimiento del Backend (Clean Architecture)

El backend sigue estrictamente el patrón de Arquitectura Limpia. Si necesitas agregar una nueva funcionalidad (ej. Módulo de Reportes), debes seguir este orden:

1. **Entidades (Domain):** Define la lógica de negocio pura y la estructura de datos en `src/domain/entities/`.
2. **Interfaces (Repositorios):** Define los contratos para la persistencia en `src/domain/repositories/`.
3. **Casos de Uso (Application):** Crea la lógica orquestadora en `src/application/use-cases/`. *Regla estricta: un caso de uso no debe importar nada de Express ni de la base de datos directamente.*
4. **Repositorios (Infrastructure):** Implementa la interfaz del dominio para MySQL o Postgres en `src/infrastructure/database/`.
5. **Controladores y Rutas (Interfaces):** Expón el caso de uso vía HTTP en `src/interfaces/controllers/` y `src/interfaces/routes/`.

**Manejo de Errores:**
- Todos los errores de base de datos deben ser capturados en la capa de Infraestructura o en los Controladores para no filtrar información sensible en las respuestas HTTP.
- Devuelve códigos de estado HTTP semánticos (400 Bad Request, 404 Not Found, 500 Internal Error).

## 2. Mantenimiento del Frontend (Next.js)

El frontend está estructurado para maximizar la reutilización de código mediante React y Tailwind.

1. **Vistas (`/app`):** Para crear una nueva página, crea una carpeta en `src/app/` con un archivo `page.tsx` (App Router de Next.js).
2. **Lógica de Datos (`/hooks`):** Todo el consumo de APIs (GET, POST) debe estar encapsulado en Custom Hooks (ej. `useKardex.ts`) para mantener los componentes limpios y facilitar la reusabilidad.
3. **Componentes (`/components`):**
   - Modifica `components/ui/` sólo si necesitas alterar el diseño base (estos son componentes generados por herramientas como shadcn/ui).
   - Crea componentes específicos de dominio (ej. `ProductForm.tsx`) fuera de la carpeta `ui`.
4. **Tipos (`/types`):** Mantén sincronizadas las interfaces de TypeScript con las entidades del backend.

## 3. Resolución de Problemas Comunes (Troubleshooting)

- **Problema:** CORS Error en el Frontend.
  - *Solución:* Verifica que la configuración de Express en el Backend incluya el middleware `cors` y permita el origen `http://localhost:3000`.
- **Problema:** Cambios en el modelo de base de datos.
  - *Solución:* Si agregas un campo a una tabla, recuerda actualizar: 1) La Entidad en Dominio, 2) Las implementaciones SQL en Infraestructura (SELECTs, INSERTs), y 3) Los tipos en el Frontend.
- **Problema:** Estilos de Tailwind no se aplican.
  - *Solución:* Asegúrate de que las rutas de tus nuevos componentes estén incluidas en la matriz `content` dentro de `tailwind.config.ts`.