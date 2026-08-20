import { PromocionAlimento } from './promocion-alimento';

export interface Promocion {
  id: number;
  nombre: string;
  descripcion: string;
  fecha: Date;
  precio: number;
  activa: boolean;
  alimentos: PromocionAlimento[];
}