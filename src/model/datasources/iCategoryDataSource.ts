import { Categoria } from "../entities/Categoria";

export interface ICategoryDataSource {
  listarTodas(): Promise<Categoria[]>;
}
