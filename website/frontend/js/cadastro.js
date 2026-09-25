const cadastroForm = document.getElementById("cadastroForm");
const mensagem = document.getElementById("mensagem");

cadastroForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;
    const confirmarSenha =
        document.getElementById("confirmarSenha").value;

    mensagem.textContent = "";

    if (senha !== confirmarSenha) {
        mensagem.textContent = "As senhas não coincidem.";
        return;
    }

    if (senha.length < 6) {
        mensagem.textContent =
            "A senha deve ter pelo menos 6 caracteres.";
        return;
    }

    try {
        const resultado = await apiRequest("/api/auth/registrar", {
            method: "POST",
            body: JSON.stringify({
                nome,
                email,
                senha
            })
        });

        localStorage.setItem("token", resultado.token);

        localStorage.setItem(
            "usuario",
            JSON.stringify(resultado.usuario)
        );

        mensagem.textContent =
            "Cadastro realizado com sucesso!";

        cadastroForm.reset();

        setTimeout(() => {
            window.location.href = "index.html";
        }, 1000);

    } catch (error) {
        mensagem.textContent = error.message;
    }
});