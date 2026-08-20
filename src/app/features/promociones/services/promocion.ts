import { Injectable, signal } from '@angular/core';

import { Promocion } from '../../../core/models/promocion';

@Injectable({
  providedIn: 'root',
})
export class PromocionService {

  private readonly promocionesSignal =
    signal<Promocion[]>([
      {
        id: 1,
        nombre: 'Pa los cuates',
        descripcion:
          'Una promoción ideal para compartir.',
        fecha: new Date('2026-08-10'),
        precio: 220,
        activa: true,
        alimentos: [
          {
            idAlimento: 1,
            cantidad: 10,
          },
          {
            idAlimento: 2,
            cantidad: 2,
          },
        ],
      },

      {
        id: 2,
        nombre: 'En pareja',
        descripcion:
          'Para disfrutar entre dos.',
        fecha: new Date('2026-08-05'),
        precio: 150,
        activa: false,
        alimentos: [
          {
            idAlimento: 2,
            cantidad: 20,
          },
        ],
      },
    ]);

  readonly promociones =
    this.promocionesSignal.asReadonly();

  agregarPromocion(
    promocion: Promocion,
  ): void {
    this.promocionesSignal.update(
      (promociones) => [
        ...promociones,
        promocion,
      ],
    );
  }

  actualizarPromocion(
    promocionActualizada: Promocion,
  ): void {
    this.promocionesSignal.update(
      (promociones) =>
        promociones.map((promocion) =>
          promocion.id === promocionActualizada.id
            ? promocionActualizada
            : promocion,
        ),
    );
  }

  cambiarEstado(
    idPromocion: number,
  ): void {
    this.promocionesSignal.update(
      (promociones) =>
        promociones.map((promocion) =>
          promocion.id === idPromocion
            ? {
                ...promocion,
                activa: !promocion.activa,
              }
            : promocion,
        ),
    );
  }

  obtenerSiguienteId(): number {
    const promociones =
      this.promocionesSignal();

    if (promociones.length === 0) {
      return 1;
    }

    return Math.max(
      ...promociones.map(
        (promocion) => promocion.id,
      ),
    ) + 1;
  }
}