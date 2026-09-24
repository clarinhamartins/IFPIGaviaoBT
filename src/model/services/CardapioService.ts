import { Categoria } from "../entities/Categoria";
import { Produto } from "../entities/Produto";
import { CategoriaRepository } from "../repositories/CategoriaRepository";
import { ProdutoRepository } from "../repositories/ProdutoRepository";

export const QUANTIDADE_MINIMA = 1;

export class CardapioService {
  private categoriaRepository = new CategoriaRepository();
  private produtoRepository = new ProdutoRepository();

  listarCategorias(): Promise<Categoria[]> {
    return this.categoriaRepository.listarTodas();
  }

  listarProdutosDaCategoria(categoriaId: string): Promise<Produto[]> {
    return this.produtoRepository.listarPorCategoria(categoriaId);
  }

  async buscarProduto(produtoId: string): Promise<Produto> {
    const produto = await this.produtoRepository.buscarPorId(produtoId);
    if (!produto) throw new Error("Item não encontrado.");
    return produto;
  }

  // Regra de negócio: a quantidade nunca fica abaixo do mínimo
  ajustarQuantidade(novaQuantidade: number): number {
    return Math.max(QUANTIDADE_MINIMA, novaQuantidade);
  }
}