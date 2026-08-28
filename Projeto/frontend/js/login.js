const loginForm = document.getElementById("loginForm");
const mensagem = document.getElementById("mensagem");

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    mensagem.textContent = "Entrando...";

    try {
        const data = await apiRequest("/api/auth/login", {
            method: "POST",
            body: JSON.stringify({
                email,
                senha
            })
        });

        salvarToken(data.token);

        mensagem.textContent = "Login realizado com sucesso!";

        setTimeout(() => {
            window.location.href = "index.html";
        }, 500);

    } catch (error) {
        mensagem.textContent = error.message;
    }
});