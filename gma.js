(function(){
  'use strict';

  console.log('[launcher] dynamic text replacement script started');

  // === CONFIGURAÇÃO ===
  const SELECTORS = [
    '[data-testid="notify.moderationInEffectTitle"]',
    'span.css-mepu61-title'
  ];
  const TARGET_RE = /Your microphone (?:is muted|has been muted) by the moderator/i;
  const REPLACEMENT = 'Seu microfone está mutado';

  // substitui texto em um elemento
  function replaceInElement(el){
    if(!el) return false;
    let changed = false;
    try {
      if(el.textContent && TARGET_RE.test(el.textContent)){
        el.textContent = el.textContent.replace(TARGET_RE, REPLACEMENT);
        changed = true;
        console.log('[pagePatch] text replaced in element:', el);
      }
      ['title','aria-label','alt','placeholder'].forEach(attr=>{
        if(el.getAttribute && el.hasAttribute(attr)){
          const v = el.getAttribute(attr);
          if(v && TARGET_RE.test(v)){
            el.setAttribute(attr, v.replace(TARGET_RE, REPLACEMENT));
            changed = true;
            console.log('[pagePatch] text replaced in attribute', attr, 'of element', el);
          }
        }
      });
    } catch(e){
      console.warn('[pagePatch] replaceInElement error', e);
    }
    return changed;
  }

  // função principal: busca e substitui em todos os selectors conhecidos
  function replaceBySelectors(){
    let anyReplaced = false;
    SELECTORS.forEach(sel=>{
      const nodes = document.querySelectorAll(sel);
      nodes.forEach(n=>{
        if(replaceInElement(n)) anyReplaced = true;
      });
    });
    return anyReplaced;
  }

  // observador de mudanças no DOM
  function startObserver(){
    const observer = new MutationObserver((mutations, obs)=>{
      if(replaceBySelectors()){
        console.log('[pagePatch] replacement done via MutationObserver');
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    console.log('[pagePatch] MutationObserver active on body');
  }

  // tenta substituir imediatamente e iniciar observador
  function init(){
    if(document.readyState === 'loading'){
      window.addEventListener('DOMContentLoaded', ()=>{
        replaceBySelectors();
        startObserver();
      });
    } else {
      replaceBySelectors();
      startObserver();
    }
  }

  // iniciar
  init();
})();
