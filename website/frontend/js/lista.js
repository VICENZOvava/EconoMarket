document.addEventListener("DOMContentLoaded", () => {

    const formulario = document.getElementById("listaForm");
    const mensagem = document.getElementById("mensagem");

    formulario.addEventListener("submit", async (event) => {

        event.preventDefault();

        const nome = document.getElementById("nomeLista").value.trim();

        if (!nome) {
            mensagem.textContent = "Digite um nome para a lista.";
            return;
        }

        try {

            const lista = await apiRequest("/api/listas-compras", {
                method: "POST",
                body: JSON.stringify({
                    nome: nome
                })
            });

            mensagem.textContent = "Lista criada com sucesso!";

            formulario.reset();

            console.log("Lista criada:", lista);

        } catch (error) {

            console.error(error);

            mensagem.textContent = error.message;

        }

    });

});