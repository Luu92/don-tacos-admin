import { Injectable, computed, signal } from '@angular/core';
import { LoginRequest } from '../models/login-request';
import { UsuarioSesion } from '../models/usuario-sesion';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly SESSION_KEY = 'don-tacos-session';

  private readonly usuarioActualSignal =
    signal<UsuarioSesion | null>(this.recuperarSesion());

  readonly usuarioActual = this.usuarioActualSignal.asReadonly();

  readonly estaAutenticado = computed(
    () => this.usuarioActualSignal() !== null,
  );

  login(credenciales: LoginRequest): boolean {
    const credencialesValidas =
      credenciales.usuario.trim().toLowerCase() === 'admin' &&
      credenciales.password === 'admin123';

    if (!credencialesValidas) {
      return false;
    }

    const usuario: UsuarioSesion = {
      id: 1,
      nombre: 'Administrador',
      usuario: 'admin',
      rol: 'ADMINISTRADOR',
    };

    this.usuarioActualSignal.set(usuario);
    this.guardarSesion(usuario, credenciales.recordarSesion);

    return true;
  }

  logout(): void {
    this.usuarioActualSignal.set(null);

    localStorage.removeItem(this.SESSION_KEY);
    sessionStorage.removeItem(this.SESSION_KEY);
  }

  private guardarSesion(
    usuario: UsuarioSesion,
    recordarSesion: boolean,
  ): void {
    localStorage.removeItem(this.SESSION_KEY);
    sessionStorage.removeItem(this.SESSION_KEY);

    const almacenamiento = recordarSesion
      ? localStorage
      : sessionStorage;

    almacenamiento.setItem(
      this.SESSION_KEY,
      JSON.stringify(usuario),
    );
  }

  private recuperarSesion(): UsuarioSesion | null {
    const sesionGuardada =
      localStorage.getItem(this.SESSION_KEY) ??
      sessionStorage.getItem(this.SESSION_KEY);

    if (!sesionGuardada) {
      return null;
    }

    try {
      return JSON.parse(sesionGuardada) as UsuarioSesion;
    } catch {
      localStorage.removeItem(this.SESSION_KEY);
      sessionStorage.removeItem(this.SESSION_KEY);

      return null;
    }
  }
}