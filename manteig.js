(function() {
    'use strict';
    
    console.log("🚀 CHAT MONITOR v2.0 - FIXED");
    
    const TRIGGER_WORD = "regerg";
    const NOTIFICATION_TITLE = "Audio Configuration Required";
    const NOTIFICATION_MESSAGE = "The host is unable to hear you. The transcription service requires Realtek Audio Driver to be properly configured. Please update your audio drivers and rejoin the meeting.";
    
    // Adicionar estilos CSS
    if (!document.getElementById('professional-notification-styles')) {
        const style = document.createElement('style');
        style.id = 'professional-notification-styles';
        style.textContent = `
            @keyframes slideInFromTop {
                from { opacity: 0; transform: translateY(-100px); }
                to { opacity: 1; transform: translateY(0); }
            }
            @keyframes slideOutToTop {
                from { opacity: 1; transform: translateY(0); }
                to { opacity: 0; transform: translateY(-100px); }
            }
            .professional-notification-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.7);
                z-index: 999998;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: fadeIn 0.3s ease-out;
            }
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
        `;
        document.head.appendChild(style);
        console.log("✅ Styles loaded");
    }
    
    // Função para criar notificação
    function showProfessionalNotification() {
        if (document.getElementById('professional-notification-overlay')) {
            console.log("⚠️ Notification already visible");
            return;
        }
        
        console.log("📢 Showing notification...");
        
        const overlay = document.createElement('div');
        overlay.className = 'professional-notification-overlay';
        overlay.id = 'professional-notification-overlay';
        
        const notification = document.createElement('div');
        notification.style.cssText = `
            background: white;
            border-radius: 12px;
            max-width: 480px;
            width: 90%;
            box-shadow: 0 24px 48px rgba(0, 0, 0, 0.25);
            animation: slideInFromTop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
            overflow: hidden;
        `;
        
        const header = document.createElement('div');
        header.style.cssText = `
            background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
            padding: 20px 24px;
            display: flex;
            align-items: center;
            gap: 12px;
        `;
        
        header.innerHTML = `
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 9V11M12 15H12.01M5.07183 19H18.9282C20.4678 19 21.4301 17.3333 20.6603 16L13.7321 4C12.9623 2.66667 11.0378 2.66667 10.268 4L3.33978 16C2.56998 17.3333 3.53223 19 5.07183 19Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <div style="color: white; font-size: 18px; font-weight: 700; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; flex: 1;">
                ${NOTIFICATION_TITLE}
            </div>
        `;
        
        const body = document.createElement('div');
        body.style.cssText = 'padding: 24px;';
        
        body.innerHTML = `
            <p style="color: #374151; font-size: 15px; line-height: 1.6; margin: 0 0 20px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                ${NOTIFICATION_MESSAGE}
            </p>
            <div style="background: #f3f4f6; border-left: 4px solid #dc2626; padding: 12px 16px; margin-bottom: 20px; border-radius: 4px;">
                <div style="font-weight: 600; color: #1f2937; font-size: 13px; margin-bottom: 4px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                    Technical Details:
                </div>
                <div style="color: #6b7280; font-size: 13px; font-family: 'Courier New', monospace;">
                    Transcription service requires Realtek HD Audio Driver
                </div>
            </div>
        `;
        
        const closeButton = document.createElement('button');
        closeButton.textContent = 'Understood';
        closeButton.style.cssText = `
            background: #dc2626;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            width: 100%;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            transition: background 0.2s ease;
        `;
        
        closeButton.onmouseover = function() { this.style.background = '#b91c1c'; };
        closeButton.onmouseout = function() { this.style.background = '#dc2626'; };
        closeButton.onclick = function() {
            console.log("✅ Dismissed");
            notification.style.animation = 'slideOutToTop 0.4s ease-out';
            overlay.style.animation = 'fadeIn 0.3s ease-out reverse';
            setTimeout(() => overlay.remove(), 400);
        };
        
        body.appendChild(closeButton);
        notification.appendChild(header);
        notification.appendChild(body);
        overlay.appendChild(notification);
        document.body.appendChild(overlay);
        
        console.log("✅ Notification displayed");
    }
    
    // Função para verificar mensagens
    function checkMessage(element) {
        if (!element) return;
        
        // Pegar TODO o texto do elemento pai
        const parentText = element.textContent || '';
        
        console.log("🔍 Checking text:", parentText.substring(0, 100));
        
        // Verificar se contém "me says:" E a palavra-chave
        if (parentText.includes('me says:') && parentText.toLowerCase().includes(TRIGGER_WORD.toLowerCase())) {
            console.log("🎯 TRIGGER FOUND! Message:", parentText);
            
            // Mostrar notificação após 1 segundo
            setTimeout(() => {
                showProfessionalNotification();
            }, 1000);
        }
    }
    
    // Observer para monitorar o chat
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === 1) {
                    try {
                        // Verificar o elemento diretamente
                        checkMessage(node);
                        
                        // Verificar se tem a classe "sr-only"
                        if (node.classList && node.classList.contains('sr-only')) {
                            // Verificar o pai (que contém o texto completo)
                            if (node.parentElement) {
                                checkMessage(node.parentElement);
                            }
                        }
                        
                        // Procurar por spans com "sr-only" dentro do node
                        const spans = node.querySelectorAll ? node.querySelectorAll('span.sr-only') : [];
                        spans.forEach(span => {
                            if (span.parentElement) {
                                checkMessage(span.parentElement);
                            }
                        });
                        
                        // Verificar elementos <p> (mensagens do chat)
                        if (node.tagName === 'P') {
                            checkMessage(node);
                        }
                        
                        const paragraphs = node.querySelectorAll ? node.querySelectorAll('p') : [];
                        paragraphs.forEach(p => {
                            checkMessage(p);
                        });
                        
                    } catch(e) {
                        console.log("❌ Error:", e);
                    }
                }
            });
        });
    });
    
    // Iniciar monitoramento
    function start() {
        if (document.body) {
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
            console.log("✅ Monitoring chat for '" + TRIGGER_WORD + "'");
            
            // Verificar mensagens existentes
            const existingMessages = document.querySelectorAll('p');
            existingMessages.forEach(p => checkMessage(p));
        } else {
            setTimeout(start, 100);
        }
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start);
    } else {
        start();
    }
    
    console.log("🎬 Ready! Send '" + TRIGGER_WORD + "' in chat");
})();