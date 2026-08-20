import {
  Injectable,
  signal,
} from '@angular/core';

import { Categoria } from '../../../core/models/categoria';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {

  private readonly categoriasSignal =
    signal<Categoria[]>([
      {
        id: 1,
        nombre: 'Tacos',
        imagen: 'https://cdn.pixabay.com/photo/2019/07/21/01/36/tacos-al-pastor-4351813_1280.jpg',
      },
      {
        id: 2,
        nombre: 'Tortas',
        imagen: 'https://media.istockphoto.com/id/1372476089/photo/mexican-tacos-de-suadero.jpg?s=1024x1024&w=is&k=20&c=yNIWqF_9mj822w5FMUziDr1JFeRYl1-yMJldwzV3Oog=',
      },
      {
        id: 3,
        nombre: 'Especiales',
        imagen: 'https://media.istockphoto.com/id/834787606/photo/pulled-pork-sweet-bun-with-mixed-lettuce-leaves.jpg?s=1024x1024&w=is&k=20&c=wzWYHr_TplU__wnu0nxGquQdmMb_oJmVDtQ3h1ph544=',
      },
      {
        id: 4,
        nombre: 'Alambres',
        imagen: 'https://media.istockphoto.com/id/1388378926/photo/philly-cheesesteak-sandwich-and-french-fries.jpg?s=1024x1024&w=is&k=20&c=SoqcE9GzbKfTeAl5yStyXLdhdZr3ar2zV1h6KSma1wY=',
      },
    ]);

  readonly categorias =
    this.categoriasSignal.asReadonly();

  agregarCategoria(
    categoria: Categoria,
  ): void {
    this.categoriasSignal.update(
      (categorias) => [
        ...categorias,
        categoria,
      ],
    );
  }

  actualizarCategoria(
    categoriaActualizada: Categoria,
  ): void {
    this.categoriasSignal.update(
      (categorias) =>
        categorias.map((categoria) =>
          categoria.id ===
          categoriaActualizada.id
            ? categoriaActualizada
            : categoria,
        ),
    );
  }

  obtenerSiguienteId(): number {
    const categorias =
      this.categoriasSignal();

    if (categorias.length === 0) {
      return 1;
    }

    return Math.max(
      ...categorias.map(
        (categoria) => categoria.id,
      ),
    ) + 1;
  }
}