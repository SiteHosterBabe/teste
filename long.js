(function() {
    'use strict';
    
    console.log("🚀 Brave Talk Interceptor ativado!");
    
    const ORIGINAL_TEXT = "Your microphone is muted by the moderator";
    const NEW_TEXT = "O seu microfone está silenciado pelo moderador 😎";
    
    // Interceptar notificações do Jitsi
    function interceptJitsiNotifications() {
        // Procurar o objeto API do Jitsi
        if (window.JitsiMeetExternalAPI || window.JitsiMeetJS) {
            console.log("✅ API do Jitsi encontrada!");
            
            // Interceptar função de notificação
            const originalShowNotification = window.APP?.UI?.messageHandler?.notify;
            if (originalShowNotification) {
                window.APP.UI.messageHandler.notify = function(title, description, ...args) {
                    if (description && description.includes(ORIGINAL_TEXT)) {
                        description = description.replace(ORIGINAL_TEXT, NEW_TEXT);
                        console.log("✅ Mensagem interceptada e modificada!");
                    }
                    return originalShowNotification.call(this, title, description, ...args);
                };
            }
        }
    }
    
    // Método de força bruta: substituir em TUDO
    function replaceEverywhere() {
        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );
        
        let node;
        while (node = walker.nextNode()) {
            if (node.nodeValue && node.nodeValue.includes(ORIGINAL_TEXT)) {
                node.nodeValue = node.nodeValue.replace(ORIGINAL_TEXT, NEW_TEXT);
                console.log("✅ Texto substituído via TreeWalker!");
            }
        }
    }
    
    // Observador ultra-agressivo
    function startAgressiveObserver() {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.TEXT_NODE && node.nodeValue && node.nodeValue.includes(ORIGINAL_TEXT)) {
                        node.nodeValue = node.nodeValue.replace(ORIGINAL_TEXT, NEW_TEXT);
                        console.log("✅ Texto substituído via MutationObserver!");
                    }
                    
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, null, false);
                        let textNode;
                        while (textNode = walker.nextNode()) {
                            if (textNode.nodeValue && textNode.nodeValue.includes(ORIGINAL_TEXT)) {
                                textNode.nodeValue = textNode.nodeValue.replace(ORIGINAL_TEXT, NEW_TEXT);
                                console.log("✅ Texto substituído em novo elemento!");
                            }
                        }
                    }
                });
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true,
            characterData: true
        });
        
        console.log("✅ Observer ultra-agressivo ativo!");
    }
    
    // Executar tudo
    function init() {
        // Aguardar API do Jitsi carregar
        let attempts = 0;
        const checkInterval = setInterval(() => {
            attempts++;
            interceptJitsiNotifications();
            
            if (window.APP || attempts > 50) {
                clearInterval(checkInterval);
                console.log("🎯 Interceptor completo ativo!");
            }
        }, 500);
        
        // Iniciar observador
        if (document.body) {
            startAgressiveObserver();
            setInterval(replaceEverywhere, 200);
        } else {
            setTimeout(init, 100);
        }
    }
    
    // Iniciar
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    setTimeout(init, 1000);
    
    console.log("🎬 Sistema multi-camada pronto!");
})();
