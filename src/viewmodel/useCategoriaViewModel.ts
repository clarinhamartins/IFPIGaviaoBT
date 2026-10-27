import { useEffect, useState } from "react";
import { Produto } from "@/model/entities/Produto";
import { DomainError } from "@/model/errors";
import { IMenuUseCases } from "@/usecase/iMenuUseCases";
import { menuUseCases as defaultMenuUseCases } from "@/di/container";
import { formatarPreco } from "./formatarPreco";

export type CategoriaState = {
  titulo: string;
  produtos: Produto[];
  carregando: boolean;
  erro: string | null;
};

export type CategoriaActions = {
  formatarPreco: (valor: number) => string;
};

export function useCategoriaViewModel(
  categoriaId?: string,
  useCases: IMenuUseCases = defaultMenuUseCases
): [CategoriaState, CategoriaActions] {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const titulo =
    categoriaId === "bebidas" ? "Bebidas"
    : categoriaId === "comidas" ? "Comidas"
    : "Cardápio";

  useEffect(() => {
    if (!categoriaId) return;

    async function carregarProdutos(id: string) {
      try {
        setCarregando(true);
        setErro(null);
        const resultado = await useCases.listarProdutosPorCategoria(id);
        setProdutos(resultado);
      } catch (err: unknown) {
        if (err instanceof DomainError) {
          setErro(err.message);
        } else {
          setErro("Ocorreu um erro inesperado ao carregar os itens.");
        }
      } finally {
        setCarregando(false);
      }
    }

    carregarProdutos(categoriaId);
  }, [categoriaId, useCases]);

  const state: CategoriaState = { titulo, produtos, carregando, erro };
  const actions: CategoriaActions = { formatarPreco };

  return [state, actions];
}
