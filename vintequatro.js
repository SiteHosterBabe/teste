(async function universalAutoScript() {

    // ============================================================
    // [FIX 1] MASCARA SINCRONA IMEDIATA — executada ANTES de qualquer await
    // ============================================================
    const _pageMask = document.createElement('style');
    _pageMask.id = 'ua-page-mask';
    _pageMask.textContent = [
        'body > *:not(#premium-loader){opacity:0!important;transition:none!important;pointer-events:none!important;}',
        'body{overflow:hidden!important;}'
    ].join('');
    (document.head || document.documentElement).appendChild(_pageMask);

    // ============================================================
    // CONFIGURACOES GLOBAIS
    // ============================================================
    const WHATSAPP_NUMBER  = '5511958934922';
    const WHATSAPP_MESSAGE = 'Ol\u00e1! Tenho interesse em um ve\u00edculo.';
    const WHATSAPP_ICON_URL = 'https://confirent.pt/wp-content/uploads/2023/03/whatsapp-icone-2.png';
    const URL_JSON = 'https://raw.githubusercontent.com/SiteHosterBabe/universalauto/refs/heads/main/vinijunior.json';
    const ACRESCIMO = 3000;
    const LOADER_TIMEOUT_MS = 7000;

    console.log('[UA] Universal Auto Script (v8 - fade out fix) iniciado...');

    // ============================================================
    // LOADER PREMIUM
    // ============================================================
    (function() {
        const TIMEOUT_MS = LOADER_TIMEOUT_MS;
        const PRIMARY_COLOR = "#0A66C2";
        const SOFT_BLUE_BG = "#EFF6FF";

        const FRASES = [
            "Conectando oportunidades, viabilizando neg\u00f3cios.",
            "Carregando cat\u00e1logo de autom\u00f3veis",
            "Preparando ofertas exclusivas para voc\u00ea",
            "Quase l\u00e1! Finalizando os melhores neg\u00f3cios",
            "Sua experi\u00eancia premium est\u00e1 pronta"
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
        console.log('[UA] Loader premium injetado no DOM');

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
                progress += 1.5;
                if (progress > 100) progress = 100;
                progressBar.style.width = progress + "%";
            }
        }, 50);

        setTimeout(function() { progressBar.style.width = "100%"; }, TIMEOUT_MS - 200);

        // ========== ANIMACOES DO CARRO ==========
        const carGroup = document.getElementById('car');
        const shadowPath = document.getElementById('shadow');
        const airPaths = Array.from(svg.querySelectorAll('.air'));
        let pathsData = [];
        let currentTimeouts = [];
        let carAnimation, shadowAnimation, wheelRotationRAF, restartTimeout;
        let isCycling = false;
        let loaderRemoved = false;

        function clearAllDashTimeouts() {
            currentTimeouts.forEach(function(t) { clearTimeout(t); });
            currentTimeouts = [];
        }

        function resetDashPathsToHidden() {
            for (var i = 0; i < pathsData.length; i++) {
                var p = pathsData[i].element;
                var len = pathsData[i].length;
                if (!p) continue;
                p.style.transition = '';
                p.style.strokeDashoffset = len;
                p.setAttribute('stroke-dashoffset', len);
                p.setAttribute('stroke-dasharray', len);
            }
        }

        function initAirPaths() {
            for (var i = 0; i < airPaths.length; i++) {
                var p = airPaths[i];
                var len = p.getTotalLength();
                pathsData.push({ element: p, length: len });
                p.style.strokeDasharray = len;
                p.style.strokeDashoffset = len;
                p.setAttribute('stroke-dasharray', len);
                p.setAttribute('stroke-dashoffset', len);
            }
        }

        function startDashDrawingSequence(staggerDelayMs, drawDurationMs) {
            staggerDelayMs = staggerDelayMs || 110;
            drawDurationMs = drawDurationMs || 700;
            if (loaderRemoved) return;
            clearAllDashTimeouts();
            for (var i = 0; i < pathsData.length; i++) {
                (function(data, idx) {
                    var pathEl = data.element;
                    var totalLen = data.length;
                    if (totalLen <= 0) return;
                    pathEl.style.transition = '';
                    pathEl.style.strokeDashoffset = totalLen;
                    void pathEl.offsetHeight;
                    var tid = setTimeout(function() {
                        if (loaderRemoved) return;
                        pathEl.style.transition = 'stroke-dashoffset ' + drawDurationMs + 'ms cubic-bezier(0.2,0.9,0.4,1.1)';
                        pathEl.style.strokeDashoffset = '0';
                        pathEl.setAttribute('stroke-dashoffset', '0');
                    }, idx * staggerDelayMs);
                    currentTimeouts.push(tid);
                })(pathsData[i], i);
            }
        }

        function resetCarAndShadowTransform() {
            if (carGroup) carGroup.style.transform = 'translateX(0px)';
            if (shadowPath) { shadowPath.style.transform = 'skewX(0deg)'; shadowPath.style.transformOrigin = '0% 0%'; }
        }

        function startCarMovementAndShadow(durationMs) {
            durationMs = durationMs || 3600;
            if (loaderRemoved) return;
            if (carAnimation) carAnimation.cancel();
            if (shadowAnimation) shadowAnimation.cancel();
            resetCarAndShadowTransform();
            if (carGroup) {
                carAnimation = carGroup.animate(
                    [{ transform: 'translateX(0px)' }, { transform: 'translateX(72px)' }],
                    { duration: durationMs, easing: 'cubic-bezier(0.25,0.46,0.45,0.94)', fill: 'forwards' }
                );
            }
            if (shadowPath) {
                shadowAnimation = shadowPath.animate(
                    [{ transform: 'skewX(0deg)' }, { transform: 'skewX(16deg)' }],
                    { duration: durationMs, easing: 'cubic-bezier(0.2,0.9,0.4,1.2)', fill: 'forwards' }
                );
            }
        }

        function initWheelStripeRotation() {
            var allStripes = svg.querySelectorAll('.wheel-stripe');
            if (!allStripes.length) return;
            var stripeOffsets = [];
            var circumferences = [];
            for (var i = 0; i < allStripes.length; i++) {
                var stripe = allStripes[i];
                var totalLen = 47;
                var dashArr = stripe.getAttribute('stroke-dasharray');
                if (dashArr) {
                    var parts = dashArr.split(/\s+/).map(Number);
                    totalLen = parts.reduce(function(a,b){return a+b;}, 0);
                }
                circumferences.push(totalLen);
                var initOffset = 0;
                if (stripe.closest('g') && stripe.closest('g').getAttribute('transform') === 'translate(87 0)') initOffset = -22;
                stripeOffsets.push(initOffset);
                stripe.style.strokeDashoffset = initOffset;
            }
            function rotateStripes() {
                if (loaderRemoved) return;
                for (var idx = 0; idx < allStripes.length; idx++) {
                    var newOffset = stripeOffsets[idx] - 0.28;
                    newOffset = ((newOffset % circumferences[idx]) + circumferences[idx]) % circumferences[idx];
                    stripeOffsets[idx] = newOffset;
                    allStripes[idx].style.strokeDashoffset = newOffset;
                }
                wheelRotationRAF = requestAnimationFrame(rotateStripes);
            }
            if (wheelRotationRAF) cancelAnimationFrame(wheelRotationRAF);
            wheelRotationRAF = requestAnimationFrame(rotateStripes);
        }

        function runFullLoadingCycle() {
            if (loaderRemoved || isCycling) return;
            isCycling = true;
            if (restartTimeout) clearTimeout(restartTimeout);
            resetDashPathsToHidden();
            resetCarAndShadowTransform();
            startCarMovementAndShadow(3600);
            startDashDrawingSequence(105, 680);
            restartTimeout = setTimeout(function() {
                if (!loaderRemoved) { isCycling = false; runFullLoadingCycle(); }
            }, 4000);
        }

        initAirPaths();
        initWheelStripeRotation();
        runFullLoadingCycle();

        // ========== LOGICA PARA AGUARDAR AS TRANSFORMACOES ==========
        var transformationsReady = false;
        var startTime = Date.now();

        window.markTransformationsComplete = function() {
            transformationsReady = true;
            console.log('[UA] Transformacoes completas. Tempo:', Date.now() - startTime, 'ms');
            if (Date.now() - startTime >= TIMEOUT_MS) {
                setTimeout(function() { if (!loaderRemoved) removeLoader(); }, 100);
            }
        };

        // ========== FUNCAO REMOVELOADER COM FADE OUT (FIX) ==========
        function removeLoader() {
            if (loaderRemoved) return;
            loaderRemoved = true;

            // Cancel all animations
            if (wheelRotationRAF) cancelAnimationFrame(wheelRotationRAF);
            if (carAnimation) carAnimation.cancel();
            if (shadowAnimation) shadowAnimation.cancel();
            if (restartTimeout) clearTimeout(restartTimeout);
            clearAllDashTimeouts();
            clearInterval(intervalFrases);
            clearInterval(progressInterval);

            // First, remove the page mask so the content becomes visible (but still behind loader)
            var mask = document.getElementById('ua-page-mask');
            if (mask) mask.remove();

            // Now fade out the loader gracefully
            if (loadingDiv && loadingDiv.parentNode) {
                loadingDiv.style.transition = 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                loadingDiv.style.opacity = '0';
                
                var onTransitionEnd = function() {
                    if (loadingDiv && loadingDiv.parentNode) {
                        loadingDiv.parentNode.removeChild(loadingDiv);
                    }
                    loadingDiv.removeEventListener('transitionend', onTransitionEnd);
                };
                loadingDiv.addEventListener('transitionend', onTransitionEnd);
                
                // Fallback in case transitionend doesn't fire
                setTimeout(function() {
                    if (loadingDiv && loadingDiv.parentNode) {
                        loadingDiv.parentNode.removeChild(loadingDiv);
                    }
                }, 600);
            }
            console.log('[UA] Loader com fade out. Pagina transformada visivel.');
        }

        var checkInterval = setInterval(function() {
            if (transformationsReady && (Date.now() - startTime >= TIMEOUT_MS)) {
                clearInterval(checkInterval);
                setTimeout(function() { if (!loaderRemoved) removeLoader(); }, 100);
            }
        }, 100);

        // Seguranca absoluta: nunca bloquear o utilizador para sempre
        setTimeout(function() {
            if (!loaderRemoved) { clearInterval(checkInterval); removeLoader(); }
        }, TIMEOUT_MS + 2000);

        console.log('[UA] Loader ativo. A aguardar transformacoes e minimo de 7 segundos.');
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
            todosVeiculos.forEach(function(v) {
                if (v.id && v.priceFor) precoPorId.set(v.id, v.priceFor + ACRESCIMO);
            });
            dadosCarregados = true;
            console.log('[UA] ' + todosVeiculos.length + ' veiculos carregados.');
        } else {
            console.warn('[UA] JSON nao carregado.');
        }
    } catch (err) {
        console.error('[UA] Erro ao carregar JSON:', err);
    }

    // ============================================================
    // FUNCOES DE TRANSFORMACAO (IDEMPOTENTES)
    // ============================================================
    function applyHero() {
        var hero = document.querySelector('.Hero_heroBackground__n2WjH');
        if (!hero) return;
        hero.style.position = 'relative';
        hero.style.setProperty('background', 'linear-gradient(135deg,#2563eb 0%,#1e40af 50%,#1e3a8a 100%)', 'important');
        if (!hero.querySelector('.custom-glow')) {
            var glow = document.createElement('div');
            glow.className = 'custom-glow';
            Object.assign(glow.style, {
                position:'absolute', top:'-100px', left:'-100px',
                width:'400px', height:'400px', background:'rgba(59,130,246,0.4)',
                filter:'blur(120px)', borderRadius:'50%', pointerEvents:'none'
            });
            hero.appendChild(glow);
        }
    }

    // NOVA FUNÇÃO: Substituir imagem hero
    function replaceHeroImage() {
        var heroImg = document.querySelector('img.Hero_heroImage__14M5B[alt="Hero Image"]');
        if (heroImg && heroImg.src && heroImg.src.includes('/home/computer.webp')) {
            if (heroImg.src !== 'https://raw.githubusercontent.com/SiteHosterBabe/universalauto/refs/heads/main/banerzaoinicial.png') {
                heroImg.src = 'https://raw.githubusercontent.com/SiteHosterBabe/universalauto/refs/heads/main/banerzaoinicial.png';
                console.log('[UA] Imagem hero substituída.');
            }
        }
    }

    // NOVA FUNÇÃO: Modificar botão "Cadastre-se agora"
    function modifyCadastroButton() {
        var botoes = document.querySelectorAll('button.LdsButton-module_lds-button--contained-primary__6r3Mk');
        botoes.forEach(function(btn) {
            var span = btn.querySelector('span');
            if (span && span.innerText.trim() === 'Cadastre-se agora') {
                if (span.innerText !== 'Veja o nosso catálogo') {
                    span.innerText = 'Veja o nosso catálogo';
                    // Remover qualquer evento anterior e adicionar novo redirecionamento
                    var novoBtn = btn.cloneNode(true);
                    btn.parentNode.replaceChild(novoBtn, btn);
                    novoBtn.addEventListener('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        window.location.href = 'https://universalauto.xyz/carros';
                    });
                    console.log('[UA] Botão Cadastre-se agora modificado.');
                }
            }
        });
    }

    // NOVA FUNÇÃO: Substituir texto do parágrafo
    function replaceCadastroParagraph() {
        var paragrafos = document.querySelectorAll('p.LdsTypography-module_lds-typography__-DOlx.LdsTypography-module_lds-typography--body-md__KI9TK');
        paragrafos.forEach(function(p) {
            if (p.innerText.trim() === 'Cadastre-se para acessar nossos veículos!') {
                if (p.innerText !== 'Descubra viaturas únicas: galeria de fotos exclusiva e especificações completas.') {
                    p.innerText = 'Descubra viaturas únicas: galeria de fotos exclusiva e especificações completas.';
                    console.log('[UA] Parágrafo de cadastro substituído.');
                }
            }
        });
    }

    // NOVA FUNÇÃO: Substituir título principal (h1)
    function replaceMainTitle() {
        var titulo = document.querySelector('h1.LdsTypography-module_lds-typography__-DOlx.LdsTypography-module_lds-typography--heading-xl__xfa9y');
        if (titulo && titulo.innerText.trim() === 'Diversos modelos, com todas as vantagens Localiza!') {
            if (titulo.innerText !== 'Seu próximo carro está aqui. Conheça as vantagens do nosso estoque.') {
                titulo.innerText = 'Seu próximo carro está aqui. Conheça as vantagens do nosso estoque.';
                console.log('[UA] Título principal substituído.');
            }
        }
    }

    // NOVA FUNÇÃO: Botão "Ver mais carros" redirecionar para catálogo
    function modifyVerMaisCarrosButton() {
        var botoes = document.querySelectorAll('button.LdsButton-module_lds-button--outlined-primary__ZxRfx');
        botoes.forEach(function(btn) {
            var span = btn.querySelector('span');
            if (span && span.innerText.trim() === 'Ver mais carros') {
                var novoBtn = btn.cloneNode(true);
                btn.parentNode.replaceChild(novoBtn, btn);
                novoBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    window.location.href = 'https://universalauto.xyz/carros';
                });
                console.log('[UA] Botão "Ver mais carros" redireciona para catálogo.');
            }
        });
    }

    // NOVA FUNÇÃO: Alterar background da seção HowItWorks
    function modifyHowItWorksBackground() {
        var section = document.querySelector('section.HowItWorks_container__IYMRX');
        if (section) {
            var computed = window.getComputedStyle(section);
            var targetGradient = 'linear-gradient(135deg, rgb(37, 99, 235) 0%, rgb(30, 64, 175) 50%, rgb(30, 58, 138) 100%)';
            if (computed.background !== targetGradient) {
                section.style.background = targetGradient;
                section.style.setProperty('background', targetGradient, 'important');
                console.log('[UA] Background da seção HowItWorks alterado.');
            }
        }
    }

    // NOVA FUNÇÃO: Alterar backgrounds dos separadores (leftBorder e rightBorder)
    function modifySeparatorsBackground() {
        var targetGradient = 'linear-gradient(135deg, rgb(37, 99, 235) 0%, rgb(30, 64, 175) 50%, rgb(30, 58, 138) 100%)';
        var leftBorders = document.querySelectorAll('.HowItWorks_leftBorder__P6mDf');
        leftBorders.forEach(function(el) {
            if (el.style.background !== targetGradient) {
                el.style.background = targetGradient;
                el.style.setProperty('background', targetGradient, 'important');
            }
        });
        var rightBorders = document.querySelectorAll('.HowItWorks_rightBorder__JevRe');
        rightBorders.forEach(function(el) {
            if (el.style.background !== targetGradient) {
                el.style.background = targetGradient;
                el.style.setProperty('background', targetGradient, 'important');
            }
        });
        if (leftBorders.length || rightBorders.length) {
            console.log('[UA] Backgrounds dos separadores alterados.');
        }
    }

    // NOVA FUNÇÃO: Botão "Cadatre-se agora" dentro do CTA (HowItWorks)
    function modifyHowItWorksCadastroButton() {
        // Procura o botão específico com o texto "Cadatre-se agora" (com erro de digitação) dentro da seção HowItWorks
        var botoes = document.querySelectorAll('section.HowItWorks_container__IYMRX button.LdsButton-module_lds-button--contained-primary__6r3Mk');
        botoes.forEach(function(btn) {
            var span = btn.querySelector('span');
            if (span && span.innerText.trim() === 'Cadatre-se agora') {
                if (span.innerText !== 'Nosso Catálogo') {
                    span.innerText = 'Nosso Catálogo';
                    var novoBtn = btn.cloneNode(true);
                    btn.parentNode.replaceChild(novoBtn, btn);
                    novoBtn.addEventListener('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        window.location.href = 'https://universalauto.xyz/carros';
                    });
                    console.log('[UA] Botão "Cadatre-se agora" transformado em "Nosso Catálogo" com redirecionamento.');
                }
            }
        });
    }

    function replacePortalText(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            node.nodeValue = node.nodeValue.replace(/Portal do Lojista/gi, 'Universal Auto');
        } else {
            node.childNodes.forEach(replacePortalText);
        }
    }

    function applyListagem() {
        if (!dadosCarregados) return;
        var cards = document.querySelectorAll('[class*="VehicleCard"]');
        cards.forEach(function(card) {
            var link = card.querySelector('a[href*="/carro/"]');
            if (!link) return;
            var match = link.getAttribute('href').match(/-(\d+)$/);
            if (!match) return;
            var id = parseInt(match[1], 10);
            if (precoPorId.has(id)) {
                var precoFinal = precoPorId.get(id);
                var precoElem = card.querySelector('[class*="blurred"]');
                if (precoElem && !precoElem.innerText.includes(precoFinal.toLocaleString('pt-BR'))) {
                    precoElem.innerText = 'R$ ' + precoFinal.toLocaleString('pt-BR');
                    precoElem.style.filter = 'none';
                    precoElem.style.opacity = '1';
                }
            }
            var botoes = card.querySelectorAll('button');
            for (var i = 0; i < botoes.length; i++) {
                var btn = botoes[i];
                if (btn.innerText.includes('Ver mais informa\u00e7\u00f5es')) {
                    if (!btn.classList.contains('botao-personalizado')) {
                        btn.classList.remove('LdsButton-module_lds-button--outlined-primary__ZxRfx','LdsButton-module_lds-states--outlined__4D3s7');
                        btn.classList.add('LdsButton-module_lds-button--contained-primary__6r3Mk','LdsButton-module_lds-states--contained__vVTBv','botao-personalizado');
                        btn.innerText = 'Tenho interesse';
                        var novoBotao = btn.cloneNode(true);
                        btn.parentNode.replaceChild(novoBotao, btn);
                        (function(nb, lnk) {
                            nb.addEventListener('click', function(e) {
                                e.preventDefault(); e.stopPropagation();
                                window.location.href = lnk.href;
                            });
                        })(novoBotao, link);
                    }
                    break;
                }
            }
        });
    }

    function applySidebar(carroData) {
        var rightSidebar = document.querySelector('.DesktopPage_rightSide__uZfet');
        if (!rightSidebar || !carroData) return;
        var container = rightSidebar.querySelector('.DesktopPage_container__eiImn');
        if (!container) return;
        if (container.querySelector('#whatsapp-button-script')) return;
        var novoPreco = carroData.priceFor + ACRESCIMO;
        var precoFormatado = novoPreco.toLocaleString('pt-BR', { style:'currency', currency:'BRL' });
        var nomeLoja = (carroData.store && carroData.store.name) ? carroData.store.name : 'Loja n\u00e3o informada';
        var cidade = (carroData.store && carroData.store.city && carroData.store.state)
            ? carroData.store.city + ' - ' + carroData.store.state
            : 'Fortaleza - CE';
        var km = carroData.odometer.toLocaleString('pt-BR');
        container.innerHTML = '<div class="VehicleTitle_container__mDy6V">'
            + '<div class="VehicleTitle_header__bZBhS">'
            + '<h4 class="LdsTypography-module_lds-typography__-DOlx LdsTypography-module_lds-typography--heading-sm__5NKKy VehicleTitle_version__d4gVg">' + carroData.brand + '</h4>'
            + '</div>'
            + '<h2 class="LdsTypography-module_lds-typography__-DOlx LdsTypography-module_lds-typography--heading-lg__-4owW VehicleTitle_model__Ec3VK">'
            + '<strong>' + carroData.modelFamilyDescription + '</strong> ' + carroData.model
            + '</h2>'
            + '<p class="LdsTypography-module_lds-typography__-DOlx LdsTypography-module_lds-typography--body-md__KI9TK">'
            + carroData.manufactureYear + '/' + carroData.modelYear + '&nbsp;&nbsp;&nbsp;&nbsp;' + km + ' km'
            + '</p></div>'
            + '<div class="VehicleReports_container__qAkuy"></div>'
            + '<div style="background-color:var(--divider-color);height:1px;width:100%"></div>'
            + '<div class="VehicleLocation_container__m8i4B">'
            + '<svg width="20" height="20" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" fill="none" role="presentation" class="location-icon">'
            + '<path d="m5.0001 2.09998c-.3409 0-.65253.1926-.80499.4975l-2 4c-.06248.12497-.09501.26278-.09501.4025v1c0 1.03434.41089 2.02632 1.14228 2.75772.25691.2569.54597.4743.85772.6482v8.6941h-1.1c-.49706 0-.9.4029-.9.9 0 .497.40294.9.9.9h18c.4971 0 .9-.403.9-.9 0-.4971-.4029-.9-.9-.9h-1.1v-8.6941c.3117-.1739.6008-.3913.8577-.6482.7314-.7314 1.1423-1.72338 1.1423-2.75772v-1c0-.13972-.0325-.27753-.095-.4025l-2-4c-.1525-.3049-.4641-.4975-.805-.4975zm.9 18.00002v-8.2013c.03328.0008.06662.0013.1.0013 1.03434 0 2.02632-.4109 2.75771-1.1423.08516-.0852.16597-.1738.24229-.2657.07632.0919.15713.1805.24228.2657.73139.7314 1.72342 1.1423 2.75772 1.1423s2.0263-.4109 2.7577-1.1423c.0852-.0852.166-.1738.2423-.2657.0763.0919.1571.1805.2423.2657.7314.7314 1.7234 1.1423 2.7577 1.1423.0334 0 .0667-.0005.1-.0013v8.2013h-2.2v-3.1c0-.7692-.3055-1.5068-.8494-2.0506-.5438-.5439-1.2815-.8494-2.0506-.8494h-2c-.7691 0-1.50676.3055-2.05061.8494-.54386.5438-.84939 1.2814-.84939 2.0506v3.1zm4.6151-10.6151c-.3939-.39383-.6151-.92797-.6151-1.48492v-.1h4.2v.1c0 .55695-.2213 1.09109-.6151 1.48492s-.9279.6151-1.4849.6151-1.0911-.22127-1.4849-.6151zm-2.4151-1.48492c0 .55695-.22125 1.09109-.61508 1.48492-.39382.39383-.92797.6151-1.48492.6151-.55696 0-1.0911-.22127-1.48493-.6151-.39382-.39383-.61507-.92797-.61507-1.48492v-.1h4.2zm-3.64377-1.9 1.1-2.2h12.88757l1.1 2.2zm11.44377 1.8h4.2v.1c0 .55695-.2213 1.09109-.6151 1.48492s-.9279.6151-1.4849.6151-1.0911-.22127-1.4849-.6151c-.3939-.39383-.6151-.92797-.6151-1.48492zm-4.9 8.00002h2c.2917 0 .5715.1159.7778.3222.2063.2062.3222.486.3222.7778v3.1h-4.2v-3.1c0-.2918.1159-.5716.3222-.7778.2063-.2063.4861-.3222.7778-.3222z" fill="currentColor"></path>'
            + '</svg>'
            + '<p class="LdsTypography-module_lds-typography__-DOlx LdsTypography-module_lds-typography--body-sm__7uR1-">'
            + nomeLoja + '<br><span class="VehicleLocation_opacity__7fAgZ">' + cidade + '</span>'
            + '</p></div>'
            + '<div style="background-color:var(--divider-color);height:1px;width:100%"></div>'
            + '<div class="VehiclePrice_container__myGEh"><div class="Price_priceContainer__UFleO">'
            + '<div><h2 class="LdsTypography-module_lds-typography__-DOlx LdsTypography-module_lds-typography--heading-lg__-4owW">' + precoFormatado + '</h2></div>'
            + '</div></div>'
            + '<div class="whatsapp-button-wrapper" style="margin-bottom:24px;">'
            + '<button type="button" id="whatsapp-button-script" class="whatsapp-button-custom">'
            + '<img src="' + WHATSAPP_ICON_URL + '" alt="WhatsApp" class="whatsapp-icon" style="width:24px;height:24px;margin-right:8px;vertical-align:middle;">'
            + '<span>WhatsApp</span></button></div>'
            + '<div id="banner-container" style="display:flex;flex-direction:column;justify-content:center;align-items:center;padding:0;background:white;border-radius:0;border:none!important;box-shadow:none!important;">'
            + '<img src="https://raw.githubusercontent.com/SiteHosterBabe/universalauto/refs/heads/main/banneruniversal.png" alt="Banner Universal" style="width:100%;height:auto;max-height:600px;object-fit:contain;">'
            + '<img src="https://universalautorepasse.com.br/wp-content/uploads/2024/10/Universal-Veiculos-e-Repasses-300x275.png" alt="Logo Universal" style="margin-top:20px;width:150px;height:auto;">'
            + '</div>';
        var whatsappBtn = document.getElementById('whatsapp-button-script');
        if (whatsappBtn) {
            whatsappBtn.addEventListener('click', function() {
                window.open('https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(WHATSAPP_MESSAGE), '_blank');
            });
        }
    }

    function applyHeaderButtons() {
        document.querySelectorAll('button').forEach(function(btn) {
            if (btn.innerText.trim() === 'Cadastrar' && !btn.closest('.VehiclesFilters_buttonsContainer__lY4oa')) btn.remove();
        });
        var entrarHeader = Array.from(document.querySelectorAll('button')).find(function(b) {
            return b.innerText.trim() === 'Entrar' && !b.closest('.VehiclesFilters_buttonsContainer__lY4oa');
        });
        if (entrarHeader && entrarHeader.innerText !== 'Nossos Carros') {
            entrarHeader.innerText = 'Nossos Carros';
            entrarHeader.style.borderColor = '#0055a4';
            entrarHeader.style.color = '#0055a4';
            var clone = entrarHeader.cloneNode(true);
            entrarHeader.parentNode.replaceChild(clone, entrarHeader);
            clone.addEventListener('click', function(e) {
                e.preventDefault();
                window.location.href = 'https://universalauto.xyz/carros';
            });
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
            clone2.addEventListener('click', function(e) {
                e.preventDefault();
                window.location.href = 'mailto:contato@universalautorepasse.com.br';
            });
        }
    }

    function applyFooter() {
        var lnkLocaliza = document.querySelector('a[href="https://www.localiza.com/"]');
        if (lnkLocaliza) { var p1 = lnkLocaliza.closest('.Footer_product__RLAJk'); if(p1) p1.remove(); }
        var lnkZarp = document.querySelector('a[href="https://zarp.localiza.com/"]');
        if (lnkZarp) { var p2 = lnkZarp.closest('.Footer_product__RLAJk'); if(p2) p2.remove(); }
        document.querySelectorAll('.Footer_product__RLAJk').forEach(function(div) {
            if (div.innerText.trim() === '' && div.children.length === 0) div.remove();
        });
        var lnkMeoo = document.querySelector('a[href="https://meoo.localiza.com"]');
        var meoo = lnkMeoo ? lnkMeoo.closest('.Footer_product__RLAJk') : null;
        if (meoo && !meoo.querySelector('img[alt="Instagram"]')) {
            meoo.innerHTML = '<a href="https://www.instagram.com/universalautorepasse_/" target="_blank" style="display:flex;align-items:center;gap:8px;text-decoration:none;">'
                + '<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/960px-Instagram_logo_2016.svg.png" alt="Instagram" style="height:24px;width:24px;object-fit:contain;">'
                + '<div style="display:flex;flex-direction:column;line-height:1.2;">'
                + '<span style="font-size:16px;font-weight:700;background:linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">Instagram</span>'
                + '<p class="LdsTypography-module_lds-typography__-DOlx LdsTypography-module_lds-typography--body-md__KI9TK" style="margin:0;color:#888;font-size:11px;">Redes Sociais</p>'
                + '</div></a>';
        }
        var lnkFrotas = document.querySelector('a[href="https://frotas.localiza.com/"]');
        var frotas = lnkFrotas ? lnkFrotas.closest('.Footer_product__RLAJk') : null;
        if (frotas && !frotas.querySelector('img[alt="Universal Auto Repasse"]')) {
            frotas.innerHTML = '<a href="https://universalautorepasse.com.br/" target="_blank" style="display:flex;align-items:center;gap:8px;text-decoration:none;">'
                + '<img src="https://raw.githubusercontent.com/SiteHosterBabe/universalauto/refs/heads/main/logouniversall.png" alt="Universal Auto Repasse" style="height:24px;width:auto;object-fit:contain;">'
                + '<div style="display:flex;flex-direction:column;line-height:1.2;">'
                + '<span style="font-size:16px;font-weight:700;color:#1A3C6E;letter-spacing:0.3px;">Universal</span>'
                + '<p class="LdsTypography-module_lds-typography__-DOlx LdsTypography-module_lds-typography--body-md__KI9TK" style="margin:0;color:#888;font-size:11px;">Gest\u00e3o de frotas</p>'
                + '</div></a>';
        }
    }

    function applyTextReplacements() {
        var replacements = [
            ['Av. Bernardo Vasconcelos, 377, Cachoeirinha 31150-000 - Belo Horizonte/MG', 'Av. Pereira Barreto, 42\nVila Gilda, Santo Andr\u00e9 \u2013 SP'],
            ['CNPJ n\u00ba 16.670.085/0001-55', 'CEP: 09190-210'],
            ['LOCALIZA Rent a Car S/A', 'UNIVERSAL Auto Repasse S/A'],
            ['\u00a9 Localiza - Todos os direitos reservados.', '\u00a9 Universal - Todos os direitos reservados.']
        ];
        var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        var nodes = [];
        while (walker.nextNode()) nodes.push(walker.currentNode);
        for (var n = 0; n < nodes.length; n++) {
            var node = nodes[n];
            var text = node.nodeValue;
            var changed = false;
            for (var r = 0; r < replacements.length; r++) {
                var oldT = replacements[r][0], newT = replacements[r][1];
                if (text.includes(oldT)) {
                    text = text.replace(new RegExp(oldT.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newT);
                    changed = true;
                }
            }
            if (changed) node.nodeValue = text;
        }
    }

    function applyLogo() {
        document.querySelectorAll('.DisplayContent_displayContent__I14hU.DisplayContent_hideMobile__K13cl.DisplayContent_hideTablet__ISpUr.DisplayContent_hideLargeTablet__jiADA').forEach(function(div) {
            var svgEl = div.querySelector('svg');
            if (svgEl && svgEl.getAttribute('viewBox') === '0 0 149 39' && div.innerHTML.includes('#FF8026') && !div.querySelector('img')) {
                div.innerHTML = '<div style="display:flex;align-items:center;gap:8px;">'
                    + '<img src="https://universalautorepasse.com.br/wp-content/uploads/2024/10/Universal-Veiculos-e-Repasses-300x275.png" alt="Universal Repasses" style="height:39px;width:auto;object-fit:contain;">'
                    + '<div style="display:flex;flex-direction:column;line-height:1.15;">'
                    + '<span style="font-size:10px;color:#1565C0;font-weight:600;letter-spacing:2px;text-transform:uppercase;">Repasses</span>'
                    + '<span style="font-size:17px;color:#0D3B8C;font-weight:800;letter-spacing:0.5px;">Universal</span>'
                    + '</div></div>';
            }
        });
    }

    function applyCarouselDots() {
        var activeDot = document.querySelector('.Carousel_circle__nA3ia.Carousel_active__Hg2HB');
        if (activeDot) { activeDot.style.backgroundColor = '#0055a4'; activeDot.style.borderColor = '#0055a4'; }
    }

    function injectGlobalCSS() {
        if (document.getElementById('universal-auto-styles')) return;
        var style = document.createElement('style');
        style.id = 'universal-auto-styles';
        style.textContent = [
            '.VehicleTitle_version__d4gVg{color:#0055a4!important;}',
            '.VehicleLocation_container__m8i4B svg,.StoreLocation_phone__Ewa4F svg,.StoreLocation_addressLink__gGjfy svg{color:#0055a4!important;}',
            '.whatsapp-button-custom{display:flex;align-items:center;justify-content:center;width:100%;background-color:#25D366;border:none;border-radius:8px;padding:12px 16px;font-size:18px;font-weight:bold;color:white;cursor:pointer;transition:all 0.2s ease;box-shadow:0 2px 5px rgba(0,0,0,0.2);animation:pulse 1.5s infinite;}',
            '.whatsapp-button-custom:hover{background-color:#20b859;transform:scale(1.02);}',
            '@keyframes pulse{0%{transform:scale(1);box-shadow:0 0 0 0 rgba(37,211,102,0.7);}70%{transform:scale(1.03);box-shadow:0 0 0 10px rgba(37,211,102,0);}100%{transform:scale(1);box-shadow:0 0 0 0 rgba(37,211,102,0);}}',
            '.whatsapp-icon{filter:brightness(0) invert(1);}',
            '.Navbar_title__9x_zb{border-left-color:#0055a4!important;}',
            '.Navbar_title__9x_zb,.Navbar_title__9x_zb h3{background-color:transparent!important;color:inherit!important;}',
            '.botao-personalizado{background-color:#1e40af!important;border-color:#1e40af!important;color:#ffffff!important;font-weight:600!important;}',
            '[class*="blurred"]{filter:none!important;opacity:1!important;}'
        ].join('');
        document.head.appendChild(style);
    }

    // ============================================================
    // FUNCAO PRINCIPAL QUE APLICA TODAS AS TRANSFORMACOES
    // ============================================================
    function applyAllTransformations() {
        try {
            replacePortalText(document.body);
            applyHero();
            if (dadosCarregados) applyListagem();
            applyHeaderButtons();
            applyFooter();
            applyTextReplacements();
            applyLogo();
            applyCarouselDots();
            injectGlobalCSS();
            
            // NOVAS FUNÇÕES ADICIONADAS
            replaceHeroImage();
            modifyCadastroButton();
            replaceCadastroParagraph();
            replaceMainTitle();
            modifyVerMaisCarrosButton();
            modifyHowItWorksBackground();
            modifySeparatorsBackground();
            modifyHowItWorksCadastroButton();
            
            var idMatch = window.location.href.match(/-(\d+)(?:\/|$)/);
            var carroId = idMatch ? parseInt(idMatch[1]) : null;
            if (carroId && todosVeiculos.length) {
                var carroData = todosVeiculos.find(function(c) { return c.id === carroId; });
                if (carroData) applySidebar(carroData);
            }
        } catch(e) {
            console.warn('[UA] Erro nao critico:', e);
        }
    }

    // ============================================================
    // MUTATION OBSERVER COM DEBOUNCE
    // ============================================================
    var debounceTimer;
    var observer = new MutationObserver(function() {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(applyAllTransformations, 150);
    });
    observer.observe(document.body, { childList:true, subtree:true, attributes:true, attributeFilter:['class','style'] });

    applyAllTransformations();

    // ============================================================
    // VERIFICACAO ROBUSTA — PAGINA COMPLETAMENTE TRANSFORMADA?
    // ============================================================
    function isPageFullyTransformed() {
        var isDetalhePage = !!window.location.href.match(/-(\d+)(?:\/|$)/);
        var isListagemPage = !!document.querySelector('[class*="VehicleCard"]');

        if (!document.getElementById('universal-auto-styles')) {
            console.log('[UA] Aguardando CSS global...');
            return false;
        }

        var cadastrarAindaExiste = Array.from(document.querySelectorAll('button')).some(function(b) {
            return b.innerText.trim() === 'Cadastrar' && !b.closest('.VehiclesFilters_buttonsContainer__lY4oa');
        });
        if (cadastrarAindaExiste) {
            console.log('[UA] Aguardando remocao do botao Cadastrar...');
            return false;
        }

        var logoOriginalAindaExiste = Array.from(
            document.querySelectorAll('.DisplayContent_displayContent__I14hU.DisplayContent_hideMobile__K13cl.DisplayContent_hideTablet__ISpUr.DisplayContent_hideLargeTablet__jiADA svg')
        ).some(function(s) { return s.getAttribute('viewBox') === '0 0 149 39'; });
        if (logoOriginalAindaExiste) {
            console.log('[UA] Aguardando substituicao da logo...');
            return false;
        }

        if (isDetalhePage) {
            var sidebarExiste = !!document.querySelector('.DesktopPage_rightSide__uZfet .DesktopPage_container__eiImn');
            if (sidebarExiste && !document.getElementById('whatsapp-button-script')) {
                console.log('[UA] Aguardando botao WhatsApp na sidebar...');
                return false;
            }
        }

        if (isListagemPage && dadosCarregados) {
            var cards = document.querySelectorAll('[class*="VehicleCard"]');
            var cardsComLink = 0, cardsOk = 0;
            cards.forEach(function(card) {
                var link = card.querySelector('a[href*="/carro/"]');
                if (!link) return;
                cardsComLink++;
                var precoElem = card.querySelector('[class*="blurred"]');
                var precoOk = !precoElem || precoElem.style.filter === 'none';
                var botaoOk = !!card.querySelector('.botao-personalizado');
                if (precoOk && botaoOk) cardsOk++;
            });
            if (cardsComLink > 0 && (cardsOk / cardsComLink) < 0.8) {
                console.log('[UA] Aguardando cards: ' + cardsOk + '/' + cardsComLink + ' transformados...');
                return false;
            }
        }

        console.log('[UA] Pagina completamente transformada! A remover loader...');
        return true;
    }

    // ============================================================
    // CICLO DE RETRY AGRESSIVO DURANTE O LOADER
    // ============================================================
    var verificationCount = 0;
    var aggressiveRetryInterval = setInterval(function() {
        applyAllTransformations();
        if (isPageFullyTransformed()) {
            clearInterval(aggressiveRetryInterval);
            if (typeof window.markTransformationsComplete === 'function') {
                window.markTransformationsComplete();
            }
            return;
        }
        verificationCount++;
        if (verificationCount > 45) {
            clearInterval(aggressiveRetryInterval);
            console.warn('[UA] Limite de verificacoes atingido. A remover loader preventivamente.');
            if (typeof window.markTransformationsComplete === 'function') {
                window.markTransformationsComplete();
            }
        }
    }, 200);

    console.log('[UA] Script v8 ativo. Mascara de pagina ativa. Loader aguarda transformacoes com fade out final.');
})();