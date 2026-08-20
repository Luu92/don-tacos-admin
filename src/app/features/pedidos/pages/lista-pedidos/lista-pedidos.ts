import {
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { EstadoPedido } from '../../../../core/models/estado-pedido';
import { PedidoCard } from '../../components/pedido-card/pedido-card';
import { PedidoService } from '../../services/pedido';
import { Pedido } from '../../../../core/models/pedido';
import { PedidoDetalle } from '../../components/pedido-detalle/pedido-detalle';
import { ConfirmDialog } from '../../../../shared/components/confirm-dialog/confirm-dialog';

type FiltroPedido = 'TODOS' | EstadoPedido;

@Component({
  selector: 'app-lista-pedidos',
  imports: [PedidoCard, PedidoDetalle, ConfirmDialog],
  templateUrl: './lista-pedidos.html',
  styleUrl: './lista-pedidos.css',
})
export class ListaPedidos {
  private readonly pedidoService = inject(PedidoService);

  protected readonly pedidoSeleccionado =
    signal<Pedido | null>(null);

  protected readonly pedidoPendienteRechazo =
    signal<number | null>(null);

  protected readonly filtroActivo =
    signal<FiltroPedido>('TODOS');

  protected readonly pedidos =
    this.pedidoService.pedidos;

  protected readonly totalPendientes =
    this.pedidoService.totalPendientes;

  protected readonly totalEnPreparacion =
    this.pedidoService.totalEnPreparacion;

  protected readonly totalListos =
    this.pedidoService.totalListos;

  protected readonly pedidosEntregados =
  this.pedidoService.pedidosEntregados;

  protected readonly pedidosFiltrados = computed(() => {
    const filtro = this.filtroActivo();

    if (filtro === 'TODOS') {
      return this.pedidos();
    }

    return this.pedidos().filter(
      (pedido) => pedido.estado === filtro,
    );
  });

  protected cambiarFiltro(
    filtro: FiltroPedido,
  ): void {
    this.filtroActivo.set(filtro);
  }

  protected aceptarPedido(idPedido: number): void {
    this.pedidoService.aceptarPedido(idPedido);
  }

  protected solicitarRechazo(idPedido: number): void {
    this.pedidoPendienteRechazo.set(idPedido);
  }

  protected confirmarRechazo(): void {
    const idPedido = this.pedidoPendienteRechazo();

    if (idPedido === null) {
      return;
    }

    this.pedidoService.rechazarPedido(idPedido);
    this.pedidoPendienteRechazo.set(null);
  }

  protected cancelarRechazo(): void {
    this.pedidoPendienteRechazo.set(null);
  }

  protected avanzarEstado(idPedido: number): void {
    const pedido = this.pedidos().find(
      (pedidoActual) => pedidoActual.id === idPedido,
    );

    if (!pedido) {
      return;
    }

    const siguienteEstado: Partial<
      Record<EstadoPedido, EstadoPedido>
    > = {
      ACEPTADO: 'EN_PREPARACION',
      EN_PREPARACION: 'LISTO',
      LISTO: 'ENVIADO',
    };

    const nuevoEstado =
      siguienteEstado[pedido.estado];

    if (!nuevoEstado) {
      return;
    }

    this.pedidoService.actualizarEstado(
      idPedido,
      nuevoEstado,
    );
  }

  protected verDetalle(idPedido: number): void {
    const pedido = this.pedidos().find(
      (pedidoActual) =>
        pedidoActual.id === idPedido,
    );

    if (!pedido) {
      return;
    }

    this.pedidoSeleccionado.set(pedido);
  }

  protected cerrarDetalle(): void {
    this.pedidoSeleccionado.set(null);
  }

}