import { DetallePedido } from './detalle-pedido';
import { EstadoPedido } from './estado-pedido';

export interface Pedido {
  id: number;
  folio: string;

  cliente: {
    nombre: string;
    telefono: string;
  };

  direccion: {
    calle: string;
    numero: string;
    colonia: string;
    referencia: string;
  };

  fecha: string;
  hora: string;
  estado: EstadoPedido;

  detalles: DetallePedido[];

  comentarios?: string;

  subtotal: number;
  cargoServicio: number;
  total: number;
}