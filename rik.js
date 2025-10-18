(function() {
    'use strict';
    
    console.log("🚀 Script de modificação carregado!");
    
    const TARGET_TEXT = "Your microphone is muted by the moderator";
    const REPLACEMENT_TEXT = "O seu microfone está silenciado pelo moderador 😎";
    
    function replaceInCurrentContext() {
        let replaced = false;
        
        // Procurar em TODOS os elementos da página atual
        document.querySelectorAll('*').forEach(el => {
            // Verificar text nodes diretos
            el.childNodes.forEach(node => {
                if (node.nodeType === 3 && node.textContent.includes(TARGET_TEXT)) {
                    node.textContent = node.textContent.replace(TARGET_TEXT, REPLACEMENT_TEXT);
                    console.log("✅ Texto substituído com sucesso!");
                    replaced = true;
                }
            });
            
            // Verificar spans específicos
            if (el.classList && el.classList.contains('css-mepu61-title') && el.textContent.includes(TARGET_TEXT)) {
                el.textContent = REPLACEMENT_TEXT;
                console.log("✅ Texto substituído em span!");
                replaced = true;
            }
        });
        
        return replaced;
    }
    
    function init() {
        console.log("🔍 Monitorando alterações no DOM...");
        
        // Verificação contínua a cada 300ms
        setInterval(() => {
            replaceInCurrentContext();
        }, 300);
        
        // MutationObserver para mudanças
        const observer = new MutationObserver(() => {
            replaceInCurrentContext();
        });
        
        // Aguardar body estar pronto
        if (document.body) {
            observer.observe(document.body, {
                childList: true,
                subtree: true,
                characterData: true
            });
            console.log("✅ Observer ativo!");
        } else {
            setTimeout(init, 100);
        }
    }
    
    // Iniciar
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Backup: iniciar após 500ms também
    setTimeout(init, 500);
    
    console.log("🎬 Sistema pronto!");
})();