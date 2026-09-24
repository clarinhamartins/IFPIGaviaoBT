import { Categoria } from "../entities/Categoria";

const DELAY_MS = 600;

const CATEGORIAS: Categoria[] = [
  {
    id: "comidas",
    nome: "Comidas",
    corBorda: "#501673",
    corSeta: "#501673",
    imagem: require("../../../assets/images/menu/categoria-comidas.png"),
  },
  {
    id: "bebidas",
    nome: "Bebidas",
    corBorda: "#1b873f",
    corSeta: "#1b873f",
    imagem: require("../../../assets/images/menu/categoria-bebidas.png"),
  },
];

export class CategoriaRepository {
  async listarTodas(): Promise<Categoria[]> {
    await new Promise((resolve) => setTimeout(resolve, DELAY_MS));
    return [...CATEGORIAS];
  }
}