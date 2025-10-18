(function() {
    'use strict';
    
    console.log("🚀 BUTTON INTERCEPTOR v1.0");
    
    const MESSAGE = "eu sou o ricardo";
    
    // Função para mostrar mensagem temporária
    function showMessage(text) {
        // Remover mensagem anterior se existir
        const old = document.getElementById('custom-ricardo-message');
        if (old) {
            try {
                old.remove();
            } catch(e) {}
        }
        
        // Criar div da mensagem
        const messageBox = document.createElement('div');
        messageBox.id = 'custom-ricardo-message';
        messageBox.textContent = text;
        
        // Estilos inline
        messageBox.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 32px 64px;
            border-radius: 20px;
            font-size: 28px;
            font-weight: 700;
            box-shadow: 0 16px 64px rgba(102, 126, 234, 0.4);
            z-index: 999999;
            animation: messageAppear 0.4s ease-out;
            font-family: system-ui, -apple-system, sans-serif;
            text-align: center;
            border: 4px solid rgba(255, 255, 255, 0.3);
        `;
        
        // Adicionar ao body
        document.body.appendChild(messageBox);
        console.log("✅ Mensagem exibida!");
        
        // Remover após 5 segundos
        setTimeout(() => {
            try {
                if (messageBox && messageBox.parentNode) {
                    messageBox.style.animation = 'messageFadeOut 0.4s ease-out';
                    setTimeout(() => {
                        try {
                            if (messageBox && messageBox.parentNode) {
                                messageBox.remove();
                                console.log("✅ Mensagem removida!");
                            }
                        } catch(e) {}
                    }, 400);
                }
            } catch(e) {}
        }, 5000);
    }
    
    // Adicionar animações CSS
    if (!document.getElementById('ricardo-message-styles')) {
        const style = document.createElement('style');
        style.id = 'ricardo-message-styles';
        style.textContent = `
            @keyframes messageAppear {
                0% {
                    opacity: 0;
                    transform: translate(-50%, -50%) scale(0.7) rotate(-5deg);
                }
                50% {
                    transform: translate(-50%, -50%) scale(1.05) rotate(2deg);
                }
                100% {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1) rotate(0deg);
                }
            }
            @keyframes messageFadeOut {
                from {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1);
                }
                to {
                    opacity: 0;
                    transform: translate(-50%, -50%) scale(0.8);
                }
            }
        `;
        document.head.appendChild(style);
        console.log("✅ Estilos CSS adicionados!");
    }
    
    // Função para adicionar listener ao botão
    function attachButtonListener(button) {
        if (button.dataset.ricardoListenerAttached) {
            return; // Já tem listener
        }
        
        console.log("🎯 Botão encontrado! Adicionando listener...");
        
        // Adicionar listener de clique
        button.addEventListener('click', function(e) {
            console.log("🖱️ CLIQUE DETECTADO no botão do microfone!");
            
            // Prevenir ação padrão
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            
            // Mostrar mensagem
            showMessage(MESSAGE);
            
            return false;
        }, true); // true = captura o evento ANTES
        
        // Marcar como tendo listener
        button.dataset.ricardoListenerAttached = 'true';
        console.log("✅ Listener adicionado ao botão!");
    }
    
    // Verificar se o botão existe
    function checkButton() {
        const button = document.getElementById('audioWidgetDropDownBtn');
        if (button) {
            attachButtonListener(button);
            return true;
        }
        return false;
    }
    
    // Observer para detectar quando o botão é adicionado
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === 1) {
                    try {
                        // Verificar se é o botão
                        if (node.id === 'audioWidgetDropDownBtn') {
                            attachButtonListener(node);
                        }
                        
                        // Verificar nos descendentes
                        if (node.querySelectorAll) {
                            const button = node.querySelector('#audioWidgetDropDownBtn');
                            if (button) {
                                attachButtonListener(button);
                            }
                        }
                    } catch(e) {
                        console.log("Erro:", e);
                    }
                }
            });
        });
    });
    
    // Iniciar
    function start() {
        if (document.body) {
            // Verificar se o botão já existe
            if (checkButton()) {
                console.log("✅ Botão já existe na página!");
            }
            
            // Iniciar observer para detectar quando for adicionado
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
            console.log("✅ Observer ativo!");
            
            // Verificar periodicamente (backup)
            setInterval(checkButton, 1000);
        } else {
            setTimeout(start, 100);
        }
    }
    
    // Iniciar
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start);
    } else {
        start();
    }
    
    console.log("🎬 Sistema pronto! Aguardando clique no botão...");
})();