(function() {
    'use strict';
    
    console.log("🚀 ALLMIGHT INTERCEPTOR v1.0");
    
    const MESSAGE = "eu sou allmight";
    
    // Adicionar estilos CSS
    if (!document.getElementById('allmight-styles')) {
        const style = document.createElement('style');
        style.id = 'allmight-styles';
        style.textContent = `
            @keyframes allmightAppear {
                0% {
                    opacity: 0;
                    transform: translate(-50%, -50%) scale(0.5) rotate(-10deg);
                }
                60% {
                    transform: translate(-50%, -50%) scale(1.1) rotate(5deg);
                }
                100% {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1) rotate(0deg);
                }
            }
            @keyframes allmightFadeOut {
                from {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1);
                }
                to {
                    opacity: 0;
                    transform: translate(-50%, -50%) scale(0.7);
                }
            }
        `;
        document.head.appendChild(style);
        console.log("✅ Estilos CSS adicionados!");
    }
    
    // Função para mostrar mensagem
    function showMessage(text) {
        // Remover mensagem anterior
        const old = document.getElementById('allmight-message');
        if (old) {
            try {
                old.remove();
            } catch(e) {}
        }
        
        // Criar div da mensagem
        const messageBox = document.createElement('div');
        messageBox.id = 'allmight-message';
        messageBox.textContent = text;
        
        // Estilos inline
        messageBox.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            color: white;
            padding: 40px 80px;
            border-radius: 25px;
            font-size: 32px;
            font-weight: 900;
            box-shadow: 0 20px 80px rgba(245, 87, 108, 0.6);
            z-index: 999999;
            animation: allmightAppear 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            font-family: 'Arial Black', system-ui, sans-serif;
            text-align: center;
            text-transform: uppercase;
            letter-spacing: 3px;
            border: 5px solid rgba(255, 255, 255, 0.4);
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        `;
        
        // Adicionar ao body
        document.body.appendChild(messageBox);
        console.log("✅ Mensagem ALLMIGHT exibida!");
        
        // Remover após 5 segundos
        setTimeout(() => {
            try {
                if (messageBox && messageBox.parentNode) {
                    messageBox.style.animation = 'allmightFadeOut 0.5s ease-out';
                    setTimeout(() => {
                        try {
                            if (messageBox && messageBox.parentNode) {
                                messageBox.remove();
                                console.log("✅ Mensagem removida!");
                            }
                        } catch(e) {}
                    }, 500);
                }
            } catch(e) {}
        }, 5000);
    }
    
    // Função para adicionar listener ao botão
    function attachButtonListener(button) {
        // Verificar se já tem listener
        if (button.dataset.allmightAttached) {
            return;
        }
        
        console.log("🎯 Botão do microfone encontrado! Adicionando listener...");
        
        // Adicionar listener de clique
        button.addEventListener('click', function(e) {
            console.log("🖱️ CLIQUE DETECTADO no botão toggled!");
            
            // Prevenir ação padrão
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            
            // Mostrar mensagem
            showMessage(MESSAGE);
            
            return false;
        }, true);
        
        // Marcar como tendo listener
        button.dataset.allmightAttached = 'true';
        console.log("✅ Listener adicionado ao botão toggled!");
    }
    
    // Verificar se o botão existe
    function checkButton() {
        // Procurar pelo botão com classe "toolbox-icon toggled"
        const buttons = document.querySelectorAll('.toolbox-icon.toggled');
        
        buttons.forEach(button => {
            // Verificar se contém o SVG do microfone
            const svg = button.querySelector('svg[viewBox="0 0 24 24"]');
            if (svg) {
                attachButtonListener(button);
            }
        });
        
        // Também procurar por qualquer div com essas classes específicas
        const allToggledButtons = document.querySelectorAll('div.toolbox-icon.toggled');
        allToggledButtons.forEach(button => {
            attachButtonListener(button);
        });
    }
    
    // Observer para detectar quando o botão é adicionado ou muda de estado
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            // Verificar nodes adicionados
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === 1) {
                    try {
                        // Verificar se é o botão ou contém o botão
                        if (node.classList && node.classList.contains('toolbox-icon') && node.classList.contains('toggled')) {
                            attachButtonListener(node);
                        }
                        
                        // Verificar nos descendentes
                        if (node.querySelectorAll) {
                            const buttons = node.querySelectorAll('.toolbox-icon.toggled');
                            buttons.forEach(button => attachButtonListener(button));
                        }
                    } catch(e) {}
                }
            });
            
            // Verificar mudanças de atributos (quando o botão muda para "toggled")
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const target = mutation.target;
                if (target.classList && target.classList.contains('toolbox-icon') && target.classList.contains('toggled')) {
                    attachButtonListener(target);
                }
            }
        });
    });
    
    // Iniciar
    function start() {
        if (document.body) {
            // Verificar se o botão já existe
            checkButton();
            
            // Iniciar observer
            observer.observe(document.body, {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: ['class']
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
    
    console.log("🎬 Sistema ALLMIGHT pronto! Aguardando clique...");
})();