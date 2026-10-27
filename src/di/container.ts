import { CategoryDataSource } from "@/infra/datasources/CategoryDataSource";
import { ProductDataSource } from "@/infra/datasources/ProductDataSource";
import { IMenuUseCases } from "@/usecase/iMenuUseCases";
import { MenuUseCases } from "@/usecase/menuUseCases";

// 1. Instanciação da infraestrutura concreta
const categoryDataSource = new CategoryDataSource();
const productDataSource = new ProductDataSource();

// 2. Composição: instanciação do Use Case injetando as dependências de infraestrutura
export const menuUseCases: IMenuUseCases = new MenuUseCases(
  categoryDataSource,
  productDataSource
);
