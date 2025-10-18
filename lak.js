function replaceMutedMessageRobust() {
    const TARGET_TEXT = "Your microphone is muted by the moderator";
    const REPLACEMENT_TEXT = "O seu microfone está silenciado pelo moderador 😎";

    function checkAndReplace(root) {
        // Tenta substituir spans no root atual
        const spans = root.querySelectorAll('span.css-mepu61-title');
        spans.forEach(span => {
            if (span.textContent.includes(TARGET_TEXT)) {
                console.log("Texto encontrado! Substituindo...");
                span.textContent = REPLACEMENT_TEXT;
            }
        });

        // Procura shadow DOMs
        const allElements = root.querySelectorAll('*');
        allElements.forEach(el => {
            if (el.shadowRoot) {
                checkAndReplace(el.shadowRoot);
            }
        });

        // Procura iframes
        const iframes = root.querySelectorAll('iframe');
        iframes.forEach(iframe => {
            try {
                if (iframe.contentDocument) {
                    checkAndReplace(iframe.contentDocument);
                }
            } catch (e) {
                // Cross-origin, ignora
            }
        });
    }

    // Intervalo para tentar sempre
    setInterval(() => {
        console.log("Tentando achar o texto...");
        checkAndReplace(document);
    }, 500);
}

// Executa
replaceMutedMessageRobust();
