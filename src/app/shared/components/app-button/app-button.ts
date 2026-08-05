import {
  Component,
  input,
  output,
} from '@angular/core';

export type AppButtonVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'ghost';

export type AppButtonType =
  | 'button'
  | 'submit'
  | 'reset';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './app-button.html',
  styleUrl: './app-button.css',
})
export class AppButton {
  readonly variant = input<AppButtonVariant>('primary');
  readonly type = input<AppButtonType>('button');
  readonly disabled = input(false);
  readonly fullWidth = input(false);
  readonly loading = input(false);

  readonly buttonClick = output<MouseEvent>();

  protected emitirClick(event: MouseEvent): void {
    if (this.disabled() || this.loading()) {
      return;
    }

    this.buttonClick.emit(event);
  }
}