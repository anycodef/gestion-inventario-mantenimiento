import { Request, Response } from 'express';
import { CrearSalidaInventarioUseCase } from '../../application/use-cases/salida-inventario/CrearSalidaInventarioUseCase';
import { ObtenerTodasSalidasInventarioUseCase } from '../../application/use-cases/salida-inventario/ObtenerTodasSalidasInventarioUseCase';
import { ObtenerSalidaInventarioPorIdUseCase } from '../../application/use-cases/salida-inventario/ObtenerSalidaInventarioPorIdUseCase';
import { ActualizarSalidaInventarioUseCase } from '../../application/use-cases/salida-inventario/ActualizarSalidaInventarioUseCase';
import { EliminarSalidaInventarioUseCase } from '../../application/use-cases/salida-inventario/EliminarSalidaInventarioUseCase';
export class SalidaInventarioController {
  constructor(private crearSalidaInventarioUseCase: CrearSalidaInventarioUseCase, private obtenerTodasSalidasInventarioUseCase: ObtenerTodasSalidasInventarioUseCase, private obtenerSalidaPorIdUseCase: ObtenerSalidaInventarioPorIdUseCase, private actualizarSalidaInventarioUseCase: ActualizarSalidaInventarioUseCase, private eliminarSalidaInventarioUseCase: EliminarSalidaInventarioUseCase ) {}

  async crearSalida(req: Request, res: Response): Promise<void> {
    try {
      const { fechaRegistro, motivo, area, estado, totalSalida, observaciones, detalles } = req.body;
      const ordenSalidaData = { fechaRegistro: new Date(fechaRegistro), motivo ,area, estado, totalSalida, observaciones, detalles };

      await this.crearSalidaInventarioUseCase.execute(ordenSalidaData);
      res.status(201).send({ mensaje: 'Salida de inventario creada exitosamente' });
    } catch (error) {
      res.status(400).send({ error: (error as Error).message });
    }
  }

  async obtenerTodasSalidas(req: Request, res: Response): Promise<void> {
    try {
      const salidas = await this.obtenerTodasSalidasInventarioUseCase.execute();
      res.json(salidas);
    } catch (error) {
      res.status(400).send({ error: (error as Error).message });
    }
  }

  async obtenerSalidaPorId(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const salida = await this.obtenerSalidaPorIdUseCase.execute(parseInt(id));
      res.json(salida);
    } catch (error) {
      res.status(400).send({ error: (error as Error).message });
    }
  }

  async actualizarSalida(req: Request, res: Response): Promise<void> {
    try {
      return;
    } catch (error) {
      res.status(400).send({ error: (error as Error).message });
    }
  }

  async eliminarSalida(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await this.eliminarSalidaInventarioUseCase.execute(parseInt(id));
      res.status(200).send({ message: 'Salida de inventario eliminada con exito' });
    } catch (error) {
      res.status(400).send({ error: (error as Error).message });
    }
  }

}
