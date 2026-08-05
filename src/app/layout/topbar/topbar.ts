import {
  Component,
  computed,
  inject,
  output,
} from '@angular/core';
import { Auth } from '../../features/auth/services/auth';
import { NotificationService } from '../../core/services/notification';

@Component({
  selector: 'app-topbar',
  imports: [],
  templateUrl: './topbar.html',
  styleUrl: './topbar.css',
})
export class Topbar {
  private readonly authService = inject(Auth);

  readonly menuClick = output<void>();

  protected readonly usuario =
    this.authService.usuarioActual;

  private readonly notificationService =
    inject(NotificationService);

  protected readonly notificaciones =
    this.notificationService.cantidad;

  protected limpiarNotificaciones(): void {
    this.notificationService.limpiarNotificaciones();
  }

  protected readonly fechaActual = computed(() =>
    new Intl.DateTimeFormat('es-MX', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date()),
  );

  protected abrirMenu(): void {
    this.menuClick.emit();
  }
}