import { Produto } from "./ClasseProduto.js";
import { Bebida } from "./ClasseBebida.js";       
import { Sobremesa } from "./ClasseSobremesa.js";
import { Lanche } from "./ClasseLanche.js";
import { Carrinho } from "./ClasseCarrinho.js";
// Teste
const carrinho = new Carrinho();
carrinho.adicionarProduto(new Lanche("Hambúrguer", 15.00));
carrinho.adicionarProduto(new Bebida("Refrigerante", 5.00, 1.5));
carrinho.adicionarProduto(new Sobremesa("Sorvete", 10.00, "Chocolate"));
carrinho.listarProdutos();


