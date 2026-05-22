# Diseño de Comportamiento (Modelos de Comportamiento)

Este documento ilustra la dinámica y el flujo de control del sistema para los procesos más críticos.

## 1. Diagrama de Secuencia: Creación de Orden de Compra

El siguiente diagrama muestra el flujo típico cuando el usuario (desde el Frontend) interactúa con el sistema para crear una Orden de Compra. Este flujo atraviesa todas las capas de la "Clean Architecture" en el Backend.

```mermaid
sequenceDiagram
    actor User as Usuario
    participant UI as Frontend (React)
    participant API as Routes (Express)
    participant Ctrl as OrdenCompraController
    participant UC as CrearOrdenCompraUseCase
    participant Repo as OrdenCompraRepository (MySQL/PG)

    User->>UI: Llena formulario de Orden
    UI->>API: POST /api/ordenes-compra
    API->>Ctrl: invoke(req, res)
    Ctrl->>UC: execute(datosOrden)

    activate UC
    UC->>Repo: create(OrdenCompraEntity)
    activate Repo
    Repo-->>UC: Orden Creada (ID)
    deactivate Repo

    %% Loop para los detalles
    loop Para cada producto
        UC->>Repo: createDetalle(DetalleCompraEntity)
    end

    UC-->>Ctrl: result (Success)
    deactivate UC

    Ctrl-->>API: 201 Created (JSON)
    API-->>UI: Response
    UI-->>User: Muestra Mensaje de Éxito
```

## 2. Diagrama de Actividad: Actualización de Inventario (Kardex)

El siguiente diagrama de actividad describe la lógica de negocio cuando se aprueba o recepciona una orden, lo que afecta el inventario de un producto.

```mermaid
stateDiagram-v2
    [*] --> IniciarRecepcion
    IniciarRecepcion --> ObtenerDetallesOrden
    ObtenerDetallesOrden --> ProcesarProducto

    state ProcesarProducto {
        [*] --> ActualizarStock
        ActualizarStock --> RegistrarKardex
        RegistrarKardex --> VerificarAlertas
        VerificarAlertas --> [*]
    }

    ProcesarProducto --> HayMasProductos
    HayMasProductos --> ProcesarProducto: Sí
    HayMasProductos --> FinalizarRecepcion: No
    FinalizarRecepcion --> [*]
```