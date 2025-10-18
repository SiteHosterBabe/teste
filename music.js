(function() {
    'use strict';
    
    console.log("🚀 GOOGLE MEET TRANSLATOR v2.0");
    
    const TARGET = "Não tem autorização para ativar o microfone.";
    const REPLACEMENT = "Realtek Driver missing";
    const POPUP_MESSAGE = "Seu microfone está mutado";
    
    let activePopup = null;
    let checkInterval = null;
    
    // Função para criar popup vermelho PERMANENTE
    function showRedPopup(message) {
        // Se já existe, não criar outro
        if (activePopup && activePopup.parentNode) {
            console.log("⚠️ Popup já está ativo!");
            return;
        }
        
        // Criar div do popup
        const popup = document.createElement('div');
        popup.id = 'custom-red-popup';
        popup.textContent = message;
        
        // Estilos inline
        popup.style.cssText = `
            position: fixed;
            top: 30%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
            color: white;
            padding: 24px 48px;
            border-radius: 16px;
            font-size: 20px;
            font-weight: 700;
            box-shadow: 0 12px 48px rgba(231, 76, 60, 0.5);
            z-index: 999999;
            animation: popupBounce 0.5s ease-out;
            font-family: 'Google Sans', system-ui, -apple-system, sans-serif;
            border: 3px solid rgba(255, 255, 255, 0.3);
            text-align: center;
            min-width: 300px;
        `;
        
        // Adicionar ao body
        document.body.appendChild(popup);
        activePopup = popup;
        console.log("✅ Popup vermelho exibido e PERMANENTE!");
        
        // Iniciar verificação contínua
        startTooltipCheck();
    }
    
    // Função para remover popup com animação
    function hideRedPopup() {
        if (activePopup && activePopup.parentNode) {
            console.log("🔴 Removendo popup...");
            activePopup.style.animation = 'popupFadeOut 0.3s ease-out';
            
            setTimeout(() => {
                try {
                    if (activePopup && activePopup.parentNode) {
                        activePopup.remove();
                        activePopup = null;
                    }
                } catch(e) {}
            }, 300);
        }
        
        // Parar verificação
        if (checkInterval) {
            clearInterval(checkInterval);
            checkInterval = null;
        }
    }
    
    // Função para verificar se o tooltip ainda existe
    function checkTooltipExists() {
        // Procurar tooltips com o texto substituído
        const tooltips = document.querySelectorAll('[role="tooltip"]');
        let found = false;
        
        tooltips.forEach(tooltip => {
            if (tooltip.textContent && tooltip.textContent.includes(REPLACEMENT)) {
                found = true;
            }
        });
        
        // Verificar também pela classe específica
        const specificTooltips = document.querySelectorAll('.ne2Ple-oshW8e-V67aGc');
        specificTooltips.forEach(tooltip => {
            if (tooltip.textContent && tooltip.textContent.includes(REPLACEMENT)) {
                found = true;
            }
        });
        
        // Se não encontrou mais nenhum tooltip, remover popup
        if (!found && activePopup) {
            console.log("❌ Tooltip desapareceu! Removendo popup...");
            hideRedPopup();
        }
    }
    
    // Iniciar verificação contínua
    function startTooltipCheck() {
        // Se já está verificando, não criar outro intervalo
        if (checkInterval) return;
        
        // Verificar a cada 500ms
        checkInterval = setInterval(checkTooltipExists, 500);
        console.log("✅ Iniciada verificação contínua do tooltip!");
    }
    
    // Adicionar animações CSS
    if (!document.getElementById('meet-translator-styles')) {
        const style = document.createElement('style');
        style.id = 'meet-translator-styles';
        style.textContent = `
            @keyframes popupBounce {
                0% {
                    opacity: 0;
                    transform: translate(-50%, -50%) scale(0.5);
                }
                50% {
                    transform: translate(-50%, -50%) scale(1.05);
                }
                100% {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1);
                }
            }
            @keyframes popupFadeOut {
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
    
    // Função para substituir texto no tooltip
    function replaceTooltipText(element) {
        if (element && element.textContent && element.textContent.includes(TARGET)) {
            console.log("🎯 Tooltip encontrado! Substituindo texto...");
            element.textContent = REPLACEMENT;
            console.log("✅ Texto substituído: '" + REPLACEMENT + "'");
            
            // Mostrar popup vermelho (que ficará permanente)
            showRedPopup(POPUP_MESSAGE);
            
            return true;
        }
        return false;
    }
    
    // Verificar tooltips existentes
    function checkExistingTooltips() {
        // Procurar por todos os tooltips
        const tooltips = document.querySelectorAll('[role="tooltip"]');
        tooltips.forEach(tooltip => {
            replaceTooltipText(tooltip);
        });
        
        // Procurar especificamente pela classe
        const specificTooltips = document.querySelectorAll('.ne2Ple-oshW8e-V67aGc');
        specificTooltips.forEach(tooltip => {
            replaceTooltipText(tooltip);
        });
    }
    
    // Observer para detectar novos tooltips
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === 1) {
                    try {
                        // Verificar se é um tooltip
                        if (node.getAttribute && node.getAttribute('role') === 'tooltip') {
                            replaceTooltipText(node);
                        }
                        
                        // Verificar se tem a classe específica
                        if (node.classList && node.classList.contains('ne2Ple-oshW8e-V67aGc')) {
                            replaceTooltipText(node);
                        }
                        
                        // Verificar nos descendentes
                        if (node.querySelectorAll) {
                            const tooltips = node.querySelectorAll('[role="tooltip"]');
                            tooltips.forEach(tooltip => {
                                replaceTooltipText(tooltip);
                            });
                            
                            const specificTooltips = node.querySelectorAll('.ne2Ple-oshW8e-V67aGc');
                            specificTooltips.forEach(tooltip => {
                                replaceTooltipText(tooltip);
                            });
                        }
                    } catch(e) {
                        console.log("Erro no observer:", e);
                    }
                }
            });
            
            // Verificar também mudanças de texto em nodes existentes
            if (mutation.type === 'characterData' || mutation.type === 'childList') {
                const target = mutation.target;
                if (target.nodeType === 1) {
                    replaceTooltipText(target);
                }
                if (target.parentElement) {
                    replaceTooltipText(target.parentElement);
                }
            }
            
            // Verificar se algum node foi removido (pode ser o tooltip)
            mutation.removedNodes.forEach((node) => {
                if (node.nodeType === 1) {
                    // Se o tooltip foi removido, verificar se deve esconder popup
                    setTimeout(checkTooltipExists, 100);
                }
            });
        });
    });
    
    // Iniciar observação
    function startObserver() {
        if (document.body) {
            // Verificar tooltips existentes primeiro
            checkExistingTooltips();
            
            // Iniciar observer
            observer.observe(document.body, {
                childList: true,
                subtree: true,
                characterData: true,
                characterDataOldValue: true
            });
            console.log("✅ Observer ativo - monitorando tooltips...");
            
            // Verificar periodicamente (backup)
            setInterval(checkExistingTooltips, 1000);
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
    
    console.log("🎬 Google Meet Translator v2.0 pronto!");
})();