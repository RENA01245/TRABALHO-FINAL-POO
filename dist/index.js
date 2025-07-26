import { Bebida } from "./ClasseBebida.js";
import { Sobremesa } from "./ClasseSobremesa.js";
import { Lanche } from "./ClasseLanche.js";
import { Carrinho } from "./ClasseCarrinho.js";
const carrinho = new Carrinho();
// Adicionando produtos
const lanche = new Lanche("Hambúrguer", 15);
const bebida = new Bebida("Refrigerante", 7, 2.0);
const sobremesa = new Sobremesa("Sorvete", 10, "Chocolate");
carrinho.adicionarProduto(lanche);
carrinho.adicionarProduto(bebida);
carrinho.adicionarProduto(sobremesa);
// Listando produtos
carrinho.listarProdutos(); // Listando novamentecarrinho.removerProduto(1);// Removendo o segundo produto (índice 1)carrinho.listarProdutos();carrinho.listarProdutos();
// Removendo o segundo produto (índice 1)
carrinho.removerProduto(1);
// Listando novamente
carrinho.listarProdutos();
