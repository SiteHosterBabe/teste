/* ================================================================
   ÍCONE DE CHAMADA DE VÍDEO + TOQUE AUTOMÁTICO   (v4 — Bluesky)
   ----------------------------------------------------------------
   Só funciona DENTRO de uma conversa aberta (/messages/...).
   Coloca UM ÚNICO ícone na linha do cabeçalho da conversa, entre o
   nome do perfil e o botão dos 3 pontinhos:

     [ avatar + nome do perfil ] ....... [ 📹 ] [ ⋯ ]

   Fora da conversa (início, lista de conversas, perfil, etc.) o
   ícone é removido sozinho.

   Gatilhos nas mensagens:
        **   ->  o ícone pisca a azul (chamada a entrar)
        ==   ->  volta ao normal
   Clicar no ícone enquanto pisca = atender.

   USAR:  F12 -> Console -> colar tudo -> Enter.
   ================================================================ */
(() => {
  'use strict';

  /* ---------------- CONFIGURAÇÃO ---------------- */
  const CFG = {
    seletorMensagens : 'div[data-word-wrap="1"]',
    urlConversa      : /^\/messages\/[^/]+/,   // só aqui é que o ícone aparece
    gatilhoIniciar   : '**',
    gatilhoParar     : '==',
    cor              : '#1083fe',   // azul do Bluesky (toque)
    corIcone         : '#526580',   // mesmo cinzento dos 3 pontinhos
    som              : true,
    analisarHistorico: false,
    intervalo        : 800
  };

  const CLS    = 'vc-call-btn';
  const ID_CSS = 'vc-call-css';
  const SIG_PONTINHOS = /M2 12a2 2 0 1 1 4 0/;          // path dos 3 pontinhos
  const ZONA_PROIBIDA = 'nav, [role="navigation"], [role="dialog"], [role="menu"]';
  const ROTULO_MAU    = /trocar|switch|conta\b|account|sess|nova publica|compose/;
  const ROTULO_BOM    = /conversa|conversation|chat|mensagem|message/;

  if (window.__chamada && typeof window.__chamada.destruir === 'function') {
    window.__chamada.destruir();
  }

  let aTocar = false, ancoraManual = null, vistos = new WeakSet();
  let observador = null, vigia = null, audioCtx = null, cicloSom = null;

  /* ---------------- ESTILOS ---------------- */
  function estilos() {
    if (document.getElementById(ID_CSS)) return;
    const s = document.createElement('style');
    s.id = ID_CSS;
    s.textContent = `
      .${CLS}{
        display:flex; align-items:center; justify-content:center;
        width:33px; height:33px; flex:0 0 auto; padding:0; border:0;
        border-radius:999px; background:transparent; cursor:pointer;
        color:${CFG.corIcone}; position:relative;
        -webkit-tap-highlight-color:transparent;
        transition:background-color .15s ease, color .15s ease;
      }
      .${CLS}:hover{ background:rgba(16,131,254,.12); color:${CFG.cor}; }
      .${CLS}:focus-visible{ outline:2px solid ${CFG.cor}; outline-offset:2px; }
      .${CLS} svg{ width:19px; height:19px; fill:currentColor; display:block;
                   pointer-events:none; }

      .${CLS}.vc-a-tocar{ animation:vc-piscar 1s steps(1,end) infinite; }
      .${CLS}.vc-a-tocar::after{
        content:''; position:absolute; inset:-2px; border-radius:999px;
        border:2px solid ${CFG.cor}; opacity:0; pointer-events:none;
        animation:vc-onda 1.4s ease-out infinite;
      }
      @keyframes vc-piscar{
        0%,49%  { color:${CFG.cor};           background:rgba(16,131,254,.18); }
        50%,100%{ color:rgba(16,131,254,.30); background:transparent; }
      }
      @keyframes vc-onda{
        0%  { transform:scale(.85); opacity:.9; }
        100%{ transform:scale(1.6); opacity:0; }
      }
      @media (prefers-reduced-motion: reduce){
        .${CLS}.vc-a-tocar{ animation-duration:2s; }
        .${CLS}.vc-a-tocar::after{ animation:none; opacity:.6; }
      }
    `;
    (document.head || document.documentElement).appendChild(s);
  }

  /* ---------------- BOTÃO ---------------- */
  function criarBotao() {
    const b = document.createElement('div');
    b.className = CLS;
    b.setAttribute('role', 'button');
    b.setAttribute('tabindex', '0');
    b.setAttribute('aria-label', 'Chamada de vídeo');
    b.title = 'Chamada de vídeo';
    b.innerHTML = `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="2" y="6" width="14" height="12" rx="3.2"></rect>
        <path d="M17.5 10.3l3.05-2.1c.66-.46 1.55.02 1.55.83v5.94c0 .81-.89 1.29-1.55.83l-3.05-2.1v-3.4z"></path>
      </svg>`;
    const clique = e => { e.preventDefault(); e.stopPropagation(); if (aTocar) parar(); };
    b.addEventListener('click', clique);
    b.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') clique(e);
    });
    if (aTocar) marcarBotao(b, true);
    return b;
  }

  /* ---------------- ONDE PODE ENTRAR ---------------- */
  function naConversa() { return CFG.urlConversa.test(location.pathname); }

  function ehTresPontinhos(el) {
    const svg = el.querySelector('svg');
    if (svg) {
      const d = [...svg.querySelectorAll('path')]
        .map(p => p.getAttribute('d') || '').join(' ');
      if (SIG_PONTINHOS.test(d)) return true;
      if (svg.querySelectorAll('circle').length === 3) return true;
    }
    if (el.getAttribute('aria-haspopup') === 'menu') {
      return ROTULO_BOM.test((el.getAttribute('aria-label') || '').toLowerCase());
    }
    return false;
  }

  function candidatos() {
    const set = new Set(document.querySelectorAll('[aria-haspopup="menu"]'));
    if (!set.size) document.querySelectorAll('button, [role="button"]').forEach(e => set.add(e));
    if (ancoraManual && ancoraManual.isConnected) set.add(ancoraManual);
    return [...set];
  }

  /* sobe (máx. 6 níveis) até ao contentor com link de perfil E avatar */
  function linhaDoBotao(btn) {
    let n = btn.parentElement, saltos = 0;
    while (n && saltos++ < 6) {
      if (n.querySelector('a[href^="/profile/"]') &&
          n.querySelector('[data-testid="userAvatarImage"]')) return n;
      n = n.parentElement;
    }
    return null;
  }

  /* filho direto da linha que contém o botão (o bloco dos 3 pontinhos) */
  function blocoDosPontinhos(linha, btn) {
    let n = btn;
    while (n.parentElement && n.parentElement !== linha) n = n.parentElement;
    return n.parentElement === linha ? n : null;
  }

  /* a quantos níveis acima aparece a caixa de escrever mensagem */
  function distanciaAoComposer(linha) {
    let n = linha.parentElement, d = 1;
    while (n && d <= 12) {
      if (n.querySelector('textarea, [contenteditable="true"], [role="textbox"]')) return d;
      n = n.parentElement; d++;
    }
    return 99;
  }

  /* nota da linha; -Infinity = não serve */
  function nota(linha, btn) {
    if (btn === ancoraManual) return 1000;                 // escolha manual manda

    const rot = (btn.getAttribute('aria-label') || '').toLowerCase();
    if (ROTULO_MAU.test(rot)) return -Infinity;            // trocar de conta, compor, etc.
    if (btn.closest(ZONA_PROIBIDA) || linha.closest(ZONA_PROIBIDA)) return -Infinity;
    if (linha.matches(ZONA_PROIBIDA)) return -Infinity;    // a barra lateral <nav>

    const r = linha.getBoundingClientRect();
    if (!r.width || !r.height) return -Infinity;
    if (r.height > 120) return -Infinity;                  // cabeçalho é uma linha baixa

    const dist = distanciaAoComposer(linha);
    if (dist > 8) return -Infinity;                        // tem de estar no painel da conversa

    let n = 0;
    if (linha.closest('a[href^="/messages/"]')) n -= 30;   // item da lista de conversas
    if (linha.querySelector('a[href^="/messages/"]')) n -= 30;
    if (ROTULO_BOM.test(rot)) n += 5;
    n += Math.max(0, 12 - dist);
    n += Math.max(0, 6 - r.top / 40);                      // está no topo do painel
    return n;
  }

  function melhorAlvo() {
    let melhor = null, melhorNota = -Infinity;
    for (const el of candidatos()) {
      if (el.closest('.' + CLS)) continue;
      if (el !== ancoraManual && !ehTresPontinhos(el)) continue;

      const linha = linhaDoBotao(el);
      if (!linha) continue;
      const bloco = blocoDosPontinhos(linha, el);
      if (!bloco) continue;

      const n = nota(linha, el);
      if (n > melhorNota) { melhorNota = n; melhor = { linha, bloco, btn: el, n }; }
    }
    return melhorNota === -Infinity ? null : melhor;
  }

  function limparTodos(exceto) {
    document.querySelectorAll('.' + CLS).forEach(b => { if (b !== exceto) b.remove(); });
  }

  function injetar() {
    if (!naConversa()) { limparTodos(); return 0; }        // trava fora do chat

    const alvo = melhorAlvo();
    if (!alvo) { limparTodos(); return 0; }

    let btn = alvo.linha.querySelector(':scope > .' + CLS);
    if (!btn) { btn = criarBotao(); alvo.linha.insertBefore(btn, alvo.bloco); }
    limparTodos(btn);
    return 1;
  }

  /* ---------------- SOM ---------------- */
  function garantirAudio() {
    try {
      audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === 'suspended') audioCtx.resume();
      return true;
    } catch (e) { return false; }
  }

  function iniciarSom() {
    if (!CFG.som || cicloSom || !garantirAudio()) return;
    const bip = t0 => {
      const osc = audioCtx.createOscillator(), g = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, t0);
      osc.frequency.setValueAtTime(660, t0 + 0.18);
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.exponentialRampToValueAtTime(0.16, t0 + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.36);
      osc.connect(g); g.connect(audioCtx.destination);
      osc.start(t0); osc.stop(t0 + 0.4);
    };
    const ciclo = () => { const t = audioCtx.currentTime; bip(t); bip(t + 0.55); };
    ciclo();
    cicloSom = setInterval(ciclo, 2200);
  }

  function pararSom() { if (cicloSom) { clearInterval(cicloSom); cicloSom = null; } }

  /* ---------------- ESTADOS ---------------- */
  function marcarBotao(b, ligado) {
    b.classList.toggle('vc-a-tocar', ligado);
    b.title = ligado ? 'A receber chamada…' : 'Chamada de vídeo';
    b.setAttribute('aria-label', b.title);
  }

  function iniciar() {
    if (aTocar) return;
    aTocar = true;
    document.querySelectorAll('.' + CLS).forEach(b => marcarBotao(b, true));
    iniciarSom();
    console.log('%c📞 chamada a entrar', 'color:' + CFG.cor + ';font-weight:600');
  }

  function parar() {
    if (!aTocar) return;
    aTocar = false;
    document.querySelectorAll('.' + CLS).forEach(b => marcarBotao(b, false));
    pararSom();
    console.log('%c📴 chamada terminada', 'color:#8899a6');
  }

  /* ---------------- DETEÇÃO DOS GATILHOS ---------------- */
  function analisar(texto) {
    if (!texto) return;
    const a = texto.lastIndexOf(CFG.gatilhoIniciar);
    const p = texto.lastIndexOf(CFG.gatilhoParar);
    if (a === -1 && p === -1) return;
    if (p > a) parar(); else iniciar();
  }

  function analisarElemento(el) {
    if (!el || vistos.has(el)) return;
    vistos.add(el);
    analisar(el.textContent);
  }

  function varrer(raiz) {
    if (raiz.nodeType !== 1 || raiz.closest('.' + CLS)) return;
    if (raiz.matches(CFG.seletorMensagens)) analisarElemento(raiz);
    raiz.querySelectorAll(CFG.seletorMensagens).forEach(analisarElemento);
  }

  function arrancarObservador() {
    observador = new MutationObserver(muts => {
      for (const m of muts) {
        if (m.type === 'characterData') {
          const pai = m.target.parentElement;
          if (pai && pai.closest(CFG.seletorMensagens)) analisar(m.target.nodeValue);
          continue;
        }
        m.addedNodes.forEach(n => {
          if (n.nodeType === 3) {
            const pai = n.parentElement;
            if (pai && pai.closest(CFG.seletorMensagens)) analisar(n.nodeValue);
          } else varrer(n);
        });
      }
    });
    observador.observe(document.body, { childList: true, subtree: true, characterData: true });
  }

  /* ---------------- ESCOLHER A ÂNCORA À MÃO ---------------- */
  function escolherAncora() {
    console.log('%c[chamada] Clica agora nos 3 pontinhos da conversa…', 'color:' + CFG.cor);
    const h = e => {
      e.preventDefault(); e.stopPropagation();
      document.removeEventListener('click', h, true);
      ancoraManual = e.target.closest('[role="button"], button') || e.target;
      limparTodos();
      console.log(injetar() ? '[chamada] ícone colocado ✔'
                            : '[chamada] não deu — esse botão não está numa linha com perfil + avatar');
    };
    document.addEventListener('click', h, true);
  }

  /* ---------------- ARRANQUE ---------------- */
  estilos();
  const postos = injetar();
  arrancarObservador();
  vigia = setInterval(injetar, CFG.intervalo);

  const desbloquear = () => { garantirAudio(); document.removeEventListener('click', desbloquear); };
  document.addEventListener('click', desbloquear);

  document.querySelectorAll(CFG.seletorMensagens)
    .forEach(CFG.analisarHistorico ? analisarElemento : el => vistos.add(el));

  window.__chamada = {
    cfg: CFG, iniciar, parar, escolherAncora,
    estado: () => (aTocar ? 'a tocar' : 'parado'),
    diagnostico() {
      console.log('URL de conversa:', naConversa(), location.pathname);
      const a = melhorAlvo();
      console.log(a ? { nota: a.n, botao: a.btn, linha: a.linha } : 'nenhum alvo válido');
    },
    destruir() {
      parar();
      if (observador) observador.disconnect();
      if (vigia) clearInterval(vigia);
      limparTodos();
      document.getElementById(ID_CSS)?.remove();
      delete window.__chamada;
      console.log('[chamada] removido');
    }
  };

  console.log(
    '%c[chamada] ativo%c  →  ícones: ' + postos +
    '   |   "**" toca   |   "==" pára   |   __chamada.destruir() remove' +
    (naConversa() ? '' : '\nℹ estás fora de uma conversa — abre um chat e o ícone aparece'),
    'background:' + CFG.cor + ';color:#fff;padding:2px 6px;border-radius:4px',
    'color:inherit'
  );
})();