import {
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';

import { Categoria } from '../../../../core/models/categoria';

import { AppButton } from '../../../../shared/components/app-button/app-button';
import { Toast } from '../../../../shared/components/toast/toast';

import { AlimentoService } from '../../../alimentos/services/alimento';
import { CategoriaService } from '../../services/categoria';

import { CategoriaForm } from '../../components/categoria-form/categoria-form';

@Component({
  selector: 'app-lista-categorias',
  imports: [
    AppButton,
    CategoriaForm,
    Toast,
  ],
  templateUrl: './lista-categorias.html',
  styleUrl: './lista-categorias.css',
})
export class ListaCategorias {

  private readonly categoriaService =
    inject(CategoriaService);

  private readonly alimentoService =
    inject(AlimentoService);

  protected readonly categorias =
    this.categoriaService.categorias;

  protected readonly alimentos =
    this.alimentoService.alimentos;

  protected readonly categoriaSeleccionada =
    signal<Categoria | null>(null);

  protected readonly formularioAbierto =
    signal(false);

  protected readonly mensajeToast =
    signal<string | null>(null);

  private temporizadorToast?: number;

  protected contarAlimentos(
    idCategoria: number,
  ): number {
    return this.alimentos().filter(
      (alimento) =>
        alimento.idCategoria === idCategoria,
    ).length;
  }

  protected nuevaCategoria(): void {
    this.categoriaSeleccionada.set(null);
    this.formularioAbierto.set(true);
  }

  protected editarCategoria(
    categoria: Categoria,
  ): void {
    this.categoriaSeleccionada.set(categoria);
    this.formularioAbierto.set(true);
  }

  protected cerrarFormulario(): void {
    this.formularioAbierto.set(false);
    this.categoriaSeleccionada.set(null);
  }

  protected guardarCategoria(
    categoria: Categoria,
  ): void {

    if (categoria.id === 0) {
      const nuevaCategoria: Categoria = {
        ...categoria,
        id:
          this.categoriaService
            .obtenerSiguienteId(),
      };

      this.categoriaService
        .agregarCategoria(nuevaCategoria);

      this.mostrarMensaje(
        'Categoría agregada correctamente.',
      );

    } else {

      this.categoriaService
        .actualizarCategoria(categoria);

      this.mostrarMensaje(
        'Categoría actualizada correctamente.',
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