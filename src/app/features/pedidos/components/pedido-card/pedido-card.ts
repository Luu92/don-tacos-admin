import {
  Component,
  input,
  output,
} from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Pedido } from '../../../../core/models/pedido';
import { AppButton } from '../../../../shared/components/app-button/app-button';
import { StatusBadge } from '../../../../shared/components/status-badge/status-badge';

@Component({
  selector: 'app-pedido-card',
  imports: [
    CurrencyPipe,
    AppButton,
    StatusBadge,
  ],
  templateUrl: './pedido-card.html',
  styleUrl: './pedido-card.css',
})
export class PedidoCard {
  readonly pedido = input.required<Pedido>();

  readonly aceptar = output<number>();
  readonly rechazar = output<number>();
  readonly siguienteEstado = output<number>();
  readonly verDetalle = output<number>();

  protected aceptarPedido(): void {
    this.aceptar.emit(this.pedido().id);
  }

  protected rechazarPedido(): void {
    this.rechazar.emit(this.pedido().id);
  }

  protected avanzarEstado(): void {
    this.siguienteEstado.emit(this.pedido().id);
  }

  protected abrirDetalle(): void {
    this.verDetalle.emit(this.pedido().id);
  }

  protected mostrarAccionesPendientes(): boolean {
    return this.pedido().estado === 'PENDIENTE';
  }

  protected puedeAvanzar(): boolean {
    return [
      'ACEPTADO',
      'EN_PREPARACION',
      'LISTO',
    ].includes(this.pedido().estado);
  }

  protected textoSiguienteEstado(): string {
    const textos: Record<string, string> = {
      ACEPTADO: 'Iniciar preparación',
      EN_PREPARACION: 'Marcar como listo',
      LISTO: 'Marcar como enviado',
    };

    return textos[this.pedido().estado] ?? 'Cambiar estado';
  }
}