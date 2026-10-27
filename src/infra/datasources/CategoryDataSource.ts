import { Categoria } from "@/model/entities/Categoria";
import { ICategoryDataSource } from "@/model/datasources/iCategoryDataSource";
import { DataSourceError } from "@/model/errors";

const DELAY_MS = 600;

const CATEGORIAS: Categoria[] = [
  {
    id: "comidas",
    nome: "Comidas",
    corBorda: "#501673",
    corSeta: "#501673",
    imagem: "categoria-comidas",
  },
  {
    id: "bebidas",
    nome: "Bebidas",
    corBorda: "#1b873f",
    corSeta: "#1b873f",
    imagem: "categoria-bebidas",
  },
];

export class CategoryDataSource implements ICategoryDataSource {
  async listarTodas(): Promise<Categoria[]> {
    try {
      await new Promise((resolve) => setTimeout(resolve, DELAY_MS));
      return [...CATEGORIAS];
    } catch (err: unknown) {
      const detalhe = err instanceof Error ? err.message : "Erro desconhecido";
      throw new DataSourceError(`Falha ao obter categorias: ${detalhe}`);
    }
  }
}
