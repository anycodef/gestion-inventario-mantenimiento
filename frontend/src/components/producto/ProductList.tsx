import { Producto } from "@/types/producto";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"



interface Props {
    productos: Producto[];
}

export default function ProductList({ productos }: Props) {
    const router = useRouter()
    return (
        <Table>
            <TableCaption>Productos</TableCaption>
            <TableHeader>
                <TableRow >
                    <TableHead><span className="font-bold"> ID</span></TableHead>
                    <TableHead><span className="font-bold">Categoría</span></TableHead>
                    <TableHead><span className="font-bold">Nombre</span></TableHead>
                    <TableHead><span className="font-bold">Descripción</span></TableHead>
                    <TableHead><span className="font-bold">Marca</span></TableHead>
                    <TableHead><span className="font-bold">Modelo</span></TableHead>
                    <TableHead><span className="font-bold">Precio</span></TableHead>
                    <TableHead><span className="font-bold">Nivel Min</span></TableHead>
                    <TableHead><span className="font-bold">Nivel Max</span></TableHead>
                    <TableHead><span className="font-bold">Acciones</span></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {productos.map((producto) => (
                    <TableRow key={producto.id}>
                        <TableCell>{producto.id}</TableCell>
                        <TableCell>{producto.nombrecategoria}</TableCell>
                        <TableCell>{producto.nombre}</TableCell>
                        <TableCell>{producto.descripcion}</TableCell>
                        <TableCell>{producto.marca}</TableCell>
                        <TableCell>{producto.modelo}</TableCell>
                        <TableCell>{producto.precio}</TableCell>
                        <TableCell>{producto.nivel_minimo}</TableCell>
                        <TableCell>{producto.nivel_maximo}</TableCell>
                        <TableCell>
                            <div className="flex flex-row gap-2">
                                <div className="cursor-pointer bg-primary text-white rounded-md p-2 grid content-center" onClick={() => router.push(`/productos/${producto.id}`)}>
                                    <FiEdit size={16} />
                                </div>
                                <div className="cursor-pointer bg-red-500 text-white rounded-md p-2 grid content-center" onClick={async () => {
                                    const confirmation = confirm('¿Deseas eliminar el producto?');
                                    if (confirmation) {
                                        const res = await api.delete(`/productos/${producto.id}`);
                                        const data = await res.data;
                                        console.log(data);
                                        router.refresh();
                                    }
                                }}>
                                    <FiTrash2 size={16} />
                                </div>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}