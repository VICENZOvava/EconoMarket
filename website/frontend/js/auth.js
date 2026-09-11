function salvarToken(token) {
    localStorage.setItem("token", token);
}

function obterToken() {
    return localStorage.getItem("token");
}

function removerToken() {
    localStorage.removeItem("token");
}

function estaAutenticado() {
    return !!obterToken();
}

function logout() {
    removerToken();
    window.location.href = "login.html";
}