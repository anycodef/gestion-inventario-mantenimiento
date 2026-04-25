# Evidencias de Integración Jira-Repositorio

Este documento detalla el procedimiento técnico para vincular el repositorio de código fuente con Jira Software, permitiendo la trazabilidad automática entre los *commits*, *ramas*, *Pull Requests* y los tickets de trabajo (issues).

## 1. Propósito de la Integración

La integración entre el repositorio y Jira es un requisito fundamental para la Gestión de Configuración, ya que:

1.  **Garantiza la Trazabilidad:** Permite auditar qué cambios en el código corresponden a qué requerimiento o corrección de error documentada.
2.  **Automatización de Estados:** Facilita la transición automática de tickets en Jira (ej. de "En Progreso" a "En Revisión" o "Completado") basándose en eventos del repositorio (creación de PR, fusión, etc.).
3.  **Visibilidad Centralizada:** Proporciona a los gestores de proyecto y auditores visibilidad inmediata del estado del desarrollo directamente desde Jira.

## 2. Procedimiento de Vinculación (Guía Paso a Paso)

El método recomendado para la integración es a través de la aplicación oficial del proveedor del repositorio (GitHub, GitLab, Bitbucket) disponible en el Marketplace de Atlassian Jira, complementada con Webhooks para eventos personalizados si es necesario.

### 2.1. Instalación de la Aplicación en Jira

1.  Iniciar sesión en Jira Software con credenciales de Administrador.
2.  Navegar a **Configuración (engranaje) > Aplicaciones > Encontrar nuevas aplicaciones**.
3.  Buscar la aplicación correspondiente al proveedor de Git (ej. "GitHub for Jira", "GitLab for Jira").
4.  Hacer clic en **Instalar** y seguir las instrucciones en pantalla para autorizar la conexión.

### 2.2. Configuración de la Conexión con el Repositorio

1.  Una vez instalada la aplicación en Jira, ir a **Configuración > Aplicaciones > Administrar aplicaciones**.
2.  Seleccionar la aplicación instalada (ej. "GitHub for Jira") y hacer clic en **Comenzar** o **Configurar**.
3.  Hacer clic en **Conectar organización** (o equivalente). Esto redirigirá al proveedor del repositorio.
4.  Autorizar el acceso de Jira a la organización o cuenta que aloja el repositorio.
5.  Seleccionar los repositorios específicos que se desean vincular (en este caso, el repositorio del sistema de inventarios).
6.  Guardar los cambios. El estado de la conexión en Jira debería mostrarse como "Conectado".

### 2.3. Configuración de Webhooks (Alternativa o Complemento)

Si se requiere notificar a Jira de eventos no cubiertos por la aplicación estándar, o si se utiliza un servidor Git autoalojado sin integración oficial directa, se deben configurar Webhooks:

1.  **En Jira:**
    *   Generar una URL de Webhook entrante para el proyecto o usar la API REST de Jira.
2.  **En el Repositorio (Ej. GitHub):**
    *   Navegar a la configuración del repositorio (**Settings**).
    *   Ir a la sección **Webhooks** y hacer clic en **Add webhook**.
    *   **Payload URL:** Pegar la URL generada por Jira.
    *   **Content type:** Seleccionar `application/json`.
    *   **Events:** Seleccionar los eventos relevantes a enviar a Jira (ej. `Push`, `Pull Request`, `Branch creation`).
    *   Guardar y probar el Webhook.

## 3. Pruebas y Validación (Evidencias)

Para validar que la integración es exitosa y generar la evidencia para auditoría, se debe realizar la siguiente prueba:

1.  **Crear un ticket de prueba en Jira:** Ej. `SYS-999: Prueba de integración`.
2.  **Crear una rama:** En el repositorio, crear una rama que incluya la clave del ticket: `git checkout -b feature/SYS-999-prueba-integracion`.
3.  **Realizar un commit:** Hacer un cambio menor y realizar un commit referenciando el ticket: `git commit -m "chore: prueba de vinculación (SYS-999)"`.
4.  **Empujar la rama:** `git push origin feature/SYS-999-prueba-integracion`.
5.  **Verificación en Jira:**
    *   Abrir el ticket `SYS-999` en Jira.
    *   En el panel lateral derecho (sección "Desarrollo"), debe aparecer el enlace a la rama creada y el commit realizado.
    *   *(Evidencia requerida)*: Tomar captura de pantalla de este panel mostrando los enlaces activos al repositorio.