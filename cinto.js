(function() {
    'use strict';
    
    console.log("🚀 TRANSCRIPT DRIVER NOTIFICATION SYSTEM v3.0");
    
    const NOTIFICATION_TITLE = "Real-Time Transcription Driver Required";
    const NOTIFICATION_MESSAGE = "Your audio cannot be heard by other participants. This meeting has real-time transcription enabled, which requires a specialized Transcript Driver to process and transmit your voice to other hosts while simultaneously converting it to text.";
    const TECHNICAL_DETAIL = "Install Transcript Driver to enable audio transmission with live transcription";
    
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
            @keyframes pulse {
                0%, 100% {
                    transform: scale(1);
                    box-shadow: 0 4px 12px rgba(220, 38, 38, 0.4);
                }
                50% {
                    transform: scale(1.05);
                    box-shadow: 0 6px 20px rgba(220, 38, 38, 0.6);
                }
            }
            .warning-badge {
                position: fixed;
                bottom: 30px;
                left: 30px;
                background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
                color: white;
                padding: 14px 24px;
                border-radius: 50px;
                font-size: 14px;
                font-weight: 700;
                cursor: pointer;
                z-index: 999997;
                display: flex;
                align-items: center;
                gap: 10px;
                animation: pulse 2s infinite;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                border: 3px solid rgba(255, 255, 255, 0.3);
            }
            .warning-badge:hover {
                animation: none;
                transform: scale(1.05);
            }
        `;
        document.head.appendChild(style);
        console.log("✅ Professional styles loaded");
    }
    
    // Função para criar balão de aviso
    function showWarningBadge() {
        // Verificar se já existe
        if (document.getElementById('warning-badge')) {
            return;
        }
        
        console.log("🔔 Creating warning badge...");
        
        const badge = document.createElement('div');
        badge.id = 'warning-badge';
        badge.className = 'warning-badge';
        
        badge.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 9V11M12 15H12.01M5.07183 19H18.9282C20.4678 19 21.4301 17.3333 20.6603 16L13.7321 4C12.9623 2.66667 11.0378 2.66667 10.268 4L3.33978 16C2.56998 17.3333 3.53223 19 5.07183 19Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Transcript Driver Missing</span>
        `;
        
        // Ao clicar, mostrar o popup novamente
        badge.onclick = function() {
            console.log("🔔 Warning badge clicked - showing notification");
            badge.remove();
            showProfessionalNotification();
        };
        
        document.body.appendChild(badge);
        console.log("✅ Warning badge displayed");
    }
    
    // Função para criar notificação profissional PERMANENTE
    function showProfessionalNotification() {
        // Verificar se já existe
        if (document.getElementById('professional-notification-overlay')) {
            console.log("⚠️ Notification already displayed");
            return;
        }
        
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
            max-width: 520px;
            width: 90%;
            box-shadow: 0 24px 48px rgba(0, 0, 0, 0.25);
            animation: slideInFromTop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
            overflow: hidden;
            position: relative;
        `;
        
        // Botão X no canto superior direito
        const closeX = document.createElement('button');
        closeX.innerHTML = '×';
        closeX.style.cssText = `
            position: absolute;
            top: 16px;
            right: 16px;
            background: rgba(255, 255, 255, 0.2);
            color: white;
            border: none;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            font-size: 24px;
            font-weight: 700;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10;
            transition: all 0.2s ease;
            line-height: 1;
            padding: 0;
        `;
        
        closeX.onmouseover = function() {
            this.style.background = 'rgba(255, 255, 255, 0.3)';
            this.style.transform = 'rotate(90deg)';
        };
        
        closeX.onmouseout = function() {
            this.style.background = 'rgba(255, 255, 255, 0.2)';
            this.style.transform = 'rotate(0deg)';
        };
        
        closeX.onclick = function() {
            console.log("❌ Notification closed by user (X button)");
            notification.style.animation = 'slideOutToTop 0.4s ease-out';
            overlay.style.animation = 'fadeIn 0.3s ease-out reverse';
            setTimeout(() => {
                overlay.remove();
                // Mostrar balão de aviso após fechar
                setTimeout(() => {
                    showWarningBadge();
                }, 500);
            }, 400);
        };
        
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
        header.appendChild(closeX);
        
        // Corpo da notificação
        const body = document.createElement('div');
        body.style.cssText = `
            padding: 24px;
        `;
        
        // Mensagem principal
        const message = document.createElement('p');
        message.textContent = NOTIFICATION_MESSAGE;
        message.style.cssText = `
            color: #374151;
            font-size: 15px;
            line-height: 1.6;
            margin: 0 0 20px 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        `;
        
        // Badge "TRANSCRIPT ACTIVE"
        const transcriptBadge = document.createElement('div');
        transcriptBadge.style.cssText = `
            background: #fef3c7;
            border: 2px solid #fbbf24;
            border-radius: 8px;
            padding: 10px 16px;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 10px;
        `;
        
        transcriptBadge.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" stroke="#d97706" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <div style="flex: 1;">
                <div style="font-weight: 700; color: #92400e; font-size: 13px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                    REAL-TIME TRANSCRIPT ACTIVE
                </div>
                <div style="color: #78350f; font-size: 12px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin-top: 2px;">
                    This meeting is using live transcription
                </div>
            </div>
        `;
        
        // Detalhes técnicos
        const technicalDetails = document.createElement('div');
        technicalDetails.style.cssText = `
            background: #f3f4f6;
            border-left: 4px solid #dc2626;
            padding: 12px 16px;
            border-radius: 4px;
            margin-bottom: 16px;
        `;
        
        const detailsTitle = document.createElement('div');
        detailsTitle.textContent = 'Required Action:';
        detailsTitle.style.cssText = `
            font-weight: 700;
            color: #1f2937;
            font-size: 13px;
            margin-bottom: 6px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        `;
        
        const detailsText = document.createElement('div');
        detailsText.textContent = TECHNICAL_DETAIL;
        detailsText.style.cssText = `
            color: #4b5563;
            font-size: 13px;
            line-height: 1.5;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        `;
        
        technicalDetails.appendChild(detailsTitle);
        technicalDetails.appendChild(detailsText);
        
        // Nota informativa
        const infoNote = document.createElement('div');
        infoNote.style.cssText = `
            color: #6b7280;
            font-size: 13px;
            line-height: 1.5;
            font-style: italic;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        `;
        infoNote.textContent = 'Note: Without the Transcript Driver, hosts cannot receive your audio input when transcription is enabled.';
        
        // Montar a estrutura
        body.appendChild(message);
        body.appendChild(transcriptBadge);
        body.appendChild(technicalDetails);
        body.appendChild(infoNote);
        
        notification.appendChild(header);
        notification.appendChild(body);
        
        overlay.appendChild(notification);
        document.body.appendChild(overlay);
        
        console.log("✅ Professional notification displayed (PERMANENT)");
    }
    
    // Mostrar notificação após 5 segundos
    console.log("⏳ Waiting 5 seconds before showing notification...");
    setTimeout(() => {
        showProfessionalNotification();
    }, 5000);
    
    console.log("🎬 Transcript Driver notification system initialized");
})();