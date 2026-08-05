import {
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { EstadoPedido } from '../../../../core/models/estado-pedido';
import { PedidoCard } from '../../components/pedido-card/pedido-card';
import { PedidoService } from '../../services/pedido';

type FiltroPedido = 'TODOS' | EstadoPedido;

@Component({
  selector: 'app-lista-pedidos',
  imports: [PedidoCard],
  templateUrl: './lista-pedidos.html',
  styleUrl: './lista-pedidos.css',
})
export class ListaPedidos {
  private readonly pedidoService = inject(PedidoService);

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

  protected rechazarPedido(idPedido: number): void {
    this.pedidoService.rechazarPedido(idPedido);
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
      ENVIADO: 'ENTREGADO',
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
    console.log(
      'Abrir detalle del pedido:',
      idPedido,
    );
  }
}