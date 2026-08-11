import {
  Component,
  input,
  output,
} from '@angular/core';

import { AppButton } from '../app-button/app-button';

@Component({
  selector: 'app-confirm-dialog',
  imports: [AppButton],
  templateUrl: './confirm-dialog.html',
  styleUrl: './confirm-dialog.css',
})
export class ConfirmDialog {
  readonly titulo = input.required<string>();
  readonly mensaje = input.required<string>();

  readonly textoConfirmar = input('Confirmar');
  readonly textoCancelar = input('Cancelar');

  readonly variantConfirmar =
    input<'primary' | 'success' | 'danger'>('primary');

  readonly confirmar = output<void>();
  readonly cancelar = output<void>();

  protected confirmarAccion(): void {
    this.confirmar.emit();
  }

  protected cancelarAccion(): void {
    this.cancelar.emit();
  }
}