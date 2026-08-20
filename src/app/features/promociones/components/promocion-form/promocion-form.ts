import {
  Component,
  effect,
  inject,
  input,
  output,
} from '@angular/core';

import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Alimento } from '../../../../core/models/alimento';
import { Promocion } from '../../../../core/models/promocion';
import { AppButton } from '../../../../shared/components/app-button/app-button';

type PromocionAlimentoForm = FormGroup<{
  idAlimento: FormControl<number>;
  cantidad: FormControl<number>;
}>;

@Component({
  selector: 'app-promocion-form',
  imports: [
    ReactiveFormsModule,
    AppButton,
  ],
  templateUrl: './promocion-form.html',
  styleUrl: './promocion-form.css',
})
export class PromocionForm {

  private readonly formBuilder =
    inject(FormBuilder);

  readonly promocion =
    input<Promocion | null>(null);

  readonly alimentos =
    input.required<Alimento[]>();

  readonly guardar =
    output<Promocion>();

  readonly cerrar =
    output<void>();

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

      activa: [true],

      alimentos:
        this.formBuilder.array<PromocionAlimentoForm>([]),
    });

  constructor() {
    effect(() => {

      const promocionActual =
        this.promocion();

      this.alimentosForm.clear();

      if (!promocionActual) {

        this.formulario.patchValue({
          nombre: '',
          descripcion: '',
          precio: 0,
          activa: true,
        });

        this.agregarAlimento();

        return;
      }

      this.formulario.patchValue({
        nombre:
          promocionActual.nombre,

        descripcion:
          promocionActual.descripcion,

        precio:
          promocionActual.precio,

        activa:
          promocionActual.activa,
      });

      promocionActual.alimentos.forEach(
        (detalle) => {

          this.alimentosForm.push(
            this.crearAlimentoForm(
              detalle.idAlimento,
              detalle.cantidad,
            ),
          );
        },
      );
    });
  }

  protected get alimentosForm():
    FormArray<PromocionAlimentoForm> {

    return this.formulario.controls.alimentos;
  }

  private crearAlimentoForm(
    idAlimento = 0,
    cantidad = 1,
  ): PromocionAlimentoForm {

    return this.formBuilder.nonNullable.group({
      idAlimento: [
        idAlimento,
        [
          Validators.required,
          Validators.min(1),
        ],
      ],

      cantidad: [
        cantidad,
        [
          Validators.required,
          Validators.min(1),
        ],
      ],
    });
  }

  protected agregarAlimento(): void {

    this.alimentosForm.push(
      this.crearAlimentoForm(),
    );
  }

  protected quitarAlimento(
    indice: number,
  ): void {

    if (this.alimentosForm.length === 1) {
      return;
    }

    this.alimentosForm.removeAt(indice);
  }

  protected esEdicion(): boolean {
    return this.promocion() !== null;
  }

  protected guardarPromocion(): void {

    if (this.formulario.invalid) {

      this.formulario.markAllAsTouched();

      return;
    }

    const valores =
      this.formulario.getRawValue();

    const promocionActual =
      this.promocion();

    const promocionGuardar: Promocion = {

      id:
        promocionActual?.id ?? 0,

      nombre:
        valores.nombre.trim(),

      descripcion:
        valores.descripcion.trim(),

      precio:
        valores.precio,

      activa:
        valores.activa,

      fecha:
        promocionActual?.fecha ??
        new Date(),

      alimentos:
        valores.alimentos.map(
          (detalle) => ({
            idAlimento:
              detalle.idAlimento,

            cantidad:
              detalle.cantidad,
          }),
        ),
    };

    this.guardar.emit(
      promocionGuardar,
    );
  }

  protected cerrarFormulario(): void {
    this.cerrar.emit();
  }
}