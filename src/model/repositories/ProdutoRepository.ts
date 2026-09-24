import { Produto } from "../entities/Produto";

const DELAY_MS = 600;

const PRODUTOS: Produto[] = [
  {
    id: "pastel-de-carne",
    categoriaId: "comidas",
    categoriaNome: "Comida",
    nome: "Pastel de Carne",
    preco: 6.0,
    descricao:
      "Pastel frito na hora bem crocante e sequinho, com recheio farto de carne moída selecionada, temperada com cheiro verde e azeitonas.",
    proteinas: "14g",
    carboidratos: "32g",
    gorduras: "18g",
    imagem: "pastel-de-carne",
    imagemGrande: "pastel-de-carne",
  },
  {
    id: "coxinha-de-frango",
    categoriaId: "comidas",
    categoriaNome: "Comida",
    nome: "Coxinha de Frango",
    preco: 7.0,
    descricao:
      "Clássica coxinha de frango com massa macia de batata, empanada crocante dourada por fora e recheio de peito de frango desfiado com requeijão.",
    proteinas: "18g",
    carboidratos: "38g",
    gorduras: "15g",
    imagem: "coxinha-de-frango",
    imagemGrande: "coxinha-de-frango",
  },
  {
    id: "cuscuz-com-ovo",
    categoriaId: "comidas",
    categoriaNome: "Comida",
    nome: "Cuscuz com Ovo",
    preco: 8.0,
    descricao:
      "Tradicional cuscuz nordestino de milho flocado feito no vapor, servido quentinho com ovo frito na manteiga da terra e uma pitada de sal.",
    proteinas: "12g",
    carboidratos: "40g",
    gorduras: "9g",
    imagem: "cuscuz-com-ovo",
    imagemGrande: "cuscuz-com-ovo",
  },
  {
    id: "arrumadinho-completo",
    categoriaId: "comidas",
    categoriaNome: "Comida",
    nome: "Arrumadinho Completo",
    preco: 14.0,
    descricao:
      "Carne de sol desfiada, arroz branco soltinho e creme de galinha caseiro.",
    proteinas: "22g",
    carboidratos: "45g",
    gorduras: "12g",
    imagem: "arrumadinho-completo",
    imagemGrande: "arrumadinho-completo-large",
  },
  {
    id: "suco-de-laranja",
    categoriaId: "bebidas",
    categoriaNome: "Bebida",
    nome: "Suco de Laranja",
    preco: 7.0,
    descricao:
      "Suco 100% natural de laranjas frescas espremidas na hora, sem conservantes, servido com gelo bem refrescante.",
    proteinas: "2g",
    carboidratos: "26g",
    gorduras: "0g",
    imagem: "suco-de-laranja",
    imagemGrande: "suco-de-laranja",
  },
  {
    id: "refrigerante-lata",
    categoriaId: "bebidas",
    categoriaNome: "Bebida",
    nome: "Refrigerante Lata",
    preco: 5.0,
    descricao:
      "Refrigerante geladíssimo em lata 350ml. Escolha entre Coca-Cola tradicional, Coca-Cola Zero ou Guaraná Antarctica.",
    proteinas: "0g",
    carboidratos: "37g",
    gorduras: "0g",
    imagem: "refrigerante",
    imagemGrande: "refrigerante",
  },
  {
    id: "cafe-expresso",
    categoriaId: "bebidas",
    categoriaNome: "Bebida",
    nome: "Café Expresso",
    preco: 4.0,
    descricao:
      "Café expresso curto encorpado e aromático, feito com grãos especiais moídos na hora, com crema espessa e sabor marcante.",
    proteinas: "0g",
    carboidratos: "1g",
    gorduras: "0g",
    imagem: "cafe-expresso",
    imagemGrande: "cafe-expresso",
  },
  {
    id: "suco-acerola",
    categoriaId: "bebidas",
    categoriaNome: "Bebida",
    nome: "Suco de Acerola",
    preco: 6.5,
    descricao:
      "Suco de acerola com polpa pura, fonte concentrada de vitamina C e antioxidantes, servido com pedras de gelo.",
    proteinas: "1g",
    carboidratos: "15g",
    gorduras: "0g",
    imagem: "suco-acerola",
    imagemGrande: "suco-acerola",
  },
];

export class ProdutoRepository {
  async listarPorCategoria(categoriaId: string): Promise<Produto[]> {
    await new Promise((resolve) => setTimeout(resolve, DELAY_MS));
    return PRODUTOS.filter((p) => p.categoriaId === categoriaId);
  }

  async buscarPorId(id: string): Promise<Produto | undefined> {
    await new Promise((resolve) => setTimeout(resolve, DELAY_MS));
    return PRODUTOS.find((p) => p.id === id);
  }
}