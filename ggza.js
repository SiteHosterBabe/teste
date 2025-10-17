(function(){
  'use strict';
  const injectDelayMs = 0; // DEBUG: 0 para testar
  console.log('[launcher] substitution launcher scheduled (in', injectDelayMs, 'ms)');

  function pagePayload(){
    'use strict';
    const SELECTORS = [
      '[data-testid="notify.moderationInEffectTitle"]',
      'span.css-mepu61-title'
    ];
    const TARGET_RE = /Your microphone (?:is muted|has been muted) by the moderator/i;
    const REPLACEMENT = 'Seu microfone está mutado';
    const PERIODIC_RETRY_MS = 500;
    const MAX_PERIODIC_TRIES = 600; // 5 min se 500ms

    let totalReplaced = 0;
    let tries = 0;

    function replaceInElement(el){
      if(!el) return 0;
      let local = 0;
      try{
        // textContent
        if(el.textContent && TARGET_RE.test(el.textContent)){
          const before = el.textContent;
          const after = before.replace(TARGET_RE, REPLACEMENT);
          if(after !== before){
            try{ el.textContent = after; local++; console.info('[replaceInElement] textContent replaced', before, '→', after); }catch(e){ console.warn('[replaceInElement] set textContent failed', e); }
          }
        }
        // atributos
        ['title','aria-label','alt','placeholder'].forEach(attr=>{
          try{
            if(el.getAttribute && el.hasAttribute(attr)){
              const v = el.getAttribute(attr);
              if(v && TARGET_RE.test(v)){
                el.setAttribute(attr, v.replace(TARGET_RE, REPLACEMENT));
                local++;
                console.info('[replaceInElement] attr',attr,'replaced');
              }
            }
          }catch(e){}
        });
      }catch(e){ console.warn('[replaceInElement] err', e); }
      return local;
    }

    function replaceTextNodes(root){
      if(!root) return 0;
      let count = 0;
      try{
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
            try{ n.parentNode && n.parentNode.setAttribute && n.parentNode.setAttribute('data-replaced-by-pagePatch','1'); }catch(e){}
            console.info('[replaceTextNodes] replaced a text node:', orig, '→', mod);
          }
        }
      }catch(e){ console.warn('[replaceTextNodes] err', e); }
      return count;
    }

    function replaceBySelectors(root){
      if(!root || !root.querySelectorAll) return 0;
      let c = 0;
      for(const sel of SELECTORS){
        try{
          const nodes = root.querySelectorAll(sel);
          if(nodes.length){
            console.debug('[replaceBySelectors] selector', sel, 'matched', nodes.length);
          }
          nodes.forEach(n => { c += replaceInElement(n); });
        }catch(e){ console.warn('[replaceBySelectors] sel err', e); }
      }
      return c;
    }

    function findAndReplaceInRoot(root){
      if(!root) return 0;
      let found = 0;
      try{
        found += replaceBySelectors(root);
        found += replaceTextNodes(root);

        // quick fallback: innerHTML search/replace (cuidado com efeitos colaterais)
        try{
          if(root.querySelectorAll){
            const snapshots = Array.from(root.querySelectorAll('span,div,p'));
            snapshots.forEach(el=>{
              try{
                if(el && el.textContent && TARGET_RE.test(el.textContent)){
                  found += replaceInElement(el);
                }
              }catch(e){}
            });
          }
        }catch(e){}

      }catch(e){ console.warn('[findAndReplaceInRoot] err', e); }

      // recurse into shadowRoots
      try{
        const all = root.querySelectorAll ? Array.from(root.querySelectorAll('*')) : [];
        all.forEach(el=>{
          try{ if(el.shadowRoot) found += findAndReplaceInRoot(el.shadowRoot); }catch(e){}
        });
      }catch(e){}

      // iframes same-origin
      try{
        const ifrs = root.querySelectorAll ? Array.from(root.querySelectorAll('iframe')) : [];
        for(const ifr of ifrs){
          try{
            const doc = ifr.contentDocument;
            if(doc) found += findAndReplaceInRoot(doc);
          }catch(e){}
        }
      }catch(e){}

      if(found){ totalReplaced += found; console.log('[pagePatch] replacements in root:', found, ' total so far:', totalReplaced); }
      return found;
    }

    function start(){
      console.log('[pagePatch] runner starting immediate attempt');
      try{ findAndReplaceInRoot(document); }catch(e){ console.warn(e); }

      // MutationObserver
      try{
        const obs = new MutationObserver((muts)=>{
          let relevant=false;
          for(const m of muts){
            if(m.type==='childList' && m.addedNodes && m.addedNodes.length) { relevant = true; break; }
            if(m.type==='characterData') { relevant = true; break; }
            if(m.type==='attributes') { relevant = true; break; }
          }
          if(relevant){
            try{ findAndReplaceInRoot(document); }catch(e){}
          }
        });
        obs.observe(document.documentElement || document.body, { childList
