export class Carrinho {
    constructor() {
        this.produtos = [];
    }
    adicionarProduto(produto) {
        this.produtos.push(produto);
    }
    calcularTotal() {
        return this.produtos.reduce((total, produto) => total + produto.calcularPreco(), 0);
    }
    listarProdutos() {
        console.log("=== Carrinho de Compras ===\n");
        this.produtos.forEach(produto => {
            console.log(` Produto: ${produto.getNome()}`);
            console.log(`   Tipo: ${produto.getInfo()}`);
            console.log(`   Preço Final: R$ ${produto.calcularPreco().toFixed(2)}\n`);
        });
        console.log(` Total da Compra: R$ ${this.calcularTotal().toFixed(2)}\n`);
    }
}
