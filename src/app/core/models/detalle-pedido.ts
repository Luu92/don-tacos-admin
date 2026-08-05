export interface DetallePedido {
  id: number;
  idAlimento: number;
  nombre: string;
  precioUnitario: number;

  /**
   * Cantidad que el comensal paga.
   */
  cantidadPagada: number;

  /**
   * Cantidad real que cocina debe preparar.
   */
  cantidadPreparar: number;

  promocionAplicada?: string;
  subtotal: number;
}