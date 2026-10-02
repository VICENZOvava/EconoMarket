const prisma = require("../src/config/prisma");

async function main() {
const agora = new Date();

const mercadosIniciais = [
{ nome: "Assaí", slug: "assai" },
{ nome: "Atacadão", slug: "atacadao" },
{ nome: "Carrefour", slug: "carrefour" },
{ nome: "Extra", slug: "extra" },
{ nome: "Pão de Açúcar", slug: "pao-de-acucar" }
];

const produtosIniciais = [
{
nome: "Arroz 5kg",
marca: "Tio João",
quantidade: "5",
unidade: "kg",
precos: [27.90, 26.90, 29.90, 31.50, 34.90]
},
{
nome: "Feijão 1kg",
marca: "Camil",
quantidade: "1",
unidade: "kg",
precos: [7.49, 6.99, 8.49, 8.99, 9.49]
},
{
nome: "Leite 1L",
marca: "Italac",
quantidade: "1",
unidade: "L",
precos: [4.99, 4.79, 5.49, 4.39, 6.29]
},
{
nome: "Café 500g",
marca: "Melitta",
quantidade: "500",
unidade: "g",
precos: [18.90, 17.90, 19.90, 21.50, 16.90]
},
{
nome: "Açúcar 1kg",
marca: "União",
quantidade: "1",
unidade: "kg",
precos: [4.49, 4.29, 5.19, 5.49, 5.99]
},
{
nome: "Óleo 900ml",
marca: "Liza",
quantidade: "900",
unidade: "ml",
precos: [6.49, 6.29, 6.99, 5.79, 7.99]
},
{
nome: "Macarrão 500g",
marca: "Adria",
quantidade: "500",
unidade: "g",
precos: [4.29, 3.99, 4.79, 5.19, 4.49]
},
{
nome: "Molho de tomate 300g",
marca: "Quero",
quantidade: "300",
unidade: "g",
precos: [2.99, 2.79, 3.49, 2.49, 3.99]
},
{
nome: "Farinha de trigo 1kg",
marca: "Dona Benta",
quantidade: "1",
unidade: "kg",
precos: [5.49, 5.79, 4.99, 5.99, 6.49]
},
{
nome: "Biscoito recheado 140g",
marca: "Oreo",
quantidade: "140",
unidade: "g",
precos: [4.99, 5.49, 3.99, 4.79, 5.99]
},
{
nome: "Sabão em pó 1kg",
marca: "OMO",
quantidade: "1",
unidade: "kg",
precos: [12.90, 13.49, 11.90, 10.99, 14.49]
},
{
nome: "Papel higiênico 12 rolos",
marca: "Neve",
quantidade: "12",
unidade: "rolos",
precos: [18.90, 19.90, 17.49, 16.90, 20.90]
},
{
nome: "Refrigerante 2L",
marca: "Coca-Cola",
quantidade: "2",
unidade: "L",
precos: [9.49, 8.99, 7.99, 8.49, 10.49]
}
];

const mercadosCadastrados = [];

for (const dados of mercadosIniciais) {
const mercado = await prisma.mercado.upsert({
where: { slug: dados.slug },
update: {
nome: dados.nome,
ativo: true,
atualizadoEm: agora
},
create: {
nome: dados.nome,
slug: dados.slug,
ativo: true,
criadoEm: agora,
atualizadoEm: agora
}
});

mercadosCadastrados.push(mercado);

}

for (const dados of produtosIniciais) {
let produto = await prisma.produto.findFirst({
where: {
nome: dados.nome,
marca: dados.marca
}
});

if (produto) {
  produto = await prisma.produto.update({
    where: { id: produto.id },
    data: {
      quantidade: dados.quantidade,
      unidade: dados.unidade,
      atualizadoEm: agora
    }
  });
} else {
  produto = await prisma.produto.create({
    data: {
      nome: dados.nome,
      marca: dados.marca,
      quantidade: dados.quantidade,
      unidade: dados.unidade,
      criadoEm: agora,
      atualizadoEm: agora
    }
  });
}

for (let i = 0; i < mercadosCadastrados.length; i++) {
  const mercado = mercadosCadastrados[i];

  await prisma.produtomercado.upsert({
    where: {
      mercadoId_produtoId: {
        mercadoId: mercado.id,
        produtoId: produto.id
      }
    },
    update: {
      preco: dados.precos[i],
      disponivel: true,
      atualizadoEm: agora
    },
    create: {
      mercadoId: mercado.id,
      produtoId: produto.id,
      preco: dados.precos[i],
      disponivel: true,
      atualizadoEm: agora
    }
  });
}

console.log(`Produto cadastrado: ${produto.nome}`);

}

console.log("Cadastro inicial concluído!");
console.log(`Mercados: ${mercadosCadastrados.length}`);
console.log(`Produtos: ${produtosIniciais.length}`);
console.log(`Preços: ${produtosIniciais.length * mercadosCadastrados.length}`);
}

main()
.catch((erro) => {
console.error("Erro ao cadastrar os dados iniciais:", erro);
process.exitCode = 1;
})
.finally(async () => {
await prisma.$disconnect();
});
