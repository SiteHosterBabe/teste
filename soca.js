(function() {
    'use strict';
    
    console.log("🚀 Interceptor React ativo!");
    
    const TARGET_TEXT = "Your microphone is muted by the moderator";
    const NEW_TEXT = "O seu microfone está silenciado pelo moderador 😎";
    
    // Interceptar quando React criar o elemento
    const originalCreateElement = document.createElement;
    document.createElement = function(tagName) {
        const element = originalCreateElement.call(document, tagName);
        
        if (tagName.toLowerCase() === 'span') {
            // Observar mudanças no span
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'characterData' || mutation.type === 'childList') {
                        if (element.textContent && element.textContent.includes(TARGET_TEXT)) {
                            element.textContent = NEW_TEXT;
                            console.log("✅ Texto substituído via React interceptor!");
                        }
                    }
                });
            });
            
            observer.observe(element, {
                childList: true,
                characterData: true,
                subtree: true
            });
            
            // Verificar imediatamente também
            setTimeout(() => {
                if (element.textContent && element.textContent.includes(TARGET_TEXT)) {
                    element.textContent = NEW_TEXT;
                    console.log("✅ Texto substituído imediatamente!");
                }
            }, 0);
        }
        
        return element;
    };
    
    // Backup: Observer global para pegar se escapar
    const globalObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    const span = node.querySelector ? node.querySelector('span.css-mepu61-title') : null;
                    if (span && span.textContent && span.textContent.includes(TARGET_TEXT)) {
                        span.textContent = NEW_TEXT;
                        console.log("✅ Texto substituído via observer global!");
                    }
                }
            });
        });
    });
    
    // Aguardar body carregar
    function init() {
        if (document.body) {
            globalObserver.observe(document.body, {
                childList: true,
                subtree: true
            });
            console.log("✅ Observer global ativo!");
        } else {
            setTimeout(init, 100);
        }
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    console.log("🎬 Interceptor completo!");
})();