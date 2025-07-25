import { Produto } from "./ClasseProduto";

export class Carrinho {
    private produtos: Produto[] = [];

    public adicionarProduto(produto: Produto): void {
        this.produtos.push(produto);
    }

    public calcularTotal(): number {
        return this.produtos.reduce((total, produto) => total + produto.calcularPreco(), 0);
    }

    public listarProdutos(): void {
        console.log("=== Carrinho de Compras ===\n");
        this.produtos.forEach(produto => {
            console.log(` Produto: ${produto.getNome()}`);
            console.log(`   Tipo: ${produto.getInfo()}`);
            console.log(`   Preço Final: R$ ${produto.calcularPreco().toFixed(2)}\n`);
        });
        console.log(` Total da Compra: R$ ${this.calcularTotal().toFixed(2)}\n`);
    }
}