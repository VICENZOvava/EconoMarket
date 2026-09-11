document.addEventListener("DOMContentLoaded", async () => {

    const formulario = document.getElementById("itemForm");
    const mensagem = document.getElementById("mensagem");
    const itensContainer = document.getElementById("itensContainer");

    async function carregarItens() {

        try {

            const itens = await apiRequest("/api/itens-lista");

            if (!itens || itens.length === 0) {

                itensContainer.innerHTML = `
                    <p>Nenhum item encontrado.</p>
                `;

                return;
            }

            itensContainer.innerHTML = "";

            itens.forEach((item) => {

                const itemElement = document.createElement("div");

                itemElement.innerHTML = `
                    <h3>${item.produto?.nome || "Produto"}</h3>
                    <p>Quantidade: ${item.quantidade}</p>
                    <p>Lista: ${item.listadecompras?.nome || "Lista"}</p>
                `;

                itensContainer.appendChild(itemElement);

            });

        } catch (error) {

            console.error(error);

            itensContainer.innerHTML = `
                <p>Erro ao carregar os itens: ${error.message}</p>
            `;

        }

    }

    formulario.addEventListener("submit", async (event) => {

        event.preventDefault();

        const listaDeComprasId = document
            .getElementById("listaDeComprasId")
            ?.value;

        const produtoId = document
            .getElementById("produtoId")
            .value;

        const quantidade = document
            .getElementById("quantidade")
            .value;

        if (!listaDeComprasId || !produtoId || !quantidade) {

            mensagem.textContent = "Preencha todos os campos.";

            return;
        }

        try {

            const item = await apiRequest("/api/itens-lista", {

                method: "POST",

                body: JSON.stringify({
                    listaDeComprasId: Number(listaDeComprasId),
                    produtoId: Number(produtoId),
                    quantidade: Number(quantidade)
                })

            });

            mensagem.textContent = "Produto adicionado à lista com sucesso!";

            formulario.reset();

            console.log("Item criado:", item);

            await carregarItens();

        } catch (error) {

            console.error(error);

            mensagem.textContent = error.message;

        }

    });

    await carregarItens();

});