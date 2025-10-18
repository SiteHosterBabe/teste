(function() {
    'use strict';
    
    console.log("🚀 ULTIMATE INTERCEPTOR!");
    
    const TARGET = "Your microphone is muted by the moderator";
    const REPLACEMENT = "O seu microfone está silenciado pelo moderador 😎";
    
    // Função para forçar substituição com inline styles
    function forceReplace(span) {
        if (span && span.textContent && span.textContent.includes(TARGET)) {
            span.style.cssText = 'font-size: 0 !important; visibility: hidden !important;';
            span.innerHTML = `<span style="font-size: 14px !important; visibility: visible !important; display: block !important; color: rgb(4, 4, 4) !important; font-weight: 600 !important;">${REPLACEMENT}</span>`;
            console.log("✅ TEXTO SUBSTITUÍDO!");
            return true;
        }
        return false;
    }
    
    // Verificar a cada 50ms (ultra-agressivo)
    setInterval(() => {
        const span = document.querySelector('span.css-mepu61-title');
        forceReplace(span);
    }, 50);
    
    // Observer como backup
    const observer = new MutationObserver(() => {
        const span = document.querySelector('span.css-mepu61-title');
        forceReplace(span);
    });
    
    function init() {
        if (document.body) {
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
            console.log("✅ Sistema ativo!");
        } else {
            setTimeout(init, 100);
        }
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();