'use client';

import { useState } from 'react';
import { FileDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Producto } from '@/types/producto';
import {
  exportarInventarioExcel,
  FiltroStock,
  FiltrosExport,
} from '@/lib/exportInventario';

interface Props {
  inventario: Producto[];
}

const OPCIONES_STOCK: { value: FiltroStock; label: string }[] = [
  { value: 'todos',        label: 'Todos' },
  { value: 'normal',       label: 'Stock normal' },
  { value: 'bajo_minimo',  label: 'Bajo mínimo' },
  { value: 'sobre_maximo', label: 'Sobre máximo' },
];

export default function ExportInventarioButton({ inventario }: Props) {
  const [categoria, setCategoria]       = useState('');
  const [filtroStock, setFiltroStock]   = useState<FiltroStock>('todos');

  const categorias = Array.from(
    new Set(inventario.map((p) => p.nombrecategoria ?? '').filter(Boolean))
  ).sort();

  const filtros: FiltrosExport = { categoria, filtroStock };

  const totalFiltrado = inventario.filter((p) => {
    if (categoria && p.nombrecategoria !== categoria) return false;
    if (filtroStock === 'bajo_minimo')  return (p.stock_actual ?? 0) < p.nivel_minimo;
    if (filtroStock === 'sobre_maximo') return (p.stock_actual ?? 0) > p.nivel_maximo;
    if (filtroStock === 'normal') {
      const s = p.stock_actual ?? 0;
      return s >= p.nivel_minimo && s <= p.nivel_maximo;
    }
    return true;
  }).length;

  return (
    <div className="flex flex-wrap items-end gap-3">
      {/* Filtro categoría */}
      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500 font-medium">Categoría</label>
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className="h-9 rounded-md border border-input bg-background px-3 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
        >
          <option value="">Todas</option>
          {categorias.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Filtro estado de stock */}
      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500 font-medium">Estado de stock</label>
        <select
          value={filtroStock}
          onChange={(e) => setFiltroStock(e.target.value as FiltroStock)}
          className="h-9 rounded-md border border-input bg-background px-3 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
        >
          {OPCIONES_STOCK.map((op) => (
            <option key={op.value} value={op.value}>{op.label}</option>
          ))}
        </select>
      </div>

      {/* Botón exportar */}
      <Button
        variant="outline"
        className="flex items-center gap-2 h-9"
        onClick={() => exportarInventarioExcel(inventario, filtros)}
        disabled={totalFiltrado === 0}
        title={totalFiltrado === 0 ? 'Sin registros para exportar' : `Exportar ${totalFiltrado} registros`}
      >
        <FileDown size={16} />
        Exportar Excel
        {totalFiltrado > 0 && (
          <span className="ml-1 text-xs text-gray-400">({totalFiltrado})</span>
        )}
      </Button>
    </div>
  );
}
