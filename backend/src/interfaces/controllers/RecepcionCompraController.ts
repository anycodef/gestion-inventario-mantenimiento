import { Request, Response } from "express";
import { ObtenerTodosRecepcionCompraUseCase } from "../../application/use-cases/recepcion-compra/ObtenerTodosRecepcionCompra";

export class RecepcionCompraController {
  constructor(private obtenerRecepcionesCompra: ObtenerTodosRecepcionCompraUseCase) {}

  async obtenerRecepciones(req: Request, res: Response) {
    try {
      const recepciones = await this.obtenerRecepcionesCompra.execute();
      res.status(200).json(recepciones);
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' + (error as Error).message });
    }
  }
}
