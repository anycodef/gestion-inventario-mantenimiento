# Diseño Estructural (Modelos Estructurales)

Este documento describe la estructura estática del sistema mediante diagramas de clases, enfocándose en las entidades principales del Dominio.

## Diagrama de Clases del Dominio

El siguiente diagrama representa las entidades fundamentales inferidas a partir del código fuente y las relaciones entre ellas.

```mermaid
classDiagram
    class Categoria {
        +int id
        +string nombre
        +string descripcion
    }

    class Producto {
        +int id
        +string nombre
        +string descripcion
        +float precio
        +int stockActual
        +int stockMinimo
        +int stockMaximo
        +int categoriaId
        +boolean estado
    }

    class Proveedor {
        +int id
        +string nombre
        +string ruc
        +string direccion
        +string telefono
        +string email
    }

    class OrdenCompra {
        +int id
        +Date fechaOrden
        +int proveedorId
        +string estado
        +float total
    }

    class DetalleCompra {
        +int id
        +int ordenCompraId
        +int productoId
        +int cantidad
        +float precioUnitario
        +float subtotal
    }

    class SalidaInventario {
        +int id
        +Date fechaSalida
        +string motivo
        +string usuario
    }

    class DetalleSalida {
        +int id
        +int salidaId
        +int productoId
        +int cantidad
    }

    class Kardex {
        +int id
        +int productoId
        +Date fechaMovimiento
        +string tipoMovimiento
        +int cantidad
        +int saldo
        +string referenciaDocumento
    }

    Categoria "1" <-- "*" Producto : Pertenece a
    Proveedor "1" <-- "*" OrdenCompra : Emite
    OrdenCompra "1" *-- "*" DetalleCompra : Contiene
    Producto "1" <-- "*" DetalleCompra : Es parte de
    SalidaInventario "1" *-- "*" DetalleSalida : Contiene
    Producto "1" <-- "*" DetalleSalida : Es parte de
    Producto "1" *-- "*" Kardex : Registra movimientos
```

*Descripción de Entidades Principales:*
- **Producto:** Centro del sistema de inventario. Está vinculado a Categorías y es referenciado en órdenes de compra, salidas y kardex.
- **Kardex:** Entidad fundamental para el seguimiento del histórico de entradas y salidas de un producto específico, manteniendo el saldo actualizado.
- **OrdenCompra y DetalleCompra:** Representan el flujo de ingreso de mercancía desde los proveedores.
- **SalidaInventario y DetalleSalida:** Representan el flujo de salida de mercancía (ej. ventas o mermas).