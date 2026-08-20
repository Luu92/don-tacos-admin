import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { publicGuard } from './core/guards/public-guard';

export const routes: Routes = [
  {
    path: 'login',
    canActivate: [publicGuard],
    loadComponent: () =>
      import('./features/auth/pages/login/login')
        .then((component) => component.Login),
  },
  {
    path: 'admin',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./layout/admin-layout/admin-layout')
        .then((component) => component.AdminLayout),
    children: [
      {
        path: 'pedidos',
        loadComponent: () =>
          import(
            './features/pedidos/pages/lista-pedidos/lista-pedidos'
          ).then(
            (component) => component.ListaPedidos,
          ),
      },
      {
        path: '',
        redirectTo: 'pedidos',
        pathMatch: 'full',
      },
      {
        path: 'alimentos',
        loadComponent: () =>
          import(
            './features/alimentos/pages/lista-alimentos/lista-alimentos'
          ).then(
            (component) => component.ListaAlimentos,
          ),
      },
      {
        path: 'categorias',
        loadComponent: () =>
          import(
            './features/categorias/pages/lista-categorias/lista-categorias'
          ).then(
            (component) => component.ListaCategorias,
          ),
      },
      {
        path: 'promociones',
        loadComponent: () =>
          import(
            './features/promociones/pages/lista-promociones/lista-promociones'
          ).then(
            (component) => component.ListaPromociones,
          ),
      },
    ],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];