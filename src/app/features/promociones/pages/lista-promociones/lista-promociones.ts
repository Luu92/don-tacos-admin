import {
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';

import { CurrencyPipe, DatePipe } from '@angular/common';

import { Promocion } from '../../../../core/models/promocion';

import { AppButton } from '../../../../shared/components/app-button/app-button';
import { PromocionForm } from '../../components/promocion-form/promocion-form';
import { Toast } from '../../../../shared/components/toast/toast';

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
    PromocionForm,
    Toast
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

  protected readonly promocionSeleccionada =
    signal<Promocion | null>(null);

  protected readonly formularioAbierto =
    signal(false);

  protected readonly mensajeToast =
    signal<string | null>(null);

  private temporizadorToast?: number;

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
  protected cerrarFormulario(): void {
    this.formularioAbierto.set(false);
    this.promocionSeleccionada.set(null);
  }

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
    this.promocionSeleccionada.set(null);
    this.formularioAbierto.set(true);
  }

  protected editarPromocion(
    promocion: Promocion,
  ): void {
    this.promocionSeleccionada.set(promocion);
    this.formularioAbierto.set(true);
  }

  protected cambiarEstado(
    promocion: Promocion,
  ): void {
    this.promocionService
      .cambiarEstado(promocion.id);
  }

  protected guardarPromocion(
    promocion: Promocion,
  ): void {

    if (promocion.id === 0) {

      const nuevaPromocion: Promocion = {
        ...promocion,

        id:
          this.promocionService
            .obtenerSiguienteId(),

        fecha: new Date(),
      };

      this.promocionService
        .agregarPromocion(nuevaPromocion);

      this.mostrarMensaje(
        'Promoción creada correctamente.',
      );

    } else {

      this.promocionService
        .actualizarPromocion(promocion);

      this.mostrarMensaje(
        'Promoción actualizada correctamente.',
      );
    }

    this.cerrarFormulario();
  }

  private mostrarMensaje(
    mensaje: string,
  ): void {

    this.mensajeToast.set(mensaje);

    if (this.temporizadorToast) {
      window.clearTimeout(
        this.temporizadorToast,
      );
    }

    this.temporizadorToast =
      window.setTimeout(() => {
        this.mensajeToast.set(null);
      }, 3000);
  }
}