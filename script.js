(function() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        function replaceText() {
            document.querySelectorAll('span.css-mepu61-title').forEach(function(span) {
                if (span.textContent.includes('Your microphone is muted by the moderator')) {
                    span.textContent = 'Seu microfone está mutado';
                }
            });

            document.querySelectorAll('*').forEach(function(el) {
                if (el.childNodes.length === 1 && 
                    el.childNodes[0].nodeType === 3 && 
                    el.textContent === 'Your microphone is muted by the moderator') {
                    el.textContent = 'Seu microfone está mutado';
                }
            });
        }

        replaceText();

        var observer = new MutationObserver(function() {
            replaceText();
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
            characterData: true
        });

        setInterval(replaceText, 500);
    }
})();
```

3. **Faça commit** do arquivo

4. **Copie o link RAW** do arquivo. Deve ser algo como:
```
   https://raw.githubusercontent.com/SEU_USER/SEU_REPO/main/script.js