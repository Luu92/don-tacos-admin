import {
  Injectable,
  computed,
  signal,
} from '@angular/core';
import { EstadoPedido } from '../../../core/models/estado-pedido';
import { Pedido } from '../../../core/models/pedido';
import { NotificationService } from '../../../core/services/notification';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  private readonly pedidosSignal = signal<Pedido[]>([
    {
      id: 1,
      folio: '1001',
      cliente: {
        nombre: 'Luis Molina',
        telefono: '5534439752',
      },
      direccion: {
        calle: 'Avenida Madero',
        numero: '245',
        colonia: 'Centro',
        referencia: 'Portón negro, frente a la farmacia',
      },
      fecha: '2026-08-05',
      hora: '15:20',
      estado: 'PENDIENTE',
      detalles: [
        {
          id: 1,
          idAlimento: 1,
          nombre: 'Tacos al Pastor',
          precioUnitario: 14,
          cantidadPagada: 8,
          cantidadPreparar: 16,
          promocionAplicada: 'Promoción 2x1',
          subtotal: 112,
        },
        {
          id: 2,
          idAlimento: 5,
          nombre: 'Torta de Suadero',
          precioUnitario: 90,
          cantidadPagada: 1,
          cantidadPreparar: 1,
          subtotal: 90,
        },
      ],
      subtotal: 202,
      cargoServicio: 20,
      total: 222,
    },
    {
      id: 2,
      folio: '1002',
      cliente: {
        nombre: 'Mariana López',
        telefono: '5650314435',
      },
      direccion: {
        calle: 'Camelinas',
        numero: '418',
        colonia: 'Las Américas',
        referencia: 'Casa blanca junto a la tienda',
      },
      fecha: '2026-08-05',
      hora: '15:32',
      estado: 'EN_PREPARACION',
      detalles: [
        {
          id: 3,
          idAlimento: 2,
          nombre: 'Tacos de Suadero',
          precioUnitario: 16,
          cantidadPagada: 8,
          cantidadPreparar: 8,
          subtotal: 128,
        },
        {
          id: 4,
          idAlimento: 8,
          nombre: 'Agua de Horchata',
          precioUnitario: 25,
          cantidadPagada: 2,
          cantidadPreparar: 2,
          subtotal: 50,
        },
        {
          id: 5,
          idAlimento: 5,
          nombre: 'Torta de Suadero',
          precioUnitario: 90,
          cantidadPagada: 1,
          cantidadPreparar: 1,
          subtotal: 90,
        },
      ],
      subtotal: 268,
      cargoServicio: 20,
      total: 288,
    },
    {
      id: 3,
      folio: '1003',
      cliente: {
        nombre: 'Carlos Pérez',
        telefono: '5512345678',
      },
      direccion: {
        calle: 'Acueducto',
        numero: '725',
        colonia: 'Chapultepec',
        referencia: 'Departamento 3',
      },
      fecha: '2026-08-05',
      hora: '15:45',
      estado: 'LISTO',
      detalles: [
        {
          id: 6,
          idAlimento: 6,
          nombre: 'Torta Cubana',
          precioUnitario: 95,
          cantidadPagada: 3,
          cantidadPreparar: 3,
          subtotal: 285,
        },
      ],
      subtotal: 285,
      cargoServicio: 20,
      total: 305,
    },
    {
      id: 4,
      folio: '1004',
      cliente: {
        nombre: 'Fernanda Ruiz',
        telefono: '5587654321',
      },
      direccion: {
        calle: 'Periodismo',
        numero: '147',
        colonia: 'Nueva Valladolid',
        referencia: 'Entre la papelería y la panadería',
      },
      fecha: '2026-08-05',
      hora: '15:56',
      estado: 'PENDIENTE',
      detalles: [
        {
          id: 7,
          idAlimento: 1,
          nombre: 'Tacos al Pastor',
          precioUnitario: 14,
          cantidadPagada: 10,
          cantidadPreparar: 20,
          promocionAplicada: 'Promoción 2x1',
          subtotal: 140,
        },
        {
          id: 8,
          idAlimento: 5,
          nombre: 'Torta de Suadero',
          precioUnitario: 90,
          cantidadPagada: 1,
          cantidadPreparar: 1,
          subtotal: 90,
        },
      ],
      subtotal: 230,
      cargoServicio: 20,
      total: 250,
    },
    {
      id: 6,
      folio: '1007',
      cliente: {
        nombre: 'Fernando Ramirez',
        telefono: '5587654321',
      },
      direccion: {
        calle: 'Periodismo',
        numero: '147',
        colonia: 'Nueva Valladolid',
        referencia: 'Entre la papelería y la panadería',
      },
      fecha: '2026-08-05',
      hora: '15:56',
      estado: 'ENTREGADO',
      detalles: [
        {
          id: 7,
          idAlimento: 1,
          nombre: 'Tacos al Pastor',
          precioUnitario: 14,
          cantidadPagada: 10,
          cantidadPreparar: 20,
          promocionAplicada: 'Promoción 2x1',
          subtotal: 140,
        },
        {
          id: 8,
          idAlimento: 5,
          nombre: 'Torta de Suadero',
          precioUnitario: 90,
          cantidadPagada: 1,
          cantidadPreparar: 1,
          subtotal: 90,
        },
      ],
      subtotal: 230,
      cargoServicio: 20,
      total: 250,
    },

  ]);

  readonly pedidos = this.pedidosSignal.asReadonly();

  readonly totalPendientes = computed(
    () =>
      this.pedidosSignal().filter(
        (pedido) => pedido.estado === 'PENDIENTE',
      ).length,
  );

  readonly totalEnPreparacion = computed(
    () =>
      this.pedidosSignal().filter(
        (pedido) => pedido.estado === 'EN_PREPARACION',
      ).length,
  );

  readonly totalListos = computed(
    () =>
      this.pedidosSignal().filter(
        (pedido) => pedido.estado === 'LISTO',
      ).length,
  );

  constructor(
    private readonly notificationService: NotificationService,
  ) {
    this.programarPedidoSimulado();
  }

  aceptarPedido(idPedido: number): void {
    this.actualizarEstado(idPedido, 'ACEPTADO');
  }

  rechazarPedido(idPedido: number): void {
    this.actualizarEstado(idPedido, 'RECHAZADO');
  }

  actualizarEstado(
    idPedido: number,
    nuevoEstado: EstadoPedido,
  ): void {
    this.pedidosSignal.update((pedidos) =>
      pedidos.map((pedido) =>
        pedido.id === idPedido
          ? {
            ...pedido,
            estado: nuevoEstado,
          }
          : pedido,
      ),
    );
  }

  private programarPedidoSimulado(): void {
    window.setTimeout(() => {
      const nuevoPedido: Pedido = {
        id: 5,
        folio: '1005',
        cliente: {
          nombre: 'Daniela Torres',
          telefono: '443 654 3287',
        },
        direccion: {
          calle: 'Avenida Universidad',
          numero: '310',
          colonia: 'Villa Universidad',
          referencia: 'Casa con reja amarilla',
        },
        fecha: '2026-08-05',
        hora: new Date().toLocaleTimeString('es-MX', {
          hour: '2-digit',
          minute: '2-digit',
        }),
        estado: 'PENDIENTE',
        detalles: [
          {
            id: 9,
            idAlimento: 1,
            nombre: 'Tacos al Pastor',
            precioUnitario: 14,
            cantidadPagada: 10,
            cantidadPreparar: 20,
            promocionAplicada: 'Promoción 2x1',
            subtotal: 140,
          },
          {
            id: 10,
            idAlimento: 6,
            nombre: 'Torta Cubana',
            precioUnitario: 95,
            cantidadPagada: 1,
            cantidadPreparar: 1,
            subtotal: 95,
          },
        ],
        comentarios:
          'Los tacos sin cebolla. Enviar salsa verde aparte.',
        subtotal: 235,
        cargoServicio: 20,
        total: 255,
      };

      this.pedidosSignal.update((pedidos) => [
        nuevoPedido,
        ...pedidos,
      ]);

      this.notificationService.notificarNuevoPedido();
    }, 10_000);
  }

}