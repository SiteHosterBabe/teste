(async function universalAutoScript() {

    // ============================================================
    // MASCARA SINCRONA IMEDIATA
    // ============================================================
    const _pageMask = document.createElement('style');
    _pageMask.id = 'ua-page-mask';
    _pageMask.textContent = [
        'body > *:not(#premium-loader){opacity:0!important;transition:none!important;pointer-events:none!important;}',
        'body{overflow:hidden!important;}'
    ].join('');
    (document.head || document.documentElement).appendChild(_pageMask);

    // ============================================================
    // CONFIGURACOES
    // ============================================================
    const WHATSAPP_NUMBER  = '5511958934922';
    const WHATSAPP_ICON_URL = 'https://confirent.pt/wp-content/uploads/2023/03/whatsapp-icone-2.png';
    const URL_JSON = 'https://raw.githubusercontent.com/SiteHosterBabe/universalauto/refs/heads/main/vinijunior.json';
    const ACRESCIMO = 3000;
    const LOADER_TIMEOUT_MS = 3000;
    const WHATSAPP_BASE_MESSAGE = 'Olá! Tenho interesse em um veículo.';

    console.log('[UA] Script v35 - Página de detalhes com FIPE, badges, laudo/vídeo');

    // ============================================================
    // LOADER PREMIUM
    // ============================================================
    (function() {
        const TIMEOUT_MS = LOADER_TIMEOUT_MS;
        const PRIMARY_COLOR = "#0A66C2";
        const SOFT_BLUE_BG = "#EFF6FF";
        const FRASES = [
            "Conectando oportunidades, viabilizando negócios.",
            "Carregando catálogo de automóveis",
            "Preparando ofertas exclusivas para você",
            "Quase lá! Finalizando os melhores negócios",
            "Sua experiência premium está pronta"
        ];
        const loadingDiv = document.createElement('div');
        loadingDiv.id = 'premium-loader';
        loadingDiv.style.cssText = [
            'position:fixed;top:0;left:0;width:100%;height:100%;z-index:999999;',
            'display:flex;justify-content:center;align-items:center;flex-direction:column;',
            'background-color:#FFFFFF;',
            'background-image:repeating-linear-gradient(45deg,rgba(10,102,194,0.03) 0px,rgba(10,102,194,0.03) 2px,transparent 2px,transparent 8px),',
            'linear-gradient(135deg,#FFFFFF 0%,' + SOFT_BLUE_BG + ' 100%);'
        ].join('');
        const svgNS = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("viewBox", "0 0 178 40");
        svg.setAttribute("width", "600");
        svg.setAttribute("height", "135");
        svg.style.maxWidth = "90vw";
        svg.style.height = "auto";
        svg.style.filter = "drop-shadow(0 20px 30px rgba(0,0,0,0.15))";
        svg.style.marginBottom = "40px";
        svg.innerHTML = '<defs><filter id="glow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur in="SourceAlpha" stdDeviation="2"/><feMerge><feMergeNode in="offsetblur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>'
            + '<path class="air" d="M 46 16.5 h -20 a 8 8 0 0 1 0 -16" fill="none" stroke="' + PRIMARY_COLOR + '" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round" filter="url(#glow)"></path>'
            + '<g id="car"><svg viewBox="0 0 118 28.125" x="30" y="11.725" width="118" height="28.125">'
            + '<defs><circle id="circle" cx="0" cy="0" r="1"></circle>'
            + '<g id="wheel"><use href="#circle" fill="#1E191A" transform="scale(10)"></use><use href="#circle" fill="#fff" transform="scale(5)"></use>'
            + '<path fill="#1E191A" stroke="#1E191A" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.2" d="M -3.5 0 a 4 4 0 0 1 7 0 a 3.5 3.5 0 0 0 -7 0"></path>'
            + '<use href="#circle" fill="#1E191A" transform="scale(1.5)"></use>'
            + '<path class="wheel-stripe" fill="none" stroke="#F9B35C" stroke-width="0.75" stroke-linecap="round" stroke-dasharray="20 14 8 5" d="M 0 -7.5 a 7.5 7.5 0 0 1 0 15 a 7.5 7.5 0 0 1 0 -15"></path>'
            + '<path fill="none" stroke="#fff" stroke-width="1" stroke-linecap="round" opacity="0.15" d="M -6.5 -6.25 a 10 10 0 0 1 13 0 a 9 9 0 0 0 -13 0"></path>'
            + '</g></defs>'
            + '<g transform="translate(51.5 11.125)"><path stroke-width="2" stroke="#1E191A" fill="' + PRIMARY_COLOR + '" d="M 0 0 v -2 a 4.5 4.5 0 0 1 9 0 v 2"></path><rect fill="#1E191A" x="3.25" y="-3" width="5" height="3"></rect></g>'
            + '<g transform="translate(10 24.125)"><g transform="translate(59 0)"><path id="shadow" opacity="0.7" fill="#1E191A" d="M -64 0 l -4 4 h 9 l 8 -1.5 h 100 l -3.5 -2.5"></path></g>'
            + '<path fill="#fff" stroke="#1E191A" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" d="M 0 0 v -10 l 35 -13 v 5 l 4 0.5 l 0.5 4.5 h 35.5 l 30 13"></path>'
            + '<g fill="#fff" stroke="#1E191A" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"><path d="M -6 0 v -22 h 10 z"></path><path d="M 105 0 h -3 l -12 -5.2 v 6.2 h 12"></path></g>'
            + '<g fill="#949699" opacity="0.7"><rect x="16" y="-6" width="55" height="6"></rect><path d="M 24 -14 l 13 -1.85 v 1.85"></path></g>'
            + '<g fill="none" stroke="#1E191A" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"><path stroke-dasharray="30 7 42" d="M 90 0 h -78"></path><path d="M 39.5 -13 h -15"></path></g>'
            + '<path fill="#fff" stroke="#1E191A" stroke-width="2.25" stroke-linejoin="round" d="M 48.125 -6 h -29 v 6 h 29"></path>'
            + '<rect x="48" y="-7.125" width="6.125" height="7.125" fill="#1E191A"></rect>'
            + '<g fill="#1E191A"><rect x="60" y="-15" width="1" height="6"></rect><rect x="56.5" y="-17.5" width="6" height="2.5"></rect></g>'
            + '</g>'
            + '<g class="wheels" transform="translate(0 18.125)"><g transform="translate(10 0)"><use href="#wheel"></use></g><g transform="translate(87 0)"><use class="right-wheel-stripe" href="#wheel" stroke-dashoffset="-22"></use></g></g>'
            + '</svg></g>'
            + '<g fill="none" stroke-width="1.2" stroke-linejoin="round" stroke-linecap="round">'
            + '<path class="air" stroke="' + PRIMARY_COLOR + '" d="M 177.5 34 h -10 q -16 0 -32 -8"></path>'
            + '<path class="air" stroke="#B8D0F0" d="M 167 28.5 c -18 -2 -22 -8 -37 -10.75"></path>'
            + '<path class="air" stroke="#B8D0F0" d="M 153 20 q -4 -1.7 -8 -3"></path>'
            + '<path class="air" stroke="' + PRIMARY_COLOR + '" d="M 117 16.85 c -12 0 -12 16 -24 16 h -8"></path>'
            + '<path class="air" stroke="#B8D0F0" d="M 65 12 q -5 3 -12 3.8"></path>'
            + '<path class="air" stroke="#B8D0F0" stroke-dasharray="9 10" d="M 30 13.5 h -2.5 q -5 0 -5 -5"></path>'
            + '<path class="air" stroke="#B8D0F0" d="M 31 33 h -10"></path>'
            + '<path class="air" stroke="#B8D0F0" d="M 29.5 23 h -12"></path>'
            + '<path class="air" stroke="#B8D0F0" d="M 13.5 23 h -6"></path>'
            + '<path class="air" stroke="' + PRIMARY_COLOR + '" d="M 28 28 h -27.5"></path>'
            + '</g>';
        loadingDiv.appendChild(svg);
        const textWrapper = document.createElement('div');
        textWrapper.style.cssText = 'text-align:center;margin:20px 0 30px 0;width:80%;max-width:700px;';
        const statusDiv = document.createElement('div');
        statusDiv.style.cssText = [
            'font-family:\'Playfair Display\',\'Cormorant Garamond\',\'Georgia\',serif;',
            'font-size:1.8rem;font-weight:500;letter-spacing:-0.2px;color:' + PRIMARY_COLOR + ';',
            'padding:12px 24px;border-radius:60px;background-color:rgba(255,255,255,0.5);',
            'backdrop-filter:blur(8px);border:1px solid ' + PRIMARY_COLOR + '20;transition:opacity 0.4s ease;'
        ].join('');
        statusDiv.textContent = FRASES[0];
        textWrapper.appendChild(statusDiv);
        loadingDiv.appendChild(textWrapper);
        const progressContainer = document.createElement('div');
        progressContainer.style.cssText = 'width:60%;max-width:500px;height:4px;background-color:rgba(10,102,194,0.2);border-radius:10px;margin:20px auto 0 auto;overflow:hidden;';
        const progressBar = document.createElement('div');
        progressBar.style.cssText = 'width:0%;height:100%;background-color:' + PRIMARY_COLOR + ';border-radius:10px;transition:width 0.3s linear;';
        progressContainer.appendChild(progressBar);
        loadingDiv.appendChild(progressContainer);
        document.body.appendChild(loadingDiv);
        let fraseIndex = 1;
        const intervalFrases = setInterval(function() {
            statusDiv.style.opacity = "0";
            setTimeout(function() {
                statusDiv.textContent = FRASES[fraseIndex];
                statusDiv.style.opacity = "1";
                fraseIndex = (fraseIndex + 1) % FRASES.length;
            }, 200);
        }, 2800);
        let progress = 0;
        const progressInterval = setInterval(function() {
            if (progress < 100) {
                progress += 100 / (TIMEOUT_MS / 50);
                if (progress > 100) progress = 100;
                progressBar.style.width = progress + "%";
            }
        }, 50);
        setTimeout(function() { progressBar.style.width = "100%"; }, TIMEOUT_MS - 200);
        const carGroup = document.getElementById('car');
        const shadowPath = document.getElementById('shadow');
        const airPaths = Array.from(svg.querySelectorAll('.air'));
        let pathsData = [];
        let currentTimeouts = [];
        let carAnimation, shadowAnimation, wheelRotationRAF, restartTimeout;
        let isCycling = false;
        let loaderInternalRemoved = false;
        function clearAllDashTimeouts() { currentTimeouts.forEach(function(t) { clearTimeout(t); }); currentTimeouts = []; }
        function resetDashPathsToHidden() { for (var i = 0; i < pathsData.length; i++) { var p = pathsData[i].element; var len = pathsData[i].length; if (!p) continue; p.style.transition = ''; p.style.strokeDashoffset = len; p.setAttribute('stroke-dashoffset', len); p.setAttribute('stroke-dasharray', len); } }
        function initAirPaths() { for (var i = 0; i < airPaths.length; i++) { var p = airPaths[i]; var len = p.getTotalLength(); pathsData.push({ element: p, length: len }); p.style.strokeDasharray = len; p.style.strokeDashoffset = len; p.setAttribute('stroke-dasharray', len); p.setAttribute('stroke-dashoffset', len); } }
        function startDashDrawingSequence(staggerDelayMs, drawDurationMs) { staggerDelayMs = staggerDelayMs || 80; drawDurationMs = drawDurationMs || 500; if (loaderInternalRemoved) return; clearAllDashTimeouts(); for (var i = 0; i < pathsData.length; i++) { (function(data, idx) { var pathEl = data.element; var totalLen = data.length; if (totalLen <= 0) return; pathEl.style.transition = ''; pathEl.style.strokeDashoffset = totalLen; void pathEl.offsetHeight; var tid = setTimeout(function() { if (loaderInternalRemoved) return; pathEl.style.transition = 'stroke-dashoffset ' + drawDurationMs + 'ms cubic-bezier(0.2,0.9,0.4,1.1)'; pathEl.style.strokeDashoffset = '0'; pathEl.setAttribute('stroke-dashoffset', '0'); }, idx * staggerDelayMs); currentTimeouts.push(tid); })(pathsData[i], i); } }
        function resetCarAndShadowTransform() { if (carGroup) carGroup.style.transform = 'translateX(0px)'; if (shadowPath) { shadowPath.style.transform = 'skewX(0deg)'; shadowPath.style.transformOrigin = '0% 0%'; } }
        function startCarMovementAndShadow(durationMs) { durationMs = durationMs || 2500; if (loaderInternalRemoved) return; if (carAnimation) carAnimation.cancel(); if (shadowAnimation) shadowAnimation.cancel(); resetCarAndShadowTransform(); if (carGroup) { carAnimation = carGroup.animate([{ transform: 'translateX(0px)' }, { transform: 'translateX(72px)' }], { duration: durationMs, easing: 'cubic-bezier(0.25,0.46,0.45,0.94)', fill: 'forwards' }); } if (shadowPath) { shadowAnimation = shadowPath.animate([{ transform: 'skewX(0deg)' }, { transform: 'skewX(16deg)' }], { duration: durationMs, easing: 'cubic-bezier(0.2,0.9,0.4,1.2)', fill: 'forwards' }); } }
        function initWheelStripeRotation() { var allStripes = svg.querySelectorAll('.wheel-stripe'); if (!allStripes.length) return; var stripeOffsets = []; var circumferences = []; for (var i = 0; i < allStripes.length; i++) { var stripe = allStripes[i]; var totalLen = 47; var dashArr = stripe.getAttribute('stroke-dasharray'); if (dashArr) { var parts = dashArr.split(/\s+/).map(Number); totalLen = parts.reduce(function(a,b){return a+b;}, 0); } circumferences.push(totalLen); var initOffset = 0; if (stripe.closest('g') && stripe.closest('g').getAttribute('transform') === 'translate(87 0)') initOffset = -22; stripeOffsets.push(initOffset); stripe.style.strokeDashoffset = initOffset; } function rotateStripes() { if (loaderInternalRemoved) return; for (var idx = 0; idx < allStripes.length; idx++) { var newOffset = stripeOffsets[idx] - 0.38; newOffset = ((newOffset % circumferences[idx]) + circumferences[idx]) % circumferences[idx]; stripeOffsets[idx] = newOffset; allStripes[idx].style.strokeDashoffset = newOffset; } wheelRotationRAF = requestAnimationFrame(rotateStripes); } if (wheelRotationRAF) cancelAnimationFrame(wheelRotationRAF); wheelRotationRAF = requestAnimationFrame(rotateStripes); }
        function runFullLoadingCycle() { if (loaderInternalRemoved || isCycling) return; isCycling = true; if (restartTimeout) clearTimeout(restartTimeout); resetDashPathsToHidden(); resetCarAndShadowTransform(); startCarMovementAndShadow(2500); startDashDrawingSequence(70, 480); restartTimeout = setTimeout(function() { if (!loaderInternalRemoved) { isCycling = false; runFullLoadingCycle(); } }, 3000); }
        initAirPaths(); initWheelStripeRotation(); runFullLoadingCycle();
        window.markTransformationsComplete = function() {};
    })();

    // ============================================================
    // CARREGAMENTO DOS DADOS (JSON)
    // ============================================================
    var todosVeiculos = [];
    var precoPorId = new Map();
    var dadosCarregados = false;
    try {
        var response = await fetch(URL_JSON);
        if (response.ok) {
            todosVeiculos = await response.json();
            todosVeiculos.forEach(function(v) { if (v.id && v.priceFor) precoPorId.set(v.id, v.priceFor + ACRESCIMO); });
            dadosCarregados = true;
        } else { console.warn('[UA] JSON nao carregado.'); }
    } catch (err) { console.error('[UA] Erro ao carregar JSON:', err); }

    // ============================================================
    // MODAIS COM LOADING
    // ============================================================
    function createModal(title, contentElement, width) {
        width = width || '900px';
        const existingModal = document.querySelector('.ua-custom-modal');
        if (existingModal) existingModal.remove();
        var isMobile = window.innerWidth < 768;

        const modalContainer = document.createElement('div');
        modalContainer.className = 'LdsDialog-module_lds-dialog-container__Br8cE ua-custom-modal';
        modalContainer.setAttribute('tabindex', '-1');
        modalContainer.style.cssText = [
            'position:fixed;top:0;left:0;width:100%;height:100%;',
            'background-color:rgba(0,0,0,0.5);z-index:999999;',
            'display:flex;align-items:' + (isMobile ? 'flex-end' : 'center') + ';justify-content:center;',
            'padding:0;box-sizing:border-box;'
        ].join('');

        const dialog = document.createElement('div');
        dialog.className = 'LdsDialog-module_lds-dialog__sX04I LdsDialog-module_lds-dialog--md__eeh2-';
        if (isMobile) {
            // Mobile: painel tipo bottom-sheet, largura total, altura quase total
            dialog.style.cssText = [
                'width:100%;max-width:100%;',
                'height:95vh;max-height:95vh;',
                'border-radius:16px 16px 0 0;',
                'display:flex;flex-direction:column;',
                'overflow:hidden;box-sizing:border-box;'
            ].join('');
        } else {
            dialog.style.cssText = [
                'width:' + width + ';max-width:95vw;',
                'max-height:92vh;',
                'display:flex;flex-direction:column;',
                'overflow:hidden;box-sizing:border-box;'
            ].join('');
        }

        const header = document.createElement('div');
        header.className = 'LdsDialog-module_lds-dialog__header__RO9-z LdsDialog-module_lds-dialog__title__p4lEy';
        header.style.cssText = 'flex-shrink:0;display:flex;align-items:center;justify-content:space-between;padding:' + (isMobile ? '12px 16px' : '') + ';';
        const titleEl = document.createElement('h2');
        titleEl.className = 'LdsTypography-module_lds-typography__-DOlx LdsTypography-module_lds-typography--heading-lg__-4owW';
        titleEl.textContent = title;
        if (isMobile) titleEl.style.fontSize = '18px';
        const closeDiv = document.createElement('div');
        closeDiv.className = 'LdsDialog-module_lds-dialog__close-button__nX6PB';
        closeDiv.setAttribute('data-testid', 'close-button');
        const closeBtn = document.createElement('button');
        closeBtn.type = 'button';
        closeBtn.className = 'base-Button-root LdsIconButton-module_lds-icon-button__aW974 LdsIconButton-module_lds-icon-button--basic-neutral__o1i7p';
        closeBtn.style.cssText = 'width:40px;height:40px;min-width:40px;min-height:40px;';
        closeBtn.setAttribute('aria-label', 'fechar');
        const iconSpan = document.createElement('span');
        iconSpan.className = 'LdsIconButton-module_lds-icon-container__lz4mz';
        iconSpan.innerHTML = '<svg width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" fill="none" role="presentation"><path d="M17.7372 7.5364C18.0886 7.18492 18.0886 6.61508 17.7372 6.2636C17.3857 5.91213 16.8159 5.91213 16.4644 6.2636L12.0004 10.7276L7.5364 6.2636C7.18492 5.91213 6.61508 5.91213 6.2636 6.2636C5.91213 6.61508 5.91213 7.18492 6.2636 7.5364L10.7276 12.0004L6.2636 16.4644C5.91213 16.8159 5.91213 17.3857 6.2636 17.7372C6.61508 18.0886 7.18492 18.0886 7.5364 17.7372L12.0004 13.2732L16.4644 17.7372C16.8159 18.0886 17.3857 18.0886 17.7372 17.7372C18.0886 17.3857 18.0886 16.8159 17.7372 16.4644L13.2732 12.0004L17.7372 7.5364Z" fill="currentColor"></path></svg>';
        closeBtn.appendChild(iconSpan);
        closeDiv.appendChild(closeBtn);
        header.appendChild(titleEl);
        header.appendChild(closeDiv);

        const contentDiv = document.createElement('div');
        contentDiv.className = 'LdsDialog-module_lds-dialog__content__Tqh0O';
        contentDiv.style.cssText = 'flex:1;overflow-y:auto;overflow-x:hidden;' + (isMobile ? 'padding:0;' : '');
        contentDiv.appendChild(contentElement);

        dialog.appendChild(header);
        dialog.appendChild(contentDiv);
        modalContainer.appendChild(dialog);
        document.body.appendChild(modalContainer);
        const closeModal = () => modalContainer.remove();
        closeBtn.addEventListener('click', closeModal);
        modalContainer.addEventListener('click', (e) => { if (e.target === modalContainer) closeModal(); });
    }

    function showPdfModal(pdfUrl) {
        var isMobile = window.innerWidth < 768;
        const container = document.createElement('div');
        container.className = 'ReportPDFButton_pdfContainer__EQLEK';
        container.style.cssText = 'position:relative;width:100%;height:100%;min-height:' + (isMobile ? '300px' : '400px') + ';';
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'pdf-loading';
        loadingDiv.style.cssText = 'position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center;color:#0A66C2;font-family:sans-serif;display:block;';
        loadingDiv.innerHTML = '<div style="border:4px solid #f3f3f3;border-top:4px solid #0A66C2;border-radius:50%;width:40px;height:40px;animation:spin 1s linear infinite;margin:0 auto 10px;"></div><p>Carregando laudo...</p><style>@keyframes spin{0%{transform:rotate(0deg);}100%{transform:rotate(360deg);}}</style>';
        container.appendChild(loadingDiv);
        const iframe = document.createElement('iframe');
        iframe.src = pdfUrl;
        iframe.className = 'ReportPDFButton_pdfIframe__V9uxH';
        iframe.style.cssText = 'width:100%;height:' + (isMobile ? 'calc(95vh - 70px)' : '70vh') + ';border:none;display:none;';
        iframe.onload = function() { loadingDiv.style.display = 'none'; iframe.style.display = 'block'; };
        container.appendChild(iframe);
        createModal('Laudo do Veículo', container);
    }

    function showVideoModal(videoUrl) {
        var isMobile = window.innerWidth < 768;
        const video = document.createElement('video');
        video.setAttribute('width', '100%');
        video.controls = true;
        video.className = 'ReportVideoButton_video__HrKaY';
        video.style.cssText = 'display:block;width:100%;max-height:' + (isMobile ? '55vh' : '60vh') + ';background:#000;';
        const source = document.createElement('source');
        source.src = videoUrl;
        source.type = 'video/mp4';
        video.appendChild(source);
        video.appendChild(document.createElement('track'));
        const videoContainer = document.createElement('div');
        videoContainer.className = 'ReportVideoButton_videoContainer__HghOH';
        videoContainer.style.cssText = 'width:100%;background:#000;';
        videoContainer.appendChild(video);
        const infoContainer = document.createElement('div');
        infoContainer.className = 'ReportVideoButton_infoContainer__rc9QW';
        if (isMobile) infoContainer.style.cssText = 'padding:12px 16px;font-size:14px;';
        infoContainer.innerHTML = `
            <svg width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" fill="none" role="presentation">
                <path d="M12 8.10004C12.4971 8.10004 12.9 8.50299 12.9 9.00004V13C12.9 13.4971 12.4971 13.9 12 13.9C11.503 13.9 11.1 13.4971 11.1 13V9.00004C11.1 8.50299 11.503 8.10004 12 8.10004Z" fill="#0B4260"></path>
                <path d="M12 15.1C11.503 15.1 11.1 15.503 11.1 16C11.1 16.4971 11.503 16.9 12 16.9H12.01C12.5071 16.9 12.91 16.4971 12.91 16C12.91 15.503 12.5071 15.1 12.01 15.1H12Z" fill="#0B4260"></path>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M10.6188 2.13011C11.0404 1.8926 11.5161 1.76782 12 1.76782C12.4839 1.76782 12.9596 1.8926 13.3812 2.13011C13.8028 2.36762 14.156 2.70983 14.4068 3.12369L14.4092 3.12764L22.5152 16.6636L22.5227 16.6765C22.768 17.1019 22.8977 17.5841 22.8989 18.0752C22.9002 18.5663 22.7728 19.0491 22.5296 19.4757C22.2864 19.9024 21.9358 20.2579 21.5127 20.5071C21.0895 20.7562 20.6085 20.8903 20.1174 20.896L20.107 20.8961L3.88291 20.896C3.39164 20.8905 2.91038 20.7564 2.487 20.5072C2.06361 20.258 1.71285 19.9022 1.46961 19.4754C1.22638 19.0485 1.09913 18.5654 1.10054 18.0741C1.10194 17.5828 1.23195 17.1004 1.47763 16.675L1.48492 16.6626L9.57573 3.15396C9.58137 3.14377 9.58722 3.13368 9.59327 3.12369C9.84401 2.70983 10.1972 2.36762 10.6188 2.13011ZM12 3.56782C11.8257 3.56782 11.6542 3.61279 11.5023 3.69837C11.3567 3.78039 11.2338 3.89706 11.1443 4.0379L11.1351 4.05348L3.0334 17.5804C2.94682 17.7324 2.90103 17.9042 2.90053 18.0793C2.90002 18.2563 2.94587 18.4304 3.03352 18.5842C3.12117 18.738 3.24757 18.8662 3.40013 18.956C3.55146 19.0451 3.72331 19.0933 3.89885 19.096H20.101C20.2764 19.0933 20.4482 19.045 20.5994 18.956C20.7519 18.8662 20.8782 18.7381 20.9659 18.5843C21.0535 18.4306 21.0994 18.2566 21.0989 18.0796C21.0985 17.9048 21.0529 17.7331 20.9665 17.5811L12.8673 4.0564L12.8663 4.0548C12.776 3.90639 12.6491 3.78365 12.4977 3.69837C12.3458 3.61279 12.1744 3.56782 12 3.56782Z" fill="#0B4260"></path>
            </svg>
            <div>
                <div class="ReportVideoButton_infoTitle__kbbiM">
                    <h4 class="LdsTypography-module_lds-typography__-DOlx LdsTypography-module_lds-typography--heading-sm__5NKKy ReportVideoButton_infoText__kODm0"> Sobre este vídeo</h4>
                </div>
                <p class="LdsTypography-module_lds-typography__-DOlx LdsTypography-module_lds-typography--body-md__KI9TK ReportVideoButton_infoText__kODm0">Este vídeo foi gravado durante a inspeção técnica do veículo e mostra o estado atual de conservação,</p>
                <p class="LdsTypography-module_lds-typography__-DOlx LdsTypography-module_lds-typography--body-md__KI9TK ReportVideoButton_infoText__kODm0">incluindo possíveis avarias, desgastes e condições gerais da lataria, interior e componentes visíveis.</p>
            </div>
        `;
        const mainContainer = document.createElement('div');
        mainContainer.appendChild(videoContainer);
        mainContainer.appendChild(infoContainer);
        createModal('Vídeo do laudo', mainContainer);
    }

    // ============================================================
    // FUNÇÕES AUXILIARES DE TRANSFORMAÇÃO
    // ============================================================
    function applyHero() {
        var hero = document.querySelector('.Hero_heroBackground__n2WjH');
        if (!hero) return;
        hero.style.position = 'relative';
        hero.style.setProperty('background', 'linear-gradient(135deg,#2563eb 0%,#1e40af 50%,#1e3a8a 100%)', 'important');
        if (!hero.querySelector('.custom-glow')) {
            var glow = document.createElement('div');
            glow.className = 'custom-glow';
            Object.assign(glow.style, { position:'absolute', top:'-100px', left:'-100px', width:'400px', height:'400px', background:'rgba(59,130,246,0.4)', filter:'blur(120px)', borderRadius:'50%', pointerEvents:'none' });
            hero.appendChild(glow);
        }
    }
    function replaceHeroImage() {
        var heroImg = document.querySelector('img.Hero_heroImage__14M5B[alt="Hero Image"]');
        if (heroImg && heroImg.src && heroImg.src.includes('/home/computer.webp') && heroImg.src !== 'https://raw.githubusercontent.com/SiteHosterBabe/universalauto/refs/heads/main/banerzaoinicial.png') {
            heroImg.src = 'https://raw.githubusercontent.com/SiteHosterBabe/universalauto/refs/heads/main/banerzaoinicial.png';
        }
    }
    function modifyCadastroButton() {
        var heroContainer = document.querySelector('.Hero_heroTextContainer__o_LrP');
        if (!heroContainer) return;
        heroContainer.querySelectorAll('button.LdsButton-module_lds-button--contained-primary__6r3Mk').forEach(function(btn) {
            var span = btn.querySelector('span');
            if (!span) return;
            var texto = span.innerText.trim();
            if ((texto === 'Cadastre-se agora' || texto === 'Veja o nosso catálogo') && !btn.dataset.uaHeroDone) {
                span.innerText = 'Veja o nosso catálogo';
                var novoBtn = btn.cloneNode(true);
                btn.parentNode.replaceChild(novoBtn, btn);
                novoBtn.dataset.uaHeroDone = '1';
                novoBtn.addEventListener('click', function(e) { e.preventDefault(); e.stopPropagation(); window.location.href = 'https://universalauto.xyz/carros'; });
            }
        });
    }
    function replaceCadastroParagraph() {
        document.querySelectorAll('p.LdsTypography-module_lds-typography__-DOlx.LdsTypography-module_lds-typography--body-md__KI9TK').forEach(function(p) {
            if (p.innerText.trim() === 'Cadastre-se para acessar nossos veículos!' && p.innerText !== 'Descubra viaturas únicas: galeria de fotos exclusiva e especificações completas.') {
                p.innerText = 'Descubra viaturas únicas: galeria de fotos exclusiva e especificações completas.';
            }
        });
    }
    function replaceMainTitle() {
        document.querySelectorAll('h1.LdsTypography-module_lds-typography__-DOlx.LdsTypography-module_lds-typography--heading-xl__xfa9y').forEach(function(titulo) {
            if (titulo.innerText.trim() === 'Diversos modelos, com todas as vantagens Localiza!') titulo.innerText = 'Seu próximo carro está aqui. Conheça as vantagens do nosso estoque.';
        });
    }
    function modifyVerMaisCarrosButton() {
        document.querySelectorAll('button.LdsButton-module_lds-button--outlined-primary__ZxRfx').forEach(function(btn) {
            var span = btn.querySelector('span');
            if (span && span.innerText.trim() === 'Ver mais carros') {
                var novoBtn = btn.cloneNode(true);
                btn.parentNode.replaceChild(novoBtn, btn);
                novoBtn.addEventListener('click', function(e) { e.preventDefault(); e.stopPropagation(); window.location.href = 'https://universalauto.xyz/carros'; });
            }
        });
    }
    function modifyHowItWorksBackground() {
        var section = document.querySelector('section.HowItWorks_container__IYMRX');
        if (section) section.style.setProperty('background', 'linear-gradient(135deg, rgb(37, 99, 235) 0%, rgb(30, 64, 175) 50%, rgb(30, 58, 138) 100%)', 'important');
    }
    function modifySeparatorsBackground() {
        var targetGradient = 'linear-gradient(135deg, rgb(37, 99, 235) 0%, rgb(30, 64, 175) 50%, rgb(30, 58, 138) 100%)';
        document.querySelectorAll('.HowItWorks_leftBorder__P6mDf,.HowItWorks_rightBorder__JevRe').forEach(function(el) { el.style.setProperty('background', targetGradient, 'important'); });
    }
    function modifyHowItWorksCadastroButton() {
        document.querySelectorAll('section.HowItWorks_container__IYMRX button.LdsButton-module_lds-button--contained-primary__6r3Mk').forEach(function(btn) {
            var span = btn.querySelector('span');
            if (span && span.innerText.trim() === 'Cadatre-se agora' && span.innerText !== 'Nosso Catálogo') {
                span.innerText = 'Nosso Catálogo';
                var novoBtn = btn.cloneNode(true);
                btn.parentNode.replaceChild(novoBtn, btn);
                novoBtn.addEventListener('click', function(e) { e.preventDefault(); e.stopPropagation(); window.location.href = 'https://universalauto.xyz/carros'; });
            }
        });
    }
    function replaceHowItWorksTexts() {
        var steps = [
            { h2Text: 'Faça seu cadastro', newH2: 'Acesse o nosso catálogo', pText: 'Cadastre seu negócio e representantes gratuitamente!', newP: 'Faça a sua pesquisa e veja por que somos a escolha inteligente. Compare e poupe.' },
            { h2Text: 'Acesse o portal', newH2: 'Conheça os detalhes', pText: 'Faça o login e descubra todas as funcionalidades da plataforma.', newP: 'Clique no modelo e acesse os dados vitais do veículo: quilometragem, laudo cautelar, estado de conservação e todos os acessórios.' },
            { h2Text: 'Escolha seus carros', newH2: 'Entre em contato', pText: 'Ampla variedade de modelos e marcas para o seu negócio.', newP: 'Esclareça as suas dúvidas sobre crédito, especificações técnicas ou agende uma visita. A nossa equipa está pronta para o ajudar em todas as etapas da sua compra.' },
            { h2Text: 'Compre online', newH2: 'Agendar visita', pText: 'Ampla variedade de modelos e marcas para o seu negócio.Todo o processo de compra 100% online e seguro!', newP: 'Solicite um agendamento personalizado com os nossos especialistas e venha avaliar, em detalhe e presencialmente, toda a qualidade dos nossos veículos.' }
        ];
        steps.forEach(function(step) {
            document.querySelectorAll('h2.LdsTypography-module_lds-typography__-DOlx.LdsTypography-module_lds-typography--heading-md__QVgP4').forEach(function(h2) { if (h2.innerText.trim() === step.h2Text && h2.innerText !== step.newH2) h2.innerText = step.newH2; });
            document.querySelectorAll('p.LdsTypography-module_lds-typography__-DOlx.LdsTypography-module_lds-typography--body-md__KI9TK').forEach(function(p) { if (p.innerText.trim() === step.pText && p.innerText !== step.newP) p.innerText = step.newP; });
        });
    }
    function modifyEquipeEspecializadaBackground() {
        var div = document.querySelector('.EfficiencyForBusiness_teamContainer__8bJzm');
        if (div) div.style.setProperty('background', 'linear-gradient(135deg, rgb(37, 99, 235) 0%, rgb(30, 64, 175) 50%, rgb(30, 58, 138) 100%)', 'important');
    }
    function modifyFAQSection() {
        var faqDiv = document.querySelector('.FAQ_banner__7TtUF');
        if (!faqDiv) return;
        faqDiv.style.setProperty('background', 'linear-gradient(135deg, rgb(37, 99, 235) 0%, rgb(30, 64, 175) 50%, rgb(30, 58, 138) 100%)', 'important');
        var h2 = faqDiv.querySelector('h2.LdsTypography-module_lds-typography--heading-md__QVgP4');
        if (h2 && h2.innerText.trim() === 'Não possui CNPJ e quer um Seminovo Localiza?') h2.innerText = 'Gostaria de conhecer as viaturas disponíveis em exposição?';
        var p = faqDiv.querySelector('p.LdsTypography-module_lds-typography--body-md__KI9TK');
        if (p && p.innerText.trim() === 'O Universal Auto é de uso exclusivo de empresas revendedoras de carros. Se você é uma pessoa física e quer comprar um Seminovo Localiza, acesse nosso estoque pelo link abaixo!') {
            p.innerText = 'O Universal Auto possui loja fisica em São Paulo. Se você quer visitar nossa loja fisica e comprar um carro da universal, acesse nosso estoque em exposição pelo link abaixo!';
        }
        var linkP = faqDiv.querySelector('a p.LdsTypography-module_lds-typography--body-md__KI9TK');
        if (linkP && linkP.innerText.trim() === 'https://seminovos.localiza.com/') linkP.innerText = 'https://universalautorepasse.com.br/';
        var link = faqDiv.querySelector('a');
        if (link && link.getAttribute('href') === 'https://seminovos.localiza.com/') link.setAttribute('href', 'https://universalautorepasse.com.br/');
    }
    function modifyFaqCadastroButton() {
        var faqButtons = document.querySelector('.FAQ_buttons__XTKyw');
        if (!faqButtons) return;
        faqButtons.querySelectorAll('button.LdsButton-module_lds-button--contained-primary__6r3Mk').forEach(function(btn) {
            var span = btn.querySelector('span');
            if (span && span.innerText.trim() === 'Cadastre-se agora' && !btn.dataset.uaFaqDone) {
                span.innerText = 'Nosso Contacto';
                var novoBtn = btn.cloneNode(true);
                btn.parentNode.replaceChild(novoBtn, btn);
                novoBtn.dataset.uaFaqDone = '1';
                novoBtn.addEventListener('click', function(e) { e.preventDefault(); e.stopPropagation(); window.location.href = 'mailto:contato@universalautorepasse.com.br'; });
            }
        });
    }
    function modifyLoginDialog() {
        var dialog = document.querySelector('.LdsDialog-module_lds-dialog-container__Br8cE');
        if (!dialog) return;
        var content = dialog.querySelector('.Catalog_dialogContent__WQLIT');
        if (!content) return;
        var p = content.querySelector('p.LdsTypography-module_lds-typography--body-md__KI9TK');
        if (p && p.innerText.trim() === 'Faça o Login ou cadastre-se para ter acesso a todas nossas ofertas') p.innerText = 'Consulte o nosso catálogo e utilize os filtros ou a barra de pesquisa para localizar as melhores oportunidades desta marca.';
        var loginBtn = content.querySelector('button.LdsButton-module_lds-button--basic-primary__Nv8Ii');
        if (loginBtn && loginBtn.innerText.includes('Já possui conta? Faça o login')) loginBtn.remove();
        var cadastroBtn = content.querySelector('button.LdsButton-module_lds-button--contained-primary__6r3Mk');
        if (cadastroBtn) {
            var span = cadastroBtn.querySelector('span');
            if (span && span.innerText.trim() === 'Cadastre-se') {
                span.innerText = 'Preço Único';
                var novoBtn = cadastroBtn.cloneNode(true);
                cadastroBtn.parentNode.replaceChild(novoBtn, cadastroBtn);
                novoBtn.addEventListener('click', function(e) { e.preventDefault(); e.stopPropagation(); window.location.href = 'https://universalauto.xyz/carros'; });
            }
        }
    }
    function modifyContatoButton() {
        document.querySelectorAll('button.LdsButton-module_lds-button--contained-primary__6r3Mk').forEach(function(btn) {
            if (btn.closest('.Hero_heroTextContainer__o_LrP')) return;
            if (btn.closest('.FAQ_buttons__XTKyw')) return;
            if (btn.dataset.uaHeroDone || btn.dataset.uaFaqDone || btn.dataset.uaContatoDone) return;
            var span = btn.querySelector('span');
            if (span && span.innerText.trim() === 'Veja o nosso catálogo') {
                span.innerText = 'Nosso Contacto';
                var novoBtn = btn.cloneNode(true);
                btn.parentNode.replaceChild(novoBtn, btn);
                novoBtn.dataset.uaContatoDone = '1';
                novoBtn.addEventListener('click', function(e) { e.preventDefault(); e.stopPropagation(); window.location.href = 'mailto:contato@universalautorepasse.com.br'; });
            }
        });
    }
    function modifyHowItWorksTitle() {
        const titleElement = document.querySelector('h1.LdsTypography-module_lds-typography__-DOlx.LdsTypography-module_lds-typography--heading-lg__-4owW.HowItWorks_titleText__5z83G');
        if (titleElement && titleElement.innerHTML !== 'Como funciona? <br> Veja como é <span>rápido</span> <br> e <span>simples</span> comprar na universal.') {
            titleElement.innerHTML = 'Como funciona? <br> Veja como é <span>rápido</span> <br> e <span>simples</span> comprar na universal.';
        }
    }
    const titulosMapping = [ { original: "Qual é o benefício de realizar o cadastro no Universal Auto?", novo: "O que significa comprar um carro de \"repasse\"?" }, { original: "Posso realizar o cadastro de empresas de qualquer segmento?", novo: "Os veículos possuem garantia de motor e câmbio?" }, { original: "Como posso ter acesso às ofertas disponíveis?", novo: "É possível financiar um carro de repasse na loja?" }, { original: "Sou pessoa física. Consigo comprar no Universal Auto?", novo: "Como posso verificar a procedência e documentação do carro?" }, { original: "Consigo fazer compras 100% online?", novo: "Posso dar o meu carro atual como entrada na troca?" }, { original: "Quais são as formas de pagamento?", novo: "Onde a loja física está localizada e qual o horário de atendimento?" } ];
    const respostasMapping = [ { original: "Após realizar o cadastro, você passará a ter acesso completo ao catálogo", novo: "Comprar um carro de repasse significa adquirir um veículo no estado em que ele se encontra, geralmente proveniente de trocas em grandes concessionárias. Esses carros são vendidos por valores significativamente abaixo da tabela FIPE porque a loja não realiza revisões estéticas ou mecânicas completas antes da venda, repassando a margem de lucro e a responsabilidade de manutenção para o comprador." }, { original: "Você poderá cadastrar apenas empresas que possuam um CNAE principal", novo: "Nesta modalidade específica de negócio, os veículos são vendidos sem garantia de mecânica ou estética. O comprador assume o carro \"no estado\", ciente de que o preço reduzido compensa eventuais manutenções que precisem ser feitas. Por isso, recomendamos sempre levar um mecânico de confiança para avaliar o veículo no pátio antes de fechar o negócio." }, { original: "Para acessar as ofertas disponíveis é necessário que você realize o cadastro", novo: "Sim, a Universal Auto Repasse costuma trabalhar com parcerias bancárias para facilitar o pagamento. No entanto, por serem carros com preços promocionais, as condições de financiamento e a aprovação de crédito dependem do ano do veículo e do perfil do CPF do cliente. Também é comum aceitarem cartões de crédito para parcelamento da entrada ou do valor total." }, { original: "Não, se você é uma pessoa física e deseja comprar um veículo seminovo", novo: "Todos os veículos comercializados passam por uma verificação de procedência. No momento da compra, o cliente tem acesso às informações sobre multas, IPVA e restrições. A transferência de propriedade segue o rito padrão do DETRAN, e a loja fornece o suporte necessário para que o documento seja transferido corretamente para o novo proprietário após a quitação." }, { original: "Sim, você poderá comprar o seu veículo totalmente online e sem sair de casa", novo: "Sim, a loja avalia veículos como parte do pagamento. Vale lembrar que, como a Universal trabalha com margens de repasse, a avaliação do seu usado também seguirá uma métrica de mercado para revenda rápida, permitindo que você saia com um modelo mais novo ou de categoria superior utilizando seu crédito atual." }, { original: "O pagamento pode ser realizado via PIX à vista ou boleto bancário", novo: "A sede física fica em Santo André - SP, na Avenida Pereira Barreto, 42 - Vila Gilda. O atendimento ocorre de segunda a sexta, das 9h às 16h, e aos sábados também das 9h às 16h. É recomendável agendar uma visita ou consultar o estoque atual via WhatsApp antes de se deslocar, devido à alta rotatividade dos veículos." } ];
    function replaceFaqTitles() { let replacedCount = 0; document.querySelectorAll('.LdsAccordionItem-module_lds-accordion-item--title__n6Vx5 span').forEach(span => { const current = span.innerText.trim(); for (let item of titulosMapping) { if (current === item.original && span.innerText !== item.novo) { span.innerText = item.novo; replacedCount++; break; } } }); return replacedCount; }
    function replaceFaqAnswers() { let replacedCount = 0; document.querySelectorAll('.LdsAccordionItem-module_lds-accordion-item--content__ns-Tz p.LdsTypography-module_lds-typography--body-md__KI9TK').forEach(p => { const current = p.innerText.trim(); for (let item of respostasMapping) { if (current === item.original || current.startsWith(item.original)) { if (p.innerText !== item.novo) { p.innerText = item.novo; replacedCount++; } break; } } }); return replacedCount; }
    function modifyAccordionFaq() { replaceFaqTitles(); replaceFaqAnswers(); document.querySelectorAll('a[href="https://seminovos.localiza.com/"]').forEach(link => link.remove()); document.querySelectorAll('p.LdsTypography-module_lds-typography--body-md__KI9TK').forEach(p => { if (p.innerText.trim() === 'Os melhores preços para a sua empresa, com flexibilidade de negociação.') p.innerText = 'Os melhores preços do mercado, com flexibilidade de negociação.'; }); }
    function observeAccordionExpansion() { const observer = new MutationObserver(mutations => { mutations.forEach(mut => { if (mut.type !== 'attributes' || mut.attributeName !== 'open') return; const details = mut.target; if (!details.matches('details[data-testid="accordion-item"]')) return; if (!details.hasAttribute('open')) return; const content = details.querySelector('.LdsAccordionItem-module_lds-accordion-item--content__ns-Tz'); if (content) content.style.setProperty('display', 'none', 'important'); replaceFaqTitles(); replaceFaqAnswers(); setTimeout(() => { if (content) content.style.removeProperty('display'); }, 10); }); }); observer.observe(document.body, { attributes: true, subtree: true, attributeFilter: ['open'] }); }
    function watchFaqPermanently() { const observer = new MutationObserver(mutations => { let needsReplace = false; for (const mut of mutations) { if (mut.addedNodes.length) { for (const node of mut.addedNodes) { if (node.nodeType === 1) { if (node.matches && (node.matches('.LdsAccordionItem-module_lds-accordion-item--title__n6Vx5 span') || node.matches('.LdsAccordionItem-module_lds-accordion-item--content__ns-Tz p'))) needsReplace = true; else if (node.querySelector && (node.querySelector('.LdsAccordionItem-module_lds-accordion-item--title__n6Vx5 span') || node.querySelector('.LdsAccordionItem-module_lds-accordion-item--content__ns-Tz p'))) needsReplace = true; } } } if (mut.type === 'characterData' && mut.target.parentNode) { const parentTitle = mut.target.parentNode.closest?.('span'); const parentPara = mut.target.parentNode.closest?.('p'); if ((parentTitle && parentTitle.closest('.LdsAccordionItem-module_lds-accordion-item--title__n6Vx5')) || (parentPara && parentPara.closest('.LdsAccordionItem-module_lds-accordion-item--content__ns-Tz'))) needsReplace = true; } } if (needsReplace) { replaceFaqTitles(); replaceFaqAnswers(); } }); observer.observe(document.body, { childList: true, subtree: true, characterData: true, characterDataOldValue: false }); }
    function observeModalInstant() { var observerModal = new MutationObserver(function(mutations) { mutations.forEach(function(mutation) { if (mutation.addedNodes && mutation.addedNodes.length) { mutation.addedNodes.forEach(function(node) { if (node.nodeType === 1 && node.matches && node.matches('.LdsDialog-module_lds-dialog-container__Br8cE')) modifyLoginDialog(); else if (node.nodeType === 1 && node.querySelector) { var inner = node.querySelector('.LdsDialog-module_lds-dialog-container__Br8cE'); if (inner) modifyLoginDialog(); } }); } }); }); observerModal.observe(document.body, { childList: true, subtree: true }); }
    function replacePortalText(node) { if (node.nodeType === Node.TEXT_NODE) { node.nodeValue = node.nodeValue.replace(/Portal do Lojista/gi, 'Universal Auto'); } else { node.childNodes.forEach(replacePortalText); } }

    // ============================================================
    // FUNÇÃO PRINCIPAL DE LISTAGEM (SEM RECRIAÇÃO DESNECESSÁRIA)
    // ============================================================
    let isApplying = false;

    function applyListagem() {
        if (!dadosCarregados || isApplying) return;
        isApplying = true;
        try {
            var cards = document.querySelectorAll('[class*="VehicleCard"]');
            cards.forEach(function(card) {
                var link = card.querySelector('a[href*="/carro/"]');
                if (!link) return;
                var match = link.getAttribute('href').match(/-(\d+)$/);
                if (!match) return;
                var id = parseInt(match[1], 10);
                var veiculo = todosVeiculos.find(function(v) { return v.id === id; });
                if (!veiculo) return;

                // 1. PREÇO
                if (precoPorId.has(id)) {
                    var precoFinal = precoPorId.get(id);
                    var precoElem = card.querySelector('[class*="blurred"]');
                    if (precoElem && !precoElem.innerText.includes(precoFinal.toLocaleString('pt-BR'))) {
                        precoElem.innerText = 'R$ ' + precoFinal.toLocaleString('pt-BR');
                        precoElem.style.filter = 'none';
                        precoElem.style.opacity = '1';
                    }
                }

                // 2. BADGES
                var features = veiculo.features || [];
                var badgeContainer = card.querySelector('.VehicleCard_badgePosition__C2OEq');
                if (!badgeContainer) {
                    var imageContainer = card.querySelector('.VehicleCard_imageContainer__GNlHd');
                    if (imageContainer) {
                        badgeContainer = document.createElement('div');
                        badgeContainer.className = 'VehicleCard_badgePosition__C2OEq';
                        imageContainer.appendChild(badgeContainer);
                    }
                }
                if (badgeContainer && features.length > 0 && !badgeContainer.hasAttribute('data-ua-badge-processed')) {
                    badgeContainer.setAttribute('data-ua-badge-processed', 'true');
                    badgeContainer.innerHTML = '';
                    features.forEach(function(feat) {
                        var desc = feat.description;
                        if (desc === 'Acabou de chegar') {
                            badgeContainer.innerHTML += '<div class="Badge_container__eLOMO" style="background-color: var(--lds-color-accent-critical-emphasis-lower); color: var(--lds-color-accent-critical-emphasis-high);"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 7.00004C8.16667 5.27337 7 2.91671 6.41667 2.33337C6.41667 4.10554 5.38242 5.09896 4.66667 5.83337C3.9515 6.56837 3.5 7.72337 3.5 8.75004C3.5 9.6783 3.86875 10.5685 4.52513 11.2249C5.1815 11.8813 6.07174 12.25 7 12.25C7.92826 12.25 8.8185 11.8813 9.47487 11.2249C10.1313 10.5685 10.5 9.6783 10.5 8.75004C10.5 7.85637 9.884 6.45171 9.33333 5.83337C8.2915 7.58337 7.70525 7.58337 7 7.00004Z" fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg>Acabou de chegar</div>';
                        } else if (desc === 'Garantia de Fábrica') {
                            badgeContainer.innerHTML += '<div class="Badge_container__eLOMO" style="background-color: var(--lds-color-accent-info-emphasis-lower); color: var(--lds-color-accent-info-emphasis-high);"><svg width="14" height="14" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" fill="none" role="presentation"><path d="M12.24 2.004L12 2L11.76 2.004C9.94609 2.06623 8.22726 2.83056 6.96607 4.13577C5.70489 5.44098 4.99997 7.18502 5 9L5.006 9.292L5.03 9.657L5.069 9.98L5.089 10.119L5.138 10.39L5.198 10.661C5.22606 10.7764 5.25707 10.8911 5.291 11.005L5.386 11.299L5.466 11.516L5.518 11.649L5.648 11.946C6.2088 13.1545 7.10276 14.1779 8.22492 14.896C9.34708 15.614 10.6508 15.9971 11.9831 16C13.3153 16.0029 14.6208 15.6257 15.7461 14.9125C16.8714 14.1994 17.7699 13.18 18.336 11.974L18.489 11.626L18.605 11.318C18.7501 10.9062 18.8562 10.4816 18.922 10.05L18.946 9.872L18.972 9.63L18.99 9.385L18.997 9.193L19 9C19 7.18502 18.2951 5.44098 17.0339 4.13577C15.7727 2.83056 14.0539 2.06623 12.24 2.004Z" fill="currentColor"></path><path d="M11.43 17.9821L9.46398 21.3901C9.38432 21.5281 9.27283 21.6452 9.1388 21.7315C9.00477 21.8177 8.85207 21.8708 8.6934 21.8861C8.53474 21.9015 8.3747 21.8787 8.22661 21.8197C8.07852 21.7608 7.94665 21.6673 7.84198 21.5471L7.76598 21.4471L7.70198 21.3331L6.39798 18.6981L3.46698 18.8881C3.30553 18.8984 3.14397 18.8695 2.99613 18.8038C2.8483 18.7381 2.71859 18.6375 2.61813 18.5107C2.51766 18.3839 2.44943 18.2346 2.41927 18.0757C2.38912 17.9167 2.39794 17.7528 2.44498 17.5981L2.48498 17.4911L2.53498 17.3911L4.50298 13.9821C5.27066 15.1382 6.29546 16.101 7.49718 16.7951C8.69891 17.4892 10.045 17.8948 11.43 17.9821Z" fill="currentColor"></path><path d="M19.4959 13.983L21.4619 17.389C21.5428 17.5293 21.5885 17.687 21.595 17.8488C21.6016 18.0106 21.5688 18.1715 21.4995 18.3178C21.4301 18.4641 21.3264 18.5915 21.197 18.6889C21.0677 18.7862 20.9167 18.8508 20.7569 18.877L20.6439 18.888L20.5319 18.887L17.5989 18.697L16.2959 21.333C16.2252 21.4758 16.1214 21.5996 15.9932 21.6941C15.865 21.7887 15.7161 21.8513 15.5588 21.8767C15.4015 21.9021 15.2405 21.8896 15.089 21.8403C14.9375 21.791 14.8 21.7062 14.6879 21.593L14.6059 21.499L14.5339 21.389L12.5659 17.982C13.9513 17.8954 15.2978 17.4894 16.5001 16.7956C17.7024 16.1018 18.7277 15.1392 19.4959 13.983Z" fill="currentColor"></path></svg>Garantia de fábrica</div>';
                        }
                    });
                }

                // 3. BOTÕES LAUDO E VÍDEO (cria apenas se não existir)
                var report = veiculo.inspectionReport || {};
                var hasPdf = report.pdfUrl && report.pdfUrl.trim() !== "";
                var hasVideo = report.videoUrl && report.videoUrl.trim() !== "";
                
                var existingContainer = card.querySelector('.VehicleCard_badgeContainer__v1N5b');
                if (existingContainer && existingContainer.hasAttribute('data-ua-processed')) {
                    return;
                }
                if (existingContainer) existingContainer.remove();
                
                if (hasPdf || hasVideo) {
                    var newContainer = document.createElement('div');
                    newContainer.className = 'VehicleCard_badgeContainer__v1N5b';
                    newContainer.setAttribute('data-ua-processed', 'true');
                    newContainer.style.cssText = 'display:flex;gap:4px;flex-wrap:wrap;';
                    if (hasPdf) {
                        var pdfBtn = document.createElement('button');
                        pdfBtn.type = 'button';
                        pdfBtn.className = 'base-Button-root LdsButton-module_lds-button__tSDnh LdsButton-module_lds-button--contained-primary__6r3Mk LdsButton-module_lds-button--md__PfuKT LdsButton-module_lds-states__PuVrv LdsButton-module_lds-states--contained__vVTBv ReportPDFButton_buttonReportPDF__s2Ze3';
                        pdfBtn.innerHTML = '<span class="LdsButton-module_lds-button__content__mtkkN"><div class="ReportPDFButton_buttonReportWrapperContent__C6ikM"><svg width="16" height="16" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" fill="none" role="presentation"><g fill="currentColor"><path d="m7.0001 2.09998c-.76913 0-1.50676.30553-2.05061.84939-.54386.54385-.84939 1.28148-.84939 2.05061v14.00002c0 .7691.30553 1.5067.84939 2.0506.54385.5438 1.28148.8494 2.05061.8494h10c.7691 0 1.5068-.3056 2.0506-.8494.5439-.5439.8494-1.2815.8494-2.0506v-10.10002h-4.9c-.5039 0-.9872-.20018-1.3435-.5565s-.5565-.83959-.5565-1.3435v-4.9zm8.6364 11.53642-4 4c-.3515.3514-.9213.3514-1.2728 0l-2-2c-.35147-.3515-.35147-.9213 0-1.2728s.92132-.3515 1.27279 0l1.36361 1.3636 3.3636-3.3636c.3515-.3515.9213-.3515 1.2728 0s.3515.9213 0 1.2728z"></path><path d="m14.9001 2.62718 4.4728 4.4728h-4.3728c-.0265 0-.052-.01054-.0707-.02929-.0188-.01876-.0293-.04419-.0293-.07071z"></path></g></svg><span>Laudo</span></div></span>';
                        pdfBtn.addEventListener('click', function(e) {
                            e.preventDefault();
                            e.stopPropagation();
                            e.stopImmediatePropagation();
                            showPdfModal(report.pdfUrl);
                            return false;
                        });
                        newContainer.appendChild(pdfBtn);
                    }
                    if (hasVideo) {
                        var videoBtn = document.createElement('button');
                        videoBtn.type = 'button';
                        videoBtn.className = 'base-Button-root LdsButton-module_lds-button__tSDnh LdsButton-module_lds-button--contained-primary__6r3Mk LdsButton-module_lds-button--md__PfuKT LdsButton-module_lds-states__PuVrv LdsButton-module_lds-states--contained__vVTBv ReportVideoButton_buttonReportVideo__lPhz3';
                        videoBtn.innerHTML = '<span class="LdsButton-module_lds-button__content__mtkkN"><div class="ReportVideoButton_buttonReportWrapperContent__pFcd9"><svg width="16" height="16" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" fill="none" role="presentation"><path d="M6.56055 3.21395C6.84516 3.05491 7.194 3.06263 7.47168 3.23348L20.4717 11.2335C20.7378 11.3973 20.9004 11.6876 20.9004 12.0001C20.9004 12.3126 20.7378 12.6029 20.4717 12.7667L7.47168 20.7667C7.19402 20.9375 6.84514 20.9452 6.56055 20.7862C6.27602 20.6272 6.09964 20.3261 6.09961 20.0001V4.00008C6.09961 3.67409 6.27601 3.37302 6.56055 3.21395Z" fill="currentColor"></path></svg><span>Vídeo</span></div></span>';
                        videoBtn.addEventListener('click', function(e) {
                            e.preventDefault();
                            e.stopPropagation();
                            e.stopImmediatePropagation();
                            showVideoModal(report.videoUrl);
                            return false;
                        });
                        newContainer.appendChild(videoBtn);
                    }

                    var isMobileCard = window.innerWidth < 768;
                    if (isMobileCard) {
                        // Mobile: inserir FORA do <a> (appended ao card), para evitar navegação ao clicar
                        newContainer.style.cssText = 'display:flex;gap:4px;flex-wrap:wrap;padding:6px 8px 8px 8px;background:#fff;border-top:1px solid #eee;';
                        card.appendChild(newContainer);
                    } else {
                        // Desktop: posicionamento absoluto como antes
                        if (!card.style.position) card.style.position = 'relative';
                        newContainer.style.position = 'absolute';
                        var infoContainer = link.querySelector('.VehicleCard_infoContainer__Fr3Ak');
                        if (infoContainer) {
                            var infoRect = infoContainer.getBoundingClientRect();
                            var cardRect = card.getBoundingClientRect();
                            var topRelative = infoRect.bottom - cardRect.top + -3;
                            var leftRelative = 6;
                            newContainer.style.top = topRelative + 'px';
                            newContainer.style.left = leftRelative + 'px';
                            newContainer.style.right = 'auto';
                            newContainer.style.width = 'auto';
                            newContainer.style.zIndex = '2';
                        }
                        card.appendChild(newContainer);
                    }
                }

                // 4. PERCENTUAL FIPE
                var fipe = veiculo.fipe || {};
                if (fipe.marginPercentage && fipe.marginPercentage > 0) {
                    var footerDiv = card.querySelector('.VehicleCard_footer___2ZiN');
                    if (footerDiv) {
                        var priceContainer = footerDiv.querySelector('.Price_priceContainer__UFleO');
                        if (!priceContainer) {
                            var priceDiv = footerDiv.querySelector('div > div > h2, div > div > h3');
                            if (priceDiv && priceDiv.closest('div')) {
                                priceContainer = priceDiv.closest('div');
                                if (priceContainer && !priceContainer.classList.contains('Price_priceContainer__UFleO')) priceContainer.classList.add('Price_priceContainer__UFleO');
                            }
                        }
                        if (priceContainer && !priceContainer.querySelector('.Price_fipeContainer__t6NfV')) {
                            var fipePercent = fipe.marginPercentage.toFixed(2).replace('.', ',');
                            var fipeHtml = document.createElement('div');
                            fipeHtml.className = 'Price_fipeContainer__t6NfV';
                            fipeHtml.innerHTML = '<svg width="16" height="16" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" fill="none" role="presentation"><path d="m12.9001 5.0001c0-.49706-.4029-.9-.9-.9s-.9.40294-.9.9v11.8272l-4.46361-4.4636c-.35147-.3515-.92132-.3515-1.27279 0s-.35147.9213 0 1.2728l6 6c.1688.1688.3977.2636.6364.2636s.4676-.0948.6364-.2636l6-6c.3515-.3515.3515-.9213 0-1.2728s-.9213-.3515-1.2728 0l-4.4636 4.4636z" fill="currentColor"></path></svg> ' + fipePercent + '% FIPE';
                            priceContainer.appendChild(fipeHtml);
                        }
                    }
                }

                // 5. BOTÃO "Tenho interesse"
                var botoes = card.querySelectorAll('button');
                for (var i = 0; i < botoes.length; i++) {
                    var btn = botoes[i];
                    if (btn.innerText.includes('Ver mais informações')) {
                        if (!btn.classList.contains('botao-personalizado')) {
                            btn.classList.remove('LdsButton-module_lds-button--outlined-primary__ZxRfx','LdsButton-module_lds-states--outlined__4D3s7');
                            btn.classList.add('LdsButton-module_lds-button--contained-primary__6r3Mk','LdsButton-module_lds-states--contained__vVTBv','botao-personalizado');
                            btn.innerText = 'Tenho interesse';
                            var novoBotao = btn.cloneNode(true);
                            btn.parentNode.replaceChild(novoBotao, btn);
                            (function(nb, lnk) {
                                nb.addEventListener('click', function(e) {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    window.location.href = lnk.href;
                                });
                            })(novoBotao, link);
                        }
                        break;
                    }
                }
            });
        } finally {
            isApplying = false;
        }
    }

    // ============================================================
    // SIDEBAR (PÁGINA DE DETALHES) - VERSÃO COMPLETA COM FIPE, BADGES, LAUDO/VÍDEO
    // ============================================================
    function applySidebar(carroData) {
        var rightSidebar = document.querySelector('.DesktopPage_rightSide__uZfet');
        if (!rightSidebar || !carroData) return;
        var container = rightSidebar.querySelector('.DesktopPage_container__eiImn');
        if (!container) return;
        
        // Evita recriar se já processado
        if (container.hasAttribute('data-ua-sidebar-processed')) return;
        container.setAttribute('data-ua-sidebar-processed', 'true');
        
        var novoPreco = carroData.priceFor + ACRESCIMO;
        var precoFormatado = novoPreco.toLocaleString('pt-BR', { style:'currency', currency:'BRL' });
        var nomeLoja = (carroData.store && carroData.store.name) ? carroData.store.name : 'Loja não informada';
        var cidade = (carroData.store && carroData.store.city && carroData.store.state)
            ? carroData.store.city + ' - ' + carroData.store.state : 'Fortaleza - CE';
        var km = carroData.odometer.toLocaleString('pt-BR');
        
        // --- Badges (features) ---
        var features = carroData.features || [];
        var badgesHtml = '';
        features.forEach(function(feat) {
            if (feat.description === 'Acabou de chegar') {
                badgesHtml += '<div class="Badge_container__eLOMO" style="background-color: var(--lds-color-accent-critical-emphasis-lower); color: var(--lds-color-accent-critical-emphasis-high); margin-top: 8px; display: inline-block; margin-right: 8px;"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 7.00004C8.16667 5.27337 7 2.91671 6.41667 2.33337C6.41667 4.10554 5.38242 5.09896 4.66667 5.83337C3.9515 6.56837 3.5 7.72337 3.5 8.75004C3.5 9.6783 3.86875 10.5685 4.52513 11.2249C5.1815 11.8813 6.07174 12.25 7 12.25C7.92826 12.25 8.8185 11.8813 9.47487 11.2249C10.1313 10.5685 10.5 9.6783 10.5 8.75004C10.5 7.85637 9.884 6.45171 9.33333 5.83337C8.2915 7.58337 7.70525 7.58337 7 7.00004Z" fill="var(--lds-color-accent-critical-emphasis-high)" stroke="var(--lds-color-accent-critical-emphasis-high)" stroke-linecap="round" stroke-linejoin="round"></path></svg>Acabou de chegar</div>';
            } else if (feat.description === 'Garantia de Fábrica') {
                badgesHtml += '<div class="Badge_container__eLOMO" style="background-color: var(--lds-color-accent-info-emphasis-lower); color: var(--lds-color-accent-info-emphasis-high); margin-top: 8px; display: inline-block; margin-right: 8px;"><svg width="14" height="14" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" fill="none" role="presentation"><path d="M12.24 2.004L12 2L11.76 2.004C9.94609 2.06623 8.22726 2.83056 6.96607 4.13577C5.70489 5.44098 4.99997 7.18502 5 9L5.006 9.292L5.03 9.657L5.069 9.98L5.089 10.119L5.138 10.39L5.198 10.661C5.22606 10.7764 5.25707 10.8911 5.291 11.005L5.386 11.299L5.466 11.516L5.518 11.649L5.648 11.946C6.2088 13.1545 7.10276 14.1779 8.22492 14.896C9.34708 15.614 10.6508 15.9971 11.9831 16C13.3153 16.0029 14.6208 15.6257 15.7461 14.9125C16.8714 14.1994 17.7699 13.18 18.336 11.974L18.489 11.626L18.605 11.318C18.7501 10.9062 18.8562 10.4816 18.922 10.05L18.946 9.872L18.972 9.63L18.99 9.385L18.997 9.193L19 9C19 7.18502 18.2951 5.44098 17.0339 4.13577C15.7727 2.83056 14.0539 2.06623 12.24 2.004Z" fill="currentColor"></path><path d="M11.43 17.9821L9.46398 21.3901C9.38432 21.5281 9.27283 21.6452 9.1388 21.7315C9.00477 21.8177 8.85207 21.8708 8.6934 21.8861C8.53474 21.9015 8.3747 21.8787 8.22661 21.8197C8.07852 21.7608 7.94665 21.6673 7.84198 21.5471L7.76598 21.4471L7.70198 21.3331L6.39798 18.6981L3.46698 18.8881C3.30553 18.8984 3.14397 18.8695 2.99613 18.8038C2.8483 18.7381 2.71859 18.6375 2.61813 18.5107C2.51766 18.3839 2.44943 18.2346 2.41927 18.0757C2.38912 17.9167 2.39794 17.7528 2.44498 17.5981L2.48498 17.4911L2.53498 17.3911L4.50298 13.9821C5.27066 15.1382 6.29546 16.101 7.49718 16.7951C8.69891 17.4892 10.045 17.8948 11.43 17.9821Z" fill="currentColor"></path><path d="M19.4959 13.983L21.4619 17.389C21.5428 17.5293 21.5885 17.687 21.595 17.8488C21.6016 18.0106 21.5688 18.1715 21.4995 18.3178C21.4301 18.4641 21.3264 18.5915 21.197 18.6889C21.0677 18.7862 20.9167 18.8508 20.7569 18.877L20.6439 18.888L20.5319 18.887L17.5989 18.697L16.2959 21.333C16.2252 21.4758 16.1214 21.5996 15.9932 21.6941C15.865 21.7887 15.7161 21.8513 15.5588 21.8767C15.4015 21.9021 15.2405 21.8896 15.089 21.8403C14.9375 21.791 14.8 21.7062 14.6879 21.593L14.6059 21.499L14.5339 21.389L12.5659 17.982C13.9513 17.8954 15.2978 17.4894 16.5001 16.7956C17.7024 16.1018 18.7277 15.1392 19.4959 13.983Z" fill="currentColor"></path></svg>Garantia de fábrica</div>';
            }
        });
        
        // --- Botões Laudo e Vídeo ---
        var report = carroData.inspectionReport || {};
        var hasPdf = report.pdfUrl && report.pdfUrl.trim() !== "";
        var hasVideo = report.videoUrl && report.videoUrl.trim() !== "";
        var reportsHtml = '';
        if (hasPdf) {
            reportsHtml += '<button type="button" class="base-Button-root LdsButton-module_lds-button__tSDnh LdsButton-module_lds-button--contained-primary__6r3Mk LdsButton-module_lds-button--md__PfuKT LdsButton-module_lds-states__PuVrv LdsButton-module_lds-states--contained__vVTBv ReportPDFButton_buttonReportPDF__s2Ze3" style="margin-right: 8px;"><span class="LdsButton-module_lds-button__content__mtkkN"><div class="ReportPDFButton_buttonReportWrapperContent__C6ikM"><svg width="16" height="16" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" fill="none" role="presentation"><g fill="currentColor"><path d="m7.0001 2.09998c-.76913 0-1.50676.30553-2.05061.84939-.54386.54385-.84939 1.28148-.84939 2.05061v14.00002c0 .7691.30553 1.5067.84939 2.0506.54385.5438 1.28148.8494 2.05061.8494h10c.7691 0 1.5068-.3056 2.0506-.8494.5439-.5439.8494-1.2815.8494-2.0506v-10.10002h-4.9c-.5039 0-.9872-.20018-1.3435-.5565s-.5565-.83959-.5565-1.3435v-4.9zm8.6364 11.53642-4 4c-.3515.3514-.9213.3514-1.2728 0l-2-2c-.35147-.3515-.35147-.9213 0-1.2728s.92132-.3515 1.27279 0l1.36361 1.3636 3.3636-3.3636c.3515-.3515.9213-.3515 1.2728 0s.3515.9213 0 1.2728z"></path><path d="m14.9001 2.62718 4.4728 4.4728h-4.3728c-.0265 0-.052-.01054-.0707-.02929-.0188-.01876-.0293-.04419-.0293-.07071z"></path></g></svg><span>Laudo</span></div></span></button>';
        }
        if (hasVideo) {
            reportsHtml += '<button type="button" class="base-Button-root LdsButton-module_lds-button__tSDnh LdsButton-module_lds-button--contained-primary__6r3Mk LdsButton-module_lds-button--md__PfuKT LdsButton-module_lds-states__PuVrv LdsButton-module_lds-states--contained__vVTBv ReportVideoButton_buttonReportVideo__lPhz3"><span class="LdsButton-module_lds-button__content__mtkkN"><div class="ReportVideoButton_buttonReportWrapperContent__pFcd9"><svg width="16" height="16" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" fill="none" role="presentation"><path d="M6.56055 3.21395C6.84516 3.05491 7.194 3.06263 7.47168 3.23348L20.4717 11.2335C20.7378 11.3973 20.9004 11.6876 20.9004 12.0001C20.9004 12.3126 20.7378 12.6029 20.4717 12.7667L7.47168 20.7667C7.19402 20.9375 6.84514 20.9452 6.56055 20.7862C6.27602 20.6272 6.09964 20.3261 6.09961 20.0001V4.00008C6.09961 3.67409 6.27601 3.37302 6.56055 3.21395Z" fill="currentColor"></path></svg><span>Vídeo</span></div></span></button>';
        }
        
        // --- Percentual FIPE ao lado do preço ---
        var fipe = carroData.fipe || {};
        var fipePercentHtml = '';
        if (fipe.marginPercentage) {
            var percent = fipe.marginPercentage.toFixed(2).replace('.', ',');
            var direction = fipe.marginPercentage > 0 ? 'abaixo' : 'acima';
            fipePercentHtml = '<div class="Price_fipeContainer__t6NfV"><svg width="16" height="16" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" fill="none" role="presentation"><path d="m12.9001 5.0001c0-.49706-.4029-.9-.9-.9s-.9.40294-.9.9v11.8272l-4.46361-4.4636c-.35147-.3515-.92132-.3515-1.27279 0s-.35147.9213 0 1.2728l6 6c.1688.1688.3977.2636.6364.2636s.4676-.0948.6364-.2636l6-6c.3515-.3515.3515-.9213 0-1.2728s-.9213-.3515-1.2728 0l-4.4636 4.4636z" fill="currentColor"></path></svg>' + percent + '% ' + direction + ' FIPE</div>';
        }
        
        // --- Tabela de comparação FIPE (substitui o banner) ---
        var fipePrice = fipe.price ? fipe.price.toLocaleString('pt-BR', { style:'currency', currency:'BRL' }) : 'N/A';
        var distance = fipe.marginValue ? fipe.marginValue.toLocaleString('pt-BR', { style:'currency', currency:'BRL' }) : 'N/A';
        var marginPercent = fipe.marginPercentage ? fipe.marginPercentage.toFixed(2).replace('.', ',') + ' %' : 'N/A';
        var comparisonTableHtml = `
            <div class="VehicleFipeComparison_container__lUmIU LdsPaper-module_lds-paper__Jhi1y">
                <div><p class="LdsTypography-module_lds-typography__-DOlx LdsTypography-module_lds-typography--body-md__KI9TK VehicleFipeComparison_comparePrices__WgCZ9">Compare os preços</p></div>
                <div class="VehicleFipeComparison_pricesRow__HkQOh">
                    <p class="LdsTypography-module_lds-typography__-DOlx LdsTypography-module_lds-typography--body-md__KI9TK VehicleFipeComparison_comparePrices__WgCZ9">Preço FIPE</p>
                    <p class="LdsTypography-module_lds-typography__-DOlx LdsTypography-module_lds-typography--body-md__KI9TK VehicleFipeComparison_comparePrices__WgCZ9">${fipePrice}</p>
                </div>
                <div style="background-color: var(--divider-color); height: 1px; width: 100%;"></div>
                <div class="VehicleFipeComparison_valueRow__s31Bd">
                    <div><small>Distancia FIPE</small><h3 class="LdsTypography-module_lds-typography__-DOlx LdsTypography-module_lds-typography--heading-md__QVgP4">${distance}</h3></div>
                    <div><small>Margem FIPE</small><h3 class="LdsTypography-module_lds-typography__-DOlx LdsTypography-module_lds-typography--heading-md__QVgP4 VehicleFipeComparison_negativeMargin__LLmU6"><svg width="20" height="20" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" fill="none" role="presentation"><path d="m12.9001 5.0001c0-.49706-.4029-.9-.9-.9s-.9.40294-.9.9v11.8272l-4.46361-4.4636c-.35147-.3515-.92132-.3515-1.27279 0s-.35147.9213 0 1.2728l6 6c.1688.1688.3977.2636.6364.2636s.4676-.0948.6364-.2636l6-6c.3515-.3515.3515-.9213 0-1.2728s-.9213-.3515-1.2728 0l-4.4636 4.4636z" fill="var(--lds-color-accent-success-emphasis-high)"></path></svg>${marginPercent}</h3></div>
                </div>
            </div>
        `;
        
        // Monta o HTML final da sidebar
        var finalHtml = `
            <div class="VehicleTitle_container__mDy6V">
                <div class="VehicleTitle_header__bZBhS">
                    <h4 class="LdsTypography-module_lds-typography__-DOlx LdsTypography-module_lds-typography--heading-sm__5NKKy VehicleTitle_version__d4gVg">${carroData.brand}</h4>
                </div>
                <h2 class="LdsTypography-module_lds-typography__-DOlx LdsTypography-module_lds-typography--heading-lg__-4owW VehicleTitle_model__Ec3VK"><strong>${carroData.modelFamilyDescription}</strong> ${carroData.model}</h2>
                <p class="LdsTypography-module_lds-typography__-DOlx LdsTypography-module_lds-typography--body-md__KI9TK">${carroData.manufactureYear}/${carroData.modelYear}&nbsp;&nbsp;&nbsp;&nbsp;${km} km</p>
                ${badgesHtml ? '<div style="margin-top: 8px;">' + badgesHtml + '</div>' : ''}
            </div>
            <div class="VehicleReports_container__qAkuy">${reportsHtml}</div>
            <div style="background-color:var(--divider-color);height:1px;width:100%"></div>
            <div class="VehicleLocation_container__m8i4B">
                <svg width="20" height="20" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" fill="none" role="presentation" class="location-icon"><path d="m5.0001 2.09998c-.3409 0-.65253.1926-.80499.4975l-2 4c-.06248.12497-.09501.26278-.09501.4025v1c0 1.03434.41089 2.02632 1.14228 2.75772.25691.2569.54597.4743.85772.6482v8.6941h-1.1c-.49706 0-.9.4029-.9.9 0 .497.40294.9.9.9h18c.4971 0 .9-.403.9-.9 0-.4971-.4029-.9-.9-.9h-1.1v-8.6941c.3117-.1739.6008-.3913.8577-.6482.7314-.7314 1.1423-1.72338 1.1423-2.75772v-1c0-.13972-.0325-.27753-.095-.4025l-2-4c-.1525-.3049-.4641-.4975-.805-.4975zm.9 18.00002v-8.2013c.03328.0008.06662.0013.1.0013 1.03434 0 2.02632-.4109 2.75771-1.1423.08516-.0852.16597-.1738.24229-.2657.07632.0919.15713.1805.24228.2657.73139.7314 1.72342 1.1423 2.75772 1.1423s2.0263-.4109 2.7577-1.1423c.0852-.0852.166-.1738.2423-.2657.0763.0919.1571.1805.2423.2657.7314.7314 1.7234 1.1423 2.7577 1.1423.0334 0 .0667-.0005.1-.0013v8.2013h-2.2v-3.1c0-.7692-.3055-1.5068-.8494-2.0506-.5438-.5439-1.2815-.8494-2.0506-.8494h-2c-.7691 0-1.50676.3055-2.05061.8494-.54386.5438-.84939 1.2814-.84939 2.0506v3.1zm4.6151-10.6151c-.3939-.39383-.6151-.92797-.6151-1.48492v-.1h4.2v.1c0 .55695-.2213 1.09109-.6151 1.48492s-.9279.6151-1.4849.6151-1.0911-.22127-1.4849-.6151zm-2.4151-1.48492c0 .55695-.22125 1.09109-.61508 1.48492-.39382.39383-.92797.6151-1.48492.6151-.55696 0-1.0911-.22127-1.48493-.6151-.39382-.39383-.61507-.92797-.61507-1.48492v-.1h4.2zm-3.64377-1.9 1.1-2.2h12.88757l1.1 2.2zm11.44377 1.8h4.2v.1c0 .55695-.2213 1.09109-.6151 1.48492s-.9279.6151-1.4849.6151-1.0911-.22127-1.4849-.6151c-.3939-.39383-.6151-.92797-.6151-1.48492zm-4.9 8.00002h2c.2917 0 .5715.1159.7778.3222.2063.2062.3222.486.3222.7778v3.1h-4.2v-3.1c0-.2918.1159-.5716.3222-.7778.2063-.2063.4861-.3222.7778-.3222z" fill="currentColor"></path></svg>
                <p class="LdsTypography-module_lds-typography__-DOlx LdsTypography-module_lds-typography--body-sm__7uR1-">${nomeLoja}<br><span class="VehicleLocation_opacity__7fAgZ">${cidade}</span></p>
            </div>
            <div style="background-color:var(--divider-color);height:1px;width:100%"></div>
            <div class="VehiclePrice_container__myGEh">
                <div class="Price_priceContainer__UFleO">
                    <div><h2 class="LdsTypography-module_lds-typography__-DOlx LdsTypography-module_lds-typography--heading-lg__-4owW">${precoFormatado}</h2></div>
                    ${fipePercentHtml}
                </div>
            </div>
            <div class="whatsapp-button-wrapper" style="margin-bottom:24px;">
                <button type="button" id="whatsapp-button-script" class="whatsapp-button-custom">
                    <img src="${WHATSAPP_ICON_URL}" alt="WhatsApp" class="whatsapp-icon" style="width:24px;height:24px;margin-right:8px;vertical-align:middle;">
                    <span>WhatsApp</span>
                </button>
            </div>
            ${comparisonTableHtml}
        `;
        
        container.innerHTML = finalHtml;
        
        // Adiciona eventos aos botões Laudo e Vídeo (se existirem)
        if (hasPdf) {
            var pdfBtn = container.querySelector('.ReportPDFButton_buttonReportPDF__s2Ze3');
            if (pdfBtn) {
                pdfBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    showPdfModal(report.pdfUrl);
                });
            }
        }
        if (hasVideo) {
            var videoBtn = container.querySelector('.ReportVideoButton_buttonReportVideo__lPhz3');
            if (videoBtn) {
                videoBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    showVideoModal(report.videoUrl);
                });
            }
        }
    }

    // ============================================================
    // PÁGINA DE DETALHES - MOBILE
    // ============================================================
    function applyMobileDetailPage(carroData) {
        if (!carroData) return;

        var report = carroData.inspectionReport || {};
        var hasPdf   = report.pdfUrl  && report.pdfUrl.trim()  !== "";
        var hasVideo = report.videoUrl && report.videoUrl.trim() !== "";
        var fipe     = carroData.fipe || {};

        // --- 1. Badge + botões Laudo/Vídeo na secção mobile (fora do sidebar desktop) ---
        // O VehicleReports_container__qAkuy só existe dentro do sidebar desktop (oculto no mobile).
        // Por isso criamos um novo container irmão do VehicleTitle_container__mDy6V mobile.
        var features = carroData.features || [];
        document.querySelectorAll('.VehicleTitle_container__mDy6V').forEach(function(tc) {
            if (tc.hasAttribute('data-ua-mobile-badge')) return;
            if (tc.closest('.DesktopPage_rightSide__uZfet')) return;
            tc.setAttribute('data-ua-mobile-badge', 'true');

            // Badges
            if (features.length > 0) {
                var badgesDiv = document.createElement('div');
                badgesDiv.style.marginTop = '8px';
                features.forEach(function(feat) {
                    if (feat.description === 'Acabou de chegar') {
                        badgesDiv.innerHTML += '<div class="Badge_container__eLOMO" style="background-color:var(--lds-color-accent-critical-emphasis-lower);color:var(--lds-color-accent-critical-emphasis-high);display:inline-block;margin-right:8px;"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 7.00004C8.16667 5.27337 7 2.91671 6.41667 2.33337C6.41667 4.10554 5.38242 5.09896 4.66667 5.83337C3.9515 6.56837 3.5 7.72337 3.5 8.75004C3.5 9.6783 3.86875 10.5685 4.52513 11.2249C5.1815 11.8813 6.07174 12.25 7 12.25C7.92826 12.25 8.8185 11.8813 9.47487 11.2249C10.1313 10.5685 10.5 9.6783 10.5 8.75004C10.5 7.85637 9.884 6.45171 9.33333 5.83337C8.2915 7.58337 7.70525 7.58337 7 7.00004Z" fill="var(--lds-color-accent-critical-emphasis-high)" stroke="var(--lds-color-accent-critical-emphasis-high)" stroke-linecap="round" stroke-linejoin="round"></path></svg>Acabou de chegar</div>';
                    } else if (feat.description === 'Garantia de Fábrica') {
                        badgesDiv.innerHTML += '<div class="Badge_container__eLOMO" style="background-color:var(--lds-color-accent-info-emphasis-lower);color:var(--lds-color-accent-info-emphasis-high);display:inline-block;margin-right:8px;">Garantia de fábrica</div>';
                    }
                });
                tc.appendChild(badgesDiv);
            }

            // Botões Laudo / Vídeo — inseridos como irmão APÓS o VehicleTitle mobile
            if ((hasPdf || hasVideo) && !tc.nextElementSibling?.hasAttribute('data-ua-mobile-reports')) {
                var mobileReports = document.createElement('div');
                mobileReports.className = 'VehicleReports_container__qAkuy';
                mobileReports.setAttribute('data-ua-mobile-reports', 'true');
                mobileReports.style.cssText = 'display:flex;gap:8px;padding:8px 0;';

                if (hasPdf) {
                    var pdfBtn = document.createElement('button');
                    pdfBtn.type = 'button';
                    pdfBtn.className = 'base-Button-root LdsButton-module_lds-button__tSDnh LdsButton-module_lds-button--contained-primary__6r3Mk LdsButton-module_lds-button--md__PfuKT LdsButton-module_lds-states__PuVrv LdsButton-module_lds-states--contained__vVTBv ReportPDFButton_buttonReportPDF__s2Ze3';
                    pdfBtn.innerHTML = '<span class="LdsButton-module_lds-button__content__mtkkN"><div class="ReportPDFButton_buttonReportWrapperContent__C6ikM"><svg width="16" height="16" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" fill="none" role="presentation"><g fill="currentColor"><path d="m7.0001 2.09998c-.76913 0-1.50676.30553-2.05061.84939-.54386.54385-.84939 1.28148-.84939 2.05061v14.00002c0 .7691.30553 1.5067.84939 2.0506.54385.5438 1.28148.8494 2.05061.8494h10c.7691 0 1.5068-.3056 2.0506-.8494.5439-.5439.8494-1.2815.8494-2.0506v-10.10002h-4.9c-.5039 0-.9872-.20018-1.3435-.5565s-.5565-.83959-.5565-1.3435v-4.9zm8.6364 11.53642-4 4c-.3515.3514-.9213.3514-1.2728 0l-2-2c-.35147-.3515-.35147-.9213 0-1.2728s.92132-.3515 1.27279 0l1.36361 1.3636 3.3636-3.3636c.3515-.3515.9213-.3515 1.2728 0s.3515.9213 0 1.2728z"></path><path d="m14.9001 2.62718 4.4728 4.4728h-4.3728c-.0265 0-.052-.01054-.0707-.02929-.0188-.01876-.0293-.04419-.0293-.07071z"></path></g></svg><span>Laudo</span></div></span>';
                    pdfBtn.addEventListener('click', function(e) { e.preventDefault(); e.stopPropagation(); showPdfModal(report.pdfUrl); });
                    mobileReports.appendChild(pdfBtn);
                }
                if (hasVideo) {
                    var videoBtn = document.createElement('button');
                    videoBtn.type = 'button';
                    videoBtn.className = 'base-Button-root LdsButton-module_lds-button__tSDnh LdsButton-module_lds-button--contained-primary__6r3Mk LdsButton-module_lds-button--md__PfuKT LdsButton-module_lds-states__PuVrv LdsButton-module_lds-states--contained__vVTBv ReportVideoButton_buttonReportVideo__lPhz3';
                    videoBtn.innerHTML = '<span class="LdsButton-module_lds-button__content__mtkkN"><div class="ReportVideoButton_buttonReportWrapperContent__pFcd9"><svg width="16" height="16" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" fill="none" role="presentation"><path d="M6.56055 3.21395C6.84516 3.05491 7.194 3.06263 7.47168 3.23348L20.4717 11.2335C20.7378 11.3973 20.9004 11.6876 20.9004 12.0001C20.9004 12.3126 20.7378 12.6029 20.4717 12.7667L7.47168 20.7667C7.19402 20.9375 6.84514 20.9452 6.56055 20.7862C6.27602 20.6272 6.09964 20.3261 6.09961 20.0001V4.00008C6.09961 3.67409 6.27601 3.37302 6.56055 3.21395Z" fill="currentColor"></path></svg><span>Vídeo</span></div></span>';
                    videoBtn.addEventListener('click', function(e) { e.preventDefault(); e.stopPropagation(); showVideoModal(report.videoUrl); });
                    mobileReports.appendChild(videoBtn);
                }

                // Inserir imediatamente a seguir ao VehicleTitle_container__mDy6V
                tc.parentNode.insertBefore(mobileReports, tc.nextSibling);
            }
        });

        // --- 2. Tabela FIPE dentro de MobilePage_contentInterest ---
        if (!fipe.price) return;
        var fipePrice    = fipe.price.toLocaleString('pt-BR', { style:'currency', currency:'BRL' });
        var fipeDistance = fipe.marginValue ? fipe.marginValue.toLocaleString('pt-BR', { style:'currency', currency:'BRL' }) : 'N/A';
        var fipeMargin   = fipe.marginPercentage ? fipe.marginPercentage.toFixed(2).replace('.', ',') + ' %' : 'N/A';
        document.querySelectorAll('.MobilePage_contentInterest__dY5dv').forEach(function(div) {
            if (div.hasAttribute('data-ua-fipe-mobile')) return;
            div.setAttribute('data-ua-fipe-mobile', 'true');
            var tableEl = document.createElement('div');
            tableEl.className = 'VehicleFipeComparison_container__lUmIU LdsPaper-module_lds-paper__Jhi1y';
            tableEl.innerHTML =
                '<div><p class="LdsTypography-module_lds-typography__-DOlx LdsTypography-module_lds-typography--body-md__KI9TK VehicleFipeComparison_comparePrices__WgCZ9">Compare os preços</p></div>' +
                '<div class="VehicleFipeComparison_pricesRow__HkQOh">' +
                    '<p class="LdsTypography-module_lds-typography__-DOlx LdsTypography-module_lds-typography--body-md__KI9TK VehicleFipeComparison_comparePrices__WgCZ9">Preço FIPE</p>' +
                    '<p class="LdsTypography-module_lds-typography__-DOlx LdsTypography-module_lds-typography--body-md__KI9TK VehicleFipeComparison_comparePrices__WgCZ9">' + fipePrice + '</p>' +
                '</div>' +
                '<div style="background-color:var(--divider-color);height:1px;width:100%;"></div>' +
                '<div class="VehicleFipeComparison_valueRow__s31Bd">' +
                    '<div><small>Distancia FIPE</small><h3 class="LdsTypography-module_lds-typography__-DOlx LdsTypography-module_lds-typography--heading-md__QVgP4">' + fipeDistance + '</h3></div>' +
                    '<div><small>Margem FIPE</small><h3 class="LdsTypography-module_lds-typography__-DOlx LdsTypography-module_lds-typography--heading-md__QVgP4 VehicleFipeComparison_negativeMargin__LLmU6"><svg width="20" height="20" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" fill="none" role="presentation"><path d="m12.9001 5.0001c0-.49706-.4029-.9-.9-.9s-.9.40294-.9.9v11.8272l-4.46361-4.4636c-.35147-.3515-.92132-.3515-1.27279 0s-.35147.9213 0 1.2728l6 6c.1688.1688.3977.2636.6364.2636s.4676-.0948.6364-.2636l6-6c.3515-.3515.3515-.9213 0-1.2728s-.9213-.3515-1.2728 0l-4.4636 4.4636z" fill="var(--lds-color-accent-success-emphasis-high)"></path></svg>' + fipeMargin + '</h3></div>' +
                '</div>';
            div.appendChild(tableEl);
        });
    }

    // ============================================================
    // DEMAIS FUNÇÕES (header, footer, logo, etc.)
    // ============================================================
    function applyHeaderButtons() {
        document.querySelectorAll('button').forEach(function(btn) { if (btn.innerText.trim() === 'Cadastrar' && !btn.closest('.VehiclesFilters_buttonsContainer__lY4oa')) btn.remove(); });
        var entrarHeader = Array.from(document.querySelectorAll('button')).find(function(b) { return b.innerText.trim() === 'Entrar' && !b.closest('.VehiclesFilters_buttonsContainer__lY4oa'); });
        if (entrarHeader && entrarHeader.innerText !== 'Nossos Carros') {
            entrarHeader.innerText = 'Nossos Carros';
            entrarHeader.style.borderColor = '#0055a4';
            entrarHeader.style.color = '#0055a4';
            var clone = entrarHeader.cloneNode(true);
            entrarHeader.parentNode.replaceChild(clone, entrarHeader);
            clone.addEventListener('click', function(e) { e.preventDefault(); window.location.href = 'https://universalauto.xyz/carros'; });
        }
        var filterCadastrar = document.querySelector('.VehiclesFilters_buttonsContainer__lY4oa button.LdsButton-module_lds-button--contained-primary__6r3Mk');
        if (filterCadastrar && filterCadastrar.innerText.trim() === 'Cadastrar') filterCadastrar.remove();
        var filterEntrar = document.querySelector('.VehiclesFilters_buttonsContainer__lY4oa button.LdsButton-module_lds-button--outlined-primary__ZxRfx');
        if (filterEntrar && filterEntrar.innerText.trim() === 'Entrar' && filterEntrar.innerText !== 'Fale conosco / Contato') {
            filterEntrar.innerText = 'Fale conosco / Contato';
            filterEntrar.style.borderColor = '#0055a4';
            filterEntrar.style.color = '#0055a4';
            var clone2 = filterEntrar.cloneNode(true);
            filterEntrar.parentNode.replaceChild(clone2, filterEntrar);
            clone2.addEventListener('click', function(e) { e.preventDefault(); window.location.href = 'mailto:contato@universalautorepasse.com.br'; });
        }
    }
    function applyFooter() {
        var lnkLocaliza = document.querySelector('a[href="https://www.localiza.com/"]'); if (lnkLocaliza) { var p1 = lnkLocaliza.closest('.Footer_product__RLAJk'); if(p1) p1.remove(); }
        var lnkZarp = document.querySelector('a[href="https://zarp.localiza.com/"]'); if (lnkZarp) { var p2 = lnkZarp.closest('.Footer_product__RLAJk'); if(p2) p2.remove(); }
        document.querySelectorAll('.Footer_product__RLAJk').forEach(function(div) { if (div.innerText.trim() === '' && div.children.length === 0) div.remove(); });
        var lnkMeoo = document.querySelector('a[href="https://meoo.localiza.com"]'); var meoo = lnkMeoo ? lnkMeoo.closest('.Footer_product__RLAJk') : null;
        if (meoo && !meoo.querySelector('img[alt="Instagram"]')) { meoo.innerHTML = '<a href="https://www.instagram.com/universalautorepasse_/" target="_blank" style="display:flex;align-items:center;gap:8px;text-decoration:none;"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/960px-Instagram_logo_2016.svg.png" alt="Instagram" style="height:24px;width:24px;object-fit:contain;"><div style="display:flex;flex-direction:column;line-height:1.2;"><span style="font-size:16px;font-weight:700;background:linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">Instagram</span><p class="LdsTypography-module_lds-typography__-DOlx LdsTypography-module_lds-typography--body-md__KI9TK" style="margin:0;color:#888;font-size:11px;">Redes Sociais</p></div></a>'; }
        var lnkFrotas = document.querySelector('a[href="https://frotas.localiza.com/"]'); var frotas = lnkFrotas ? lnkFrotas.closest('.Footer_product__RLAJk') : null;
        if (frotas && !frotas.querySelector('img[alt="Universal Auto Repasse"]')) { frotas.innerHTML = '<a href="https://universalautorepasse.com.br/" target="_blank" style="display:flex;align-items:center;gap:8px;text-decoration:none;"><img src="https://raw.githubusercontent.com/SiteHosterBabe/universalauto/refs/heads/main/logouniversall.png" alt="Universal Auto Repasse" style="height:24px;width:auto;object-fit:contain;"><div style="display:flex;flex-direction:column;line-height:1.2;"><span style="font-size:16px;font-weight:700;color:#1A3C6E;letter-spacing:0.3px;">Universal</span><p class="LdsTypography-module_lds-typography__-DOlx LdsTypography-module_lds-typography--body-md__KI9TK" style="margin:0;color:#888;font-size:11px;">Gestão de frotas</p></div></a>'; }
    }
    function applyTextReplacements() {
        var replacements = [ ['Av. Bernardo Vasconcelos, 377, Cachoeirinha 31150-000 - Belo Horizonte/MG', 'Av. Pereira Barreto, 42\nVila Gilda, Santo André – SP'], ['CNPJ nº 16.670.085/0001-55', 'CEP: 09190-210'], ['LOCALIZA Rent a Car S/A', 'UNIVERSAL Auto Repasse S/A'], ['© Localiza - Todos os direitos reservados.', '© Universal - Todos os direitos reservados.'] ];
        var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); var nodes = []; while (walker.nextNode()) nodes.push(walker.currentNode);
        for (var n = 0; n < nodes.length; n++) { var node = nodes[n]; var text = node.nodeValue; var changed = false; for (var r = 0; r < replacements.length; r++) { if (text.includes(replacements[r][0])) { text = text.replace(new RegExp(replacements[r][0].replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), replacements[r][1]); changed = true; } } if (changed) node.nodeValue = text; }
    }
    function applyLogo() {
        document.querySelectorAll('.DisplayContent_displayContent__I14hU.DisplayContent_hideMobile__K13cl.DisplayContent_hideTablet__ISpUr.DisplayContent_hideLargeTablet__jiADA').forEach(function(div) {
            var svgEl = div.querySelector('svg');
            if (svgEl && svgEl.getAttribute('viewBox') === '0 0 149 39' && div.innerHTML.includes('#FF8026') && !div.querySelector('img')) {
                div.innerHTML = '<div style="display:flex;align-items:center;gap:8px;"><img src="https://universalautorepasse.com.br/wp-content/uploads/2024/10/Universal-Veiculos-e-Repasses-300x275.png" alt="Universal Repasses" style="height:39px;width:auto;object-fit:contain;"><div style="display:flex;flex-direction:column;line-height:1.15;"><span style="font-size:10px;color:#1565C0;font-weight:600;letter-spacing:2px;text-transform:uppercase;">Repasses</span><span style="font-size:17px;color:#0D3B8C;font-weight:800;letter-spacing:0.5px;">Universal</span></div></div>';
            }
        });
    }
    function applyCarouselDots() { var activeDot = document.querySelector('.Carousel_circle__nA3ia.Carousel_active__Hg2HB'); if (activeDot) { activeDot.style.backgroundColor = '#0055a4'; activeDot.style.borderColor = '#0055a4'; } }
    function injectGlobalCSS() {
        if (document.getElementById('universal-auto-styles')) return;
        var style = document.createElement('style'); style.id = 'universal-auto-styles';
        style.textContent = [ '.VehicleTitle_version__d4gVg{color:#0055a4!important;}', '.VehicleLocation_container__m8i4B svg,.StoreLocation_phone__Ewa4F svg,.StoreLocation_addressLink__gGjfy svg{color:#0055a4!important;}', '.whatsapp-button-custom{display:flex;align-items:center;justify-content:center;width:100%;background-color:#25D366;border:none;border-radius:8px;padding:12px 16px;font-size:18px;font-weight:bold;color:white;cursor:pointer;transition:all 0.2s ease;box-shadow:0 2px 5px rgba(0,0,0,0.2);animation:pulse 1.5s infinite;}', '.whatsapp-button-custom:hover{background-color:#20b859;transform:scale(1.02);}', '@keyframes pulse{0%{transform:scale(1);box-shadow:0 0 0 0 rgba(37,211,102,0.7);}70%{transform:scale(1.03);box-shadow:0 0 0 10px rgba(37,211,102,0);}100%{transform:scale(1);box-shadow:0 0 0 0 rgba(37,211,102,0);}}', '.whatsapp-icon{filter:brightness(0) invert(1);}', '.Navbar_title__9x_zb{border-left-color:#0055a4!important;}', '.Navbar_title__9x_zb,.Navbar_title__9x_zb h3{background-color:transparent!important;color:inherit!important;}', '.botao-personalizado{background-color:#1e40af!important;border-color:#1e40af!important;color:#ffffff!important;font-weight:600!important;}', '[class*="blurred"]{filter:none!important;opacity:1!important;}' ].join('');
        document.head.appendChild(style);
    }
    function applyMobileNavLogo() {
        document.querySelectorAll('.DisplayContent_displayContent__I14hU.DisplayContent_hideDesktop__hlDJO').forEach(function(div) {
            var svgEl = div.querySelector('svg[viewBox="0 0 39 39"]'); if (!svgEl) return; if (div.querySelector('img[data-ua-mobile-logo]')) return;
            var parentLink = div.closest('a');
            if (parentLink) {
                parentLink.setAttribute('href', 'https://universalauto.xyz'); parentLink.setAttribute('title', 'Universal Auto'); parentLink.removeAttribute('data-testid');
                var clonedLink = parentLink.cloneNode(true); parentLink.parentNode.replaceChild(clonedLink, parentLink);
                clonedLink.addEventListener('click', function(e) { e.preventDefault(); window.location.href = 'https://universalauto.xyz'; });
                var newDiv = clonedLink.querySelector('.DisplayContent_hideDesktop__hlDJO');
                if (newDiv) newDiv.innerHTML = '<img data-ua-mobile-logo="1" src="https://universalautorepasse.com.br/wp-content/uploads/2024/10/Universal-Veiculos-e-Repasses-300x275.png" alt="Universal Auto" style="height:39px;width:auto;object-fit:contain;display:block;">';
            } else { div.innerHTML = '<img data-ua-mobile-logo="1" src="https://universalautorepasse.com.br/wp-content/uploads/2024/10/Universal-Veiculos-e-Repasses-300x275.png" alt="Universal Auto" style="height:39px;width:auto;object-fit:contain;display:block;">'; }
        });
    }
    function applyMobileInterestSection() {
        var interestDivs = document.querySelectorAll('.MobilePage_contentInterest__dY5dv'); if (!interestDivs.length) return;
        var idMatch = window.location.href.match(/-(\d+)(?:\/|$)/); var carroId = idMatch ? parseInt(idMatch[1]) : null;
        interestDivs.forEach(function(div) {
            if (div.querySelector('.whatsapp-button-custom')) return;
            var precoHtml = ''; if (carroId && dadosCarregados && precoPorId.has(carroId)) { var preco = precoPorId.get(carroId); var precoFormatado = preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }); precoHtml = '<div style="text-align:center;margin-bottom:10px;font-size:26px;font-weight:800;color:#1e40af;letter-spacing:-0.5px;">' + precoFormatado + '</div>'; }
            div.innerHTML = precoHtml + '<button type="button" class="whatsapp-button-custom"><img src="' + WHATSAPP_ICON_URL + '" alt="WhatsApp" class="whatsapp-icon" style="width:24px;height:24px;margin-right:8px;vertical-align:middle;"><span>WhatsApp</span></button>';
        });
    }
    function applyMobileHeroImage() {
        var mobileHero = document.querySelector('img.Hero_heroImageMobile__TXyFn'); if (!mobileHero) return;
        var src = mobileHero.getAttribute('src') || mobileHero.src || '';
        if (src.includes('computer-mobile.webp') || src === '/home/computer-mobile.webp') { mobileHero.src = 'https://raw.githubusercontent.com/SiteHosterBabe/universalauto/refs/heads/main/banerzaoinicial.png'; mobileHero.removeAttribute('srcset'); }
    }
    function removeHamburgerMenu() { var hamburger = document.querySelector('button[aria-label="abrir menu"]'); if (hamburger) hamburger.remove(); }
    function removeEntrarFromFilterModal() { document.querySelectorAll('.VehiclesFilters_buttonsContainer__lY4oa').forEach(function(container) { container.querySelectorAll('button').forEach(function(btn) { var txt = btn.innerText.trim(); if (txt === 'Entrar' || txt === 'Cadastrar') btn.remove(); }); }); }
    function observeFilterModal() { var obs = new MutationObserver(function(mutations) { mutations.forEach(function(mut) { if (!mut.addedNodes.length) return; mut.addedNodes.forEach(function(node) { if (node.nodeType !== 1) return; if ((node.classList && node.classList.contains('VehiclesFilters_buttonsContainer__lY4oa')) || (node.querySelector && node.querySelector('.VehiclesFilters_buttonsContainer__lY4oa'))) { var containers = node.classList && node.classList.contains('VehiclesFilters_buttonsContainer__lY4oa') ? [node] : Array.from(node.querySelectorAll('.VehiclesFilters_buttonsContainer__lY4oa')); containers.forEach(function(c) { c.style.setProperty('visibility', 'hidden', 'important'); }); requestAnimationFrame(function() { removeEntrarFromFilterModal(); containers.forEach(function(c) { c.style.removeProperty('visibility'); }); }); } }); }); }); obs.observe(document.body, { childList: true, subtree: true }); }
    function updatePageTitle() { if (document.title !== 'Universal Auto') document.title = 'Universal Auto'; }
    function updateMetaDescription() { const newDescription = 'Com sede em Santo André, a Universal Auto atua no mercado automotivo oferecendo soluções de compra e venda de veículos com foco no custo-benefício. Nossa missão é facilitar o acesso a automóveis de qualidade através do modelo de repasse e comércio varejista, garantindo uma negociação ágil e segura para nossos clientes. Seja para uso pessoal ou revenda, temos o veículo ideal para o seu perfil.'; let metaDesc = document.querySelector('meta[name="description"]'); if (!metaDesc) { metaDesc = document.createElement('meta'); metaDesc.setAttribute('name', 'description'); document.head.appendChild(metaDesc); } if (metaDesc.getAttribute('content') !== newDescription) metaDesc.setAttribute('content', newDescription); }
    function updateFavicon() { const newFaviconUrl = 'https://universalautorepasse.com.br/wp-content/uploads/2024/10/Universal-Veiculos-e-Repasses-300x275.png'; let existingFavicon = document.querySelector('link[rel="shortcut icon"], link[rel="icon"]'); if (existingFavicon) { if (existingFavicon.getAttribute('href') !== newFaviconUrl) existingFavicon.setAttribute('href', newFaviconUrl); } else { const newLink = document.createElement('link'); newLink.rel = 'shortcut icon'; newLink.href = newFaviconUrl; newLink.type = 'image/svg'; document.head.appendChild(newLink); } }
    function preventModalOnCardClick() { document.body.addEventListener('click', function(e) { let target = e.target.closest('a[href*="/carro/"]'); if (!target) return; if (target.getAttribute('target') === '_blank') return; e.preventDefault(); e.stopPropagation(); const url = target.getAttribute('href'); if (url) window.location.href = url; }, true); }

    function applyAllTransformations() {
        try {
            replacePortalText(document.body); applyHero(); if (dadosCarregados) applyListagem(); applyHeaderButtons(); applyFooter(); applyTextReplacements(); applyLogo(); applyCarouselDots(); injectGlobalCSS();
            replaceHeroImage(); modifyCadastroButton(); replaceCadastroParagraph(); replaceMainTitle(); modifyVerMaisCarrosButton(); modifyHowItWorksBackground(); modifySeparatorsBackground(); modifyHowItWorksCadastroButton(); replaceHowItWorksTexts(); modifyEquipeEspecializadaBackground(); modifyFAQSection(); modifyFaqCadastroButton(); modifyLoginDialog(); modifyContatoButton(); modifyAccordionFaq(); modifyHowItWorksTitle();
            applyMobileNavLogo(); applyMobileHeroImage(); applyMobileInterestSection(); removeHamburgerMenu(); removeEntrarFromFilterModal();
            updatePageTitle(); updateMetaDescription(); updateFavicon();
            var idMatch = window.location.href.match(/-(\d+)(?:\/|$)/); var carroId = idMatch ? parseInt(idMatch[1]) : null;
            if (carroId && todosVeiculos.length) { var carroData = todosVeiculos.find(function(c) { return c.id === carroId; }); if (carroData) { applySidebar(carroData); applyMobileDetailPage(carroData); } }
        } catch(e) { console.warn('[UA] Erro nao critico:', e); }
    }

    // ============================================================
    // REMOCAO DO LOADER E MÁSCARA
    // ============================================================
    let loaderRemovedGlobal = false, maskRemoved = false;
    const LOADER_DURATION = 3000, MASK_EXTRA_DURATION = 1000;
    function removeLoaderAndScheduleMaskRemoval() {
        if (loaderRemovedGlobal) return;
        loaderRemovedGlobal = true;
        const loadingDiv = document.getElementById('premium-loader');
        if (loadingDiv) { loadingDiv.style.transition = 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)'; loadingDiv.style.opacity = '0'; loadingDiv.addEventListener('transitionend', () => { if (loadingDiv.parentNode) loadingDiv.parentNode.removeChild(loadingDiv); }); setTimeout(() => { if (loadingDiv.parentNode) loadingDiv.parentNode.removeChild(loadingDiv); }, 600); }
        setTimeout(() => { if (!maskRemoved) { const mask = document.getElementById('ua-page-mask'); if (mask) { mask.remove(); maskRemoved = true; } } }, MASK_EXTRA_DURATION);
    }
    setTimeout(() => { removeLoaderAndScheduleMaskRemoval(); if (typeof window.markTransformationsComplete === 'function') window.markTransformationsComplete(); }, LOADER_DURATION);

    // ============================================================
    // INICIALIZACAO
    // ============================================================
    observeModalInstant(); observeAccordionExpansion(); watchFaqPermanently(); observeFilterModal(); preventModalOnCardClick();
    applyAllTransformations();
    if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', () => { applyMobileNavLogo(); applyMobileHeroImage(); applyMobileInterestSection(); removeHamburgerMenu(); removeEntrarFromFilterModal(); }); } else { applyMobileNavLogo(); applyMobileHeroImage(); applyMobileInterestSection(); removeHamburgerMenu(); removeEntrarFromFilterModal(); }
    window.addEventListener('load', () => { applyMobileNavLogo(); applyMobileHeroImage(); applyMobileInterestSection(); removeHamburgerMenu(); removeEntrarFromFilterModal(); });
    
    let debounceTimer;
    const observer = new MutationObserver(() => {
        if (isApplying) return;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => { if (!isApplying) applyAllTransformations(); }, 300);
    });
    observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class', 'style'] });
    
    document.body.addEventListener('click', (e) => { const whatsappBtn = e.target.closest('.whatsapp-button-custom, #whatsapp-button-script'); if (whatsappBtn) { e.preventDefault(); e.stopPropagation(); const currentUrl = encodeURIComponent(window.location.href); const fullMessage = `${WHATSAPP_BASE_MESSAGE} ${currentUrl}`; window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${fullMessage}`, '_blank'); } });
    
})();