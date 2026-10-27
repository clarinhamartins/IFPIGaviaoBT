import { useEffect, useState } from "react";
import { Produto } from "@/model/entities/Produto";
import { DomainError } from "@/model/errors";
import { IMenuUseCases } from "@/usecase/iMenuUseCases";
import { menuUseCases as defaultMenuUseCases } from "@/di/container";
import { formatarPreco } from "./formatarPreco";

export type ProdutoState = {
  produto: Produto | null;
  quantidade: number;
  precoFormatado: string;
  carregando: boolean;
  erro: string | null;
};

export type ProdutoActions = {
  incrementarQuantidade: () => void;
  decrementarQuantidade: () => void;
};

export function useProdutoViewModel(
  produtoId?: string,
  useCases: IMenuUseCases = defaultMenuUseCases
): [ProdutoState, ProdutoActions] {
  const [produto, setProduto] = useState<Produto | null>(null);
  const [quantidade, setQuantidade] = useState(1);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    if (!produtoId) return;

    async function carregarProduto(id: string) {
      try {
        setCarregando(true);
        setErro(null);
        const resultado = await useCases.buscarProdutoPorId(id);
        setProduto(resultado);
      } catch (err: unknown) {
        setProduto(null);
        if (err instanceof DomainError) {
          setErro(err.message);
        } else {
          setErro("Ocorreu um erro inesperado ao carregar o item.");
        }
      } finally {
        setCarregando(false);
      }
    }

    carregarProduto(produtoId);
  }, [produtoId, useCases]);

  function incrementarQuantidade() {
    setQuantidade((q) => useCases.ajustarQuantidade(q + 1));
  }

  function decrementarQuantidade() {
    setQuantidade((q) => useCases.ajustarQuantidade(q - 1));
  }

  const precoFormatado = produto ? formatarPreco(produto.preco) : "";

  const state: ProdutoState = { produto, quantidade, precoFormatado, carregando, erro };
  const actions: ProdutoActions = { incrementarQuantidade, decrementarQuantidade };

  return [state, actions];
}
