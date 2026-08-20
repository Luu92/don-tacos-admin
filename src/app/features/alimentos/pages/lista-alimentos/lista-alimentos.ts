import {
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';

import { CurrencyPipe } from '@angular/common';

import { Alimento } from '../../../../core/models/alimento';
import { AlimentoForm } from '../../components/alimento-form/alimento-form';
import { Toast } from '../../../../shared/components/toast/toast';
import { CategoriaService } from '../../../categorias/services/categoria';

import { AppButton } from '../../../../shared/components/app-button/app-button';

import { AlimentoService } from '../../services/alimento';

@Component({
  selector: 'app-lista-alimentos',
  imports: [
    CurrencyPipe,
    AppButton,
    AlimentoForm,
    Toast
  ],
  templateUrl: './lista-alimentos.html',
  styleUrl: './lista-alimentos.css',
})
export class ListaAlimentos {

  private readonly alimentoService =
    inject(AlimentoService);

  protected readonly alimentos =
    this.alimentoService.alimentos;

  protected readonly busqueda = signal('');

  protected readonly categoriaSeleccionada =
    signal<number | null>(null);

  protected readonly alimentoSeleccionado =
    signal<Alimento | null>(null);

  protected readonly formularioAbierto =
    signal(false);

  protected readonly mensajeToast =
    signal<string | null>(null);

  private temporizadorToast?: number;

  private readonly categoriaService =
    inject(CategoriaService);

  protected readonly categorias =
    this.categoriaService.categorias;

  protected readonly alimentosFiltrados =
    computed(() => {

      const busqueda =
        this.busqueda()
          .trim()
          .toLowerCase();

      const categoria =
        this.categoriaSeleccionada();

      return this.alimentos().filter((alimento) => {

        const coincideBusqueda =
          !busqueda ||
          alimento.nombre
            .toLowerCase()
            .includes(busqueda);

        const coincideCategoria =
          categoria === null ||
          alimento.idCategoria === categoria;

        return (
          coincideBusqueda &&
          coincideCategoria
        );
      });
    });

  protected buscar(event: Event): void {
    const input =
      event.target as HTMLInputElement;

    this.busqueda.set(input.value);
  }

  protected seleccionarCategoria(
    idCategoria: number | null,
  ): void {
    this.categoriaSeleccionada.set(idCategoria);
  }

  protected obtenerNombreCategoria(
    idCategoria: number,
  ): string {
    return (
      this.categorias().find(
        (categoria) =>
          categoria.id === idCategoria,
      )?.nombre ?? 'Sin categoría'
    );
  }

  protected nuevoAlimento(): void {
    this.alimentoSeleccionado.set(null);
    this.formularioAbierto.set(true);
  }

  protected editarAlimento(
    alimento: Alimento,
  ): void {
    this.alimentoSeleccionado.set(alimento);
    this.formularioAbierto.set(true);
  }

  protected cerrarFormulario(): void {
    this.formularioAbierto.set(false);
    this.alimentoSeleccionado.set(null);
  }

  protected guardarAlimento(
    alimento: Alimento,
  ): void {

    if (alimento.id === 0) {

      const nuevoAlimento: Alimento = {
        ...alimento,

        id:
          this.alimentoService
            .obtenerSiguienteId(),

        ranking:
          this.alimentoService
            .obtenerRankingInicial(),
      };

      this.alimentoService
        .agregarAlimento(nuevoAlimento);

      this.mostrarMensaje(
        'Alimento agregado correctamente.',
      );

    } else {

      this.alimentoService
        .actualizarAlimento(alimento);

      this.mostrarMensaje(
        'Alimento actualizado correctamente.',
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