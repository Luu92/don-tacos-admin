import {
  Injectable,
  signal,
} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly cantidadSignal = signal(0);

  readonly cantidad = this.cantidadSignal.asReadonly();

  private readonly audio = new Audio(
    'assets/audio/alert.mp3',
  );

  notificarNuevoPedido(): void {
    this.cantidadSignal.update(
      (cantidadActual) => cantidadActual + 1,
    );

    this.reproducirSonido();
  }

  limpiarNotificaciones(): void {
    this.cantidadSignal.set(0);
  }

  private reproducirSonido(): void {
    this.audio.currentTime = 0;

    void this.audio.play().catch(() => {
      /*
       * Algunos navegadores pueden bloquear el audio
       * hasta que el usuario haya interactuado con la página.
       */
    });
  }
}