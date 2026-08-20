import {
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';

import { CurrencyPipe, DatePipe } from '@angular/common';

import { Promocion } from '../../../../core/models/promocion';

import { AppButton } from '../../../../shared/components/app-button/app-button';

import { AlimentoService } from '../../../alimentos/services/alimento';
import { PromocionService } from '../../services/promocion';

type FiltroPromocion =
  | 'TODAS'
  | 'ACTIVAS'
  | 'INACTIVAS';

@Component({
  selector: 'app-lista-promociones',
  imports: [
    CurrencyPipe,
    DatePipe,
    AppButton,
  ],
  templateUrl: './lista-promociones.html',
  styleUrl: './lista-promociones.css',
})
export class ListaPromociones {

  private readonly promocionService =
    inject(PromocionService);

  private readonly alimentoService =
    inject(AlimentoService);

  protected readonly promociones =
    this.promocionService.promociones;

  protected readonly alimentos =
    this.alimentoService.alimentos;

  protected readonly filtroSeleccionado =
    signal<FiltroPromocion>('TODAS');

  protected readonly promocionesFiltradas =
    computed(() => {

      const filtro =
        this.filtroSeleccionado();

      if (filtro === 'ACTIVAS') {
        return this.promociones().filter(
          (promocion) => promocion.activa,
        );
      }

      if (filtro === 'INACTIVAS') {
        return this.promociones().filter(
          (promocion) => !promocion.activa,
        );
      }

      return this.promociones();
    });

  protected seleccionarFiltro(
    filtro: FiltroPromocion,
  ): void {
    this.filtroSeleccionado.set(filtro);
  }

  protected obtenerNombreAlimento(
    idAlimento: number,
  ): string {
    return (
      this.alimentos().find(
        (alimento) =>
          alimento.id === idAlimento,
      )?.nombre ?? 'Alimento no encontrado'
    );
  }

  protected nuevaPromocion(): void {
    // Lo conectaremos con el formulario.
  }

  protected editarPromocion(
    promocion: Promocion,
  ): void {
    // Lo conectaremos con el formulario.
  }

  protected cambiarEstado(
    promocion: Promocion,
  ): void {
    this.promocionService
      .cambiarEstado(promocion.id);
  }
}