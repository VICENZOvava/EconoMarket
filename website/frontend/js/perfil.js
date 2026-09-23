document.addEventListener("DOMContentLoaded", async () => {

  if (!estaAutenticado()) {
    window.location.href = "login.html";
    return;
  }

  const form = document.getElementById("perfilForm");

  const mensagem = document.getElementById("mensagem");

  const nome = document.getElementById("nome");

  const email = document.getElementById("email");

  const provedor = document.getElementById("provedor");

  const idUsuario = document.getElementById("idUsuario");

  const avatar = document.getElementById("avatar");

  let usuarioId = null;


  try {

    const usuario = await apiRequest("/api/auth/me");

    usuarioId = usuario.id;

    nome.value = usuario.nome || "";

    email.value = usuario.email || "";

    provedor.value = usuario.provedor || "LOCAL";

    idUsuario.value = usuario.id;

    avatar.textContent =
      (usuario.nome || "E")
        .charAt(0)
        .toUpperCase();

  } catch (error) {

    mensagem.textContent = error.message;

  }


  form.addEventListener("submit", async (event) => {

    event.preventDefault();

    if (!usuarioId) {
      return;
    }

    mensagem.textContent = "Salvando...";


    try {

      const usuario = await apiRequest(
        `/api/usuarios/${usuarioId}`,
        {
          method: "PUT",

          body: JSON.stringify({
            nome: nome.value.trim(),
            email: email.value.trim()
          })
        }
      );


      nome.value = usuario.nome;

      email.value = usuario.email;

      avatar.textContent =
        usuario.nome
          .charAt(0)
          .toUpperCase();

      mensagem.textContent =
        "Perfil atualizado com sucesso!";


    } catch (error) {

      mensagem.textContent =
        error.message;

    }

  });


  document
    .getElementById("btnLogout")
    .addEventListener("click", logout);

});