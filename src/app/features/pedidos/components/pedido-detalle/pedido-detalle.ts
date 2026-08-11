import {
  Component,
  input,
  output,
} from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Pedido } from '../../../../core/models/pedido';
import { StatusBadge } from '../../../../shared/components/status-badge/status-badge';
import { AppButton } from '../../../../shared/components/app-button/app-button';

@Component({
  selector: 'app-pedido-detalle',
  imports: [
    CurrencyPipe,
    StatusBadge,
    AppButton,
  ],
  templateUrl: './pedido-detalle.html',
  styleUrl: './pedido-detalle.css',
})
export class PedidoDetalle {
  readonly pedido = input.required<Pedido>();

  readonly cerrar = output<void>();

  protected cerrarDetalle(): void {
    this.cerrar.emit();
  }
}