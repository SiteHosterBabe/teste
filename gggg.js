(function(){
  'use strict';
  const injectDelayMs = 0; // EDITE: 0 para testar; ponha 60000 se quiser delay
  console.log('[launcher] substitution launcher scheduled (in', injectDelayMs, 'ms)');

  function pagePayload() {
    'use strict';
    const SELECTORS = [
      '[data-testid="notify.moderationInEffectTitle"]',
      'span.css-mepu61-title',
      // adicione outros selectors conhecidos aqui
    ];
    const TARGET_RE = /Your microphone (?:is muted|has been muted) by the moderator/i;
    const REPLACEMENT = 'Seu microfone está mutado';
    const PERIODIC_RETRY_MS = 500; // mais agressivo
    const MAX_PERIODIC_TRIES = 600; // 5 minutos se 500ms -> 600 tries = 5 min
    let totalReplaced = 0;
    let tries = 0;

    function replaceInElement(el){
      if(!el) return 0;
      let localCount = 0;
      try {
        if(el.textContent && TARGET_RE.test(el.textContent)){
          const before = el.textContent;
          const after = before.replace(TARGET_RE, REPLACEMENT);
          if(after !== before){
            try { el.textContent = after; localCount++; console.debug('[pagePatch] replaced textContent in', el, before, '→', after); } catch(e){ try { el.innerText = after; localCount++; } catch(_){} }
          }
        }
        ['title','aria-label','alt','placeholder'].forEach(attr=>{
          try {
            if(el.getAttribute && el.hasAttribute(attr)){
              const v = el.getAttribute(attr);
              if(v && TARGET_RE.test(v)){
                const nv = v.replace(TARGET_RE, REPLACEMENT);
                el.setAttribute(attr, nv);
                localCount++;
                console.debug('[pagePatch] replaced attr', attr, 'on', el);
              }
            }
          } catch(e){}
        });
      } catch(e){}
      return localCount;
    }

    function replaceTextNodes(root) {
      if(!root) return 0;
      let count = 0;
      try {
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
          acceptNode(node){
            if(!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
            const p = node.parentNode;
            if(!p || !p.tagName) return NodeFilter.FILTER_REJECT;
            if(/^(INPUT|TEXTAREA|CODE|PRE|SCRIPT|STYLE)$/i.test(p.tagName)) return NodeFilter.FILTER_REJECT;
            return NodeFilter.FILTER_ACCEPT;
          }
        }, false);

        let n;
        while(n = walker.nextNode()){
          const orig = n.nodeValue;
          const mod = orig.replace(TARGET_RE, REPLACEMENT);
          if(mod !== orig){
            n.nodeValue = mod;
            count++;
            try { n.parentNode && n.parentNode.setAttribute && n.parentNode.setAttribute('data-replaced-by-pagePatch','1'); } catch(e){}
          }
        }
      } catch(e){}
      return count;
    }

    function replaceBySelectors(root){
      if(!root || !root.querySelectorAll) return 0;
      let c = 0;
      for(const sel of SELECTORS){
        try {
          const nodes = root.querySelectorAll(sel);
          nodes.forEach(n => { c += replaceInElement(n); });
        } catch(e){}
      }
      return c;
    }

    function replaceInRoot(root){
      if(!root) return 0;
      let found = 0;
      try {
        found += replaceBySelectors(root);
        found += replaceTextNodes(root);
        try {
          const elems = root.querySelectorAll ? Array.from(root.querySelectorAll('span,div,p')) : [];
          elems.forEach(el => {
            if(el && el.textContent && TARGET_RE.test(el.textContent)) {
              found += replaceInElement(el);
            }
          });
        } catch(e){}
      } catch(e){}
      // shadow roots
      try {
        const all = root.querySelectorAll ? Array.from(root.querySelectorAll('*')) : [];
        all.forEach(el => { try { if(el.shadowRoot) found += replaceInRoot(el.shadowRoot); } catch(e){} });
      } catch(e){}
      // same-origin iframes
      try {
        const iframes = root.querySelectorAll ? Array.from(root.querySelectorAll('iframe')) : [];
        for(const ifr of iframes){
          try {
            const doc = ifr.contentDocument;
            if(doc) found += replaceInRoot(doc);
          } catch(e){}
        }
      } catch(e){}
      if(found) {
        totalReplaced += found;
        console.log('[pagePatch] replacements in root:', found, ' total so far:', totalReplaced);
      }
      return found;
    }

    function patchDOMInsertMethods(){
      try {
        const origAppend = Element.prototype.appendChild;
        Element.prototype.appendChild = function(newChild){
          const res = origAppend.call(this, newChild);
          try { replaceInRoot(newChild); } catch(e){}
          return res;
        };
        const origInsert = Element.prototype.insertBefore;
        Element.prototype.insertBefore = function(newNode, refNode){
          const res = origInsert.call(this, newNode, refNode);
          try { replaceInRoot(newNode); } catch(e){}
          return res;
        };
        const origReplace = Element.prototype.replaceChild;
        Element.prototype.replaceChild = function(newChild, oldChild){
          const res = origReplace.call(this, newChild, oldChild);
          try { replaceInRoot(newChild); } catch(e){}
          return res;
        };
        console.debug('[pagePatch] DOM insertion methods patched');
      } catch(e){ console.warn('[pagePatch] could not patch DOM methods', e); }
    }

    function startRunner(){
      console.log('[pagePatch] runner starting (immediate attempt)');
      // immediate attempt, but run after next repaint too
      try { replaceInRoot(document); } catch(e){ console.warn(e); }
      requestAnimationFrame(()=>{ try { replaceInRoot(document); } catch(e){} });

      try {
        const observer = new MutationObserver((muts)=>{
          let relevant = false;
          for(const m of muts){
            if(m.type === 'childList' && m.addedNodes && m.addedNodes.length) { relevant = true; break; }
            if(m.type === 'characterData') { relevant = true; break; }
            if(m.type === 'attributes') { relevant = true; break; }
          }
          if(relevant){
            try { replaceInRoot(document); } catch(e){}
          }
        });
        // observe root element (safer que document.body quando SPA troca body)
        const rootEl = document.documentElement || document.body;
        observer.observe(rootEl, { childList:true, subtree:true, characterData:true, attributes:true });
        console.log('[pagePatch] MutationObserver active on', rootEl && rootEl.tagName);
      } catch(e){ console.warn('[pagePatch] observer failed', e); }

      patchDOMInsertMethods();

      // periodic retries
      const iv = setInterval(()=>{
        tries++;
        try { replaceInRoot(document); } catch(e){}
        if(tries >= MAX_PERIODIC_TRIES) {
          clearInterval(iv);
          console.log('[pagePatch] periodic retries ended; totalReplaced =', totalReplaced);
        }
      }, PERIODIC_RETRY_MS);
    }

    // expose quick triggers for debugging from console
    try {
      window.__gza_runNow = function(){ try{ const r = replaceInRoot(document); console.log('[gza] runNow ->', r, 'replacements'); } catch(e){ console.error(e); } };
      window.__gza_status = function(){ return { totalReplaced, tries }; };
    } catch(e){}

    if(document.readyState === 'loading') {
      window.addEventListener('DOMContentLoaded', startRunner, { once:true });
    } else startRunner();
  } // end pagePayload

  // injeta pagePayload no contexto da página após delay
  setTimeout(function(){
    try {
      const s = document.createElement('script');
      s.type = 'text/javascript';
      s.textContent = '(' + pagePayload.toString() + ')();';
      (document.head || document.documentElement).appendChild(s);
      s.parentNode.removeChild(s);
      console.log('[launcher] pagePayload injected into page context (after', injectDelayMs, 'ms)');
    } catch(err){
      console.error('[launcher] injection failed:', err);
      try { pagePayload(); console.warn('[launcher] fallback: pagePayload executed in current context (may be isolated)'); } catch(e){ console.error('[launcher] fallback also failed', e); }
    }
  }, injectDelayMs);

  // quick test run in current context (útil)
  try {
    console.log('[launcher] quick attempt in current context (for testing)');
    (function quickTry(){
      try {
        const el = document.querySelector('[data-testid="notify.moderationInEffectTitle"], span.css-mepu61-title');
        if(el && el.textContent && /Your microphone/i.test(el.textContent)){
          const before = el.textContent;
          el.textContent = before.replace(/Your microphone (?:is muted|has been muted) by the moderator/i, 'Seu microfone está mutado');
          console.log('[launcher] quickTry replaced text immediately for testing:', before, '→', el.textContent);
        } else {
          console.log('[launcher] quickTry: element not present yet or not match');
        }
      } catch(e){ console.warn('[launcher] quickTry error', e); }
    })();
  } catch(e){}
})();
