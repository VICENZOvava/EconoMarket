let lista = [];
let produtos = [];

const produtoInput = document.getElementById("produto");
const quantidadeInput = document.getElementById("quantidade");
const btnAdicionarProduto = document.getElementById("btnAdicionarProduto");
const listaProdutos = document.getElementById("listaProdutos");
const contadorProdutos = document.getElementById("contadorProdutos");
const comparacaoProdutos = document.getElementById("comparacaoProdutos");
const mercadoMaisBarato = document.getElementById("mercadoMaisBarato");
const totalCompra = document.getElementById("totalCompra");
const economia = document.getElementById("economia");
const produtosDisponiveis = document.getElementById("produtosDisponiveis");

const mercados = {
assai: { nome: "Assaí", slugs: ["assai", "assaí"], totalId: "totalAssai", barId: "barAssai", positionId: "positionAssai" },
atacadao: { nome: "Atacadão", slugs: ["atacadao", "atacadão"], totalId: "totalAtacadao", barId: "barAtacadao", positionId: "positionAtacadao" },
carrefour: { nome: "Carrefour", slugs: ["carrefour"], totalId: "totalCarrefour", barId: "barCarrefour", positionId: "positionCarrefour" },
extra: { nome: "Extra", slugs: ["extra"], totalId: "totalExtra", barId: "barExtra", positionId: "positionExtra" },
pao: { nome: "Pão de Açúcar", slugs: ["pao-de-acucar", "pao_de_acucar", "paodeacucar", "pao"], totalId: "totalPao", barId: "barPao", positionId: "positionPao" }
};

document.addEventListener("DOMContentLoaded", async () => {
if (!produtoInput || !quantidadeInput || !btnAdicionarProduto) {
console.error("Elementos do comparador não encontrados.");
return;
}

```
btnAdicionarProduto.disabled = true;
produtoInput.disabled = true;
quantidadeInput.disabled = true;

try {
    produtos = await apiRequest("/api/produtos");
    carregarProdutosNoCampo();
    btnAdicionarProduto.disabled = false;
    produtoInput.disabled = false;
    quantidadeInput.disabled = false;
} catch (error) {
    console.error("Erro ao carregar produtos:", error);
    alert("Não foi possível carregar os produtos do EconoMarket.");
}

btnAdicionarProduto.addEventListener("click", adicionarProduto);

produtoInput.addEventListener("keydown", event => {
    if (event.key === "Enter") adicionarProduto();
});

quantidadeInput.addEventListener("keydown", event => {
    if (event.key === "Enter") adicionarProduto();
});

atualizarPagina();
```

});

function formatarMoeda(valor) {
return Number(valor).toLocaleString("pt-BR", {
style: "currency",
currency: "BRL"
});
}

function normalizarTexto(texto) {
return String(texto)
.normalize("NFD")
.replace(/[\u0300-\u036f]/g, "")
.toLowerCase()
.trim();
}

function carregarProdutosNoCampo() {
if (!produtosDisponiveis) return;

```
produtosDisponiveis.innerHTML = "";

produtos
    .sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"))
    .forEach(produto => {
        const option = document.createElement("option");
        option.value = produto.nome;
        produtosDisponiveis.appendChild(option);
    });
```

}

function encontrarProduto(nome) {
const nomeNormalizado = normalizarTexto(nome);

```
return produtos.find(
    produto => normalizarTexto(produto.nome) === nomeNormalizado
);
```

}

function encontrarMercado(slug, nome) {
const slugNormalizado = normalizarTexto(slug);
const nomeNormalizado = normalizarTexto(nome);

```
return Object.entries(mercados).find(([chave, mercado]) =>
    mercado.slugs.some(
        valor => normalizarTexto(valor) === slugNormalizado
    ) ||
    normalizarTexto(mercado.nome) === nomeNormalizado
)?.[0] || null;
```

}

function obterPrecosProduto(produto) {
const precos = {};

```
Object.keys(mercados).forEach(mercado => {
    precos[mercado] = null;
});

(produto.produtomercado || []).forEach(item => {
    if (!item.disponivel) return;

    const mercado = encontrarMercado(
        item.mercado?.slug,
        item.mercado?.nome
    );

    if (!mercado) return;

    precos[mercado] = Number(item.preco);
});

return precos;
```

}

function adicionarProduto() {
const produto = encontrarProduto(produtoInput.value);
const quantidade = Number(quantidadeInput.value);

```
if (!produto) {
    alert("Produto não encontrado. Escolha um produto cadastrado.");
    produtoInput.focus();
    return;
}

if (!Number.isInteger(quantidade) || quantidade < 1) {
    alert("Digite uma quantidade válida.");
    quantidadeInput.focus();
    return;
}

const produtoExistente = lista.find(
    item => item.produtoId === produto.id
);

if (produtoExistente) {
    produtoExistente.quantidade += quantidade;
} else {
    lista.push({
        produtoId: produto.id,
        quantidade
    });
}

produtoInput.value = "";
quantidadeInput.value = "1";
produtoInput.focus();
atualizarPagina();
```

}

function removerProduto(produtoId) {
lista = lista.filter(
item => item.produtoId !== produtoId
);

```
atualizarPagina();
```

}

function alterarQuantidade(produtoId, novaQuantidade) {
if (novaQuantidade <= 0) {
removerProduto(produtoId);
return;
}

```
const item = lista.find(
    produto => produto.produtoId === produtoId
);

if (!item) return;

item.quantidade = novaQuantidade;
atualizarPagina();
```

}

function obterProdutoDaLista(item) {
return produtos.find(
produto => produto.id === item.produtoId
);
}

function calcularTotais() {
const totais = {};

```
Object.keys(mercados).forEach(
    mercado => {
        totais[mercado] = 0;
    }
);

const disponiveis = {};

Object.keys(mercados).forEach(
    mercado => {
        disponiveis[mercado] = true;
    }
);

lista.forEach(item => {
    const produto = obterProdutoDaLista(item);

    if (!produto) return;

    const precos = obterPrecosProduto(produto);

    Object.keys(mercados).forEach(mercado => {
        if (precos[mercado] === null) {
            disponiveis[mercado] = false;
            return;
        }

        totais[mercado] +=
            precos[mercado] * item.quantidade;
    });
});

return { totais, disponiveis };
```

}

function encontrarMenorPreco(precos) {
const disponiveis = Object.keys(mercados).filter(
mercado => precos[mercado] !== null
);

if (!disponiveis.length) return null;

return disponiveis.reduce(
    (menor, mercadoAtual) =>
        precos[mercadoAtual] < precos[menor]
            ? mercadoAtual
            : menor
);

}

function renderizarLista() {
listaProdutos.innerHTML = "";

if (!lista.length) {
    listaProdutos.innerHTML = `
        <div class="empty-list">
            <strong>Sua lista está vazia</strong>
            <span>Adicione um produto acima para começar.</span>
        </div>
    `;
    contadorProdutos.textContent = "0 produtos";
    return;
}

const quantidadeTotal = lista.reduce(
    (total, item) => total + item.quantidade,
    0
);

contadorProdutos.textContent =
    `${quantidadeTotal} ${quantidadeTotal === 1 ? "produto" : "produtos"}`;

lista.forEach(item => {
    const produto = obterProdutoDaLista(item);
    if (!produto) return;

    const linha = document.createElement("div");
    linha.className = "shopping-list-row";

    linha.innerHTML = `
        <div class="shopping-product-name">
            <strong>${produto.nome}</strong>
        </div>
        <div class="shopping-product-quantity">
            <button type="button" class="quantity-button" data-product="${produto.id}" data-action="decrease">−</button>
            <span>${item.quantidade}</span>
            <button type="button" class="quantity-button" data-product="${produto.id}" data-action="increase">+</button>
        </div>
        <div class="shopping-product-action">
            <button type="button" class="remove-product" data-product="${produto.id}">Remover</button>
        </div>
    `;

    listaProdutos.appendChild(linha);
});

document.querySelectorAll(".quantity-button").forEach(botao => {
    botao.addEventListener("click", () => {
        const produtoId = Number(botao.dataset.product);
        const item = lista.find(
            produto => produto.produtoId === produtoId
        );

        if (!item) return;

        alterarQuantidade(
            produtoId,
            botao.dataset.action === "increase"
                ? item.quantidade + 1
                : item.quantidade - 1
        );
    });
});

document.querySelectorAll(".remove-product").forEach(botao => {
    botao.addEventListener("click", () => {
        removerProduto(
            Number(botao.dataset.product)
        );
    });
});

}

function renderizarTotais() {
const { totais, disponiveis } = calcularTotais();

if (!lista.length) {
    Object.keys(mercados).forEach(mercado => {
        const dados = mercados[mercado];
        document.getElementById(dados.totalId).textContent = "R$ 0,00";
        document.getElementById(dados.barId).style.width = "0%";
        document.getElementById(dados.positionId).textContent = "-";
    });

    mercadoMaisBarato.textContent = "Adicione produtos";
    totalCompra.textContent = "R$ 0,00";
    economia.textContent = "R$ 0,00";
    return;
}

const mercadosDisponiveis = Object.keys(mercados).filter(
    mercado => disponiveis[mercado]
);

if (!mercadosDisponiveis.length) {
    Object.keys(mercados).forEach(mercado => {
        const dados = mercados[mercado];
        document.getElementById(dados.totalId).textContent = "Indisponível";
        document.getElementById(dados.barId).style.width = "0%";
        document.getElementById(dados.positionId).textContent = "-";
    });

    mercadoMaisBarato.textContent = "Sem comparação";
    totalCompra.textContent = "R$ 0,00";
    economia.textContent = "R$ 0,00";
    return;
}

const valores = mercadosDisponiveis.map(
    mercado => totais[mercado]
);

const menorTotal = Math.min(...valores);
const maiorTotal = Math.max(...valores);

const mercadoVencedor = mercadosDisponiveis.find(
    mercado => totais[mercado] === menorTotal
);

Object.keys(mercados).forEach(mercado => {
    const dados = mercados[mercado];

    if (!disponiveis[mercado]) {
        document.getElementById(dados.totalId).textContent = "Indisponível";
        document.getElementById(dados.barId).style.width = "0%";
        return;
    }

    const percentual =
        maiorTotal > 0
            ? (totais[mercado] / maiorTotal) * 100
            : 0;

    document.getElementById(dados.totalId).textContent =
        formatarMoeda(totais[mercado]);

    document.getElementById(dados.barId).style.width =
        `${percentual}%`;
});

Object.keys(mercados).forEach(
    mercado => {
        document.getElementById(
            mercados[mercado].positionId
        ).textContent = "-";
    }
);

mercadosDisponiveis
    .sort((a, b) => totais[a] - totais[b])
    .forEach((mercado, index) => {
        document.getElementById(
            mercados[mercado].positionId
        ).textContent = `${index + 1}º`;
    });

mercadoMaisBarato.textContent =
    mercados[mercadoVencedor].nome;

totalCompra.textContent =
    formatarMoeda(menorTotal);

economia.textContent =
    formatarMoeda(maiorTotal - menorTotal);

}

function renderizarComparacaoProdutos() {
comparacaoProdutos.innerHTML = "";
if (!lista.length) {
    comparacaoProdutos.innerHTML = `
        <div class="empty-comparison">
            <strong>Nenhum produto para comparar</strong>
            <span>Adicione produtos à sua lista para visualizar os preços.</span>
        </div>
    `;
    return;
}

lista.forEach(item => {
    const produto = obterProdutoDaLista(item);
    if (!produto) return;

    const precos = obterPrecosProduto(produto);
    const menorMercado = encontrarMenorPreco(precos);

    const linha = document.createElement("div");
    linha.className = "product-table-row";

    const celulas = Object.keys(mercados)
        .map(mercado => {
            const preco = precos[mercado];

            if (preco === null) {
                return `
                    <div class="product-price-cell">
                        <strong>Indisponível</strong>
                    </div>
                `;
            }

            const melhor = mercado === menorMercado;

            return `
                <div class="product-price-cell ${melhor ? "best-price" : ""}">
                    <strong>${formatarMoeda(preco)}</strong>
                    ${melhor ? "<span>Melhor preço</span>" : ""}
                </div>
            `;
        })
        .join("");

    linha.innerHTML = `
        <div class="product-name-cell">
            <strong>${produto.nome}</strong>
            <span>${item.quantidade} ${item.quantidade === 1 ? "unidade" : "unidades"}</span>
        </div>
        ${celulas}
    `;

    comparacaoProdutos.appendChild(linha);
});

}

function atualizarPagina() {
renderizarLista();
renderizarTotais();
renderizarComparacaoProdutos();
}
