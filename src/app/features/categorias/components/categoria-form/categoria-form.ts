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

import { Categoria } from '../../../../core/models/categoria';
import { AppButton } from '../../../../shared/components/app-button/app-button';

@Component({
  selector: 'app-categoria-form',
  imports: [
    ReactiveFormsModule,
    AppButton,
  ],
  templateUrl: './categoria-form.html',
  styleUrl: './categoria-form.css',
})
export class CategoriaForm {

  private readonly formBuilder =
    inject(FormBuilder);

  readonly categoria =
    input<Categoria | null>(null);

  readonly guardar =
    output<Categoria>();

  readonly cerrar =
    output<void>();

  protected readonly formulario =
    this.formBuilder.nonNullable.group({
      nombre: [
        '',
        [
          Validators.required,
          Validators.maxLength(60),
        ],
      ],

      imagen: [
        '',
        Validators.required,
      ],
    });

  constructor() {
    effect(() => {

      const categoriaActual =
        this.categoria();

      if (!categoriaActual) {

        this.formulario.reset({
          nombre: '',
          imagen: '',
        });

        return;
      }

      this.formulario.patchValue({
        nombre:
          categoriaActual.nombre,

        imagen:
          categoriaActual.imagen,
      });
    });
  }

  protected esEdicion(): boolean {
    return this.categoria() !== null;
  }

  protected guardarCategoria(): void {

    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const valores =
      this.formulario.getRawValue();

    const categoriaActual =
      this.categoria();

    const categoriaGuardar: Categoria = {
      id:
        categoriaActual?.id ?? 0,

      nombre:
        valores.nombre.trim(),

      imagen:
        valores.imagen.trim(),
    };

    this.guardar.emit(
      categoriaGuardar,
    );
  }

  protected cerrarFormulario(): void {
    this.cerrar.emit();
  }

  protected campoInvalido(
    campo: 'nombre' | 'imagen',
  ): boolean {

    const control =
      this.formulario.controls[campo];

    return (
      control.invalid &&
      control.touched
    );
  }
}