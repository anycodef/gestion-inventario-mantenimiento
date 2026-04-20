# Requisitos Funcionales

Este documento describe los requisitos funcionales del sistema recuperados mediante la ingeniería inversa del código fuente (Backend y Frontend). El sistema parece ser un software de gestión de inventarios, compras y ventas.

## 1. Gestión de Productos e Inventario
- **FR1.1 Crear Producto:** El sistema debe permitir registrar nuevos productos.
- **FR1.2 Actualizar Producto:** El sistema debe permitir modificar los datos de los productos existentes.
- **FR1.3 Eliminar Producto:** El sistema debe permitir eliminar productos.
- **FR1.4 Consultar Productos:** El sistema debe listar los productos y permitir ver los detalles de un producto específico.
- **FR1.5 Actualizar Stock:** El sistema debe actualizar el stock disponible de los productos según las operaciones de entrada/salida.
- **FR1.6 Control de Límites:** El sistema debe manejar alertas para productos que alcancen niveles de stock mínimos o máximos.
- **FR1.7 Cambiar Estado:** El sistema debe permitir activar o desactivar productos.

## 2. Gestión de Categorías
- **FR2.1 Crear Categoría:** El sistema debe permitir crear categorías para clasificar los productos.
- **FR2.2 Modificar/Eliminar Categoría:** El sistema debe permitir la edición y eliminación de categorías.
- **FR2.3 Listar Categorías:** El sistema debe mostrar todas las categorías disponibles.

## 3. Gestión de Proveedores
- **FR3.1 Registrar Proveedor:** El sistema debe permitir registrar la información de proveedores.
- **FR3.2 Administrar Proveedores:** El sistema debe permitir editar, eliminar y listar a los proveedores.

## 4. Gestión de Órdenes de Compra
- **FR4.1 Crear Orden de Compra:** El sistema debe permitir generar órdenes de compra vinculando productos y proveedores.
- **FR4.2 Administrar Órdenes de Compra:** El sistema debe permitir listar, editar, ver el detalle y eliminar órdenes de compra.
- **FR4.3 Gestionar Detalles de Compra:** El sistema debe permitir agregar o quitar productos específicos (detalles) a una orden de compra.

## 5. Salidas de Inventario (Ventas / Consumo)
- **FR5.1 Registrar Salida de Inventario:** El sistema debe permitir registrar salidas de inventario (órdenes de venta).
- **FR5.2 Administrar Salidas:** El sistema debe permitir listar, actualizar, ver detalles y eliminar registros de salida.
- **FR5.3 Gestionar Detalles de Salida:** El sistema debe permitir agregar los ítems y cantidades específicos que conforman una salida.

## 6. Control de Kardex (Movimientos)
- **FR6.1 Registrar Movimientos:** El sistema debe registrar automáticamente todos los movimientos de entrada y salida de productos en un Kardex histórico.
- **FR6.2 Consultar Kardex:** El sistema debe permitir consultar el historial de movimientos (Kardex) para auditoría y control.

## 7. Recepción de Compras
- **FR7.1 Recepcionar Compra:** El sistema debe procesar la recepción de mercancía vinculada a órdenes de compra previamente registradas.