(function() {
    'use strict';
    
    console.log("🚀 JITSI TRANSLATOR v1.0");
    
    const TARGET = "O seu microfone é silenciado pelo moderador";
    const REPLACEMENT = "eu sou ricardo";
    
    // Função para substituir o texto
    function replaceText(element) {
        if (element && element.textContent && element.textContent.trim() === TARGET) {
            console.log("🎯 Texto encontrado! Substituindo...");
            element.textContent = REPLACEMENT;
            console.log("✅ Texto substituído para: '" + REPLACEMENT + "'");
            return true;
        }
        return false;
    }
    
    // Verificar spans existentes
    function checkExistingSpans() {
        const spans = document.querySelectorAll('span.css-1kgc18r-title');
        spans.forEach(span => {
            replaceText(span);
        });
    }
    
    // Observer para detectar novos elementos
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            // Verificar nodes adicionados
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === 1) {
                    try {
                        // Verificar se é o span diretamente
                        if (node.classList && node.classList.contains('css-1kgc18r-title')) {
                            replaceText(node);
                        }
                        
                        // Verificar nos descendentes
                        if (node.querySelectorAll) {
                            const spans = node.querySelectorAll('span.css-1kgc18r-title');
                            spans.forEach(span => {
                                replaceText(span);
                            });
                        }
                    } catch(e) {
                        console.log("Erro:", e);
                    }
                }
            });
            
            // Verificar mudanças de texto
            if (mutation.type === 'characterData' || mutation.type === 'childList') {
                const target = mutation.target;
                if (target.nodeType === 1 && target.classList && target.classList.contains('css-1kgc18r-title')) {
                    replaceText(target);
                }
                if (target.parentElement && target.parentElement.classList && target.parentElement.classList.contains('css-1kgc18r-title')) {
                    replaceText(target.parentElement);
                }
            }
        });
    });
    
    // Iniciar observação
    function startObserver() {
        if (document.body) {
            // Verificar elementos existentes
            checkExistingSpans();
            
            // Iniciar observer
            observer.observe(document.body, {
                childList: true,
                subtree: true,
                characterData: true
            });
            console.log("✅ Observer ativo!");
            
            // Verificar periodicamente (backup)
            setInterval(checkExistingSpans, 500);
            console.log("✅ Verificação periódica ativa!");
        } else {
            setTimeout(startObserver, 100);
        }
    }
    
    // Iniciar
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startObserver);
    } else {
        startObserver();
    }
    
    console.log("🎬 Sistema pronto! Aguardando popup...");
})();
