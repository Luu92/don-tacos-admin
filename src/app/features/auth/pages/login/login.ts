import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(Auth);
  private readonly router = inject(Router);

  protected readonly mostrarPassword = signal(false);
  protected readonly formularioEnviado = signal(false);
  protected readonly credencialesInvalidas = signal(false);

  protected readonly loginForm =
    this.formBuilder.nonNullable.group({
      usuario: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
        ],
      ],
      recordarSesion: [false],
    });

  protected alternarPassword(): void {
    this.mostrarPassword.update(
      (valorActual) => !valorActual,
    );
  }

  protected iniciarSesion(): void {
    this.formularioEnviado.set(true);
    this.credencialesInvalidas.set(false);

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const inicioCorrecto = this.authService.login(
      this.loginForm.getRawValue(),
    );

    if (!inicioCorrecto) {
      this.credencialesInvalidas.set(true);
      return;
    }

    void this.router.navigate(['/admin/pedidos']);
  }

  protected campoInvalido(
    campo: 'usuario' | 'password',
  ): boolean {
    const control = this.loginForm.controls[campo];

    return (
      control.invalid &&
      (control.touched || this.formularioEnviado())
    );
  }
}