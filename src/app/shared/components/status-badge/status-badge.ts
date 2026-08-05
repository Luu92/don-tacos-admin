import { Component, computed, input } from '@angular/core';
import { EstadoPedido } from '../../../core/models/estado-pedido';

@Component({
  selector: 'app-status-badge',
  imports: [],
  templateUrl: './status-badge.html',
  styleUrl: './status-badge.css',
})
export class StatusBadge {
  readonly estado = input.required<EstadoPedido>();

  protected readonly texto = computed(() => {
    const etiquetas: Record<EstadoPedido, string> = {
      PENDIENTE: 'Pendiente',
      ACEPTADO: 'Aceptado',
      EN_PREPARACION: 'En preparación',
      LISTO: 'Listo',
      ENVIADO: 'Enviado',
      ENTREGADO: 'Entregado',
      RECHAZADO: 'Rechazado',
      RETRASADO: 'Retrasado',
    };

    return etiquetas[this.estado()];
  });

  protected readonly claseEstado = computed(
    () => `status-badge--${this.estado().toLowerCase()}`,
  );
}