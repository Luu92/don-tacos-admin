import {
  Component,
  signal,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from '../sidebar/sidebar';
import { Topbar } from '../topbar/topbar';

@Component({
  selector: 'app-admin-layout',
  imports: [
    RouterOutlet,
    Sidebar,
    Topbar,
  ],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css',
})
export class AdminLayout {
  protected readonly sidebarAbierto = signal(false);

  protected alternarSidebar(): void {
    this.sidebarAbierto.update(
      (estadoActual) => !estadoActual,
    );
  }

  protected cerrarSidebar(): void {
    this.sidebarAbierto.set(false);
  }
}