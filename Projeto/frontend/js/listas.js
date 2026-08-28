document.addEventListener("DOMContentLoaded", async () => {

    const listasContainer = document.getElementById("listasContainer");

    try {

        const listas = await apiRequest("/api/listas-compras");

        if (!listas || listas.length === 0) {
            listasContainer.innerHTML = "<p>Nenhuma lista de compras encontrada.</p>";
            return;
        }

        listasContainer.innerHTML = "";

        listas.forEach((lista) => {

            const listaElement = document.createElement("div");

            listaElement.innerHTML = `
                <h3>${lista.nome}</h3>
                <p>ID: ${lista.id}</p>
                <p>Criada em: ${new Date(lista.criadoEm).toLocaleString("pt-BR")}</p>
            `;

            listasContainer.appendChild(listaElement);

        });

    } catch (error) {

        console.error(error);

        listasContainer.innerHTML = `
            <p>Erro ao carregar as listas: ${error.message}</p>
        `;

    }

});