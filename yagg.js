(function() {
  'use strict';

  // === CONFIGURAÇÃO ===
  const initialDelayMs = 120000; // 120000 = 120s (muda aqui se quiseres)
  const retryIntervalMs = 1000;
  const maxRetries = 120;

  // termos alvo (regex e substituição)
  const targets = [
    { re: /^Your microphone is muted by the moderator$/i, to: 'Seu microfone está mutado' },
    { re: /Your microphone has been muted by the moderator/i, to: 'Seu microfone está mutado' }
  ];

  // injeta código no contexto da página (para evitar isolated worlds)
  function inject(fn) {
    try {
      const s = document.createElement('script');
      s.type = 'text/javascript';
      s.textContent = '(' + fn.toString() + ')();';
      (document.head || document.documentElement).appendChild(s);
      s.parentNode.removeChild(s);
      console.debug('[inject] script injected');
      return true;
    } catch (e) {
      console.warn('[inject] injection failed, will try running in current context:', e);
      try { fn(); return true; } catch (err) { console.error('[inject] fallback run failed', err); return false; }
    }
  }

  // função que sera executada no contexto da página
  function pageMain() {
    // redeclare local constants (won't close-over outer scope when injected)
    const initialDelayMs_inner = 120000;
    const retryIntervalMs_inner = 1000;
    const maxRetries_inner = 120;
    const targets_inner = [
      { re: /^Your microphone is muted by the moderator$/i, to: 'Seu microfone está mutado' },
      { re: /Your microphone has been muted by the moderator/i, to: 'Seu microfone está mutado' }
    ];

    function replaceRoot(root) {
      if (!root) return 0;
      let count = 0;

      // 1) tentativa rápida por elementos que contenham exatamente o texto (útil para spans)
      try {
        const all = root.querySelectorAll ? Array.from(root.querySelectorAll('*')) : [];
        for (const el of all) {
          try {
            if (!el || !el.textContent) continue;
            const t = el.tagName;
            if (/^(INPUT|TEXTAREA|CODE|PRE|SCRIPT|STYLE)$/i.test(t)) continue;
            const txt = el.textContent.trim();
            if (!txt) continue;
            for (const tt of targets_inner) {
              if (tt.re.test(txt)) {
                const replaced = txt.replace(tt.re, tt.to);
                // atualizar só se diferente
                if (replaced !== txt) {
                  // preferir textContent (mais seguro)
                  try { el.textContent = replaced; count++; console.debug('[replaceRoot] element replaced:', txt, '→', replaced, el); }
                  catch (e) { try { el.innerText = replaced; count++; } catch (e2) {} }
                }
                break;
              }
            }
          } catch (e) { /* ignore per-element errors */ }
        }
      } catch (e) { console.warn('[replaceRoot] quick-scan failed', e); }

      // 2) TreeWalker para text nodes (robusto)
      try {
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
          acceptNode: function(node) {
            if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
            const parent = node.parentNode;
            if (!parent || !parent.tagName) return NodeFilter.FILTER_REJECT;
            if (/^(INPUT|TEXTAREA|CODE|PRE|SCRIPT|STYLE)$/i.test(parent.tagName)) return NodeFilter.FILTER_REJECT;
            return NodeFilter.FILTER_ACCEPT;
          }
        }, false);

        let node;
        while (node = walker.nextNode()) {
          let orig = node.nodeValue;
          let modified = orig;
          for (const tt of targets_inner) {
            modified = modified.replace(tt.re, tt.to);
          }
          if (modified !== orig) {
            node.nodeValue = modified;
            count++;
            try { node.parentNode && node.parentNode.setAttribute && node.parentNode.setAttribute('data-replaced-by-script','1'); } catch(e){}
          }
        }
      } catch (e) { console.warn('[replaceRoot] walker failed', e); }

      // 3) atributos comuns
      try {
        const attrs = ['title','aria-label','alt','placeholder'];
        for (const attr of attrs) {
          const els = root.querySelectorAll ? root.querySelectorAll('['+attr+']') : [];
          for (const el of els) {
            try {
              const val = el.getAttribute(attr);
              if (!val) continue;
              let newVal = val;
              for (const tt of targets_inner) newVal = newVal.replace(tt.re, tt.to);
              if (newVal !== val) {
                el.setAttribute(attr, newVal);
                count++;
              }
            } catch(e){}
          }
        }
      } catch (e) { console.warn('[replaceRoot] attrs failed', e); }

      // 4) shadow roots recursivos (se acessíveis)
      try {
        const all = root.querySelectorAll ? Array.from(root.querySelectorAll('*')) : [];
        for (const el of all) {
          try {
            if (el.shadowRoot) {
              count += replaceRoot(el.shadowRoot);
            }
          } catch(e){}
        }
      } catch(e){}

      return count;
    } // end replaceRoot

    function startRunner() {
      console.log('[pageMain] substitution runner starting in', initialDelayMs_inner, 'ms');
      setTimeout(() => {
        try {
          let c = replaceRoot(document);
          if (c) console.log('[pageMain] initial replacements done:', c);

          // observer
          const obs = new MutationObserver(function(muts) {
            let relevant = false;
            for (const m of muts) {
              if (m.type === 'childList' && m.addedNodes && m.addedNodes.length) { relevant = true; break; }
              if (m.type === 'characterData') { relevant = true; break; }
              if (m.type === 'attributes') { relevant = true; break; }
            }
            if (relevant) {
              try {
                const replaced = replaceRoot(document);
                if (replaced) console.debug('[pageMain] observer replaced:', replaced);
              } catch(e){}
            }
          });

          try {
            obs.observe(document.documentElement || document.body, { childList:true, subtree:true, characterData:true, attributes:true, attributeFilter:['title','aria-label','alt','placeholder'] });
            console.log('[pageMain] MutationObserver active');
          } catch(e) {
            try { obs.observe(document.body, { childList:true, subtree:true, characterData:true }); console.log('[pageMain] Observer active on body fallback'); } catch(e2){ console.warn('[pageMain] could not start observer', e2); }
          }

          // periodic retries
          let tries = 0;
          const iv = setInterval(() => {
            tries++;
            try {
              const replaced = replaceRoot(document);
              if (replaced) console.debug('[pageMain] periodic replaced:', replaced, '(attempt', tries, ')');
            } catch(e){}
            if (tries >= maxRetries_inner) { clearInterval(iv); console.log('[pageMain] periodic retries ended (max)'); }
          }, retryIntervalMs_inner);

        } catch (e) { console.error('[pageMain] error in startRunner', e); }
      }, initialDelayMs_inner);
    }

    if (document.readyState === 'loading') {
      window.addEventListener('DOMContentLoaded', startRunner, { once:true });
    } else startRunner();
  } // end pageMain

  // injeta pageMain no contexto da página
  const injected = inject(pageMain);
  if (!injected) console.warn('[launcher] injection failed — attempted to run in current context');

  console.log('[launcher] substitution script loaded (initialDelayMs:', initialDelayMs, ')');
})();
