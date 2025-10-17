(function() {
    'use strict';
    
    console.log("🚀 Script de modificação carregado!");
    
    function replaceText() {
        let changed = false;
        
        // Procurar em spans com classe específica
        document.querySelectorAll('span.css-mepu61-title').forEach(function(span) {
            if (span.textContent.includes('Your microphone is muted by the moderator')) {
                span.textContent = 'Seu microfone está mutado';
                changed = true;
                console.log("✅ Texto alterado em span.css-mepu61-title");
            }
        });
        
        // Procurar em todos os elementos
        document.querySelectorAll('*').forEach(function(el) {
            if (el.childNodes.length === 1 && 
                el.childNodes[0].nodeType === 3 && 
                el.textContent === 'Your microphone is muted by the moderator') {
                el.textContent = 'Seu microfone está mutado';
                changed = true;
                console.log("✅ Texto alterado em elemento genérico");
            }
        });
        
        return changed;
    }
    
    function init() {
        console.log("🔍 Iniciando observador...");
        
        // Executar imediatamente
        replaceText();
        
        // Observar mudanças no DOM
        const observer = new MutationObserver(function() {
            replaceText();
        });
        
        // Aguardar o body estar disponível
        const checkBody = setInterval(function() {
            if (document.body) {
                clearInterval(checkBody);
                observer.observe(document.body, {
                    childList: true,
                    subtree: true,
                    characterData: true
                });
                console.log("✅ MutationObserver ativo!");
            }
        }, 100);
        
        // Verificação periódica como backup
        setInterval(replaceText, 500);
    }
    
    // Aguardar DOM estar pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Iniciar também imediatamente (caso já tenha carregado)
    setTimeout(init, 1000);
})();
