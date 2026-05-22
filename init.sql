-- Esquema de base de datos para Gestión de Inventario

-- 1. Categoría
CREATE TABLE IF NOT EXISTS categoria (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT
);

-- 2. Proveedor
CREATE TABLE IF NOT EXISTS proveedor (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    contacto VARCHAR(100),
    telefono VARCHAR(20),
    email VARCHAR(100),
    direccion TEXT
);

-- 3. Producto
CREATE TABLE IF NOT EXISTS producto (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    categoriaid INTEGER REFERENCES categoria(id) ON DELETE SET NULL,
    precio NUMERIC(10, 2) NOT NULL DEFAULT 0,
    descripcion TEXT,
    marca VARCHAR(50),
    modelo VARCHAR(50),
    nivel_maximo INTEGER DEFAULT 0,
    nivel_minimo INTEGER DEFAULT 0,
    stock_actual INTEGER DEFAULT 0,
    sku VARCHAR(50) UNIQUE,
    estado VARCHAR(20) DEFAULT 'activo'
);

-- 4. Orden de Compra
CREATE TABLE IF NOT EXISTS orden_compra (
    id SERIAL PRIMARY KEY,
    proveedorid INTEGER NOT NULL REFERENCES proveedor(id),
    fecha_compra TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(20) DEFAULT 'pendiente',
    total_compra NUMERIC(12, 2) DEFAULT 0
);

-- 5. Detalle de Compra
CREATE TABLE IF NOT EXISTS detalle_compra (
    id SERIAL PRIMARY KEY,
    orden_compraid INTEGER NOT NULL REFERENCES orden_compra(id) ON DELETE CASCADE,
    productoid INTEGER NOT NULL REFERENCES producto(id),
    cantidad INTEGER NOT NULL CHECK (cantidad > 0),
    precio_unitario NUMERIC(10, 2) NOT NULL,
    subtotal NUMERIC(12, 2) NOT NULL
);

-- 6. Orden de Salida de Inventario
CREATE TABLE IF NOT EXISTS orden_salida_inventario (
    id SERIAL PRIMARY KEY,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    motivo VARCHAR(255),
    area VARCHAR(100),
    estado VARCHAR(20) DEFAULT 'completado',
    total_salida NUMERIC(12, 2) DEFAULT 0,
    observaciones TEXT
);

-- 7. Detalle de Salida
CREATE TABLE IF NOT EXISTS detalle_salida (
    id SERIAL PRIMARY KEY,
    salida_inventarioid INTEGER NOT NULL REFERENCES orden_salida_inventario(id) ON DELETE CASCADE,
    productoid INTEGER NOT NULL REFERENCES producto(id),
    cantidad INTEGER NOT NULL CHECK (cantidad > 0),
    precio_unitario NUMERIC(10, 2) NOT NULL,
    subtotal NUMERIC(12, 2) NOT NULL
);

-- 8. Recepción de Compra
CREATE TABLE IF NOT EXISTS recepcion_compra (
    id SERIAL PRIMARY KEY,
    orden_compraid INTEGER NOT NULL REFERENCES orden_compra(id),
    fecha_recepcion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(20) DEFAULT 'recibido'
);

-- 9. Kardex (Movimientos)
CREATE TABLE IF NOT EXISTS kardex (
    id SERIAL PRIMARY KEY,
    fecha_movimiento TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tipo_movimiento VARCHAR(20) NOT NULL, -- 'entrada' o 'salida'
    orden_compraid INTEGER REFERENCES orden_compra(id),
    salida_inventarioid INTEGER REFERENCES orden_salida_inventario(id)
);

-- ==========================================
-- DATOS INICIALES (BULK DATA)
-- ==========================================

-- Insertar Categorías
INSERT INTO categoria (nombre, descripcion) VALUES
('Procesadores', 'CPUs de última generación para gaming y estaciones de trabajo'),
('Tarjetas Gráficas', 'GPUs NVIDIA RTX y AMD Radeon'),
('Memoria RAM', 'Módulos DDR4 y DDR5 de alto rendimiento'),
('Almacenamiento', 'Discos SSD NVMe, SATA y Discos Duros'),
('Placas Base', 'Mainboards para sockets Intel y AMD'),
('Periféricos', 'Teclados, ratones y monitores');

-- Insertar Proveedores
INSERT INTO proveedor (nombre, contacto, telefono, email, direccion) VALUES
('TechDistri S.A.', 'Juan Pérez', '+34 912 345 678', 'ventas@techdistri.com', 'Polígono Industrial, Madrid'),
('Global Connect Electronics', 'Ana Martínez', '+34 934 567 890', 'contacto@globalconnect.es', 'Calle Electrónica 45, Barcelona'),
('Hardware Wholesale', 'Carlos Ruiz', '+34 956 789 012', 'info@hwholesales.com', 'Av. Tecnológica 12, Valencia');

-- Insertar Productos
INSERT INTO producto (nombre, categoriaid, precio, descripcion, marca, modelo, nivel_maximo, nivel_minimo, stock_actual, sku, estado) VALUES
('Intel Core i9-13900K', 1, 589.99, 'Procesador de 24 núcleos hasta 5.8GHz', 'Intel', 'Core i9', 50, 10, 25, 'SKU-I9-13900K', 'activo'),
('AMD Ryzen 7 7800X3D', 1, 449.00, 'El mejor procesador para gaming con 3D V-Cache', 'AMD', 'Ryzen 7', 40, 8, 15, 'SKU-R7-7800X3D', 'activo'),
('NVIDIA RTX 4090 24GB', 2, 1899.99, 'La tarjeta gráfica más potente del mercado', 'ASUS', 'ROG Strix', 20, 5, 8, 'SKU-RTX-4090', 'activo'),
('NVIDIA RTX 4070 Ti', 2, 849.50, 'Excelente rendimiento en 1440p y 4K', 'MSI', 'Ventus 3X', 30, 8, 12, 'SKU-RTX-4070TI', 'activo'),
('Samsung 980 Pro 2TB', 4, 165.00, 'SSD NVMe PCIe 4.0 ultra rápido', 'Samsung', '980 Pro', 100, 20, 45, 'SKU-SAM-980P2', 'activo'),
('Corsair Vengeance 32GB DDR5', 3, 125.50, 'Pack de 2x16GB 6000MHz CL30', 'Corsair', 'Vengeance RGB', 60, 15, 30, 'SKU-COR-32DDR5', 'activo'),
('Logitech G502 Hero', 6, 49.99, 'Ratón gaming con sensor HERO 25K', 'Logitech', 'G502', 200, 30, 85, 'SKU-LOG-G502', 'activo'),
('Monitor LG 27GP850-B', 6, 349.00, 'Monitor 27" Nano IPS 165Hz 1ms', 'LG', 'UltraGear', 25, 5, 10, 'SKU-LG-27GP850', 'activo');

-- Insertar una Orden de Compra Inicial (para que el historial no esté vacío)
INSERT INTO orden_compra (proveedorid, fecha_compra, estado, total_compra) VALUES
(1, CURRENT_TIMESTAMP - INTERVAL '5 days', 'completado', 3540.00);

-- Detalles de la Orden de Compra
INSERT INTO detalle_compra (orden_compraid, productoid, cantidad, precio_unitario, subtotal) VALUES
(1, 1, 2, 589.99, 1179.98),
(1, 3, 1, 1899.99, 1899.99),
(1, 5, 3, 153.34, 460.02);

-- Movimientos iniciales en el Kardex
INSERT INTO kardex (tipo_movimiento, orden_compraid) VALUES
('entrada', 1);
