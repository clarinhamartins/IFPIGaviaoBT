import { useEffect, useState } from "react";
import { Categoria } from "@/model/entities/Categoria";
import { DomainError } from "@/model/errors";
import { IMenuUseCases } from "@/usecase/iMenuUseCases";
import { menuUseCases as defaultMenuUseCases } from "@/di/container";

export type HomeState = {
  categorias: Categoria[];
  carregando: boolean;
  erro: string | null;
};

export type HomeActions = {
  carregarCategorias: () => Promise<void>;
};

export function useHomeViewModel(
  useCases: IMenuUseCases = defaultMenuUseCases
): [HomeState, HomeActions] {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  async function carregarCategorias() {
    try {
      setCarregando(true);
      setErro(null);
      const resultado = await useCases.listarCategorias();
      setCategorias(resultado);
    } catch (err: unknown) {
      if (err instanceof DomainError) {
        setErro(err.message);
      } else {
        setErro("Ocorreu um erro inesperado ao carregar as categorias.");
      }
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarCategorias();
  }, [useCases]);

  const state: HomeState = { categorias, carregando, erro };
  const actions: HomeActions = { carregarCategorias };

  return [state, actions];
}
