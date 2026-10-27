import { Produto } from "../entities/Produto";

export interface IProductDataSource {
  listarPorCategoria(categoriaId: string): Promise<Produto[]>;
  buscarPorId(id: string): Promise<Produto | null>;
}
