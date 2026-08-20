import {
  Component,
  effect,
  inject,
  input,
  output,
} from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Alimento } from '../../../../core/models/alimento';
import { Categoria } from '../../../../core/models/categoria';
import { AppButton } from '../../../../shared/components/app-button/app-button';

@Component({
  selector: 'app-alimento-form',
  imports: [
    ReactiveFormsModule,
    AppButton,
  ],
  templateUrl: './alimento-form.html',
  styleUrl: './alimento-form.css',
})
export class AlimentoForm {

  private readonly formBuilder = inject(FormBuilder);

  readonly alimento = input<Alimento | null>(null);

  readonly categorias =
    input.required<Categoria[]>();

  readonly guardar = output<Alimento>();
  readonly cerrar = output<void>();

  protected readonly formulario =
    this.formBuilder.nonNullable.group({
      nombre: [
        '',
        [
          Validators.required,
          Validators.maxLength(80),
        ],
      ],
      descripcion: [
        '',
        [
          Validators.required,
          Validators.maxLength(250),
        ],
      ],
      precio: [
        0,
        [
          Validators.required,
          Validators.min(1),
        ],
      ],
      foto: [
        '',
        Validators.required,
      ],
      idCategoria: [
        0,
        [
          Validators.required,
          Validators.min(1),
        ],
      ],
    });

  constructor() {
    effect(() => {
      const alimentoActual = this.alimento();

      if (!alimentoActual) {
        this.formulario.reset({
          nombre: '',
          descripcion: '',
          precio: 0,
          foto: '',
          idCategoria: 0,
        });

        return;
      }

      this.formulario.patchValue({
        nombre: alimentoActual.nombre,
        descripcion: alimentoActual.descripcion,
        precio: alimentoActual.precio,
        foto: alimentoActual.foto,
        idCategoria: alimentoActual.idCategoria,
      });
    });
  }

  protected esEdicion(): boolean {
    return this.alimento() !== null;
  }

  protected cerrarFormulario(): void {
    this.cerrar.emit();
  }

  protected guardarAlimento(): void {

    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const valores =
      this.formulario.getRawValue();

    const alimentoActual = this.alimento();

    const alimentoGuardar: Alimento = {
      id: alimentoActual?.id ?? 0,
      nombre: valores.nombre.trim(),
      descripcion: valores.descripcion.trim(),
      precio: valores.precio,
      foto: valores.foto.trim(),
      idCategoria: valores.idCategoria,

      // Se conserva si estamos editando.
      // Para nuevo alimento se asignará
      // desde ListaAlimentos.
      ranking: alimentoActual?.ranking ?? 0,
    };

    this.guardar.emit(alimentoGuardar);
  }

  protected campoInvalido(
    campo:
      | 'nombre'
      | 'descripcion'
      | 'precio'
      | 'foto'
      | 'idCategoria',
  ): boolean {

    const control =
      this.formulario.controls[campo];

    return (
      control.invalid &&
      control.touched
    );
  }
}