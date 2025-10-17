(function() {
    'use strict';
    
    console.log("🚀 Script de modificação carregado!");
    
    let lastCheck = '';
    
    function replaceText() {
        let found = false;
        
        // Procurar em TODOS os elementos visíveis
        document.querySelectorAll('*').forEach(function(el) {
            // Verificar se o elemento contém o texto original
            if (el.textContent && el.textContent.includes('Your microphone is muted by the moderator')) {
                
                // Se for um nó de texto direto
                if (el.childNodes.length === 1 && el.childNodes[0].nodeType === 3) {
                    el.textContent = 'Seu microfone está mutado';
                    console.log("✅ Texto substituído em:", el.tagName);
                    found = true;
                }
                
                // Se tiver filhos, procurar nos text nodes
                else {
                    el.childNodes.forEach(function(node) {
                        if (node.nodeType === 3 && node.textContent.includes('Your microphone is muted by the moderator')) {
                            node.textContent = node.textContent.replace('Your microphone is muted by the moderator', 'Seu microfone está mutado');
                            console.log("✅ Texto substituído em text node");
                            found = true;
                        }
                    });
                }
            }
        });
        
        if (found && lastCheck !== 'found') {
            console.log("🎯 MENSAGEM DETECTADA E SUBSTITUÍDA!");
            lastCheck = 'found';
        }
        
        return found;
    }
    
    function init() {
        console.log("🔍 Iniciando observador agressivo...");
        
        // Verificação MUITO frequente (a cada 200ms)
        setInterval(replaceText, 200);
        
        // MutationObserver para mudanças no DOM
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function() {
                replaceText();
            });
        });
        
        // Aguardar o body estar disponível
        const checkBody = setInterval(function() {
            if (document.body) {
                clearInterval(checkBody);
                
                observer.observe(document.body, {
                    childList: true,
                    subtree: true,
                    characterData: true,
                    attributes: true,
                    attributeOldValue: true,
                    characterDataOldValue: true
                });
                
                console.log("✅ MutationObserver ativo!");
                console.log("⏰ Verificação a cada 200ms ativa!");
            }
        }, 100);
    }
    
    // Iniciar assim que possível
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Backup: iniciar também após 500ms
    setTimeout(init, 500);
    
    console.log("🎬 Sistema de substituição pronto!");
})();