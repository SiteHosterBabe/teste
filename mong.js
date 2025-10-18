(function() {
    'use strict';
    
    console.log("🚀 BRAVE TALK TRANSLATOR v1.0");
    
    const TARGET = "Your microphone is muted by the moderator";
    const REPLACEMENT = "O seu microfone está silenciado pelo moderador";
    
    // Observer que detecta QUALQUER mudança no DOM
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === 1 && node.textContent && node.textContent.includes(TARGET)) {
                    // Encontrou o elemento principal
                    const span = node.querySelector('span.css-mepu61-title');
                    if (span && span.textContent.includes(TARGET)) {
                        console.log("🎯 POPUP DETECTADO! Substituindo...");
                        span.textContent = REPLACEMENT;
                        console.log("✅ TEXTO SUBSTITUÍDO!");
                    }
                }
            });
        });
    });
    
    // Observar o body (onde o popup é adicionado)
    if (document.body) {
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
        console.log("✅ Observer ativo!");
    } else {
        // Se o body ainda não existe, aguardar
        document.addEventListener('DOMContentLoaded', () => {
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
            console.log("✅ Observer ativo!");
        });
    }
    
    console.log("🎬 Sistema pronto! Aguardando popup...");
})();