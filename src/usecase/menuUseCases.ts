import { Categoria } from "@/model/entities/Categoria";
import { Produto } from "@/model/entities/Produto";
import { ICategoryDataSource } from "@/model/datasources/iCategoryDataSource";
import { IProductDataSource } from "@/model/datasources/iProductDataSource";
import { ValidationError } from "@/model/errors";
import { IMenuUseCases } from "./iMenuUseCases";

export const QUANTIDADE_MINIMA = 1;

export class MenuUseCases implements IMenuUseCases {
  constructor(
    private categoryDataSource: ICategoryDataSource,
    private productDataSource: IProductDataSource
  ) {}

  async listarCategorias(): Promise<Categoria[]> {
    return this.categoryDataSource.listarTodas();
  }

  async listarProdutosPorCategoria(categoriaId: string): Promise<Produto[]> {
    if (!categoriaId || categoriaId.trim() === "") {
      throw new ValidationError("O identificador da categoria é obrigatório.");
    }
    return this.productDataSource.listarPorCategoria(categoriaId);
  }

  async buscarProdutoPorId(produtoId: string): Promise<Produto> {
    if (!produtoId || produtoId.trim() === "") {
      throw new ValidationError("O identificador do produto é obrigatório.");
    }
    const produto = await this.productDataSource.buscarPorId(produtoId);
    if (!produto) {
      throw new ValidationError("Item não encontrado.");
    }
    return produto;
  }

  ajustarQuantidade(novaQuantidade: number): number {
    return Math.max(QUANTIDADE_MINIMA, novaQuantidade);
  }
}
