// Mensagem em português que você quer mostrar
const minhaMensagem = "Seu microfone foi silenciado pelo moderador";

// Função que tenta encontrar e substituir o texto
function tentarSubstituir() {
    const span = document.querySelector(".css-mepu61-title");
    if (span) {
        if (span.textContent !== minhaMensagem) {
            console.log("Mensagem encontrada! Substituindo...");
            span.textContent = minhaMensagem;
        } else {
            console.log("Mensagem já está atualizada.");
        }
    } else {
        console.log("Ainda não encontrou a mensagem...");
    }
}

// Checar a cada 500ms (meio segundo)
setInterval(tentarSubstituir, 500);
