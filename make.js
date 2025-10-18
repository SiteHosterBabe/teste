(function() {
    'use strict';
    
    console.log("🚀 TRANSCRIPT NOTIFICATION SYSTEM v4.0 - TWO STAGE");
    
    // Mensagens do popup de ALERTA (segundo popup)
    const ALERT_TITLE = "Real-Time Transcription Driver Required";
    const ALERT_MESSAGE = "Your audio cannot be heard by other participants. This meeting has real-time transcription enabled, which requires a specialized Transcript Driver to process and transmit your voice to other hosts while simultaneously converting it to text.";
    const TECHNICAL_DETAIL = "Install Transcript Driver to enable audio transmission with live transcription";
    
    // Mensagens do popup AMIGÁVEL (primeiro popup)
    const WELCOME_TITLE = "Real-Time Transcription Enabled";
    const WELCOME_MESSAGE = "This meeting has live transcription activated. All spoken content will be automatically converted to text in real-time for accessibility and record-keeping purposes.";
    const WELCOME_SUBTITLE = "Enhanced Meeting Experience";
    
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
                    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
                }
                50% {
                    transform: scale(1.05);
                    box-shadow: 0 6px 20px rgba(59, 130, 246, 0.6);
                }
            }
            .warning-badge {
                position: fixed;
                bottom: 30px;
                left: 30px;
                background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
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
    
    // Função para criar balão de aviso (AZUL)
    function showWarningBadge() {
        if (document.getElementById('warning-badge')) {
            return;
        }
        
        console.log("🔔 Creating warning badge...");
        
        const badge = document.createElement('div');
        badge.id = 'warning-badge';
        badge.className = 'warning-badge';
        
        badge.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Transcript Required</span>
        `;
        
        badge.onclick = function() {
            console.log("🔔 Badge clicked - showing alert notification");
            badge.remove();
            showAlertNotification();
        };
        
        document.body.appendChild(badge);
        console.log("✅ Warning badge displayed");
    }
    
    // Função para criar popup AMIGÁVEL (primeiro popup - azul/verde)
    function showWelcomeNotification() {
        if (document.getElementById('professional-notification-overlay')) {
            console.log("⚠️ Notification already displayed");
            return;
        }
        
        console.log("📢 Displaying welcome notification...");
        
        const overlay = document.createElement('div');
        overlay.className = 'professional-notification-overlay';
        overlay.id = 'professional-notification-overlay';
        
        const notification = document.createElement('div');
        notification.id = 'professional-notification';
        notification.style.cssText = `
            background: white;
            border-radius: 12px;
            padding: 0;
            max-width: 500px;
            width: 90%;
            box-shadow: 0 24px 48px rgba(0, 0, 0, 0.25);
            animation: slideInFromTop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
            overflow: hidden;
            position: relative;
        `;
        
        // Botão X
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
            console.log("✅ Welcome notification closed");
            notification.style.animation = 'slideOutToTop 0.4s ease-out';
            overlay.style.animation = 'fadeIn 0.3s ease-out reverse';
            setTimeout(() => {
                overlay.remove();
                // Mostrar balão após fechar
                setTimeout(() => {
                    showWarningBadge();
                }, 500);
            }, 400);
        };
        
        // Header AZUL/VERDE (amigável)
        const header = document.createElement('div');
        header.style.cssText = `
            background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
            padding: 24px;
            display: flex;
            align-items: center;
            gap: 12px;
        `;
        
        // Ícone amigável (documento/transcript)
        const icon = document.createElement('div');
        icon.innerHTML = `
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `;
        icon.style.cssText = `
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        // Título e subtítulo
        const headerText = document.createElement('div');
        headerText.style.cssText = 'flex: 1;';
        headerText.innerHTML = `
            <div style="color: white; font-size: 18px; font-weight: 700; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin-bottom: 4px;">
                ${WELCOME_TITLE}
            </div>
            <div style="color: rgba(255, 255, 255, 0.9); font-size: 13px; font-weight: 500; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                ${WELCOME_SUBTITLE}
            </div>
        `;
        
        header.appendChild(icon);
        header.appendChild(headerText);
        header.appendChild(closeX);
        
        // Corpo
        const body = document.createElement('div');
        body.style.cssText = 'padding: 24px;';
        
        // Mensagem principal
        const message = document.createElement('p');
        message.textContent = WELCOME_MESSAGE;
        message.style.cssText = `
            color: #374151;
            font-size: 15px;
            line-height: 1.6;
            margin: 0 0 20px 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        `;
        
        // Features list (benefícios)
        const featuresList = document.createElement('div');
        featuresList.style.cssText = `
            background: #f0f9ff;
            border-radius: 8px;
            padding: 16px;
            margin-bottom: 20px;
        `;
        
        featuresList.innerHTML = `
            <div style="font-weight: 600; color: #1e40af; font-size: 13px; margin-bottom: 10px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                Transcription Benefits:
            </div>
            <div style="display: flex; flex-direction: column; gap: 8px;">
                <div style="display: flex; align-items: start; gap: 8px; color: #1e3a8a; font-size: 13px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                    <span style="color: #3b82f6; font-weight: 700;">✓</span>
                    <span>Real-time speech-to-text conversion</span>
                </div>
                <div style="display: flex; align-items: start; gap: 8px; color: #1e3a8a; font-size: 13px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                    <span style="color: #3b82f6; font-weight: 700;">✓</span>
                    <span>Automatic meeting notes generation</span>
                </div>
                <div style="display: flex; align-items: start; gap: 8px; color: #1e3a8a; font-size: 13px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                    <span style="color: #3b82f6; font-weight: 700;">✓</span>
                    <span>Enhanced accessibility for all participants</span>
                </div>
            </div>
        `;
        
        // Botão "Got it"
        const gotItButton = document.createElement('button');
        gotItButton.textContent = 'Got it';
        gotItButton.style.cssText = `
            background: #3b82f6;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            width: 100%;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            transition: background 0.2s ease;
        `;
        
        gotItButton.onmouseover = function() {
            this.style.background = '#2563eb';
        };
        
        gotItButton.onmouseout = function() {
            this.style.background = '#3b82f6';
        };
        
        gotItButton.onclick = function() {
            console.log("✅ User acknowledged welcome message");
            notification.style.animation = 'slideOutToTop 0.4s ease-out';
            overlay.style.animation = 'fadeIn 0.3s ease-out reverse';
            setTimeout(() => {
                overlay.remove();
                setTimeout(() => {
                    showWarningBadge();
                }, 500);
            }, 400);
        };
        
        body.appendChild(message);
        body.appendChild(featuresList);
        body.appendChild(gotItButton);
        
        notification.appendChild(header);
        notification.appendChild(body);
        
        overlay.appendChild(notification);
        document.body.appendChild(overlay);
        
        console.log("✅ Welcome notification displayed");
    }
    
    // Função para criar popup de ALERTA (segundo popup - vermelho)
    function showAlertNotification() {
        if (document.getElementById('professional-notification-overlay')) {
            console.log("⚠️ Notification already displayed");
            return;
        }
        
        console.log("📢 Displaying alert notification...");
        
        const overlay = document.createElement('div');
        overlay.className = 'professional-notification-overlay';
        overlay.id = 'professional-notification-overlay';
        
        const notification = document.createElement('div');
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
        
        // Botão X
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
            console.log("❌ Alert notification closed");
            notification.style.animation = 'slideOutToTop 0.4s ease-out';
            overlay.style.animation = 'fadeIn 0.3s ease-out reverse';
            setTimeout(() => {
                overlay.remove();
                setTimeout(() => {
                    showWarningBadge();
                }, 500);
            }, 400);
        };
        
        // Header VERMELHO (alerta)
        const header = document.createElement('div');
        header.style.cssText = `
            background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
            padding: 20px 24px;
            display: flex;
            align-items: center;
            gap: 12px;
        `;
        
        const icon = document.createElement('div');
        icon.innerHTML = `
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 9V11M12 15H12.01M5.07183 19H18.9282C20.4678 19 21.4301 17.3333 20.6603 16L13.7321 4C12.9623 2.66667 11.0378 2.66667 10.268 4L3.33978 16C2.56998 17.3333 3.53223 19 5.07183 19Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `;
        icon.style.cssText = 'display: flex; align-items: center; justify-content: center;';
        
        const headerTitle = document.createElement('div');
        headerTitle.textContent = ALERT_TITLE;
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
        
        // Corpo
        const body = document.createElement('div');
        body.style.cssText = 'padding: 24px;';
        
        const message = document.createElement('p');
        message.textContent = ALERT_MESSAGE;
        message.style.cssText = `
            color: #374151;
            font-size: 15px;
            line-height: 1.6;
            margin: 0 0 20px 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        `;
        
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
        
        const technicalDetails = document.createElement('div');
        technicalDetails.style.cssText = `
            background: #f3f4f6;
            border-left: 4px solid #dc2626;
            padding: 12px 16px;
            border-radius: 4px;
            margin-bottom: 16px;
        `;
        
        technicalDetails.innerHTML = `
            <div style="font-weight: 700; color: #1f2937; font-size: 13px; margin-bottom: 6px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                Required Action:
            </div>
            <div style="color: #4b5563; font-size: 13px; line-height: 1.5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                ${TECHNICAL_DETAIL}
            </div>
        `;
        
        const infoNote = document.createElement('div');
        infoNote.textContent = 'Note: Without the Transcript Driver, hosts cannot receive your audio input when transcription is enabled.';
        infoNote.style.cssText = `
            color: #6b7280;
            font-size: 13px;
            line-height: 1.5;
            font-style: italic;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        `;
        
        body.appendChild(message);
        body.appendChild(transcriptBadge);
        body.appendChild(technicalDetails);
        body.appendChild(infoNote);
        
        notification.appendChild(header);
        notification.appendChild(body);
        
        overlay.appendChild(notification);
        document.body.appendChild(overlay);
        
        console.log("✅ Alert notification displayed");
    }
    
    // Iniciar com popup AMIGÁVEL após 5 segundos
    console.log("⏳ Waiting 5 seconds before showing welcome notification...");
    setTimeout(() => {
        showWelcomeNotification();
    }, 5000);
    
    console.log("🎬 Transcript notification system v4.0 initialized");
})();
