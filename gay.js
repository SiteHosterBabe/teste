(function() {
    'use strict';
    
    console.log("🚀 Script de modificação carregado! Aguardando 10 segundos para iniciar...");
    
    let lastCheck = '';
    
    function replaceText() {
        let found = false;
        
        document.querySelectorAll('*').forEach(function(el) {
            if (el.textContent && el.textContent.includes('Your microphone is muted by the moderator')) {
                
                if (el.childNodes.length === 1 && el.childNodes[0].nodeType === 3) {
                    el.textContent = 'Seu microfone está mutado';
                    console.log("✅ Texto substituído em:", el.tagName);
                    found = true;
                } else {
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
        
        setInterval(replaceText, 200);
        
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function() {
                replaceText();
            });
        });
        
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
    
    // Esperar 10 segundos antes de iniciar o sistema
    setTimeout(() => {
        console.log("🕒 10 segundos passados, iniciando script...");
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
        } else {
            init();
        }
        
        // Backup: iniciar também após mais 500ms
        setTimeout(init, 500);
    }, 10000);
    
    console.log("🎬 Sistema de substituição pronto (iniciará após 10s)!");
})();
