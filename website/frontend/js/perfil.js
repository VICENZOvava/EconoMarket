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
    const avatarInicial = document.getElementById("avatarInicial");
    const avatarImagem = document.getElementById("avatarImagem");
    const fotoPerfil = document.getElementById("fotoPerfil");
    const btnLogout = document.getElementById("btnLogout");

    let usuarioId = null;

    function atualizarInicial(nomeUsuario) {
        avatarInicial.textContent =
            (nomeUsuario || "E").charAt(0).toUpperCase();
    }

    function carregarFoto(id) {
        const foto = localStorage.getItem(`profilePhoto_${id}`);

        if (!foto) {
            avatarImagem.style.display = "none";
            avatarInicial.style.display = "block";
            return;
        }

        avatarImagem.src = foto;
        avatarImagem.style.display = "block";
        avatarInicial.style.display = "none";
    }

    function salvarFoto(id, arquivo) {
        if (!arquivo) {
            return;
        }

        if (!arquivo.type.startsWith("image/")) {
            mensagem.textContent = "Selecione uma imagem válida.";
            return;
        }

        if (arquivo.size > 2 * 1024 * 1024) {
            mensagem.textContent = "A imagem deve ter no máximo 2 MB.";
            return;
        }

        const leitor = new FileReader();

        leitor.onload = event => {
            const imagem = new Image();

            imagem.onload = () => {
                const tamanho = 500;
                const canvas = document.createElement("canvas");
                const contexto = canvas.getContext("2d");

                canvas.width = tamanho;
                canvas.height = tamanho;

                const menorDimensao = Math.min(
                    imagem.width,
                    imagem.height
                );

                const x = (imagem.width - menorDimensao) / 2;
                const y = (imagem.height - menorDimensao) / 2;

                contexto.drawImage(
                    imagem,
                    x,
                    y,
                    menorDimensao,
                    menorDimensao,
                    0,
                    0,
                    tamanho,
                    tamanho
                );

                const fotoFinal = canvas.toDataURL(
                    "image/jpeg",
                    0.85
                );

                try {
                    localStorage.setItem(
                        `profilePhoto_${id}`,
                        fotoFinal
                    );

                    avatarImagem.src = fotoFinal;
                    avatarImagem.style.display = "block";
                    avatarInicial.style.display = "none";

                    mensagem.textContent =
                        "Foto de perfil atualizada.";
                } catch (error) {
                    mensagem.textContent =
                        "Não foi possível salvar a foto.";
                }
            };

            imagem.src = event.target.result;
        };

        leitor.readAsDataURL(arquivo);
    }

    try {
        const usuario = await apiRequest("/api/auth/me");

        usuarioId = usuario.id;

        nome.value = usuario.nome || "";
        email.value = usuario.email || "";
        provedor.value = usuario.provedor || "LOCAL";
        idUsuario.value = usuario.id;

        atualizarInicial(usuario.nome);
        carregarFoto(usuario.id);
    } catch (error) {
        mensagem.textContent = error.message;
        return;
    }

    fotoPerfil.addEventListener("change", () => {
        salvarFoto(usuarioId, fotoPerfil.files[0]);
    });

    form.addEventListener("submit", async event => {
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

            atualizarInicial(usuario.nome);

            mensagem.textContent =
                "Perfil atualizado com sucesso!";
        } catch (error) {
            mensagem.textContent = error.message;
        }
    });

    btnLogout.addEventListener("click", logout);
});