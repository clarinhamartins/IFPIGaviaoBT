import { Produto } from "@/model/entities/Produto";
import {
    CardapioService,
    QUANTIDADE_MINIMA,
} from "@/model/services/CardapioService";
import { useEffect, useState } from "react";
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
  produtoId?: string
): [ ProdutoState, ProdutoActions ] {
  const [produto, setProduto] = useState<Produto | null>(null);
  const [quantidade, setQuantidade] = useState(QUANTIDADE_MINIMA);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const service = new CardapioService();

  useEffect(() => {
    if (!produtoId) return;

    async function carregarProduto(id: string) {
      try {
        setCarregando(true);
        setErro(null);
        const resultado = await service.buscarProduto(id);
        setProduto(resultado);
      } catch (err: any) {
        setProduto(null);
        setErro(err.message);
      } finally {
        setCarregando(false);
      }
    }

    carregarProduto(produtoId);
  }, [produtoId]);

  function incrementarQuantidade() {
    setQuantidade((q) => service.ajustarQuantidade(q + 1));
  }

  function decrementarQuantidade() {
    setQuantidade((q) => service.ajustarQuantidade(q - 1));
  }

  const precoFormatado = produto ? formatarPreco(produto.preco) : "";

  const state : ProdutoState = { produto, quantidade, precoFormatado, carregando, erro };
  
  const actions : ProdutoActions = { incrementarQuantidade, decrementarQuantidade };
  
  return [state, actions];
}

