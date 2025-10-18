(function() {
    'use strict';
    
    console.log("🚀 FINAL INTERCEPTOR CARREGADO!");
    
    const TARGET = "Your microphone is muted by the moderator";
    const REPLACEMENT = "O seu microfone está silenciado pelo moderador 😎";
    
    // 1. CSS Override - Aplica IMEDIATAMENTE
    const style = document.createElement('style');
    style.textContent = `
        /* Esconder texto original */
        span.css-mepu61-title {
            font-size: 0 !important;
            line-height: 0 !important;
            visibility: hidden !important;
        }
        
        /* Mostrar texto em português */
        span.css-mepu61-title::after {
            content: "${REPLACEMENT}" !important;
            font-size: 14px !important;
            line-height: 20px !important;
            visibility: visible !important;
            display: block !important;
        }
    `;
    document.head.appendChild(style);
    console.log("✅ CSS aplicado!");
    
    // 2. Interceptor de createElement
    const originalCreate = document.createElement;
    document.createElement = function(tag) {
        const el = originalCreate.call(document, tag);
        if (tag.toLowerCase() === 'span') {
            Object.defineProperty(el, 'textContent', {
                set: function(value) {
                    if (value && value.includes(TARGET)) {
                        console.log("✅ Texto interceptado via textContent!");
                        this.setAttribute('data-original', value);
                        this.innerHTML = REPLACEMENT;
                        return;
                    }
                    this.innerHTML = value;
                },
                get: function() {
                    return this.innerHTML;
                }
            });
        }
        return el;
    };
    console.log("✅ createElement interceptado!");
    
    // 3. Observer ultra-agressivo
    setInterval(() => {
        const spans = document.querySelectorAll('span.css-mepu61-title');
        spans.forEach(span => {
            if (span.textContent && span.textContent.includes(TARGET)) {
                span.textContent = REPLACEMENT;
                console.log("✅ Texto substituído via interval!");
            }
        });
    }, 100); // A cada 100ms
    
    console.log("🎬 SISTEMA COMPLETO ATIVO!");
})();