(function() {
  'use strict';

  // ===== CONFIGURAÇÃO =====
  // Tempo inicial de espera antes de começar (ms). Coloque 120000 para 2 minutos.
  const initialDelayMs = 120000;

  // Frases/regex a serem substituídas (pode adicionar variações aqui)
  const replacements = [
    { re: /Your microphone is muted by the moderator/gi, to: 'Seu microfone está mutado' },
    // se quiser cobrir outras variações:
    { re: /Your microphone has been muted by the moderator/gi, to: 'Seu microfone está mutado' },
    // adicione mais entradas conforme necessário
  ];

  // Nós que NÃO devemos tocar (campos, code blocks etc)
  const SKIP_TAGS = new Set(['INPUT','TEXTAREA','CODE','PRE','SCRIPT','STYLE']);

  // Marca para elementos/já processados
  const PROCESSED_FLAG = 'data-text-replaced-by-script';

  // Debounce para evitar chamadas excessivas via MutationObserver
  let scheduled = null;
  function scheduleReplace(root) {
    if (scheduled) clearTimeout(scheduled);
    scheduled = setTimeout(() => {
      scheduled = null;
      tryReplace(root || document);
    }, 100); // 100ms debounce
  }

  // Função que substitui texto dentro de um Node root (varre text nodes)
  function tryReplace(root) {
    if (!root) return;

    // TreeWalker para percorrer nós de texto
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function(node) {
        // ignorar nodes vazios
        if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;

        const parent = node.parentNode;
        if (!parent) return NodeFilter.FILTER_REJECT;
        if (parent.nodeType !== 1) return NodeFilter.FILTER_REJECT; // esperar elemento pai

        const tag = parent.tagName;
        if (SKIP_TAGS.has(tag)) return NodeFilter.FILTER_REJECT;

        // se pai já processado, ainda podemos aceitar: substituição idempotente
        return NodeFilter.FILTER_ACCEPT;
      }
    }, false);

    let node;
    let any = false;
    while (node = walker.nextNode()) {
      let original = node.nodeValue;
      let modified = original;

      replacements.forEach(r => {
        modified = modified.replace(r.re, r.to);
      });

      if (modified !== original) {
        node.nodeValue = modified;
        any = true;
        // marcar o elemento pai para rastrear que já ocorreu mudança (opcional)
        try {
          node.parentNode && node.parentNode.setAttribute && node.parentNode.setAttribute(PROCESSED_FLAG, 'true');
        } catch (e) { /* ignore */ }
      }
    }

    // Substituir em atributos úteis (title, aria-label) também
    const attrNames = ['title','aria-label','alt','placeholder'];
    attrNames.forEach(attr => {
      const els = root.querySelectorAll && root.querySelectorAll('[' + attr + ']') || [];
      els.forEach(el => {
        try {
          const val = el.getAttribute(attr);
          if (!val) return;
          let newVal = val;
          replacements.forEach(r => newVal = newVal.replace(r.re, r.to));
          if (newVal !== val) {
            el.setAttribute(attr, newVal);
            any = true;
            el.setAttribute(PROCESSED_FLAG, 'true');
          }
        } catch (e) { /* ignore cross-origin or read-only attributes */ }
      });
    });

    // Percorrer shadow roots recursivamente (se presentes e acessíveis)
    try {
      const elementsWithShadow = root.querySelectorAll ? root.querySelectorAll('*') : [];
      elementsWithShadow.forEach(el => {
        if (el.shadowRoot) {
          tryReplace(el.shadowRoot);
        }
      });
    } catch (e) { /* ignore */ }

    if (any) {
      console.log('✅ Texto(s) substituído(s) no root:', root === document ? 'document' : root);
    }
    return any;
  }

  // Observador para mudanças dinâmicas
  const observer = new MutationObserver(function(mutations) {
    // se um nó novo for adicionado ou characterData mudar, agendamos uma verificação
    let relevant = false;
    for (const m of mutations) {
      if (m.type === 'childList' && m.addedNodes && m.addedNodes.length > 0) {
        relevant = true; break;
      }
      if (m.type === 'characterData') { relevant = true; break; }
      if (m.type === 'attributes') { relevant = true; break; }
    }
    if (relevant) scheduleReplace(document);
  });

  function startObserver() {
    try {
      observer.observe(document.documentElement || document.body, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true,
        attributeFilter: ['title','aria-label','alt','placeholder']
      });
      console.log('🔍 MutationObserver ativo (subtree).');
    } catch (e) {
      console.warn('⚠️ Não foi possível iniciar observer com document.documentElement — tentando body:', e);
      if (document.body) {
        observer.observe(document.body, { childList: true, subtree: true, characterData: true });
      }
    }
  }

  // Função de inicialização: tenta executar substituições e ativa observer
  function init() {
    console.log(`🕒 Inicializando substituição (delay inicial: ${initialDelayMs}ms).`);
    // faz uma primeira tentativa
    tryReplace(document);

    // e ativa o observer para mudanças seguintes
    startObserver();

    // também tentamos novamente algumas vezes para capturar conteúdo carregado tardiamente
    let attempts = 0;
    const maxAttempts = 30; // tentar novamente até aprox 30 vezes (com 2s interval = 60s) — ajuste se desejar
    const retryInterval = setInterval(() => {
      attempts++;
      const made = tryReplace(document);
      if (made) {
        // se encontrado, não necessariamente paramos — mantemos observer para mudanças futuras
        console.log('🔁 Substituição detectada em retry.');
      }
      if (attempts >= maxAttempts) {
        clearInterval(retryInterval);
        console.log('⏹️ Finalizando tentativas periódicas (maxAttempts atingido). Observer permanece ativo.');
      }
    }, 2000);
  }

  // Inicia tudo após `initialDelayMs` (se 0, inicia imediatamente)
  setTimeout(() => {
    // garantir que o DOM esteja pronto
    if (document.readyState === 'loading') {
      window.addEventListener('DOMContentLoaded', init, { once: true });
    } else {
      init();
    }
  }, initialDelayMs);

  console.log('🔧 Script de substituição carregado — aguardando delay inicial:', initialDelayMs, 'ms');
})();
