import { Component, inject, output } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { Auth } from '../../features/auth/services/auth';

interface MenuItem {
  etiqueta: string;
  ruta: string;
  icono:
    | 'pedidos'
    | 'dashboard'
    | 'alimentos'
    | 'categorias'
    | 'promociones';
}

@Component({
  selector: 'app-sidebar',
  imports: [
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  private readonly authService = inject(Auth);
  private readonly router = inject(Router);

  readonly navegacionRealizada = output<void>();

  protected readonly usuario =
    this.authService.usuarioActual;

  protected readonly menuItems: MenuItem[] = [
    {
      etiqueta: 'Pedidos',
      ruta: '/admin/pedidos',
      icono: 'pedidos',
    },
    {
      etiqueta: 'Dashboard',
      ruta: '/admin/dashboard',
      icono: 'dashboard',
    },
    {
      etiqueta: 'Carta',
      ruta: '/admin/alimentos',
      icono: 'alimentos',
    },
    {
      etiqueta: 'Categorías',
      ruta: '/admin/categorias',
      icono: 'categorias',
    },
    {
      etiqueta: 'Promociones',
      ruta: '/admin/promociones',
      icono: 'promociones',
    },
  ];

  protected cerrarSidebar(): void {
    this.navegacionRealizada.emit();
  }

  protected cerrarSesion(): void {
    this.authService.logout();
    void this.router.navigate(['/login']);
  }
}