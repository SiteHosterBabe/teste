// A mensagem que você quer mostrar
const minhaMensagem = "Seu microfone foi silenciado pelo moderador";

// Função para atualizar o texto
function atualizarMensagem(span) {
    if (span.textContent === "Your microphone is muted by the moderator") {
        span.textContent = minhaMensagem;
    }
}

// Criar um observer para monitorar mudanças no DOM
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1) { // Apenas elementos
                // Procurar pelo span específico
                const span = node.querySelector(".css-mepu61-title");
                if (span) {
                    atualizarMensagem(span);
                }

                // Caso o próprio node seja o span
                if (node.classList && node.classList.contains("css-mepu61-title")) {
                    atualizarMensagem(node);
                }
            }
        });
    });
});

// Começar a observar o body
observer.observe(document.body, {
    childList: true,
    subtree: true
});

// Também checar os spans já existentes quando o script inicia
document.querySelectorAll(".css-mepu61-title").forEach(atualizarMensagem);
