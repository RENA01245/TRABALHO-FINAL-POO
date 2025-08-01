# Trabalho Final POO

Este projeto utiliza TypeScript e Parcel, com a seguinte estrutura:

- Código fonte TypeScript na pasta src/
- Arquivos HTML e CSS na pasta view/
- Arquivos JS convertidos do Ts na pasta dist/

---

## Pré-requisitos

- Node.js (recomendado a versão LTS)

---

## Instalação

1. Clone o repositório:

bash
git clone https://github.com/RENA01245/TRABALHO-FINAL-POO


2. Instale as dependências:

cmd
npm i


3. Converta o Typescript para Javascript
 
cmd
npx tsc


4. Inicializar o localhost
cmd
npm start


---

## Explicação do Código

### Estrutura Principal

O sistema implementa um carrinho de compras para uma lanchonete utilizando os princípios de POO:

typescript
// Importação das classes
import { Carrinho } from "./ClasseCarrinho.js";
import { Lanche } from "./ClasseLanche.js";
import { Bebida } from "./ClasseBebida.js";
import { Sobremesa } from "./ClasseSobremesa.js";

// Inicialização do carrinho
const carrinho = new Carrinho();


### Hierarquia de Classes

1. *Classe Produto (Abstrata)*:
typescript
export abstract class Produto {
    protected nome: string;
    protected preco: number;
    protected tipo: string;

    constructor(nome: string, preco: number, tipo: string) {
        this.nome = nome;
        this.preco = preco;
        this.tipo = tipo;
    }

    public abstract calcularPreco(): number;
    public abstract getInfo(): string;
}


2. *Classes Derivadas*:
typescript
// Exemplo com a classe Lanche
export class Lanche extends Produto {
    constructor(nome: string, preco: number) {
        super(nome, preco, "Lanche");
    }

    public calcularPreco(): number {
        return this.preco;
    }

    public getInfo(): string {
        return `Lanche`;
    }
}


### Funcionalidades Principais

1. *Adicionar Produtos*:
typescript
function adicionarProduto() {
  const tipo = (document.getElementById("tipo") as HTMLSelectElement).value;
  const nome = (document.getElementById("nome") as HTMLInputElement).value;
  const preco = Number((document.getElementById("preco") as HTMLInputElement).value);
  
  // Cria o produto conforme o tipo selecionado
  let produto;
  if (tipo === "Lanche") produto = new Lanche(nome, preco);
  else if (tipo === "Bebida") produto = new Bebida(nome, preco, extra);
  // ...
  
  carrinho.adicionarProduto(produto);
}


2. *Gerenciamento do Carrinho*:
typescript
export class Carrinho {
    private produtos: Produto[] = [];

    public adicionarProduto(produto: Produto): void {
        this.produtos.push(produto);
    }

    public calcularTotal(): number {
        return this.produtos.reduce((total, produto) => total + produto.calcularPreco(), 0);
    }
}


3. *Interface Gráfica*:
html
<!-- Exemplo do card de produto -->
<div class="card h-100 bg-dark text-white border-danger">
  <img src="imagem.jpg" class="card-img-top">
  <div class="card-body">
    <h5 class="card-title">Hambúrguer</h5>
    <p class="card-text">Lanche</p>
    <p class="card-text fw-bold text-danger">R$ 15.00</p>
    <button class="btn btn-danger">Adicionar</button>
  </div>
</div>


---

## Como a POO foi Implementada

1. *Abstração*:
   - Classe abstrata Produto define a estrutura base
   - Métodos abstratos garantem implementação nas classes filhas

2. *Encapsulamento*:
   - Atributos protegidos nas classes
   - Métodos públicos para interação

3. *Herança*:
   - Classes específicas herdam de Produto
   - Sobrescrita de métodos conforme necessidade

4. *Polimorfismo*:
   - Mesmo método (calcularPreco()) com comportamentos diferentes
   - Tratamento uniforme de diferentes tipos de produtos

---

## Extensibilidade

O sistema pode ser facilmente expandido para:
- Adicionar novos tipos de produtos
- Implementar novos métodos de pagamento
- Adicionar mais funcionalidades ao carrinho
- Integrar com sistemas externos

---

## Tecnologias Utilizadas

- *TypeScript*: Linguagem principal
- *Parcel*: Empacotador de módulos
- *Bootstrap 5*: Estilização da interface
- *HTML5/CSS3*: Estrutura e design