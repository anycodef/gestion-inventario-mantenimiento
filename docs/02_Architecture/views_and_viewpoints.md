# Vistas Arquitectónicas y Puntos de Vista

Para gestionar la complejidad, la arquitectura del sistema se describe utilizando diferentes vistas que se dirigen a distintas preocupaciones de los stakeholders.

## 1. Vista Lógica (Backend Clean Architecture)
Muestra la organización del código backend en capas concéntricas, donde las dependencias siempre apuntan hacia el interior.

```mermaid
graph TD
    subgraph Infrastructure Layer
        DB[(MySQL / PostgreSQL)]
        Express[Express Routes]
    end

    subgraph Interfaces Layer
        Controllers[Controllers]
    end

    subgraph Application Layer
        UseCases[Use Cases]
    end

    subgraph Domain Layer
        Entities[Entities]
        RepoInterfaces[Repository Interfaces]
    end

    DB --> RepoInterfaces
    Express --> Controllers
    Controllers --> UseCases
    UseCases --> RepoInterfaces
    UseCases --> Entities

    style Domain Layer fill:#f9f,stroke:#333,stroke-width:2px
    style Application Layer fill:#bbf,stroke:#333,stroke-width:2px
    style Interfaces Layer fill:#dfd,stroke:#333,stroke-width:2px
    style Infrastructure Layer fill:#fdb,stroke:#333,stroke-width:2px
```
*Descripción:* Las capas externas (Infraestructura, Interfaces) dependen de las capas internas (Aplicación, Dominio). El Dominio no tiene dependencias de ninguna otra capa.

## 2. Vista de Desarrollo (Frontend Component Architecture)
Muestra la jerarquía y organización de los componentes del frontend en Next.js.

```mermaid
graph TD
    AppRouter[Next.js App Router]
    Pages[Pages /app]
    Hooks[Custom Hooks /hooks]
    Components[UI Components /components]
    Services[API Services /lib]

    AppRouter --> Pages
    Pages --> Components
    Pages --> Hooks
    Hooks --> Services
    Components --> UI[Shadcn UI / Tailwind]
```

## 3. Vista de Despliegue (Deployment View)
Representa cómo el software se mapea teóricamente en la infraestructura de hardware/nube.

```mermaid
graph LR
    Client((Client Browser))

    subgraph Frontend Server
        NextJS[Next.js Application]
    end

    subgraph Backend Server
        Node[Node.js + Express API]
    end

    subgraph Database Server
        SQL[(RDBMS MySQL/Postgres)]
    end

    Client -- HTTP/HTTPS --> NextJS
    Client -- HTTP/HTTPS (REST) --> Node
    Node -- TCP/IP --> SQL
```
*Nota:* En una aplicación de página única (SPA) servida estáticamente, el cliente podría comunicarse directamente con el Backend Server después de cargar la UI desde el Frontend Server.