(function() {
    'use strict';
    
    console.log("🚀 PROFESSIONAL NOTIFICATION SYSTEM v1.0");
    
    // Mensagem profissional
    const NOTIFICATION_TITLE = "Audio Configuration Required";
    const NOTIFICATION_MESSAGE = "The host is unable to hear you. The transcription service requires Realtek Audio Driver to be properly configured. Please update your audio drivers and rejoin the meeting.";
    
    // Adicionar estilos CSS
    if (!document.getElementById('professional-notification-styles')) {
        const style = document.createElement('style');
        style.id = 'professional-notification-styles';
        style.textContent = `
            @keyframes slideInFromTop {
                from {
                    opacity: 0;
                    transform: translateY(-100px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            @keyframes slideOutToTop {
                from {
                    opacity: 1;
                    transform: translateY(0);
                }
                to {
                    opacity: 0;
                    transform: translateY(-100px);
                }
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
        console.log("✅ Professional styles loaded");
    }
    
    // Função para criar notificação profissional
    function showProfessionalNotification() {
        console.log("📢 Displaying professional notification...");
        
        // Criar overlay (fundo escuro)
        const overlay = document.createElement('div');
        overlay.className = 'professional-notification-overlay';
        overlay.id = 'professional-notification-overlay';
        
        // Criar container da notificação
        const notification = document.createElement('div');
        notification.id = 'professional-notification';
        notification.style.cssText = `
            background: white;
            border-radius: 12px;
            padding: 0;
            max-width: 480px;
            width: 90%;
            box-shadow: 0 24px 48px rgba(0, 0, 0, 0.25);
            animation: slideInFromTop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
            overflow: hidden;
        `;
        
        // Header (barra vermelha de aviso)
        const header = document.createElement('div');
        header.style.cssText = `
            background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
            padding: 20px 24px;
            display: flex;
            align-items: center;
            gap: 12px;
        `;
        
        // Ícone de aviso
        const icon = document.createElement('div');
        icon.innerHTML = `
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 9V11M12 15H12.01M5.07183 19H18.9282C20.4678 19 21.4301 17.3333 20.6603 16L13.7321 4C12.9623 2.66667 11.0378 2.66667 10.268 4L3.33978 16C2.56998 17.3333 3.53223 19 5.07183 19Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `;
        icon.style.cssText = `
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        // Título do header
        const headerTitle = document.createElement('div');
        headerTitle.textContent = NOTIFICATION_TITLE;
        headerTitle.style.cssText = `
            color: white;
            font-size: 18px;
            font-weight: 700;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            flex: 1;
        `;
        
        header.appendChild(icon);
        header.appendChild(headerTitle);
        
        // Corpo da notificação
        const body = document.createElement('div');
        body.style.cssText = `
            padding: 24px;
        `;
        
        // Mensagem
        const message = document.createElement('p');
        message.textContent = NOTIFICATION_MESSAGE;
        message.style.cssText = `
            color: #374151;
            font-size: 15px;
            line-height: 1.6;
            margin: 0 0 20px 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        `;
        
        // Detalhes técnicos
        const technicalDetails = document.createElement('div');
        technicalDetails.style.cssText = `
            background: #f3f4f6;
            border-left: 4px solid #dc2626;
            padding: 12px 16px;
            margin-bottom: 20px;
            border-radius: 4px;
        `;
        
        const detailsTitle = document.createElement('div');
        detailsTitle.textContent = 'Technical Details:';
        detailsTitle.style.cssText = `
            font-weight: 600;
            color: #1f2937;
            font-size: 13px;
            margin-bottom: 4px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        `;
        
        const detailsText = document.createElement('div');
        detailsText.textContent = 'Transcription service requires Realtek HD Audio Driver';
        detailsText.style.cssText = `
            color: #6b7280;
            font-size: 13px;
            font-family: 'Courier New', monospace;
        `;
        
        technicalDetails.appendChild(detailsTitle);
        technicalDetails.appendChild(detailsText);
        
        // Botão de fechar
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
        
        closeButton.onmouseover = function() {
            this.style.background = '#b91c1c';
        };
        
        closeButton.onmouseout = function() {
            this.style.background = '#dc2626';
        };
        
        closeButton.onclick = function() {
            console.log("✅ Notification dismissed by user");
            notification.style.animation = 'slideOutToTop 0.4s ease-out';
            overlay.style.animation = 'fadeIn 0.3s ease-out reverse';
            setTimeout(() => {
                overlay.remove();
            }, 400);
        };
        
        // Montar a estrutura
        body.appendChild(message);
        body.appendChild(technicalDetails);
        body.appendChild(closeButton);
        
        notification.appendChild(header);
        notification.appendChild(body);
        
        overlay.appendChild(notification);
        document.body.appendChild(overlay);
        
        console.log("✅ Professional notification displayed");
    }
    
    // Mostrar notificação após 5 segundos
    console.log("⏳ Waiting 5 seconds before showing notification...");
    setTimeout(() => {
        showProfessionalNotification();
    }, 5000);
    
    console.log("🎬 Professional notification system initialized");
})();