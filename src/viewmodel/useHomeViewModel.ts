// src/viewmodel/useHomeViewModel.ts
import { useEffect, useState } from "react";
import { Categoria } from "../model/entities/Categoria";
import { CardapioService } from "../model/services/CardapioService";

export type HomeState = {
  categorias: Categoria[];
  carregando: boolean;
  erro: string | null;
};

export type HomeActions = {
  carregarCategorias: () => Promise<void>;
};

export function useHomeViewModel(): HomeState & HomeActions {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const service = new CardapioService();

  async function carregarCategorias() {
    try {
      setCarregando(true);
      setErro(null);
      setCategorias(await service.listarCategorias());
    } catch (err: any) {
      setErro(err.message);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarCategorias();
  }, []);

  return { categorias, carregando, erro, carregarCategorias };
}