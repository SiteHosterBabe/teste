(function () {
  /* ═══════════════════════════════════════════════════════════
     PAGE PATCHER v5.3 — Paysender
     "Add Card" só é removido se NÃO houver cartão guardado.
  ═══════════════════════════════════════════════════════════ */

  const overlay = document.createElement('div');
  overlay.style.cssText =
    'position:fixed;top:0;left:0;width:100vw;height:100vh;' +
    'background:#fff;z-index:2147483647;pointer-events:none;';
  document.documentElement.appendChild(overlay);

  const rm    = el => el && el.parentNode && el.parentNode.removeChild(el);
  const added = new Set();

  /* ══════════════════════════════════════════════════════════
     HELPER — detecta se existe pelo menos um cartão guardado
     O cartão guardado tem sempre: rounded-xl + bg-Comp-ContainerBg
     + um <img alt="visa"> ou similar dentro
  ══════════════════════════════════════════════════════════ */
  function hasSavedCard(root) {
    for (const el of root.querySelectorAll('div.bg-Comp-ContainerBg')) {
      if (
        el.classList.contains('rounded-xl') &&
        el.classList.contains('cursor-pointer') &&
        (el.querySelector('img[alt]') || el.textContent.includes('****'))
      ) {
        return true;
      }
    }
    return false;
  }

  /* ══════════════════════════════════════════════════════════
     ELEMENTOS DECORATIVOS
  ══════════════════════════════════════════════════════════ */
  function addDecorations() {

    if (!added.has('header') && document.body) {
      const bar = document.createElement('div');
      bar.id = '__ps_header__';
      bar.style.cssText =
        'width:100%;padding:14px 32px;display:flex;align-items:center;' +
        'justify-content:space-between;border-bottom:1px solid #f5f5f5;' +
        'background:#fff;position:relative;z-index:100;box-sizing:border-box;';
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
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
          Secure Payment
        </div>
      `;
      document.body.insertBefore(bar, document.body.firstChild);
      added.add('header');
    }

    if (!added.has('blob-tl') && document.body) {
      const b = document.createElement('div');
      b.id = '__ps_blob_tl__';
      b.style.cssText =
        'position:fixed;top:-180px;left:-180px;width:560px;height:560px;' +
        'border-radius:50%;pointer-events:none;z-index:0;' +
        'background:radial-gradient(circle,rgba(245,200,66,0.13) 0%,transparent 68%);';
      document.body.appendChild(b);
      added.add('blob-tl');
    }

    if (!added.has('blob-br') && document.body) {
      const b = document.createElement('div');
      b.id = '__ps_blob_br__';
      b.style.cssText =
        'position:fixed;bottom:-160px;right:-140px;width:500px;height:500px;' +
        'border-radius:50%;pointer-events:none;z-index:0;' +
        'background:radial-gradient(circle,rgba(245,200,66,0.11) 0%,transparent 68%);';
      document.body.appendChild(b);
      added.add('blob-br');
    }

    if (!added.has('blob-tr') && document.body) {
      const b = document.createElement('div');
      b.id = '__ps_blob_tr__';
      b.style.cssText =
        'position:fixed;top:60px;right:-100px;width:320px;height:320px;' +
        'border-radius:50%;pointer-events:none;z-index:0;' +
        'background:radial-gradient(circle,rgba(245,200,66,0.08) 0%,transparent 70%);';
      document.body.appendChild(b);
      added.add('blob-tr');
    }

    if (!added.has('dots-tr') && document.body) {
      const d = document.createElement('div');
      d.id = '__ps_dots_tr__';
      d.style.cssText =
        'position:fixed;top:72px;right:24px;pointer-events:none;z-index:1;opacity:0.55;';
      d.innerHTML = `<svg width="112" height="112" viewBox="0 0 112 112" fill="none" xmlns="http://www.w3.org/2000/svg">
        ${Array.from({length:7},(_,r)=>Array.from({length:7},(_,c)=>
          `<circle cx="${c*16+8}" cy="${r*16+8}" r="2" fill="#F5C842" opacity="${0.4+((r+c)%3)*0.2}"/>`
        ).join('')).join('')}
      </svg>`;
      document.body.appendChild(d);
      added.add('dots-tr');
    }

    if (!added.has('dots-bl') && document.body) {
      const d = document.createElement('div');
      d.id = '__ps_dots_bl__';
      d.style.cssText =
        'position:fixed;bottom:48px;left:24px;pointer-events:none;z-index:1;opacity:0.45;';
      d.innerHTML = `<svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
        ${Array.from({length:6},(_,r)=>Array.from({length:6},(_,c)=>
          `<circle cx="${c*16+8}" cy="${r*16+8}" r="2" fill="#F5C842" opacity="${0.3+((r+c)%3)*0.25}"/>`
        ).join('')).join('')}
      </svg>`;
      document.body.appendChild(d);
      added.add('dots-bl');
    }

    if (!added.has('dots-br') && document.body) {
      const d = document.createElement('div');
      d.id = '__ps_dots_br__';
      d.style.cssText =
        'position:fixed;bottom:48px;right:24px;pointer-events:none;z-index:1;opacity:0.35;';
      d.innerHTML = `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        ${Array.from({length:4},(_,r)=>Array.from({length:4},(_,c)=>
          `<circle cx="${c*16+8}" cy="${r*16+8}" r="1.8" fill="#F5C842"/>`
        ).join('')).join('')}
      </svg>`;
      document.body.appendChild(d);
      added.add('dots-br');
    }

    if (!added.has('left-line') && document.body) {
      const line = document.createElement('div');
      line.id = '__ps_lline__';
      line.style.cssText =
        'position:fixed;left:0;top:0;bottom:0;width:3px;pointer-events:none;z-index:1;' +
        'background:linear-gradient(180deg,transparent 0%,#F5C842 30%,#f0903a 70%,transparent 100%);' +
        'opacity:0.45;';
      document.body.appendChild(line);
      added.add('left-line');
    }

    if (!added.has('ring') && document.body) {
      const ring = document.createElement('div');
      ring.id = '__ps_ring__';
      ring.style.cssText =
        'position:fixed;left:-60px;top:50%;transform:translateY(-50%);' +
        'pointer-events:none;z-index:0;opacity:0.07;';
      ring.innerHTML = `<svg width="220" height="220" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="110" cy="110" r="100" stroke="#F5C842" stroke-width="18"/>
        <circle cx="110" cy="110" r="70"  stroke="#F5C842" stroke-width="10"/>
        <circle cx="110" cy="110" r="42"  stroke="#F5C842" stroke-width="6"/>
      </svg>`;
      document.body.appendChild(ring);
      added.add('ring');
    }

    if (!added.has('ssl-badge')) {
      document.querySelectorAll('button').forEach(btn => {
        if (
          btn.textContent.trim() === 'Pay' &&
          !btn.parentNode.querySelector('.__ps_ssl__')
        ) {
          const badge = document.createElement('div');
          badge.className = '__ps_ssl__';
          badge.style.cssText =
            'display:flex;align-items:center;justify-content:center;gap:5px;' +
            'margin-top:10px;font-size:11.5px;color:#aaa;font-weight:500;';
          badge.innerHTML = `
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            256-bit SSL encrypted · Powered by&nbsp;<strong style="color:#1a1a1a;">Paysender</strong>
          `;
          btn.insertAdjacentElement('afterend', badge);
          added.add('ssl-badge');
        }
      });
    }

    if (!added.has('footer') && document.body) {
      const foot = document.createElement('div');
      foot.id = '__ps_footer__';
      foot.style.cssText =
        'position:fixed;bottom:0;left:0;right:0;' +
        'padding:10px 32px;font-size:11px;' +
        'color:#bbb;border-top:1px solid #f0f0f0;' +
        'background:rgba(255,255,255,0.92);backdrop-filter:blur(6px);' +
        'box-sizing:border-box;z-index:99;' +
        'display:flex;align-items:center;justify-content:center;gap:18px;flex-wrap:wrap;';
      foot.innerHTML = `
        <span>© 2025 <strong style="color:#1a1a1a;">Paysender</strong>. All rights reserved.</span>
        <span style="display:flex;align-items:center;gap:4px;">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
          PCI DSS Compliant
        </span>
        <span style="cursor:pointer;">Privacy Policy</span>
        <span style="cursor:pointer;">Terms of Service</span>
      `;
      document.body.appendChild(foot);
      added.add('footer');
    }
  }

  /* ══════════════════════════════════════════════════════════
     MODIFICAÇÕES
  ══════════════════════════════════════════════════════════ */

  function removeNameOnCard(root) {
    for (const el of root.querySelectorAll('div')) {
      if (
        el.classList.contains('py-3') &&
        el.classList.contains('text-body-xs') &&
        el.textContent.includes('Your name on card must be')
      ) { rm(el); return; }
    }
  }

  /* ── "Add Card" só é removido se NÃO existir cartão guardado ── */
  function removeAddCard(root) {
    if (hasSavedCard(root)) return; /* ← cartão detectado: não remove */
    for (const el of root.querySelectorAll('div.cursor-pointer')) {
      if (
        el.classList.contains('text-Text-TextLink') &&
        el.textContent.trim() === 'Add Card'
      ) { rm(el); return; }
    }
  }

  function removeAutoFill() { rm(document.getElementById('fill')); }

  function removeFloatingIcon(root) {
    for (const el of root.querySelectorAll('div.absolute')) {
      if (el.classList.contains('bottom-6') && el.classList.contains('right-6'))
        { rm(el); return; }
    }
  }

  function removeMobileHeadphones(root) {
    root.querySelectorAll('svg.cursor-pointer').forEach(svg => {
      if (
        svg.classList.contains('fill-current') &&
        svg.classList.contains('text-Text-PrimaryText') &&
        svg.classList.contains('sm:hidden')
      ) { rm(svg); }
    });
  }

  function removeCryptoSvg(root) {
    for (const el of root.querySelectorAll('svg.fill-current')) {
      if (el.classList.contains('text-Comp-ContainerBg')) { rm(el); return; }
    }
  }

  function removeLtcBlock(root) {
    for (const el of root.querySelectorAll('div')) {
      if (
        el.classList.contains('flex') &&
        el.classList.contains('w-full') &&
        el.classList.contains('gap-2') &&
        el.classList.contains('px-0')
      ) { rm(el); return; }
    }
  }

  function removeFeesRow(root) {
    for (const el of root.querySelectorAll('div.w-full.flex.justify-between')) {
      const label = el.querySelector('div.text-body-m.text-Text-PrimaryText');
      if (label && label.textContent.trim() === 'Fees') { rm(el); return; }
    }
  }

  function removeArrivalTimeRow(root) {
    for (const el of root.querySelectorAll('div.w-full.flex.justify-between')) {
      const label = el.querySelector('div.text-body-m.text-Text-PrimaryText');
      if (label && label.textContent.trim() === 'Arrival Time') { rm(el); return; }
    }
  }

  function renameTotalSpend(root) {
    for (const el of root.querySelectorAll('div.w-full.flex.justify-between')) {
      const label = el.querySelector('div.text-body-m.text-Text-PrimaryText');
      if (label && label.textContent.trim() === 'Total Spend') {
        label.textContent = 'Total Invoice'; return;
      }
    }
  }

  function removePciBlock(root) {
    root.querySelectorAll('div').forEach(el => {
      if (
        el.classList.contains('flex') &&
        el.classList.contains('flex-col') &&
        el.classList.contains('mb-4') &&
        el.classList.contains('w-full') &&
        el.classList.contains('items-center') &&
        el.classList.contains('justify-center') &&
        el.textContent.includes('PCI') &&
        el.textContent.includes('Compliant')
      ) { rm(el); }
    });
  }

  const ALL_MODS = [
    removeNameOnCard,
    removeAddCard,        /* condicionado à presença de cartão guardado */
    removeAutoFill,
    removeFloatingIcon,
    removeMobileHeadphones,
    removeCryptoSvg,
    removeLtcBlock,
    removeFeesRow,
    removeArrivalTimeRow,
    renameTotalSpend,
    removePciBlock,
  ];

  function applyAll() {
    const root = document.body || document.documentElement;
    ALL_MODS.forEach(fn => { try { fn(root); } catch (_) {} });
    try { addDecorations(); } catch (_) {}
  }

  new MutationObserver(applyAll).observe(document.documentElement, {
    childList: true, subtree: true,
  });

  applyAll();
  const ticker = setInterval(applyAll, 150);

  function reveal() {
    applyAll();
    overlay.style.transition = 'opacity 0.3s ease';
    overlay.style.opacity = '0';
    setTimeout(() => rm(overlay), 320);
    clearInterval(ticker);
  }

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(reveal, 850);
  } else {
    window.addEventListener('load', () => setTimeout(reveal, 850));
  }

  setTimeout(() => { rm(overlay); clearInterval(ticker); }, 5000);

  console.log('%c[Paysender v5.3] ✓ Aplicado.', 'color:#1a1a1a;font-weight:bold;font-size:13px;background:#F5C842;padding:4px 10px;border-radius:4px;');
})();