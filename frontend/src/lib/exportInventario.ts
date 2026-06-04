import * as XLSX from 'xlsx';
import { Producto } from '@/types/producto';

export type FiltroStock = 'todos' | 'bajo_minimo' | 'sobre_maximo' | 'normal';

export interface FiltrosExport {
  categoria: string;   // '' = todas
  filtroStock: FiltroStock;
}

function aplicarFiltros(productos: Producto[], filtros: FiltrosExport): Producto[] {
  return productos.filter((p) => {
    if (filtros.categoria && p.nombrecategoria !== filtros.categoria) return false;

    if (filtros.filtroStock === 'bajo_minimo') {
      return (p.stock_actual ?? 0) < p.nivel_minimo;
    }
    if (filtros.filtroStock === 'sobre_maximo') {
      return (p.stock_actual ?? 0) > p.nivel_maximo;
    }
    if (filtros.filtroStock === 'normal') {
      const stock = p.stock_actual ?? 0;
      return stock >= p.nivel_minimo && stock <= p.nivel_maximo;
    }
    return true;
  });
}

function construirFilas(productos: Producto[]) {
  return productos.map((p) => ({
    ID:            p.id,
    SKU:           p.sku ?? '',
    Nombre:        p.nombre,
    Categoría:     p.nombrecategoria ?? '',
    Marca:         p.marca ?? '',
    Modelo:        p.modelo ?? '',
    'Precio (S/)': p.precio,
    'Stock actual': p.stock_actual ?? 0,
    'Nivel mínimo': p.nivel_minimo,
    'Nivel máximo': p.nivel_maximo,
    Estado:        p.estado ?? '',
  }));
}

export function exportarInventarioExcel(
  productos: Producto[],
  filtros: FiltrosExport,
): void {
  const filtrados = aplicarFiltros(productos, filtros);
  const filas = construirFilas(filtrados);

  const hoja = XLSX.utils.json_to_sheet(filas);

  // Ancho de columnas
  hoja['!cols'] = [
    { wch: 6 },   // ID
    { wch: 12 },  // SKU
    { wch: 28 },  // Nombre
    { wch: 18 },  // Categoría
    { wch: 14 },  // Marca
    { wch: 14 },  // Modelo
    { wch: 12 },  // Precio
    { wch: 12 },  // Stock actual
    { wch: 13 },  // Nivel mínimo
    { wch: 13 },  // Nivel máximo
    { wch: 10 },  // Estado
  ];

  const libro = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(libro, hoja, 'Inventario');

  const fecha = new Date().toISOString().slice(0, 10);
  XLSX.writeFile(libro, `inventario_${fecha}.xlsx`);
}
