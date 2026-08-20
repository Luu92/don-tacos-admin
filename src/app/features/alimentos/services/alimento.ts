import {
  Injectable,
  computed,
  signal,
} from '@angular/core';

import { Alimento } from '../../../core/models/alimento';

@Injectable({
  providedIn: 'root',
})
export class AlimentoService {

  private readonly alimentosSignal = signal<Alimento[]>([
    {
      id: 1,
      nombre: 'Taco al Pastor',
      descripcion:
        'Taco de carne de cerdo marinada en adobo especial de la casa.',
      precio: 14,
      foto: 'https://cdn.pixabay.com/photo/2019/07/21/01/36/tacos-al-pastor-4351813_1280.jpg',
      idCategoria: 1,
      ranking: 5,
    },
    {
      id: 2,
      nombre: 'Taco de Suadero',
      descripcion:
        'Taco de suadero acompañado con cebolla y cilantro.',
      precio: 16,
      foto: 'https://media.istockphoto.com/id/1372476089/photo/mexican-tacos-de-suadero.jpg?s=1024x1024&w=is&k=20&c=yNIWqF_9mj822w5FMUziDr1JFeRYl1-yMJldwzV3Oog=',
      idCategoria: 1,
      ranking: 4,
    },
    {
      id: 3,
      nombre: 'Torta de Suadero',
      descripcion:
        'Torta preparada con carne de suadero.',
      precio: 90,
      foto: 'https://media.istockphoto.com/id/834787606/photo/pulled-pork-sweet-bun-with-mixed-lettuce-leaves.jpg?s=1024x1024&w=is&k=20&c=wzWYHr_TplU__wnu0nxGquQdmMb_oJmVDtQ3h1ph544=',
      idCategoria: 2,
      ranking: 4,
    },
    {
      id: 4,
      nombre: 'Torta Cubana',
      descripcion:
        'Torta cubana preparada con los ingredientes de la casa.',
      precio: 95,
      foto: 'https://media.istockphoto.com/id/1388378926/photo/philly-cheesesteak-sandwich-and-french-fries.jpg?s=1024x1024&w=is&k=20&c=SoqcE9GzbKfTeAl5yStyXLdhdZr3ar2zV1h6KSma1wY=',
      idCategoria: 2,
      ranking: 5,
    },
  ]);

  readonly alimentos =
    this.alimentosSignal.asReadonly();

  readonly totalAlimentos = computed(
    () => this.alimentosSignal().length,
  );

  agregarAlimento(alimento: Alimento): void {
    this.alimentosSignal.update((alimentos) => [
      ...alimentos,
      alimento,
    ]);
  }

  actualizarAlimento(
    alimentoActualizado: Alimento,
  ): void {
    this.alimentosSignal.update((alimentos) =>
      alimentos.map((alimento) =>
        alimento.id === alimentoActualizado.id
          ? alimentoActualizado
          : alimento,
      ),
    );
  }

  obtenerAlimentoPorId(
    idAlimento: number,
  ): Alimento | undefined {
    return this.alimentosSignal().find(
      (alimento) => alimento.id === idAlimento,
    );
  }

  obtenerSiguienteId(): number {
    const alimentos = this.alimentosSignal();

    if (alimentos.length === 0) {
      return 1;
    }

    return Math.max(
      ...alimentos.map((alimento) => alimento.id),
    ) + 1;
  }

  obtenerRankingInicial(): number {
    return this.alimentosSignal().length + 1;
  }

}