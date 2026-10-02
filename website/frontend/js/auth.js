export function salvarToken(token) {
localStorage.setItem("token", token);
}

export function obterToken() {
return localStorage.getItem("token");
}

export function removerToken() {
localStorage.removeItem("token");
}

export function estaAutenticado() {
return !!obterToken();
}

export function logout() {
removerToken();
window.location.href = "login.html";
}
