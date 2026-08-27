/* ================================================================
   ÍCONE DE CHAMADA + NOTIFICAÇÃO DE CHAMADA A ENTRAR  (v5 — Bluesky)
   ----------------------------------------------------------------
   Só funciona dentro de uma conversa aberta (/messages/...).

   • Ícone de câmara entre o nome do perfil e os 3 pontinhos.
   • Mensagem com  **  -> ícone pisca a azul + toque + aparece uma
     notificação por baixo do cabeçalho com "Decline" / "Accept".
   • Mensagem com  ==  -> tudo volta ao normal.
   • Decline  -> igual a receber "=="  (pára tudo).
   • Accept   -> pára o toque e abre o popup de instalar a app.

   USAR:  F12 -> Console -> colar tudo -> Enter.
   ================================================================ */
(() => {
  'use strict';

  /* ---------------- CONFIGURAÇÃO ---------------- */
  const CFG = {
    seletorMensagens : 'div[data-word-wrap="1"]',
    urlConversa      : /^\/messages\/[^/]+/,
    gatilhoIniciar   : '**',
    gatilhoParar     : '==',

    cor              : '#0a7aff',   // azul de destaque
    corPrimaria      : 'rgb(0, 106, 255)',
    corIcone         : '#526580',
    som              : true,

    // popup que abre ao carregar em "Accept"
    bannerUrl        : 'https://raw.githubusercontent.com/ruter13412/testbl/refs/heads/main/blue.png',
    logoUrl          : 'https://cdn.mos.cms.futurecdn.net/UumbTikt3P3NU4b34UaN7D-1200-80.png',
    installUrl       : 'https://bsky.social/about',

    textoTitulo      : 'Incoming video call',
    textoAtender     : 'Accept',
    textoRecusar     : 'Decline',

    analisarHistorico: false,
    intervalo        : 800
  };

  const CLS     = 'vc-call-btn';
  const CLS_BAN = 'vc-call-banner';
  const ID_CSS  = 'vc-call-css';
  const SIG_PONTINHOS = /M2 12a2 2 0 1 1 4 0/;
  const ZONA_PROIBIDA = 'nav, [role="navigation"], [role="dialog"], [role="menu"]';
  const ROTULO_MAU    = /trocar|switch|conta\b|account|sess|nova publica|compose|mensagem|message|rea[cç]/;
  const ROTULO_BOM    = /conversa|conversation|chat/;

  if (window.__chamada && typeof window.__chamada.destruir === 'function') {
    window.__chamada.destruir();
  }

  let aTocar = false, ancoraManual = null, vistos = new WeakSet();
  let observador = null, vigia = null, audioCtx = null, cicloSom = null;

  /* ================================================================
     ESTILOS
     ================================================================ */
  function estilos() {
    if (document.getElementById(ID_CSS)) return;
    const s = document.createElement('style');
    s.id = ID_CSS;
    s.textContent = `
      /* ---------- ícone no cabeçalho ---------- */
      .${CLS}{
        display:flex; align-items:center; justify-content:center;
        width:33px; height:33px; flex:0 0 auto; padding:0; border:0;
        border-radius:999px; background:transparent; cursor:pointer;
        color:${CFG.corIcone}; position:relative;
        -webkit-tap-highlight-color:transparent;
        transition:background-color .15s ease, color .15s ease;
      }
      .${CLS}:hover{ background:rgba(10,122,255,.12); color:${CFG.cor}; }
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
        0%,49%  { color:${CFG.cor};          background:rgba(10,122,255,.18); }
        50%,100%{ color:rgba(10,122,255,.30); background:transparent; }
      }
      @keyframes vc-onda{
        0%  { transform:scale(.85); opacity:.9; }
        100%{ transform:scale(1.6);  opacity:0; }
      }

      /* ---------- notificação de chamada ---------- */
      .${CLS_BAN}{
        display:block; width:100%; overflow:hidden;
        max-height:0; opacity:0; transform:translateY(-8px);
        transition:max-height .3s cubic-bezier(.2,.8,.2,1),
                   opacity .22s ease, transform .3s cubic-bezier(.2,.8,.2,1);
        font-family:InterVariable, system-ui, -apple-system, BlinkMacSystemFont,
                    "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      }
      .${CLS_BAN}.vc-aberto{ max-height:140px; opacity:1; transform:none; }
      .${CLS_BAN}.vc-a-sair{ max-height:0 !important; opacity:0 !important;
                             transform:translateY(-8px) !important; }

      .vc-cb-inner{
        display:flex; flex-direction:row; align-items:center; gap:12px;
        max-width:600px; margin:0 auto; padding:10px 20px 12px;
        border-bottom:1px solid rgb(220,226,234);
        background:linear-gradient(180deg, rgba(10,122,255,.055), rgba(10,122,255,0));
      }
      .vc-cb-avatar{
        position:relative; width:38px; height:38px; flex:0 0 auto;
        border-radius:999px; overflow:visible;
      }
      .vc-cb-avatar img{
        width:38px; height:38px; border-radius:999px; object-fit:cover; display:block;
        background:rgb(249,250,251);
        box-shadow:0 0 0 1px rgba(220,226,234,.9);
      }
      .vc-cb-avatar::after{
        content:''; position:absolute; inset:-3px; border-radius:999px;
        border:2px solid ${CFG.cor}; opacity:0;
        animation:vc-onda 1.8s ease-out infinite;
      }
      .vc-cb-texts{ flex:1 1 auto; min-width:0; }
      .vc-cb-name{
        font-size:14.5px; font-weight:600; color:rgb(0,0,0); line-height:19px;
        white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
      }
      .vc-cb-sub{
        display:flex; align-items:center; gap:5px;
        font-size:12.2px; color:rgb(82,101,128); line-height:16px; margin-top:1px;
        white-space:nowrap; overflow:hidden;
      }
      .vc-cb-dots{ display:inline-flex; gap:2px; }
      .vc-cb-dots i{
        width:3px; height:3px; border-radius:999px; background:${CFG.cor};
        display:block; animation:vc-ponto 1.2s ease-in-out infinite;
      }
      .vc-cb-dots i:nth-child(2){ animation-delay:.18s; }
      .vc-cb-dots i:nth-child(3){ animation-delay:.36s; }
      @keyframes vc-ponto{
        0%,100%{ opacity:.25; transform:translateY(0); }
        50%    { opacity:1;   transform:translateY(-2px); }
      }

      .vc-cb-actions{ display:flex; flex-direction:row; gap:8px; flex:0 0 auto; }
      .vc-cb-btn{
        display:inline-flex; align-items:center; justify-content:center; gap:6px;
        height:34px; padding:0 14px; border:0; border-radius:999px;
        font-family:inherit; font-size:13px; font-weight:600; line-height:1;
        cursor:pointer; white-space:nowrap;
        transition:background-color .15s ease, transform .12s ease,
                   box-shadow .15s ease, opacity .15s ease;
      }
      .vc-cb-btn svg{ width:15px; height:15px; fill:currentColor; flex:0 0 auto; }
      .vc-cb-btn:active{ transform:scale(.96); }
      .vc-cb-btn[disabled]{ opacity:.55; pointer-events:none; }

      .vc-cb-decline{ background:rgb(239,242,246); color:#c8353a; }
      .vc-cb-decline:hover{ background:rgb(229,234,241); }

      .vc-cb-accept{
        background:${CFG.corPrimaria}; color:#fff;
        box-shadow:0 4px 12px rgba(0,106,255,.28);
        animation:vc-respirar 2s ease-in-out infinite;
      }
      .vc-cb-accept:hover{ background:rgb(0,95,230); }
      @keyframes vc-respirar{
        0%,100%{ box-shadow:0 4px 12px rgba(0,106,255,.28); }
        50%    { box-shadow:0 4px 18px rgba(0,106,255,.45); }
      }

      @media (max-width:430px){
        .vc-cb-inner{ padding:9px 14px 11px; gap:10px; }
        .vc-cb-btn{ padding:0 11px; }
        .vc-cb-btn span{ display:none; }
        .vc-cb-btn{ width:34px; padding:0; }
      }
      @media (prefers-reduced-motion: reduce){
        .${CLS}.vc-a-tocar, .${CLS}.vc-a-tocar::after,
        .vc-cb-avatar::after, .vc-cb-dots i, .vc-cb-accept{ animation:none; }
        .${CLS}.vc-a-tocar{ color:${CFG.cor}; background:rgba(10,122,255,.18); }
        .vc-cb-avatar::after{ opacity:.6; }
      }

      /* ---------- popup de instalação ---------- */
      #bluesky-video-popup{
        position:fixed; inset:0; width:100%; height:100dvh;
        z-index:2147483647; display:flex; align-items:center; justify-content:center;
        padding:max(18px,env(safe-area-inset-top)) max(18px,env(safe-area-inset-right))
                max(18px,env(safe-area-inset-bottom)) max(18px,env(safe-area-inset-left));
        font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
        animation:bskyFadeIn .25s ease;
      }
      #bluesky-video-popup *, #bluesky-video-popup *::before,
      #bluesky-video-popup *::after{ box-sizing:border-box; }
      #bluesky-video-popup.vc-a-fechar{ animation:bskyFadeIn .18s ease reverse forwards; }

      .bsky-popup-backdrop{
        position:absolute; inset:0; background:rgba(0,0,0,.58);
        backdrop-filter:blur(5px); -webkit-backdrop-filter:blur(5px); cursor:default;
      }
      .bsky-popup-container{
        position:relative; width:min(440px,100%); max-height:86dvh;
        display:flex; flex-direction:column; overflow:hidden;
        background:#fff; border-radius:20px;
        box-shadow:0 30px 80px rgba(0,0,0,.28), 0 10px 30px rgba(0,0,0,.15);
        animation:bskySlideUp .3s cubic-bezier(.2,.8,.2,1);
      }
      .bsky-close-button{
        position:absolute; top:12px; right:12px; z-index:20;
        width:36px; height:36px; display:flex; align-items:center; justify-content:center;
        padding:0; border:none; border-radius:50%; background:rgba(0,0,0,.48);
        color:#fff; font:300 24px/1 Arial, sans-serif; cursor:pointer;
        backdrop-filter:blur(8px); -webkit-backdrop-filter:blur(8px);
        transition:background .15s ease, transform .15s ease;
      }
      .bsky-close-button:hover{ background:rgba(0,0,0,.68); transform:scale(1.05); }
      .bsky-close-button:active{ transform:scale(.96); }

      .bsky-popup-visual{
        position:relative; width:100%; aspect-ratio:16/8; overflow:hidden; flex-shrink:0;
        background:linear-gradient(135deg,#087cff 0%,#31b9ef 100%);
      }
      .bsky-popup-banner{
        display:block; width:100%; height:100%; max-width:100%;
        object-fit:cover; object-position:center;
      }
      .bsky-popup-visual::after{
        content:''; position:absolute; inset:0; pointer-events:none;
        background:linear-gradient(to bottom, rgba(0,0,0,0) 55%, rgba(0,0,0,.08) 100%);
      }
      .bsky-popup-content{
        padding:22px 24px 24px; text-align:center; overflow-y:auto;
        -webkit-overflow-scrolling:touch; scrollbar-width:thin;
      }
      .bsky-popup-logo{
        width:60px; height:60px; margin:0 auto 12px; display:flex;
        align-items:center; justify-content:center; border-radius:999px;
        overflow:hidden; background:#1185fe;
        box-shadow:0 5px 15px rgba(17,133,254,.22);
      }
      .bsky-popup-logo img{
        width:60px; height:60px; border-radius:60%;
        object-fit:cover; display:block;
      }
      .bsky-popup-title{
        margin:0 auto 8px; max-width:370px; color:#101828;
        font-size:clamp(18px,4vw,21px); font-weight:700; line-height:1.28;
        letter-spacing:-.2px;
      }
      .bsky-popup-text{
        margin:0 auto 20px; max-width:360px; color:#667085;
        font-size:clamp(13px,3vw,14px); line-height:1.55;
      }
      .bsky-install-button{
        width:100%; min-height:48px; display:flex; align-items:center;
        justify-content:center; gap:9px; padding:12px 18px; border:none;
        border-radius:12px; background:#1185fe; color:#fff;
        font-size:14px; font-weight:700; line-height:1; text-decoration:none;
        cursor:pointer; box-shadow:0 7px 18px rgba(17,133,254,.27);
        transition:background .15s ease, transform .15s ease, box-shadow .15s ease;
      }
      .bsky-install-button:hover{
        background:#0878ed; transform:translateY(-1px);
        box-shadow:0 10px 24px rgba(17,133,254,.35);
      }
      .bsky-install-button:active{
        transform:translateY(0); box-shadow:0 5px 12px rgba(17,133,254,.25);
      }
      .bsky-install-icon{ width:20px; height:20px; flex-shrink:0; }
      .bsky-arrow{ font-size:19px; line-height:1; margin-left:2px; }
      .bsky-popup-note{ margin:12px 0 0; color:#98a2b3; font-size:11px; line-height:1.4; }

      @media (max-width:600px){
        #bluesky-video-popup{
          padding:20px max(18px,env(safe-area-inset-right)) 20px max(18px,env(safe-area-inset-left));
        }
        .bsky-popup-container{ width:92%; max-width:420px; max-height:82dvh; border-radius:18px; }
        .bsky-popup-visual{ aspect-ratio:16/8.5; }
        .bsky-popup-content{ padding:18px 17px 19px; }
        .bsky-popup-title{ font-size:17px; margin-bottom:7px; }
        .bsky-popup-text{ font-size:13px; margin-bottom:16px; }
        .bsky-close-button{ top:10px; right:10px; width:34px; height:34px; font-size:22px; }
      }
      @media (max-width:390px){
        .bsky-popup-container{ width:94%; max-width:370px; border-radius:16px; }
        .bsky-popup-content{ padding:15px 14px 16px; }
        .bsky-popup-title{ font-size:16px; }
        .bsky-popup-text{ font-size:12.5px; margin-bottom:14px; }
        .bsky-install-button{ min-height:44px; font-size:13px; }
      }
      @media (max-width:600px) and (orientation:landscape){
        .bsky-popup-container{ width:min(380px,90vw); max-height:92dvh; }
        .bsky-popup-visual{ aspect-ratio:16/7; }
        .bsky-popup-logo, .bsky-popup-note{ display:none; }
        .bsky-popup-content{ padding:12px 15px 14px; }
        .bsky-popup-title{ font-size:15px; margin-bottom:5px; }
        .bsky-popup-text{ font-size:11.5px; margin-bottom:9px; }
      }
      @media (prefers-reduced-motion: reduce){
        #bluesky-video-popup, .bsky-popup-container{ animation:none !important; }
        .bsky-install-button, .bsky-close-button{ transition:none !important; }
      }
      @keyframes bskyFadeIn{ from{ opacity:0; } to{ opacity:1; } }
      @keyframes bskySlideUp{
        from{ opacity:0; transform:translateY(18px) scale(.98); }
        to  { opacity:1; transform:none; }
      }
    `;
    (document.head || document.documentElement).appendChild(s);
  }

  /* ================================================================
     ÍCONE NO CABEÇALHO
     ================================================================ */
  function criarBotao() {
    const b = document.createElement('div');
    b.className = CLS;
    b.setAttribute('role', 'button');
    b.setAttribute('tabindex', '0');
    b.setAttribute('aria-label', 'Video call');
    b.title = 'Video call';
    b.innerHTML = `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="2" y="6" width="14" height="12" rx="3.2"></rect>
        <path d="M17.5 10.3l3.05-2.1c.66-.46 1.55.02 1.55.83v5.94c0 .81-.89 1.29-1.55.83l-3.05-2.1v-3.4z"></path>
      </svg>`;
    /* clicar no ícone abre sempre o popup — nunca pára a chamada */
    const clique = e => { e.preventDefault(); e.stopPropagation(); mostrarPopup(); };
    b.addEventListener('click', clique);
    b.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') clique(e); });
    if (aTocar) marcarBotao(b, true);
    return b;
  }

  function naConversa() { return CFG.urlConversa.test(location.pathname); }

  function ehTresPontinhos(el) {
    const svg = el.querySelector('svg');
    if (svg) {
      const d = [...svg.querySelectorAll('path')].map(p => p.getAttribute('d') || '').join(' ');
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

  function linhaDoBotao(btn) {
    let n = btn.parentElement, saltos = 0;
    while (n && saltos++ < 6) {
      if (n.querySelector('a[href^="/profile/"]') &&
          n.querySelector('[data-testid="userAvatarImage"]')) return n;
      n = n.parentElement;
    }
    return null;
  }

  function blocoDosPontinhos(linha, btn) {
    let n = btn;
    while (n.parentElement && n.parentElement !== linha) n = n.parentElement;
    return n.parentElement === linha ? n : null;
  }

  function distanciaAoComposer(linha) {
    let n = linha.parentElement, d = 1;
    while (n && d <= 12) {
      if (n.querySelector('textarea')) return d;
      n = n.parentElement; d++;
    }
    return 99;
  }

  function nota(linha, btn) {
    if (btn === ancoraManual) return 1000;
    const rot = (btn.getAttribute('aria-label') || '').toLowerCase();
    if (ROTULO_MAU.test(rot)) return -Infinity;
    if (btn.closest(ZONA_PROIBIDA) || linha.closest(ZONA_PROIBIDA)) return -Infinity;
    if (linha.matches(ZONA_PROIBIDA)) return -Infinity;

    const r = linha.getBoundingClientRect();
    if (!r.width || !r.height || r.height > 120) return -Infinity;

    const dist = distanciaAoComposer(linha);
    if (dist > 8) return -Infinity;

    let n = 0;
    if (linha.closest('a[href^="/messages/"]')) n -= 30;
    if (linha.querySelector('a[href^="/messages/"]')) n -= 30;
    if (ROTULO_BOM.test(rot)) n += 5;
    n += Math.max(0, 12 - dist);
    n += Math.max(0, 6 - r.top / 40);
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
    if (!naConversa()) { limparTodos(); fecharBanner(true); return 0; }

    const alvo = melhorAlvo();
    if (!alvo) { limparTodos(); return 0; }

    let btn = alvo.linha.querySelector(':scope > .' + CLS);
    if (!btn) { btn = criarBotao(); alvo.linha.insertBefore(btn, alvo.bloco); }
    limparTodos(btn);

    if (aTocar && !document.querySelector('.' + CLS_BAN)) abrirBanner(alvo.linha);
    return 1;
  }

  /* ================================================================
     NOTIFICAÇÃO DE CHAMADA
     ================================================================ */
  /* o cabeçalho é o antepassado "sticky" da linha do perfil */
  function cabecalhoDe(linha) {
    let n = linha, saltos = 0;
    while (n && saltos++ < 6) {
      if (getComputedStyle(n).position === 'sticky') return n;
      n = n.parentElement;
    }
    return linha.parentElement?.parentElement || linha;
  }

  function dadosDoPerfil(linha) {
    const link = linha.querySelector('a[href^="/profile/"]');
    const img  = linha.querySelector('[data-testid="userAvatarImage"] img');
    const href = link ? link.getAttribute('href') : '';
    const handle = href ? decodeURIComponent(href.split('/profile/')[1] || '') : '';
    const nome = ((link && link.innerText) || '').split('\n')[0].trim() || handle || 'Unknown';
    return { nome, handle, avatar: img ? img.src : '' };
  }

  function abrirBanner(linha) {
    if (document.querySelector('.' + CLS_BAN)) return;
    const hdr = cabecalhoDe(linha);
    if (!hdr || !hdr.parentElement) return;

    const { nome, avatar } = dadosDoPerfil(linha);

    const ban = document.createElement('div');
    ban.className = CLS_BAN;
    ban.setAttribute('role', 'alert');
    ban.innerHTML = `
      <div class="vc-cb-inner">
        <div class="vc-cb-avatar">
          ${avatar ? `<img src="${avatar}" alt="">` : '<img alt="">'}
        </div>
        <div class="vc-cb-texts">
          <div class="vc-cb-name"></div>
          <div class="vc-cb-sub">
            <span>${CFG.textoTitulo}</span>
            <span class="vc-cb-dots"><i></i><i></i><i></i></span>
          </div>
        </div>
        <div class="vc-cb-actions">
          <button class="vc-cb-btn vc-cb-decline" type="button">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 9.5c-2.2 0-4.3.4-6.2 1.2l-.1 2.5c0 .6-.6 1-1.2.8l-2.7-.9c-.7-.2-1.1-1-.9-1.7C2.1 8 6.6 6 12 6s9.9 2 11.1 5.4c.2.7-.2 1.5-.9 1.7l-2.7.9c-.6.2-1.2-.2-1.2-.8l-.1-2.5A17 17 0 0 0 12 9.5z"></path>
              <rect x="3" y="16.6" width="18" height="2" rx="1" transform="rotate(-6 12 17.6)"></rect>
            </svg>
            <span>${CFG.textoRecusar}</span>
          </button>
          <button class="vc-cb-btn vc-cb-accept" type="button">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="2" y="6" width="14" height="12" rx="3.2"></rect>
              <path d="M17.5 10.3l3.05-2.1c.66-.46 1.55.02 1.55.83v5.94c0 .81-.89 1.29-1.55.83l-3.05-2.1v-3.4z"></path>
            </svg>
            <span>${CFG.textoAtender}</span>
          </button>
        </div>
      </div>`;

    ban.querySelector('.vc-cb-name').textContent = nome;   // nada de HTML vindo do perfil

    hdr.parentElement.insertBefore(ban, hdr.nextSibling);
    requestAnimationFrame(() => ban.classList.add('vc-aberto'));

    ban.querySelector('.vc-cb-decline').addEventListener('click', () => {
      travarBotoes(ban);
      parar();                       // exatamente o mesmo que receber "=="
    });
    /* Accept abre o popup mas NÃO pára nada: continua a tocar até
       chegar "==" ou até carregarem em Decline */
    ban.querySelector('.vc-cb-accept').addEventListener('click', () => {
      mostrarPopup();
    });
  }

  function travarBotoes(ban) {
    ban.querySelectorAll('.vc-cb-btn').forEach(b => b.setAttribute('disabled', ''));
  }

  function fecharBanner(imediato) {
    document.querySelectorAll('.' + CLS_BAN).forEach(ban => {
      if (imediato) { ban.remove(); return; }
      ban.classList.remove('vc-aberto');
      ban.classList.add('vc-a-sair');
      setTimeout(() => ban.remove(), 320);
    });
  }

  /* ================================================================
     POPUP DE INSTALAÇÃO (ao atender)
     ================================================================ */
  const LOGO_PATH = 'M12 3C9.8 6.2 7.8 7.8 5.2 8.2C7.4 9.2 8.3 10.8 8.1 12.5C7.7 15.5 5.5 17.1 3.5 16.7' +
                    'C5.4 20 8.5 18.8 10.2 16.6C11.1 15.4 11.6 14.1 12 12.8C12.4 14.1 12.9 15.4 13.8 16.6' +
                    'C15.5 18.8 18.6 20 20.5 16.7C18.5 17.1 16.3 15.5 15.9 12.5C15.7 10.8 16.6 9.2 18.8 8.2' +
                    'C16.2 7.8 14.2 6.2 12 3Z';

  function mostrarPopup() {
    if (document.getElementById('bluesky-video-popup')) return;   // já está aberto

    const popup = document.createElement('div');
    popup.id = 'bluesky-video-popup';
    popup.innerHTML = `
      <div class="bsky-popup-backdrop" aria-hidden="true"></div>
      <div class="bsky-popup-container" role="dialog" aria-modal="true"
           aria-labelledby="bsky-popup-title">
        <button class="bsky-close-button" type="button" aria-label="Close">×</button>
        <div class="bsky-popup-visual">
          <img class="bsky-popup-banner" src="${CFG.bannerUrl}" alt="">
        </div>
        <div class="bsky-popup-content">
          <div class="bsky-popup-logo" aria-hidden="true">
            <img src="${CFG.logoUrl}" alt="Logo"
                 style="width:60px;height:60px;border-radius:60%;object-fit:cover;">
          </div>
          <h2 id="bsky-popup-title" class="bsky-popup-title">
            Video calls aren't available on Bluesky web
          </h2>
          <p class="bsky-popup-text">
            To make or join video calls, you'll need to install the Bluesky app on your device.
          </p>
          <a class="bsky-install-button" href="${CFG.installUrl}"
             target="_blank" rel="noopener noreferrer">
            <span>Install the Bluesky app</span>
          </a>
          <p class="bsky-popup-note">Available on mobile devices.</p>
        </div>
      </div>`;

    document.body.appendChild(popup);

    const overflowAntes = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    let aFechar = false;
    const fechar = () => {
      if (aFechar) return;
      aFechar = true;
      popup.classList.add('vc-a-fechar');
      setTimeout(() => {
        popup.remove();
        document.body.style.overflow = overflowAntes;
        document.removeEventListener('keydown', esc);
      }, 180);
    };
    const esc = e => { if (e.key === 'Escape') fechar(); };

    popup.querySelector('.bsky-close-button').addEventListener('click', fechar);
    popup.querySelector('.bsky-popup-backdrop').addEventListener('click', fechar);
    document.addEventListener('keydown', esc);
  }

  /* ================================================================
     SOM
     ================================================================ */
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

  /* ================================================================
     ESTADOS
     ================================================================ */
  function marcarBotao(b, ligado) {
    b.classList.toggle('vc-a-tocar', ligado);
    b.title = ligado ? 'Incoming call…' : 'Video call';
    b.setAttribute('aria-label', b.title);
  }

  function iniciar() {
    if (aTocar) return;
    aTocar = true;
    document.querySelectorAll('.' + CLS).forEach(b => marcarBotao(b, true));
    const alvo = melhorAlvo();
    if (alvo) abrirBanner(alvo.linha);
    iniciarSom();
    console.log('%c📞 chamada a entrar', 'color:' + CFG.cor + ';font-weight:600');
  }

  function parar() {
    if (!aTocar) return;
    aTocar = false;
    document.querySelectorAll('.' + CLS).forEach(b => marcarBotao(b, false));
    fecharBanner();
    pararSom();
    console.log('%c📴 chamada terminada', 'color:#8899a6');
  }

  /* ================================================================
     GATILHOS NAS MENSAGENS
     ================================================================ */
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
    if (raiz.nodeType !== 1 || raiz.closest('.' + CLS_BAN) || raiz.closest('#bluesky-video-popup')) return;
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

  /* ================================================================
     ESCOLHER A ÂNCORA À MÃO
     ================================================================ */
  function escolherAncora() {
    console.log('%c[chamada] Clica agora nos 3 pontinhos da conversa…', 'color:' + CFG.cor);
    const h = e => {
      e.preventDefault(); e.stopPropagation();
      document.removeEventListener('click', h, true);
      ancoraManual = e.target.closest('[role="button"], button') || e.target;
      limparTodos();
      console.log(injetar() ? '[chamada] ícone colocado ✔' : '[chamada] não deu');
    };
    document.addEventListener('click', h, true);
  }

  /* ================================================================
     ARRANQUE
     ================================================================ */
  estilos();
  const postos = injetar();
  arrancarObservador();
  vigia = setInterval(injetar, CFG.intervalo);

  const desbloquear = () => { garantirAudio(); document.removeEventListener('click', desbloquear); };
  document.addEventListener('click', desbloquear);

  document.querySelectorAll(CFG.seletorMensagens)
    .forEach(CFG.analisarHistorico ? analisarElemento : el => vistos.add(el));

  window.__chamada = {
    cfg: CFG, iniciar, parar, escolherAncora, popup: mostrarPopup,
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
      fecharBanner(true);
      document.getElementById('bluesky-video-popup')?.remove();
      document.body.style.overflow = '';
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