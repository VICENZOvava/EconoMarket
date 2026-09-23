document.addEventListener("DOMContentLoaded", async () => {

  if (!estaAutenticado()) {

    window.location.href = "login.html";

    return;
  }


  const listasContainer =
    document.getElementById("listasContainer");


  const itensContainer =
    document.getElementById("itensContainer");


  const produtoId =
    document.getElementById("produtoId");


  const quantidade =
    document.getElementById("quantidade");


  const nomeListaSelecionada =
    document.getElementById(
      "nomeListaSelecionada"
    );


  const addItemArea =
    document.getElementById("addItemArea");


  const btnExcluirLista =
    document.getElementById(
      "btnExcluirLista"
    );


  const mensagem =
    document.getElementById("mensagem");


  let listas = [];

  let produtos = [];

  let listaSelecionada = null;


  function mostrarMensagem(texto) {

    mensagem.textContent = texto;

  }


  async function carregarProdutos() {

    produtos =
      await apiRequest(
        "/api/produtos"
      );


    produtoId.innerHTML =
      produtos.length

        ? produtos.map(produto => `
            <option value="${produto.id}">
              ${produto.nome}
            </option>
          `).join("")

        : `
            <option value="">
              Nenhum produto cadastrado
            </option>
          `;

  }


  function renderizarListas() {

    if (!listas.length) {

      listasContainer.innerHTML = `
        <p class="empty-message">
          Nenhuma lista cadastrada.
        </p>
      `;

      return;
    }


    listasContainer.innerHTML =
      listas.map(lista => `

        <button
          class="list-option ${
            listaSelecionada?.id === lista.id
              ? "selected"
              : ""
          }"
          data-id="${lista.id}"
          type="button"
        >

          <span>
            ${lista.nome}
          </span>

          <small>
            ${lista.itemlistacompra?.length || 0}
            itens
          </small>

        </button>

      `).join("");


    document
      .querySelectorAll(".list-option")
      .forEach(button => {

        button.addEventListener(
          "click",
          () => {

            selecionarLista(
              Number(button.dataset.id)
            );

          }
        );

      });

  }


  function renderizarItens(lista) {

    const itens =
      lista.itemlistacompra || [];


    if (!itens.length) {

      itensContainer.innerHTML = `
        <p class="empty-message">
          Essa lista ainda não possui produtos.
        </p>
      `;

      return;
    }


    itensContainer.innerHTML =
      itens.map(item => `

        <div class="item-row">

          <div>

            <strong>
              ${item.produto?.nome || "Produto"}
            </strong>

            <span>
              ${item.produto?.marca || ""}
            </span>

          </div>


          <div class="item-quantity">

            <button
              class="quantity-btn"
              data-action="minus"
              data-id="${item.id}"
              type="button"
            >
              −
            </button>


            <strong>
              ${item.quantidade}
            </strong>


            <button
              class="quantity-btn"
              data-action="plus"
              data-id="${item.id}"
              type="button"
            >
              +
            </button>

          </div>


          <button
            class="remove-item"
            data-id="${item.id}"
            type="button"
          >
            Remover
          </button>

        </div>

      `).join("");


    document
      .querySelectorAll(".quantity-btn")
      .forEach(button => {

        button.addEventListener(
          "click",
          () => {

            alterarQuantidade(
              Number(button.dataset.id),
              button.dataset.action
            );

          }
        );

      });


    document
      .querySelectorAll(".remove-item")
      .forEach(button => {

        button.addEventListener(
          "click",
          () => {

            removerItem(
              Number(button.dataset.id)
            );

          }
        );

      });

  }


  async function carregarListas() {

    listas =
      await apiRequest(
        "/api/listas-compras"
      );


    if (listaSelecionada) {

      const atualizada =
        listas.find(
          lista =>
            lista.id === listaSelecionada.id
        );


      listaSelecionada =
        atualizada ||
        listas[0] ||
        null;

    } else {

      listaSelecionada =
        listas[0] || null;

    }


    renderizarListas();


    if (listaSelecionada) {

      nomeListaSelecionada.textContent =
        listaSelecionada.nome;

      addItemArea.hidden = false;

      btnExcluirLista.hidden = false;

      renderizarItens(
        listaSelecionada
      );

    } else {

      nomeListaSelecionada.textContent =
        "Selecione uma lista";

      addItemArea.hidden = true;

      btnExcluirLista.hidden = true;

      itensContainer.innerHTML = `
        <p class="empty-message">
          Crie ou selecione uma lista para começar.
        </p>
      `;

    }

  }


  async function selecionarLista(id) {

    try {

      listaSelecionada =
        await apiRequest(
          `/api/listas-compras/${id}`
        );


      nomeListaSelecionada.textContent =
        listaSelecionada.nome;


      addItemArea.hidden = false;

      btnExcluirLista.hidden = false;


      renderizarListas();

      renderizarItens(
        listaSelecionada
      );


      mostrarMensagem("");


    } catch (error) {

      mostrarMensagem(
        error.message
      );

    }

  }


  document
    .getElementById("btnNovaLista")
    .addEventListener(
      "click",
      async () => {

        const nome =
          prompt(
            "Nome da nova lista:",
            "Minha lista"
          );


        if (!nome || !nome.trim()) {
          return;
        }


        try {

          listaSelecionada =
            await apiRequest(
              "/api/listas-compras",
              {
                method: "POST",

                body: JSON.stringify({
                  nome: nome.trim()
                })
              }
            );


          mostrarMensagem(
            "Lista criada com sucesso!"
          );


          await carregarListas();


          await selecionarLista(
            listaSelecionada.id
          );


        } catch (error) {

          mostrarMensagem(
            error.message
          );

        }

      }
    );


  document
    .getElementById("btnAdicionarItem")
    .addEventListener(
      "click",
      async () => {

        if (!listaSelecionada) {
          return;
        }


        const produto =
          Number(produtoId.value);


        const qtd =
          Number(quantidade.value);


        if (!produto || qtd < 1) {

          mostrarMensagem(
            "Selecione um produto e uma quantidade válida."
          );

          return;
        }


        try {

          await apiRequest(
            "/api/itens-lista",
            {
              method: "POST",

              body: JSON.stringify({

                listaDeComprasId:
                  listaSelecionada.id,

                produtoId:
                  produto,

                quantidade:
                  qtd

              })
            }
          );


          quantidade.value = 1;


          mostrarMensagem(
            "Produto adicionado à lista!"
          );


          await selecionarLista(
            listaSelecionada.id
          );


        } catch (error) {

          mostrarMensagem(
            error.message
          );

        }

      }
    );


  async function alterarQuantidade(
    id,
    action
  ) {

    const item =
      listaSelecionada?.itemlistacompra
        ?.find(item => item.id === id);


    if (!item) {
      return;
    }


    const novaQuantidade =
      action === "plus"
        ? item.quantidade + 1
        : item.quantidade - 1;


    if (novaQuantidade < 1) {

      await removerItem(id);

      return;

    }


    try {

      await apiRequest(
        `/api/itens-lista/${id}`,
        {
          method: "PUT",

          body: JSON.stringify({

            listaDeComprasId:
              listaSelecionada.id,

            produtoId:
              item.produtoId,

            quantidade:
              novaQuantidade

          })
        }
      );


      await selecionarLista(
        listaSelecionada.id
      );


    } catch (error) {

      mostrarMensagem(
        error.message
      );

    }

  }


  async function removerItem(id) {

    try {

      await apiRequest(
        `/api/itens-lista/${id}`,
        {
          method: "DELETE"
        }
      );


      mostrarMensagem(
        "Produto removido da lista."
      );


      await selecionarLista(
        listaSelecionada.id
      );


    } catch (error) {

      mostrarMensagem(
        error.message
      );

    }

  }


  btnExcluirLista.addEventListener(
    "click",
    async () => {

      if (!listaSelecionada) {
        return;
      }


      if (
        !confirm(
          `Excluir a lista "${listaSelecionada.nome}"?`
        )
      ) {
        return;
      }


      try {

        await apiRequest(
          `/api/listas-compras/${listaSelecionada.id}`,
          {
            method: "DELETE"
          }
        );


        listaSelecionada = null;


        mostrarMensagem(
          "Lista excluída com sucesso."
        );


        await carregarListas();


      } catch (error) {

        mostrarMensagem(
          error.message
        );

      }

    }
  );


  document
    .getElementById("btnLogout")
    .addEventListener(
      "click",
      logout
    );


  try {

    await carregarProdutos();

    await carregarListas();

  } catch (error) {

    mostrarMensagem(
      error.message
    );

  }

});