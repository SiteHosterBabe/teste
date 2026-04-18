(function universalAutoScript() {
    "use strict";
    // ============================================================
    // CONFIGURACOES
    // ============================================================
    const WHATSAPP_NUMBER = '5511958934922';
    const URL_JSON = 'https://raw.githubusercontent.com/SiteHosterBabe/universalauto/refs/heads/main/vinijunior.json';
    const ACRESCIMO = 3000;
    const LOADER_TIMEOUT_MS = 14000;
    const WHATSAPP_BASE_MESSAGE = 'Olá! Tenho interesse em um veículo.';

    console.log('[UA] Script v48 - Modificações leves, sem loop agressivo');

    // ============================================================
    // VARIÁVEIS
    // ============================================================
    let loaderElement = null;
    let todosVeiculos = [];
    let precoPorId = new Map();
    let dadosCarregados = false;
    let modificationTimeout = null;
    let isModifying = false;
    let globalObserver = null;

    // ============================================================
    // LOADER (sobreposição)
    // ============================================================
    function createLoaderElement() {
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
        loadingDiv.style.cssText = `
            position:fixed;
            top:0;
            left:0;
            width:100%;
            height:100%;
            z-index:9999999;
            display:flex;
            justify-content:center;
            align-items:center;
            flex-direction:column;
            background:#FFFFFF;
            background-image:repeating-linear-gradient(45deg, rgba(10,102,194,0.03) 0px, rgba(10,102,194,0.03) 2px, transparent 2px, transparent 8px),
            linear-gradient(135deg, #FFFFFF 0%, ${SOFT_BLUE_BG} 100%);
        `;
        
        // SVG (versão resumida mas funcional)
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("viewBox", "0 0 178 40");
        svg.setAttribute("width", "600");
        svg.setAttribute("height", "135");
        svg.style.maxWidth = "90vw";
        svg.style.height = "auto";
        svg.style.filter = "drop-shadow(0 20px 30px rgba(0,0,0,0.15))";
        svg.style.marginBottom = "40px";
        svg.innerHTML = '<defs><filter id="glow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur in="SourceAlpha" stdDeviation="2"/><feMerge><feMergeNode in="offsetblur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><path class="air" d="M 46 16.5 h -20 a 8 8 0 0 1 0 -16" fill="none" stroke="#0A66C2" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round" filter="url(#glow)"></path><g id="car"><svg viewBox="0 0 118 28.125" x="30" y="11.725" width="118" height="28.125"><defs><circle id="circle" cx="0" cy="0" r="1"></circle><g id="wheel"><use href="#circle" fill="#1E191A" transform="scale(10)"></use><use href="#circle" fill="#fff" transform="scale(5)"></use><path fill="#1E191A" stroke="#1E191A" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.2" d="M -3.5 0 a 4 4 0 0 1 7 0 a 3.5 3.5 0 0 0 -7 0"></path><use href="#circle" fill="#1E191A" transform="scale(1.5)"></use><path class="wheel-stripe" fill="none" stroke="#F9B35C" stroke-width="0.75" stroke-linecap="round" stroke-dasharray="20 14 8 5" d="M 0 -7.5 a 7.5 7.5 0 0 1 0 15 a 7.5 7.5 0 0 1 0 -15"></path><path fill="none" stroke="#fff" stroke-width="1" stroke-linecap="round" opacity="0.15" d="M -6.5 -6.25 a 10 10 0 0 1 13 0 a 9 9 0 0 0 -13 0"></path></g></defs><g transform="translate(51.5 11.125)"><path stroke-width="2" stroke="#1E191A" fill="#0A66C2" d="M 0 0 v -2 a 4.5 4.5 0 0 1 9 0 v 2"></path><rect fill="#1E191A" x="3.25" y="-3" width="5" height="3"></rect></g><g transform="translate(10 24.125)"><g transform="translate(59 0)"><path id="shadow" opacity="0.7" fill="#1E191A" d="M -64 0 l -4 4 h 9 l 8 -1.5 h 100 l -3.5 -2.5"></path></g><path fill="#fff" stroke="#1E191A" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" d="M 0 0 v -10 l 35 -13 v 5 l 4 0.5 l 0.5 4.5 h 35.5 l 30 13"></path><g fill="#fff" stroke="#1E191A" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"><path d="M -6 0 v -22 h 10 z"></path><path d="M 105 0 h -3 l -12 -5.2 v 6.2 h 12"></path></g><g fill="#949699" opacity="0.7"><rect x="16" y="-6" width="55" height="6"></rect><path d="M 24 -14 l 13 -1.85 v 1.85"></path></g><g fill="none" stroke="#1E191A" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"><path stroke-dasharray="30 7 42" d="M 90 0 h -78"></path><path d="M 39.5 -13 h -15"></path></g><path fill="#fff" stroke="#1E191A" stroke-width="2.25" stroke-linejoin="round" d="M 48.125 -6 h -29 v 6 h 29"></path><rect x="48" y="-7.125" width="6.125" height="7.125" fill="#1E191A"></rect><g fill="#1E191A"><rect x="60" y="-15" width="1" height="6"></rect><rect x="56.5" y="-17.5" width="6" height="2.5"></rect></g></g><g class="wheels" transform="translate(0 18.125)"><g transform="translate(10 0)"><use href="#wheel"></use></g><g transform="translate(87 0)"><use class="right-wheel-stripe" href="#wheel" stroke-dashoffset="-22"></use></g></g></svg></g><g fill="none" stroke-width="1.2" stroke-linejoin="round" stroke-linecap="round"><path class="air" stroke="#0A66C2" d="M 177.5 34 h -10 q -16 0 -32 -8"></path><path class="air" stroke="#B8D0F0" d="M 167 28.5 c -18 -2 -22 -8 -37 -10.75"></path><path class="air" stroke="#B8D0F0" d="M 153 20 q -4 -1.7 -8 -3"></path><path class="air" stroke="#0A66C2" d="M 117 16.85 c -12 0 -12 16 -24 16 h -8"></path><path class="air" stroke="#B8D0F0" d="M 65 12 q -5 3 -12 3.8"></path><path class="air" stroke="#B8D0F0" stroke-dasharray="9 10" d="M 30 13.5 h -2.5 q -5 0 -5 -5"></path><path class="air" stroke="#B8D0F0" d="M 31 33 h -10"></path><path class="air" stroke="#B8D0F0" d="M 29.5 23 h -12"></path><path class="air" stroke="#B8D0F0" d="M 13.5 23 h -6"></path><path class="air" stroke="#0A66C2" d="M 28 28 h -27.5"></path></g>';
        loadingDiv.appendChild(svg);
        
        const textWrapper = document.createElement('div');
        textWrapper.style.cssText = 'text-align:center;margin:20px 0 30px 0;width:80%;max-width:700px;';
        const statusDiv = document.createElement('div');
        statusDiv.style.cssText = `font-family:'Playfair Display',serif;font-size:1.8rem;font-weight:500;color:#0A66C2;padding:12px 24px;border-radius:60px;background:rgba(255,255,255,0.5);backdrop-filter:blur(8px);border:1px solid #0A66C220;transition:opacity 0.4s;`;
        statusDiv.textContent = FRASES[0];
        textWrapper.appendChild(statusDiv);
        loadingDiv.appendChild(textWrapper);
        
        const progressContainer = document.createElement('div');
        progressContainer.style.cssText = 'width:60%;max-width:500px;height:4px;background:rgba(10,102,194,0.2);border-radius:10px;margin:20px auto 0;overflow:hidden;';
        const progressBar = document.createElement('div');
        progressBar.style.cssText = 'width:0%;height:100%;background:#0A66C2;border-radius:10px;transition:width 0.3s;';
        progressContainer.appendChild(progressBar);
        loadingDiv.appendChild(progressContainer);
        
        let fraseIndex = 1;
        const intervalFrases = setInterval(() => {
            if (!document.getElementById('premium-loader')) return;
            statusDiv.style.opacity = "0";
            setTimeout(() => {
                if (!document.getElementById('premium-loader')) return;
                statusDiv.textContent = FRASES[fraseIndex];
                statusDiv.style.opacity = "1";
                fraseIndex = (fraseIndex + 1) % FRASES.length;
            }, 200);
        }, 2800);
        
        let progress = 0;
        const progressInterval = setInterval(() => {
            if (!document.getElementById('premium-loader')) return;
            if (progress < 100) {
                progress += 100 / (LOADER_TIMEOUT_MS / 50);
                if (progress > 100) progress = 100;
                progressBar.style.width = progress + "%";
            }
        }, 50);
        setTimeout(() => {
            if (document.getElementById('premium-loader')) progressBar.style.width = "100%";
        }, LOADER_TIMEOUT_MS - 200);
        
        loadingDiv._intervals = { intervalFrases, progressInterval };
        return loadingDiv;
    }

    function initLoader() {
        if (loaderElement) return;
        loaderElement = createLoaderElement();
        if (document.body) {
            document.body.insertBefore(loaderElement, document.body.firstChild);
        } else {
            document.addEventListener('DOMContentLoaded', () => {
                document.body.insertBefore(loaderElement, document.body.firstChild);
            });
        }
        setTimeout(() => {
            if (loaderElement && loaderElement.parentNode) {
                if (loaderElement._intervals) {
                    clearInterval(loaderElement._intervals.intervalFrases);
                    clearInterval(loaderElement._intervals.progressInterval);
                }
                loaderElement.style.transition = 'opacity 0.5s';
                loaderElement.style.opacity = '0';
                setTimeout(() => {
                    if (loaderElement && loaderElement.parentNode) loaderElement.remove();
                }, 500);
            }
        }, LOADER_TIMEOUT_MS);
    }

    // ============================================================
    // CARREGAMENTO DE DADOS (assíncrono)
    // ============================================================
    function loadDataAsync() {
        fetch(URL_JSON)
            .then(res => res.ok ? res.json() : [])
            .then(data => {
                todosVeiculos = data;
                todosVeiculos.forEach(v => {
                    if (v.id && v.priceFor) precoPorId.set(v.id, v.priceFor + ACRESCIMO);
                });
                dadosCarregados = true;
                console.log('[UA] JSON carregado');
                scheduleModifications();
            })
            .catch(err => console.error('[UA] Erro JSON:', err));
    }

    // ============================================================
    // MODAIS (PDF, Vídeo) – mantido igual ao original
    // ============================================================
    function createModal(title, contentElement, width = '900px') {
        const existingModal = document.querySelector('.ua-custom-modal');
        if (existingModal) existingModal.remove();
        const isMobile = window.innerWidth < 768;
        const modalContainer = document.createElement('div');
        modalContainer.className = 'LdsDialog-module_lds-dialog-container__Br8cE ua-custom-modal';
        modalContainer.setAttribute('tabindex', '-1');
        modalContainer.style.cssText = `position:fixed;top:0;left:0;width:100%;height:100%;background-color:rgba(0,0,0,0.5);z-index:9999999;display:flex;align-items:${isMobile ? 'flex-end' : 'center'};justify-content:center;padding:0;box-sizing:border-box;`;
        const dialog = document.createElement('div');
        dialog.className = 'LdsDialog-module_lds-dialog__sX04I LdsDialog-module_lds-dialog--md__eeh2-';
        dialog.style.cssText = isMobile ? `width:100%;max-width:100%;height:95vh;max-height:95vh;border-radius:16px 16px 0 0;display:flex;flex-direction:column;overflow:hidden;` : `width:${width};max-width:95vw;max-height:92vh;display:flex;flex-direction:column;overflow:hidden;`;
        const header = document.createElement('div');
        header.className = 'LdsDialog-module_lds-dialog__header__RO9-z LdsDialog-module_lds-dialog__title__p4lEy';
        header.style.cssText = `flex-shrink:0;display:flex;align-items:center;justify-content:space-between;padding:${isMobile ? '12px 16px' : ''};`;
        const titleEl = document.createElement('h2');
        titleEl.className = 'LdsTypography-module_lds-typography__-DOlx LdsTypography-module_lds-typography--heading-lg__-4owW';
        titleEl.textContent = title;
        const closeDiv = document.createElement('div');
        closeDiv.className = 'LdsDialog-module_lds-dialog__close-button__nX6PB';
        const closeBtn = document.createElement('button');
        closeBtn.type = 'button';
        closeBtn.className = 'base-Button-root LdsIconButton-module_lds-icon-button__aW974 LdsIconButton-module_lds-icon-button--basic-neutral__o1i7p';
        closeBtn.style.cssText = 'width:40px;height:40px;min-width:40px;min-height:40px;';
        closeBtn.setAttribute('aria-label', 'fechar');
        closeBtn.innerHTML = '<span class="LdsIconButton-module_lds-icon-container__lz4mz"><svg width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" fill="none" role="presentation"><path d="M17.7372 7.5364C18.0886 7.18492 18.0886 6.61508 17.7372 6.2636C17.3857 5.91213 16.8159 5.91213 16.4644 6.2636L12.0004 10.7276L7.5364 6.2636C7.18492 5.91213 6.61508 5.91213 6.2636 6.2636C5.91213 6.61508 5.91213 7.18492 6.2636 7.5364L10.7276 12.0004L6.2636 16.4644C5.91213 16.8159 5.91213 17.3857 6.2636 17.7372C6.61508 18.0886 7.18492 18.0886 7.5364 17.7372L12.0004 13.2732L16.4644 17.7372C16.8159 18.0886 17.3857 18.0886 17.7372 17.7372C18.0886 17.3857 18.0886 16.8159 17.7372 16.4644L13.2732 12.0004L17.7372 7.5364Z" fill="currentColor"></path></svg></span>';
        closeDiv.appendChild(closeBtn);
        header.appendChild(titleEl);
        header.appendChild(closeDiv);
        const contentDiv = document.createElement('div');
        contentDiv.className = 'LdsDialog-module_lds-dialog__content__Tqh0O';
        contentDiv.style.cssText = `flex:1;overflow-y:auto;overflow-x:hidden;${isMobile ? 'padding:0;' : ''}`;
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
        const isMobile = window.innerWidth < 768;
        const container = document.createElement('div');
        container.style.cssText = `position:relative;width:100%;height:100%;min-height:${isMobile ? '300px' : '400px'};`;
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'pdf-loading';
        loadingDiv.style.cssText = 'position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center;color:#0A66C2;font-family:sans-serif;display:block;';
        loadingDiv.innerHTML = '<div style="border:4px solid #f3f3f3;border-top:4px solid #0A66C2;border-radius:50%;width:40px;height:40px;animation:spin 1s linear infinite;margin:0 auto 10px;"></div><p>Carregando laudo...</p><style>@keyframes spin{0%{transform:rotate(0deg);}100%{transform:rotate(360deg);}}</style>';
        container.appendChild(loadingDiv);
        const iframe = document.createElement('iframe');
        iframe.src = pdfUrl;
        iframe.style.cssText = `width:100%;height:${isMobile ? 'calc(95vh - 70px)' : '70vh'};border:none;display:none;`;
        iframe.onload = () => { loadingDiv.style.display = 'none'; iframe.style.display = 'block'; };
        container.appendChild(iframe);
        createModal('Laudo do Veículo', container);
    }

    function showVideoModal(videoUrl) {
        const isMobile = window.innerWidth < 768;
        const video = document.createElement('video');
        video.setAttribute('width', '100%');
        video.controls = true;
        video.style.cssText = `display:block;width:100%;max-height:${isMobile ? '55vh' : '60vh'};background:#000;`;
        const source = document.createElement('source');
        source.src = videoUrl;
        source.type = 'video/mp4';
        video.appendChild(source);
        const videoContainer = document.createElement('div');
        videoContainer.style.cssText = 'width:100%;background:#000;';
        videoContainer.appendChild(video);
        const infoContainer = document.createElement('div');
        infoContainer.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 8.10004C12.4971 8.10004 12.9 8.50299 12.9 9.00004V13C12.9 13.4971 12.4971 13.9 12 13.9C11.503 13.9 11.1 13.4971 11.1 13V9.00004C11.1 8.50299 11.503 8.10004 12 8.10004Z" fill="#0B4260"></path><path d="M12 15.1C11.503 15.1 11.1 15.503 11.1 16C11.1 16.4971 11.503 16.9 12 16.9H12.01C12.5071 16.9 12.91 16.4971 12.91 16C12.91 15.503 12.5071 15.1 12.01 15.1H12Z" fill="#0B4260"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M10.6188 2.13011C11.0404 1.8926 11.5161 1.76782 12 1.76782C12.4839 1.76782 12.9596 1.8926 13.3812 2.13011C13.8028 2.36762 14.156 2.70983 14.4068 3.12369L14.4092 3.12764L22.5152 16.6636L22.5227 16.6765C22.768 17.1019 22.8977 17.5841 22.8989 18.0752C22.9002 18.5663 22.7728 19.0491 22.5296 19.4757C22.2864 19.9024 21.9358 20.2579 21.5127 20.5071C21.0895 20.7562 20.6085 20.8903 20.1174 20.896L20.107 20.8961L3.88291 20.896C3.39164 20.8905 2.91038 20.7564 2.487 20.5072C2.06361 20.258 1.71285 19.9022 1.46961 19.4754C1.22638 19.0485 1.09913 18.5654 1.10054 18.0741C1.10194 17.5828 1.23195 17.1004 1.47763 16.675L1.48492 16.6626L9.57573 3.15396C9.58137 3.14377 9.58722 3.13368 9.59327 3.12369C9.84401 2.70983 10.1972 2.36762 10.6188 2.13011ZM12 3.56782C11.8257 3.56782 11.6542 3.61279 11.5023 3.69837C11.3567 3.78039 11.2338 3.89706 11.1443 4.0379L11.1351 4.05348L3.0334 17.5804C2.94682 17.7324 2.90103 17.9042 2.90053 18.0793C2.90002 18.2563 2.94587 18.4304 3.03352 18.5842C3.12117 18.738 3.24757 18.8662 3.40013 18.956C3.55146 19.0451 3.72331 19.0933 3.89885 19.096H20.101C20.2764 19.0933 20.4482 19.045 20.5994 18.956C20.7519 18.8662 20.8782 18.7381 20.9659 18.5843C21.0535 18.4306 21.0994 18.2566 21.0989 18.0796C21.0985 17.9048 21.0529 17.7331 20.9665 17.5811L12.8673 4.0564L12.8663 4.0548C12.776 3.90639 12.6491 3.78365 12.4977 3.69837C12.3458 3.61279 12.1744 3.56782 12 3.56782Z" fill="#0B4260"></path></svg><div><div class="ReportVideoButton_infoTitle__kbbiM"><h4>Sobre este vídeo</h4></div><p>Este vídeo foi gravado durante a inspeção técnica do veículo e mostra o estado atual de conservação, incluindo possíveis avarias, desgastes e condições gerais da lataria, interior e componentes visíveis.</p></div>`;
        infoContainer.style.cssText = isMobile ? 'padding:12px 16px;font-size:14px;display:flex;gap:12px;' : 'display:flex;gap:12px;padding:16px;';
        const mainContainer = document.createElement('div');
        mainContainer.appendChild(videoContainer);
        mainContainer.appendChild(infoContainer);
        createModal('Vídeo do laudo', mainContainer);
    }

    // ============================================================
    // FUNÇÕES DE MODIFICAÇÃO (todas com data-ua-* para não repetir)
    // ============================================================
    const UA_LOGO_URL = 'https://raw.githubusercontent.com/SiteHosterBabe/universalauto/refs/heads/main/logoprincipal1.png';
    const UA_REDIRECT = 'https://universalauto.xyz/carros';

    function buildUALogoHTML() {
        return `<div style="display:flex;align-items:center;gap:8px;"><img src="${UA_LOGO_URL}" alt="Universal Auto" style="height:36px;width:auto;"><div><span style="font-size:10px;color:#1565C0;font-weight:600;">Repasses</span><br><span style="font-size:17px;color:#0D3B8C;font-weight:800;">Universal Auto</span></div></div>`;
    }

    function replaceLocalizaNavbarLogo() {
        document.querySelectorAll('a[title="Seminovos Localiza"][data-testid="home-page"], a.Navbar_logoLink__6znXv').forEach(link => {
            if (link.hasAttribute('data-ua-logo')) return;
            link.setAttribute('data-ua-logo', 'true');
            link.setAttribute('title', 'Universal Auto');
            link.setAttribute('href', UA_REDIRECT);
            link.removeAttribute('data-testid');
            link.innerHTML = buildUALogoHTML();
            link.addEventListener('click', (e) => { e.preventDefault(); window.location.href = UA_REDIRECT; });
        });
    }

    function replaceLocalizaSVGInstances() {
        document.querySelectorAll('svg[viewBox="0 0 124 33"], svg[viewBox="0 0 149 39"]').forEach(svg => {
            if (svg.hasAttribute('data-ua-svg') || svg.closest('#premium-loader')) return;
            svg.setAttribute('data-ua-svg', 'true');
            const wrapper = document.createElement('div');
            wrapper.style.cssText = 'display:flex;align-items:center;gap:8px;';
            wrapper.innerHTML = `<img src="${UA_LOGO_URL}" alt="Universal Auto" style="height:33px;width:auto;"><div><span style="font-size:9px;color:#1565C0;font-weight:600;">Repasses</span><br><span style="font-size:15px;color:#0D3B8C;font-weight:800;">Universal Auto</span></div>`;
            svg.parentNode.replaceChild(wrapper, svg);
        });
    }

    function applyHero() {
        const hero = document.querySelector('.Hero_heroBackground__n2WjH');
        if (hero && !hero.hasAttribute('data-ua-hero')) {
            hero.setAttribute('data-ua-hero', 'true');
            hero.style.background = 'linear-gradient(135deg,#2563eb 0%,#1e40af 50%,#1e3a8a 100%)';
            if (!hero.querySelector('.custom-glow')) {
                const glow = document.createElement('div');
                glow.className = 'custom-glow';
                Object.assign(glow.style, { position:'absolute', top:'-100px', left:'-100px', width:'400px', height:'400px', background:'rgba(59,130,246,0.4)', filter:'blur(120px)', borderRadius:'50%', pointerEvents:'none' });
                hero.appendChild(glow);
            }
        }
        const heroImg = document.querySelector('img.Hero_heroImage__14M5B');
        if (heroImg && heroImg.src.includes('/home/computer.webp')) heroImg.src = 'https://raw.githubusercontent.com/SiteHosterBabe/universalauto/refs/heads/main/banerzaoinicial.png';
        const mobileHero = document.querySelector('img.Hero_heroImageMobile__TXyFn');
        if (mobileHero && mobileHero.src.includes('computer-mobile.webp')) mobileHero.src = 'https://raw.githubusercontent.com/SiteHosterBabe/universalauto/refs/heads/main/banerzaoinicial.png';
    }

    function modifyCadastroButton() {
        const heroContainer = document.querySelector('.Hero_heroTextContainer__o_LrP');
        if (!heroContainer) return;
        heroContainer.querySelectorAll('button.LdsButton-module_lds-button--contained-primary__6r3Mk').forEach(btn => {
            if (btn.hasAttribute('data-ua-hero-btn')) return;
            const span = btn.querySelector('span');
            if (span && (span.innerText.trim() === 'Cadastre-se agora' || span.innerText.trim() === 'Veja o nosso catálogo')) {
                span.innerText = 'Veja o nosso catálogo';
                btn.setAttribute('data-ua-hero-btn', 'true');
                btn.addEventListener('click', (e) => { e.preventDefault(); window.location.href = 'https://universalauto.xyz/carros'; });
            }
        });
    }

    function replaceCadastroParagraph() {
        document.querySelectorAll('p.LdsTypography-module_lds-typography__-DOlx.LdsTypography-module_lds-typography--body-md__KI9TK').forEach(p => {
            if (p.hasAttribute('data-ua-cadastro')) return;
            if (p.innerText.trim() === 'Cadastre-se para acessar nossos veículos!') {
                p.innerText = 'Descubra viaturas únicas: galeria de fotos exclusiva e especificações completas.';
                p.setAttribute('data-ua-cadastro', 'true');
            }
        });
    }

    function replaceMainTitle() {
        document.querySelectorAll('h1.LdsTypography-module_lds-typography__-DOlx.LdsTypography-module_lds-typography--heading-xl__xfa9y').forEach(t => {
            if (t.hasAttribute('data-ua-title')) return;
            if (t.innerText.trim() === 'Diversos modelos, com todas as vantagens Localiza!') {
                t.innerText = 'Seu próximo carro está aqui. Conheça as vantagens do nosso estoque.';
                t.setAttribute('data-ua-title', 'true');
            }
        });
    }

    function modifyVerMaisCarrosButton() {
        document.querySelectorAll('button.LdsButton-module_lds-button--outlined-primary__ZxRfx').forEach(btn => {
            if (btn.hasAttribute('data-ua-vermais')) return;
            const span = btn.querySelector('span');
            if (span && span.innerText.trim() === 'Ver mais carros') {
                btn.setAttribute('data-ua-vermais', 'true');
                btn.addEventListener('click', (e) => { e.preventDefault(); window.location.href = 'https://universalauto.xyz/carros'; });
            }
        });
    }

    function modifyHowItWorksBackground() {
        const section = document.querySelector('section.HowItWorks_container__IYMRX');
        if (section && !section.hasAttribute('data-ua-howitworks')) {
            section.setAttribute('data-ua-howitworks', 'true');
            section.style.background = 'linear-gradient(135deg, rgb(37, 99, 235) 0%, rgb(30, 64, 175) 50%, rgb(30, 58, 138) 100%)';
        }
    }

    function modifySeparatorsBackground() {
        document.querySelectorAll('.HowItWorks_leftBorder__P6mDf,.HowItWorks_rightBorder__JevRe').forEach(el => {
            if (!el.hasAttribute('data-ua-sep')) {
                el.setAttribute('data-ua-sep', 'true');
                el.style.background = 'linear-gradient(135deg, rgb(37, 99, 235) 0%, rgb(30, 64, 175) 50%, rgb(30, 58, 138) 100%)';
            }
        });
    }

    function modifyHowItWorksCadastroButton() {
        document.querySelectorAll('section.HowItWorks_container__IYMRX button.LdsButton-module_lds-button--contained-primary__6r3Mk').forEach(btn => {
            if (btn.hasAttribute('data-ua-howitworks-btn')) return;
            const span = btn.querySelector('span');
            if (span && span.innerText.trim() === 'Cadatre-se agora') {
                span.innerText = 'Nosso Catálogo';
                btn.setAttribute('data-ua-howitworks-btn', 'true');
                btn.addEventListener('click', (e) => { e.preventDefault(); window.location.href = 'https://universalauto.xyz/carros'; });
            }
        });
    }

    function replaceHowItWorksTexts() {
        const steps = [
            { h2: 'Faça seu cadastro', newH2: 'Acesse o nosso catálogo', p: 'Cadastre seu negócio e representantes gratuitamente!', newP: 'Faça a sua pesquisa e veja por que somos a escolha inteligente. Compare e poupe.' },
            { h2: 'Acesse o portal', newH2: 'Conheça os detalhes', p: 'Faça o login e descubra todas as funcionalidades da plataforma.', newP: 'Clique no modelo e acesse os dados vitais do veículo: quilometragem, laudo cautelar, estado de conservação e todos os acessórios.' },
            { h2: 'Escolha seus carros', newH2: 'Entre em contato', p: 'Ampla variedade de modelos e marcas para o seu negócio.', newP: 'Esclareça as suas dúvidas sobre crédito, especificações técnicas ou agende uma visita. A nossa equipa está pronta para o ajudar em todas as etapas da sua compra.' },
            { h2: 'Compre online', newH2: 'Agendar visita', p: 'Ampla variedade de modelos e marcas para o seu negócio.Todo o processo de compra 100% online e seguro!', newP: 'Solicite um agendamento personalizado com os nossos especialistas e venha avaliar, em detalhe e presencialmente, toda a qualidade dos nossos veículos.' }
        ];
        steps.forEach(step => {
            document.querySelectorAll('h2.LdsTypography-module_lds-typography--heading-md__QVgP4').forEach(h2 => {
                if (!h2.hasAttribute('data-ua-step-h2') && h2.innerText.trim() === step.h2) {
                    h2.innerText = step.newH2;
                    h2.setAttribute('data-ua-step-h2', 'true');
                }
            });
            document.querySelectorAll('p.LdsTypography-module_lds-typography--body-md__KI9TK').forEach(p => {
                if (!p.hasAttribute('data-ua-step-p') && p.innerText.trim() === step.p) {
                    p.innerText = step.newP;
                    p.setAttribute('data-ua-step-p', 'true');
                }
            });
        });
    }

    function modifyEquipeEspecializadaBackground() {
        const div = document.querySelector('.EfficiencyForBusiness_teamContainer__8bJzm');
        if (div && !div.hasAttribute('data-ua-equipe')) {
            div.setAttribute('data-ua-equipe', 'true');
            div.style.background = 'linear-gradient(135deg, rgb(37, 99, 235) 0%, rgb(30, 64, 175) 50%, rgb(30, 58, 138) 100%)';
        }
    }

    function modifyFAQSection() {
        const faqDiv = document.querySelector('.FAQ_banner__7TtUF');
        if (!faqDiv || faqDiv.hasAttribute('data-ua-faq')) return;
        faqDiv.setAttribute('data-ua-faq', 'true');
        faqDiv.style.background = 'linear-gradient(135deg, rgb(37, 99, 235) 0%, rgb(30, 64, 175) 50%, rgb(30, 58, 138) 100%)';
        const h2 = faqDiv.querySelector('h2');
        if (h2 && h2.innerText.includes('Não possui CNPJ')) h2.innerText = 'Gostaria de conhecer as viaturas disponíveis em exposição?';
        const p = faqDiv.querySelector('p');
        if (p && p.innerText.includes('O Universal Auto é de uso exclusivo')) p.innerText = 'O Universal Auto possui loja fisica em São Paulo. Se você quer visitar nossa loja fisica e comprar um carro da universal, acesse nosso estoque em exposição pelo link abaixo!';
        const link = faqDiv.querySelector('a');
        if (link && link.href.includes('seminovos.localiza.com')) link.href = 'https://universalautorepasse.com.br/';
    }

    function modifyFaqCadastroButton() {
        const faqButtons = document.querySelector('.FAQ_buttons__XTKyw');
        if (!faqButtons) return;
        faqButtons.querySelectorAll('button.LdsButton-module_lds-button--contained-primary__6r3Mk').forEach(btn => {
            if (btn.hasAttribute('data-ua-faq-btn')) return;
            const span = btn.querySelector('span');
            if (span && span.innerText.trim() === 'Cadastre-se agora') {
                span.innerText = 'Nosso Contacto';
                btn.setAttribute('data-ua-faq-btn', 'true');
                btn.addEventListener('click', (e) => { e.preventDefault(); window.location.href = 'mailto:contato@universalautorepasse.com.br'; });
            }
        });
    }

    function modifyLoginDialog() {
        const dialog = document.querySelector('.LdsDialog-module_lds-dialog-container__Br8cE');
        if (!dialog) return;
        const content = dialog.querySelector('.Catalog_dialogContent__WQLIT');
        if (!content || content.hasAttribute('data-ua-login')) return;
        content.setAttribute('data-ua-login', 'true');
        const p = content.querySelector('p');
        if (p && p.innerText === 'Faça o Login ou cadastre-se para ter acesso a todas nossas ofertas') p.innerText = 'Consulte o nosso catálogo e utilize os filtros ou a barra de pesquisa para localizar as melhores oportunidades desta marca.';
        const loginBtn = content.querySelector('button.LdsButton-module_lds-button--basic-primary__Nv8Ii');
        if (loginBtn && loginBtn.innerText.includes('Já possui conta? Faça o login')) loginBtn.remove();
        const cadastroBtn = content.querySelector('button.LdsButton-module_lds-button--contained-primary__6r3Mk');
        if (cadastroBtn) {
            const span = cadastroBtn.querySelector('span');
            if (span && span.innerText === 'Cadastre-se') {
                span.innerText = 'Preço Único';
                cadastroBtn.addEventListener('click', (e) => { e.preventDefault(); window.location.href = 'https://universalauto.xyz/carros'; });
            }
        }
    }

    function modifyContatoButton() {
        document.querySelectorAll('button.LdsButton-module_lds-button--contained-primary__6r3Mk').forEach(btn => {
            if (btn.closest('.Hero_heroTextContainer__o_LrP') || btn.closest('.FAQ_buttons__XTKyw') || btn.hasAttribute('data-ua-contato')) return;
            const span = btn.querySelector('span');
            if (span && span.innerText.trim() === 'Veja o nosso catálogo') {
                span.innerText = 'Nosso Contacto';
                btn.setAttribute('data-ua-contato', 'true');
                btn.addEventListener('click', (e) => { e.preventDefault(); window.location.href = 'mailto:contato@universalautorepasse.com.br'; });
            }
        });
    }

    function modifyHowItWorksTitle() {
        const title = document.querySelector('h1.HowItWorks_titleText__5z83G');
        if (title && !title.hasAttribute('data-ua-hiw-title') && title.innerHTML !== 'Como funciona? <br> Veja como é <span>rápido</span> <br> e <span>simples</span> comprar na universal.') {
            title.innerHTML = 'Como funciona? <br> Veja como é <span>rápido</span> <br> e <span>simples</span> comprar na universal.';
            title.setAttribute('data-ua-hiw-title', 'true');
        }
    }

    const titulosMapping = [
        { original: "Qual é o benefício de realizar o cadastro no Universal Auto?", novo: "O que significa comprar um carro de \"repasse\"?" },
        { original: "Posso realizar o cadastro de empresas de qualquer segmento?", novo: "Os veículos possuem garantia de motor e câmbio?" },
        { original: "Como posso ter acesso às ofertas disponíveis?", novo: "É possível financiar um carro de repasse na loja?" },
        { original: "Sou pessoa física. Consigo comprar no Universal Auto?", novo: "Como posso verificar a procedência e documentação do carro?" },
        { original: "Consigo fazer compras 100% online?", novo: "Posso dar o meu carro atual como entrada na troca?" },
        { original: "Quais são as formas de pagamento?", novo: "Onde a loja física está localizada e qual o horário de atendimento?" }
    ];
    const respostasMapping = [
        { original: "Após realizar o cadastro, você passará a ter acesso completo ao catálogo", novo: "Comprar um carro de repasse significa adquirir um veículo no estado em que ele se encontra, geralmente proveniente de trocas em grandes concessionárias. Esses carros são vendidos por valores significativamente abaixo da tabela FIPE porque a loja não realiza revisões estéticas ou mecânicas completas antes da venda, repassando a margem de lucro e a responsabilidade de manutenção para o comprador." },
        { original: "Você poderá cadastrar apenas empresas que possuam um CNAE principal", novo: "Nesta modalidade específica de negócio, os veículos são vendidos sem garantia de mecânica ou estética. O comprador assume o carro \"no estado\", ciente de que o preço reduzido compensa eventuais manutenções que precisem ser feitas. Por isso, recomendamos sempre levar um mecânico de confiança para avaliar o veículo no pátio antes de fechar o negócio." },
        { original: "Para acessar as ofertas disponíveis é necessário que você realize o cadastro", novo: "Sim, a Universal Auto Repasse costuma trabalhar com parcerias bancárias para facilitar o pagamento. No entanto, por serem carros com preços promocionais, as condições de financiamento e a aprovação de crédito dependem do ano do veículo e do perfil do CPF do cliente. Também é comum aceitarem cartões de crédito para parcelamento da entrada ou do valor total." },
        { original: "Não, se você é uma pessoa física e deseja comprar um veículo seminovo", novo: "Todos os veículos comercializados passam por uma verificação de procedência. No momento da compra, o cliente tem acesso às informações sobre multas, IPVA e restrições. A transferência de propriedade segue o rito padrão do DETRAN, e a loja fornece o suporte necessário para que o documento seja transferido corretamente para o novo proprietário após a quitação." },
        { original: "Sim, você poderá comprar o seu veículo totalmente online e sem sair de casa", novo: "Sim, a loja avalia veículos como parte do pagamento. Vale lembrar que, como a Universal trabalha com margens de repasse, a avaliação do seu usado também seguirá uma métrica de mercado para revenda rápida, permitindo que você saia com um modelo mais novo ou de categoria superior utilizando seu crédito atual." },
        { original: "O pagamento pode ser realizado via PIX à vista ou boleto bancário", novo: "A sede física fica em Santo André - SP, na Avenida Pereira Barreto, 42 - Vila Gilda. O atendimento ocorre de segunda a sexta, das 9h às 16h, e aos sábados também das 9h às 16h. É recomendável agendar uma visita ou consultar o estoque atual via WhatsApp antes de se deslocar, devido à alta rotatividade dos veículos." }
    ];

    function replaceFaqTitles() {
        document.querySelectorAll('.LdsAccordionItem-module_lds-accordion-item--title__n6Vx5 span').forEach(span => {
            if (span.hasAttribute('data-ua-faq-title')) return;
            const current = span.innerText.trim();
            const found = titulosMapping.find(item => item.original === current);
            if (found && span.innerText !== found.novo) {
                span.innerText = found.novo;
                span.setAttribute('data-ua-faq-title', 'true');
            }
        });
    }

    function replaceFaqAnswers() {
        document.querySelectorAll('.LdsAccordionItem-module_lds-accordion-item--content__ns-Tz p.LdsTypography-module_lds-typography--body-md__KI9TK').forEach(p => {
            if (p.hasAttribute('data-ua-faq-answer')) return;
            const current = p.innerText.trim();
            const found = respostasMapping.find(item => current === item.original || current.startsWith(item.original));
            if (found && p.innerText !== found.novo) {
                p.innerText = found.novo;
                p.setAttribute('data-ua-faq-answer', 'true');
            }
        });
    }

    function modifyAccordionFaq() {
        replaceFaqTitles();
        replaceFaqAnswers();
        document.querySelectorAll('a[href="https://seminovos.localiza.com/"]').forEach(link => link.remove());
        document.querySelectorAll('p.LdsTypography-module_lds-typography--body-md__KI9TK').forEach(p => {
            if (!p.hasAttribute('data-ua-footer') && p.innerText === 'Os melhores preços para a sua empresa, com flexibilidade de negociação.') {
                p.innerText = 'Os melhores preços do mercado, com flexibilidade de negociação.';
                p.setAttribute('data-ua-footer', 'true');
            }
        });
    }

    function observeAccordionExpansion() {
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mut => {
                if (mut.type === 'attributes' && mut.attributeName === 'open') {
                    const details = mut.target;
                    if (details.matches('details[data-testid="accordion-item"]') && details.hasAttribute('open')) {
                        const content = details.querySelector('.LdsAccordionItem-module_lds-accordion-item--content__ns-Tz');
                        if (content) content.style.display = 'none';
                        replaceFaqTitles();
                        replaceFaqAnswers();
                        setTimeout(() => { if (content) content.style.display = ''; }, 10);
                    }
                }
            });
        });
        observer.observe(document.body, { attributes: true, subtree: true, attributeFilter: ['open'] });
    }

    function watchFaqPermanently() {
        const observer = new MutationObserver(() => {
            replaceFaqTitles();
            replaceFaqAnswers();
        });
        observer.observe(document.body, { childList: true, subtree: true, characterData: true });
    }

    function observeModalInstant() {
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mut => {
                if (mut.addedNodes.length) {
                    mut.addedNodes.forEach(node => {
                        if (node.nodeType === 1) {
                            if (node.matches && node.matches('.LdsDialog-module_lds-dialog-container__Br8cE')) modifyLoginDialog();
                            else if (node.querySelector && node.querySelector('.LdsDialog-module_lds-dialog-container__Br8cE')) modifyLoginDialog();
                        }
                    });
                }
            });
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }

    function replacePortalText(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            node.nodeValue = node.nodeValue.replace(/Portal do Lojista/gi, 'Universal Auto');
        } else {
            node.childNodes.forEach(replacePortalText);
        }
    }

    // ============================================================
    // LISTAGEM DE VEÍCULOS
    // ============================================================
    function applyListagem() {
        if (!dadosCarregados) return;
        document.querySelectorAll('[class*="VehicleCard"]').forEach(card => {
            if (card.hasAttribute('data-ua-listado')) return;
            const link = card.querySelector('a[href*="/carro/"]');
            if (!link) return;
            const match = link.href.match(/-(\d+)$/);
            if (!match) return;
            const id = parseInt(match[1]);
            const veiculo = todosVeiculos.find(v => v.id === id);
            if (!veiculo) return;
            card.setAttribute('data-ua-listado', 'true');

            if (precoPorId.has(id)) {
                const precoElem = card.querySelector('[class*="blurred"]');
                if (precoElem) {
                    precoElem.innerText = 'R$ ' + precoPorId.get(id).toLocaleString('pt-BR');
                    precoElem.style.filter = 'none';
                }
            }

            const features = veiculo.features || [];
            let badgeContainer = card.querySelector('.VehicleCard_badgePosition__C2OEq');
            if (!badgeContainer) {
                const imgContainer = card.querySelector('.VehicleCard_imageContainer__GNlHd');
                if (imgContainer) {
                    badgeContainer = document.createElement('div');
                    badgeContainer.className = 'VehicleCard_badgePosition__C2OEq';
                    imgContainer.appendChild(badgeContainer);
                }
            }
            if (badgeContainer && features.length && !badgeContainer.hasAttribute('data-ua-badge')) {
                badgeContainer.setAttribute('data-ua-badge', 'true');
                badgeContainer.innerHTML = '';
                features.forEach(feat => {
                    if (feat.description === 'Acabou de chegar') {
                        badgeContainer.innerHTML += '<div class="Badge_container__eLOMO" style="background:#FFE5E5;color:#D32F2F;"><svg width="14" height="14" viewBox="0 0 14 14"><path d="M7 7.00004C8.16667 5.27337 7 2.91671 6.41667 2.33337C6.41667 4.10554 5.38242 5.09896 4.66667 5.83337C3.9515 6.56837 3.5 7.72337 3.5 8.75004C3.5 9.6783 3.86875 10.5685 4.52513 11.2249C5.1815 11.8813 6.07174 12.25 7 12.25C7.92826 12.25 8.8185 11.8813 9.47487 11.2249C10.1313 10.5685 10.5 9.6783 10.5 8.75004C10.5 7.85637 9.884 6.45171 9.33333 5.83337C8.2915 7.58337 7.70525 7.58337 7 7.00004Z" fill="currentColor"/></svg>Acabou de chegar</div>';
                    } else if (feat.description === 'Garantia de Fábrica') {
                        badgeContainer.innerHTML += '<div class="Badge_container__eLOMO" style="background:#E3F2FD;color:#1565C0;"><svg width="14" height="14" viewBox="0 0 24 24"><path d="M12.24 2.004L12 2L11.76 2.004C9.94609 2.06623 8.22726 2.83056 6.96607 4.13577C5.70489 5.44098 4.99997 7.18502 5 9L5.006 9.292L5.03 9.657L5.069 9.98L5.089 10.119L5.138 10.39L5.198 10.661C5.22606 10.7764 5.25707 10.8911 5.291 11.005L5.386 11.299L5.466 11.516L5.518 11.649L5.648 11.946C6.2088 13.1545 7.10276 14.1779 8.22492 14.896C9.34708 15.614 10.6508 15.9971 11.9831 16C13.3153 16.0029 14.6208 15.6257 15.7461 14.9125C16.8714 14.1994 17.7699 13.18 18.336 11.974L18.489 11.626L18.605 11.318C18.7501 10.9062 18.8562 10.4816 18.922 10.05L18.946 9.872L18.972 9.63L18.99 9.385L18.997 9.193L19 9C19 7.18502 18.2951 5.44098 17.0339 4.13577C15.7727 2.83056 14.0539 2.06623 12.24 2.004Z" fill="currentColor"/><path d="M11.43 17.9821L9.46398 21.3901C9.38432 21.5281 9.27283 21.6452 9.1388 21.7315C9.00477 21.8177 8.85207 21.8708 8.6934 21.8861C8.53474 21.9015 8.3747 21.8787 8.22661 21.8197C8.07852 21.7608 7.94665 21.6673 7.84198 21.5471L7.76598 21.4471L7.70198 21.3331L6.39798 18.6981L3.46698 18.8881C3.30553 18.8984 3.14397 18.8695 2.99613 18.8038C2.8483 18.7381 2.71859 18.6375 2.61813 18.5107C2.51766 18.3839 2.44943 18.2346 2.41927 18.0757C2.38912 17.9167 2.39794 17.7528 2.44498 17.5981L2.48498 17.4911L2.53498 17.3911L4.50298 13.9821C5.27066 15.1382 6.29546 16.101 7.49718 16.7951C8.69891 17.4892 10.045 17.8948 11.43 17.9821Z" fill="currentColor"/><path d="M19.4959 13.983L21.4619 17.389C21.5428 17.5293 21.5885 17.687 21.595 17.8488C21.6016 18.0106 21.5688 18.1715 21.4995 18.3178C21.4301 18.4641 21.3264 18.5915 21.197 18.6889C21.0677 18.7862 20.9167 18.8508 20.7569 18.877L20.6439 18.888L20.5319 18.887L17.5989 18.697L16.2959 21.333C16.2252 21.4758 16.1214 21.5996 15.9932 21.6941C15.865 21.7887 15.7161 21.8513 15.5588 21.8767C15.4015 21.9021 15.2405 21.8896 15.089 21.8403C14.9375 21.791 14.8 21.7062 14.6879 21.593L14.6059 21.499L14.5339 21.389L12.5659 17.982C13.9513 17.8954 15.2978 17.4894 16.5001 16.7956C17.7024 16.1018 18.7277 15.1392 19.4959 13.983Z" fill="currentColor"/></svg>Garantia de fábrica</div>';
                    }
                });
            }

            const report = veiculo.inspectionReport || {};
            const hasPdf = report.pdfUrl && report.pdfUrl.trim() !== "";
            const hasVideo = report.videoUrl && report.videoUrl.trim() !== "";
            let btnContainer = card.querySelector('.VehicleCard_badgeContainer__v1N5b');
            if (btnContainer && btnContainer.hasAttribute('data-ua-report')) return;
            if (btnContainer) btnContainer.remove();
            if (hasPdf || hasVideo) {
                const newContainer = document.createElement('div');
                newContainer.className = 'VehicleCard_badgeContainer__v1N5b';
                newContainer.setAttribute('data-ua-report', 'true');
                newContainer.style.cssText = 'display:flex;gap:4px;margin-top:4px;';
                if (hasPdf) {
                    const pdfBtn = document.createElement('button');
                    pdfBtn.className = 'base-Button-root LdsButton-module_lds-button--contained-primary__6r3Mk';
                    pdfBtn.innerHTML = '<span><svg width="16" height="16" viewBox="0 0 24 24"><path d="M7 2.1c-.77 0-1.5.3-2.05.85-.54.54-.85 1.28-.85 2.05v14c0 .77.31 1.5.85 2.05.54.54 1.28.85 2.05.85h10c.77 0 1.5-.31 2.05-.85.54-.55.85-1.28.85-2.05v-10.1h-4.9c-.5 0-.99-.2-1.34-.56-.36-.35-.56-.84-.56-1.34v-4.9zm8.64 11.54-4 4c-.35.35-.92.35-1.27 0l-2-2c-.35-.35-.35-.92 0-1.27s.92-.35 1.27 0l1.36 1.36 3.36-3.36c.35-.35.92-.35 1.27 0s.35.92 0 1.27z"/><path d="M14.9 2.63 19.37 7.1h-4.37c-.03 0-.05-.01-.07-.03-.02-.02-.03-.04-.03-.07z"/></svg> Laudo</span>';
                    pdfBtn.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); showPdfModal(report.pdfUrl); });
                    newContainer.appendChild(pdfBtn);
                }
                if (hasVideo) {
                    const videoBtn = document.createElement('button');
                    videoBtn.className = 'base-Button-root LdsButton-module_lds-button--contained-primary__6r3Mk';
                    videoBtn.innerHTML = '<span><svg width="16" height="16" viewBox="0 0 24 24"><path d="M6.56 3.21c.28-.16.63-.15.91.02l13 8c.27.16.43.46.43.77s-.16.61-.43.77l-13 8c-.28.17-.63.18-.91.02-.28-.16-.46-.46-.46-.77V4c0-.31.18-.61.46-.77z"/></svg> Vídeo</span>';
                    videoBtn.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); showVideoModal(report.videoUrl); });
                    newContainer.appendChild(videoBtn);
                }
                card.appendChild(newContainer);
            }

            const fipe = veiculo.fipe || {};
            if (fipe.marginPercentage && fipe.marginPercentage > 0) {
                const footer = card.querySelector('.VehicleCard_footer___2ZiN');
                if (footer) {
                    let priceDiv = footer.querySelector('.Price_priceContainer__UFleO');
                    if (!priceDiv) {
                        const candidate = footer.querySelector('div > div > h2, div > div > h3');
                        if (candidate && candidate.closest('div')) priceDiv = candidate.closest('div');
                    }
                    if (priceDiv && !priceDiv.querySelector('.Price_fipeContainer__t6NfV')) {
                        const percent = fipe.marginPercentage.toFixed(2).replace('.', ',');
                        const fipeHtml = document.createElement('div');
                        fipeHtml.className = 'Price_fipeContainer__t6NfV';
                        fipeHtml.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24"><path d="m12.9 5c0-.5-.4-.9-.9-.9s-.9.4-.9.9v11.83l-4.46-4.46c-.35-.35-.92-.35-1.27 0s-.35.92 0 1.27l6 6c.17.17.4.27.63.27s.47-.1.64-.27l6-6c.35-.35.35-.92 0-1.27s-.92-.35-1.27 0l-4.46 4.46z"/></svg> ${percent}% FIPE`;
                        priceDiv.appendChild(fipeHtml);
                    }
                }
            }

            const buttons = card.querySelectorAll('button');
            for (let btn of buttons) {
                if (btn.innerText.includes('Ver mais informações')) {
                    if (!btn.classList.contains('botao-personalizado')) {
                        btn.innerText = 'Tenho interesse';
                        btn.classList.add('botao-personalizado');
                        btn.classList.remove('LdsButton-module_lds-button--outlined-primary__ZxRfx');
                        btn.classList.add('LdsButton-module_lds-button--contained-primary__6r3Mk');
                        const newBtn = btn.cloneNode(true);
                        btn.parentNode.replaceChild(newBtn, btn);
                        newBtn.addEventListener('click', (e) => {
                            e.preventDefault();
                            window.location.href = link.href;
                        });
                    }
                    break;
                }
            }
        });
    }

    // ============================================================
    // SIDEBAR (página de detalhes)
    // ============================================================
    function applySidebar(carroData) {
        if (!carroData) return;
        const rightSidebar = document.querySelector('.DesktopPage_rightSide__uZfet');
        if (!rightSidebar) return;
        const container = rightSidebar.querySelector('.DesktopPage_container__eiImn');
        if (!container || container.hasAttribute('data-ua-sidebar')) return;
        container.setAttribute('data-ua-sidebar', 'true');
        const preco = carroData.priceFor + ACRESCIMO;
        const precoFormatado = preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        const nomeLoja = carroData.store?.name || 'Loja não informada';
        const cidade = carroData.store?.city && carroData.store?.state ? `${carroData.store.city} - ${carroData.store.state}` : 'Santo André - SP';
        const km = carroData.odometer.toLocaleString('pt-BR');
        const features = carroData.features || [];
        let badgesHtml = '';
        features.forEach(f => {
            if (f.description === 'Acabou de chegar') badgesHtml += '<div class="Badge_container__eLOMO" style="background:#FFE5E5;color:#D32F2F;display:inline-block;margin-right:8px;"><svg width="14" height="14" viewBox="0 0 14 14"><path d="M7 7.00004C8.16667 5.27337 7 2.91671 6.41667 2.33337C6.41667 4.10554 5.38242 5.09896 4.66667 5.83337C3.9515 6.56837 3.5 7.72337 3.5 8.75004C3.5 9.6783 3.86875 10.5685 4.52513 11.2249C5.1815 11.8813 6.07174 12.25 7 12.25C7.92826 12.25 8.8185 11.8813 9.47487 11.2249C10.1313 10.5685 10.5 9.6783 10.5 8.75004C10.5 7.85637 9.884 6.45171 9.33333 5.83337C8.2915 7.58337 7.70525 7.58337 7 7.00004Z" fill="currentColor"/></svg>Acabou de chegar</div>';
            else if (f.description === 'Garantia de Fábrica') badgesHtml += '<div class="Badge_container__eLOMO" style="background:#E3F2FD;color:#1565C0;display:inline-block;margin-right:8px;"><svg width="14" height="14" viewBox="0 0 24 24"><path d="M12.24 2.004L12 2L11.76 2.004C9.94609 2.06623 8.22726 2.83056 6.96607 4.13577C5.70489 5.44098 4.99997 7.18502 5 9L5.006 9.292L5.03 9.657L5.069 9.98L5.089 10.119L5.138 10.39L5.198 10.661C5.22606 10.7764 5.25707 10.8911 5.291 11.005L5.386 11.299L5.466 11.516L5.518 11.649L5.648 11.946C6.2088 13.1545 7.10276 14.1779 8.22492 14.896C9.34708 15.614 10.6508 15.9971 11.9831 16C13.3153 16.0029 14.6208 15.6257 15.7461 14.9125C16.8714 14.1994 17.7699 13.18 18.336 11.974L18.489 11.626L18.605 11.318C18.7501 10.9062 18.8562 10.4816 18.922 10.05L18.946 9.872L18.972 9.63L18.99 9.385L18.997 9.193L19 9C19 7.18502 18.2951 5.44098 17.0339 4.13577C15.7727 2.83056 14.0539 2.06623 12.24 2.004Z" fill="currentColor"/><path d="M11.43 17.9821L9.46398 21.3901C9.38432 21.5281 9.27283 21.6452 9.1388 21.7315C9.00477 21.8177 8.85207 21.8708 8.6934 21.8861C8.53474 21.9015 8.3747 21.8787 8.22661 21.8197C8.07852 21.7608 7.94665 21.6673 7.84198 21.5471L7.76598 21.4471L7.70198 21.3331L6.39798 18.6981L3.46698 18.8881C3.30553 18.8984 3.14397 18.8695 2.99613 18.8038C2.8483 18.7381 2.71859 18.6375 2.61813 18.5107C2.51766 18.3839 2.44943 18.2346 2.41927 18.0757C2.38912 17.9167 2.39794 17.7528 2.44498 17.5981L2.48498 17.4911L2.53498 17.3911L4.50298 13.9821C5.27066 15.1382 6.29546 16.101 7.49718 16.7951C8.69891 17.4892 10.045 17.8948 11.43 17.9821Z" fill="currentColor"/><path d="M19.4959 13.983L21.4619 17.389C21.5428 17.5293 21.5885 17.687 21.595 17.8488C21.6016 18.0106 21.5688 18.1715 21.4995 18.3178C21.4301 18.4641 21.3264 18.5915 21.197 18.6889C21.0677 18.7862 20.9167 18.8508 20.7569 18.877L20.6439 18.888L20.5319 18.887L17.5989 18.697L16.2959 21.333C16.2252 21.4758 16.1214 21.5996 15.9932 21.6941C15.865 21.7887 15.7161 21.8513 15.5588 21.8767C15.4015 21.9021 15.2405 21.8896 15.089 21.8403C14.9375 21.791 14.8 21.7062 14.6879 21.593L14.6059 21.499L14.5339 21.389L12.5659 17.982C13.9513 17.8954 15.2978 17.4894 16.5001 16.7956C17.7024 16.1018 18.7277 15.1392 19.4959 13.983Z" fill="currentColor"/></svg>Garantia de fábrica</div>';
        });
        const report = carroData.inspectionReport || {};
        const hasPdf = !!report.pdfUrl;
        const hasVideo = !!report.videoUrl;
        let reportsHtml = '';
        if (hasPdf) reportsHtml += `<button type="button" class="base-Button-root LdsButton-module_lds-button--contained-primary__6r3Mk report-pdf-btn" style="margin-right:8px;"><span><svg width="16" height="16" viewBox="0 0 24 24"><path d="M7 2.1c-.77 0-1.5.3-2.05.85-.54.54-.85 1.28-.85 2.05v14c0 .77.31 1.5.85 2.05.54.54 1.28.85 2.05.85h10c.77 0 1.5-.31 2.05-.85.54-.55.85-1.28.85-2.05v-10.1h-4.9c-.5 0-.99-.2-1.34-.56-.36-.35-.56-.84-.56-1.34v-4.9zm8.64 11.54-4 4c-.35.35-.92.35-1.27 0l-2-2c-.35-.35-.35-.92 0-1.27s.92-.35 1.27 0l1.36 1.36 3.36-3.36c.35-.35.92-.35 1.27 0s.35.92 0 1.27z"/><path d="M14.9 2.63 19.37 7.1h-4.37c-.03 0-.05-.01-.07-.03-.02-.02-.03-.04-.03-.07z"/></svg> Laudo</span></button>`;
        if (hasVideo) reportsHtml += `<button type="button" class="base-Button-root LdsButton-module_lds-button--contained-primary__6r3Mk report-video-btn"><span><svg width="16" height="16" viewBox="0 0 24 24"><path d="M6.56 3.21c.28-.16.63-.15.91.02l13 8c.27.16.43.46.43.77s-.16.61-.43.77l-13 8c-.28.17-.63.18-.91.02-.28-.16-.46-.46-.46-.77V4c0-.31.18-.61.46-.77z"/></svg> Vídeo</span></button>`;
        const fipe = carroData.fipe || {};
        let fipePercentHtml = '';
        if (fipe.marginPercentage) {
            const percent = fipe.marginPercentage.toFixed(2).replace('.', ',');
            const direction = fipe.marginPercentage > 0 ? 'abaixo' : 'acima';
            fipePercentHtml = `<div class="Price_fipeContainer__t6NfV"><svg width="16" height="16" viewBox="0 0 24 24"><path d="m12.9 5c0-.5-.4-.9-.9-.9s-.9.4-.9.9v11.83l-4.46-4.46c-.35-.35-.92-.35-1.27 0s-.35.92 0 1.27l6 6c.17.17.4.27.63.27s.47-.1.64-.27l6-6c.35-.35.35-.92 0-1.27s-.92-.35-1.27 0l-4.46 4.46z"/></svg> ${percent}% ${direction} FIPE</div>`;
        }
        const fipePrice = fipe.price ? fipe.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : 'N/A';
        const fipeDistance = fipe.marginValue ? fipe.marginValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : 'N/A';
        const fipeMargin = fipe.marginPercentage ? fipe.marginPercentage.toFixed(2).replace('.', ',') + '%' : 'N/A';
        const finalHtml = `
            <div class="VehicleTitle_container__mDy6V">
                <div class="VehicleTitle_header__bZBhS">
                    <h4 class="VehicleTitle_version__d4gVg">${carroData.brand}</h4>
                </div>
                <h2 class="VehicleTitle_model__Ec3VK"><strong>${carroData.modelFamilyDescription}</strong> ${carroData.model}</h2>
                <p>${carroData.manufactureYear}/${carroData.modelYear} &nbsp;&nbsp; ${km} km</p>
                ${badgesHtml ? `<div style="margin-top:8px;">${badgesHtml}</div>` : ''}
            </div>
            <div class="VehicleReports_container__qAkuy">${reportsHtml}</div>
            <div style="height:1px;background:#e0e0e0;margin:12px 0;"></div>
            <div class="VehicleLocation_container__m8i4B">
                <svg width="20" height="20" viewBox="0 0 24 24"><path d="m5 2.1c-.34 0-.65.19-.8.5l-2 4c-.06.12-.1.26-.1.4v1c0 1.03.41 2.03 1.14 2.76.26.26.55.47.86.65v8.69h-1.1c-.5 0-.9.4-.9.9s.4.9.9.9h18c.5 0 .9-.4.9-.9s-.4-.9-.9-.9h-1.1v-8.69c.31-.18.6-.4.86-.65.73-.73 1.14-1.73 1.14-2.76v-1c0-.14-.03-.28-.1-.4l-2-4c-.15-.31-.46-.5-.8-.5zm.9 18v-8.2c.03 0 .07 0 .1 0 1.03 0 2.03-.41 2.76-1.14.08-.09.16-.18.24-.27.08.09.16.18.24.27.73.73 1.73 1.14 2.76 1.14s2.03-.41 2.76-1.14c.08-.09.16-.18.24-.27.08.09.16.18.24.27.73.73 1.73 1.14 2.76 1.14.03 0 .07 0 .1-.01v8.2h-2.2v-3.1c0-.77-.3-1.5-.85-2.05-.54-.54-1.28-.85-2.05-.85h-2c-.77 0-1.5.31-2.05.85-.54.54-.85 1.28-.85 2.05v3.1zm4.62-10.62c-.4-.39-.62-.93-.62-1.48v-.1h4.2v.1c0 .56-.22 1.09-.62 1.48-.39.4-.93.62-1.48.62s-1.09-.22-1.48-.62zm-2.42-1.48c0 .56-.22 1.09-.62 1.48-.39.4-.93.62-1.48.62-.56 0-1.09-.22-1.49-.62-.39-.39-.61-.93-.61-1.48v-.1h4.2zm-3.64-1.9 1.1-2.2h12.89l1.1 2.2zm11.44 1.8h4.2v.1c0 .56-.22 1.09-.62 1.48-.39.4-.93.62-1.48.62s-1.09-.22-1.49-.62c-.39-.39-.61-.93-.61-1.48zm-4.9 8h2c.29 0 .57.12.78.32.2.21.32.49.32.78v3.1h-4.2v-3.1c0-.29.12-.57.32-.78.21-.2.49-.32.78-.32z" fill="currentColor"/></svg>
                <p>${nomeLoja}<br><span class="VehicleLocation_opacity__7fAgZ">${cidade}</span></p>
            </div>
            <div style="height:1px;background:#e0e0e0;margin:12px 0;"></div>
            <div class="VehiclePrice_container__myGEh">
                <div class="Price_priceContainer__UFleO">
                    <div><h2>${precoFormatado}</h2></div>
                    ${fipePercentHtml}
                </div>
            </div>
            <div class="whatsapp-button-wrapper" style="margin-bottom:24px;">
                <button type="button" class="whatsapp-button-custom"><span style="font-size:24px; margin-right:8px;">💬</span><span>WhatsApp</span></button>
            </div>
            <div class="VehicleFipeComparison_container__lUmIU LdsPaper-module_lds-paper__Jhi1y">
                <div><p>Compare os preços</p></div>
                <div class="VehicleFipeComparison_pricesRow__HkQOh">
                    <p>Preço FIPE</p>
                    <p>${fipePrice}</p>
                </div>
                <div style="height:1px;background:#e0e0e0;"></div>
                <div class="VehicleFipeComparison_valueRow__s31Bd">
                    <div><small>Distancia FIPE</small><h3>${fipeDistance}</h3></div>
                    <div><small>Margem FIPE</small><h3><svg width="20" height="20" viewBox="0 0 24 24"><path d="m12.9 5c0-.5-.4-.9-.9-.9s-.9.4-.9.9v11.83l-4.46-4.46c-.35-.35-.92-.35-1.27 0s-.35.92 0 1.27l6 6c.17.17.4.27.63.27s.47-.1.64-.27l6-6c.35-.35.35-.92 0-1.27s-.92-.35-1.27 0l-4.46 4.46z"/></svg>${fipeMargin}</h3></div>
                </div>
            </div>
        `;
        container.innerHTML = finalHtml;
        if (hasPdf) container.querySelector('.report-pdf-btn')?.addEventListener('click', () => showPdfModal(report.pdfUrl));
        if (hasVideo) container.querySelector('.report-video-btn')?.addEventListener('click', () => showVideoModal(report.videoUrl));
    }

    // ============================================================
    // MOBILE DETAILS
    // ============================================================
    function applyMobileDetailPage(carroData) {
        if (!carroData) return;
        const report = carroData.inspectionReport || {};
        const hasPdf = !!report.pdfUrl;
        const hasVideo = !!report.videoUrl;
        const fipe = carroData.fipe || {};
        const features = carroData.features || [];
        document.querySelectorAll('.VehicleTitle_container__mDy6V').forEach(tc => {
            if (tc.hasAttribute('data-ua-mobile-badge') || tc.closest('.DesktopPage_rightSide__uZfet')) return;
            tc.setAttribute('data-ua-mobile-badge', 'true');
            if (features.length) {
                const badgesDiv = document.createElement('div');
                badgesDiv.style.marginTop = '8px';
                features.forEach(f => {
                    if (f.description === 'Acabou de chegar') badgesDiv.innerHTML += '<div class="Badge_container__eLOMO" style="background:#FFE5E5;color:#D32F2F;display:inline-block;margin-right:8px;"><svg width="14" height="14" viewBox="0 0 14 14"><path d="M7 7.00004C8.16667 5.27337 7 2.91671 6.41667 2.33337C6.41667 4.10554 5.38242 5.09896 4.66667 5.83337C3.9515 6.56837 3.5 7.72337 3.5 8.75004C3.5 9.6783 3.86875 10.5685 4.52513 11.2249C5.1815 11.8813 6.07174 12.25 7 12.25C7.92826 12.25 8.8185 11.8813 9.47487 11.2249C10.1313 10.5685 10.5 9.6783 10.5 8.75004C10.5 7.85637 9.884 6.45171 9.33333 5.83337C8.2915 7.58337 7.70525 7.58337 7 7.00004Z" fill="currentColor"/></svg>Acabou de chegar</div>';
                    else if (f.description === 'Garantia de Fábrica') badgesDiv.innerHTML += '<div class="Badge_container__eLOMO" style="background:#E3F2FD;color:#1565C0;display:inline-block;margin-right:8px;">Garantia de fábrica</div>';
                });
                tc.appendChild(badgesDiv);
            }
            if ((hasPdf || hasVideo) && !tc.nextElementSibling?.hasAttribute('data-ua-mobile-reports')) {
                const mobileReports = document.createElement('div');
                mobileReports.setAttribute('data-ua-mobile-reports', 'true');
                mobileReports.style.cssText = 'display:flex;gap:8px;padding:8px 0;';
                if (hasPdf) {
                    const pdfBtn = document.createElement('button');
                    pdfBtn.className = 'base-Button-root LdsButton-module_lds-button--contained-primary__6r3Mk';
                    pdfBtn.innerHTML = '<span><svg width="16" height="16" viewBox="0 0 24 24"><path d="M7 2.1c-.77 0-1.5.3-2.05.85-.54.54-.85 1.28-.85 2.05v14c0 .77.31 1.5.85 2.05.54.54 1.28.85 2.05.85h10c.77 0 1.5-.31 2.05-.85.54-.55.85-1.28.85-2.05v-10.1h-4.9c-.5 0-.99-.2-1.34-.56-.36-.35-.56-.84-.56-1.34v-4.9zm8.64 11.54-4 4c-.35.35-.92.35-1.27 0l-2-2c-.35-.35-.35-.92 0-1.27s.92-.35 1.27 0l1.36 1.36 3.36-3.36c.35-.35.92-.35 1.27 0s.35.92 0 1.27z"/><path d="M14.9 2.63 19.37 7.1h-4.37c-.03 0-.05-.01-.07-.03-.02-.02-.03-.04-.03-.07z"/></svg> Laudo</span>';
                    pdfBtn.addEventListener('click', () => showPdfModal(report.pdfUrl));
                    mobileReports.appendChild(pdfBtn);
                }
                if (hasVideo) {
                    const videoBtn = document.createElement('button');
                    videoBtn.className = 'base-Button-root LdsButton-module_lds-button--contained-primary__6r3Mk';
                    videoBtn.innerHTML = '<span><svg width="16" height="16" viewBox="0 0 24 24"><path d="M6.56 3.21c.28-.16.63-.15.91.02l13 8c.27.16.43.46.43.77s-.16.61-.43.77l-13 8c-.28.17-.63.18-.91.02-.28-.16-.46-.46-.46-.77V4c0-.31.18-.61.46-.77z"/></svg> Vídeo</span>';
                    videoBtn.addEventListener('click', () => showVideoModal(report.videoUrl));
                    mobileReports.appendChild(videoBtn);
                }
                tc.parentNode.insertBefore(mobileReports, tc.nextSibling);
            }
        });
        if (!fipe.price) return;
        const fipePrice = fipe.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        const fipeDistance = fipe.marginValue ? fipe.marginValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : 'N/A';
        const fipeMargin = fipe.marginPercentage ? fipe.marginPercentage.toFixed(2).replace('.', ',') + '%' : 'N/A';
        document.querySelectorAll('.MobilePage_contentInterest__dY5dv').forEach(div => {
            if (div.hasAttribute('data-ua-fipe-mobile')) return;
            div.setAttribute('data-ua-fipe-mobile', 'true');
            const tableEl = document.createElement('div');
            tableEl.className = 'VehicleFipeComparison_container__lUmIU LdsPaper-module_lds-paper__Jhi1y';
            tableEl.innerHTML = `
                <div><p>Compare os preços</p></div>
                <div class="VehicleFipeComparison_pricesRow__HkQOh">
                    <p>Preço FIPE</p>
                    <p>${fipePrice}</p>
                </div>
                <div style="height:1px;background:#e0e0e0;"></div>
                <div class="VehicleFipeComparison_valueRow__s31Bd">
                    <div><small>Distancia FIPE</small><h3>${fipeDistance}</h3></div>
                    <div><small>Margem FIPE</small><h3><svg width="20" height="20" viewBox="0 0 24 24"><path d="m12.9 5c0-.5-.4-.9-.9-.9s-.9.4-.9.9v11.83l-4.46-4.46c-.35-.35-.92-.35-1.27 0s-.35.92 0 1.27l6 6c.17.17.4.27.63.27s.47-.1.64-.27l6-6c.35-.35.35-.92 0-1.27s-.92-.35-1.27 0l-4.46 4.46z"/></svg>${fipeMargin}</h3></div>
                </div>
            `;
            div.appendChild(tableEl);
        });
    }

    // ============================================================
    // HEADER, FOOTER, TEXT REPLACEMENTS, LOGO, ETC.
    // ============================================================
    function applyHeaderButtons() {
        document.querySelectorAll('button').forEach(btn => {
            if (btn.innerText === 'Cadastrar' && !btn.closest('.VehiclesFilters_buttonsContainer__lY4oa')) btn.remove();
        });
        const entrarHeader = Array.from(document.querySelectorAll('button')).find(b => b.innerText === 'Entrar' && !b.closest('.VehiclesFilters_buttonsContainer__lY4oa'));
        if (entrarHeader && entrarHeader.innerText !== 'Nossos Carros') {
            entrarHeader.innerText = 'Nossos Carros';
            entrarHeader.style.borderColor = '#0055a4';
            entrarHeader.style.color = '#0055a4';
            entrarHeader.addEventListener('click', (e) => { e.preventDefault(); window.location.href = 'https://universalauto.xyz/carros'; });
        }
        const filterCadastrar = document.querySelector('.VehiclesFilters_buttonsContainer__lY4oa button.LdsButton-module_lds-button--contained-primary__6r3Mk');
        if (filterCadastrar && filterCadastrar.innerText === 'Cadastrar') filterCadastrar.remove();
        const filterEntrar = document.querySelector('.VehiclesFilters_buttonsContainer__lY4oa button.LdsButton-module_lds-button--outlined-primary__ZxRfx');
        if (filterEntrar && filterEntrar.innerText === 'Entrar' && filterEntrar.innerText !== 'Fale conosco / Contato') {
            filterEntrar.innerText = 'Fale conosco / Contato';
            filterEntrar.style.borderColor = '#0055a4';
            filterEntrar.style.color = '#0055a4';
            filterEntrar.addEventListener('click', (e) => { e.preventDefault(); window.location.href = 'mailto:contato@universalautorepasse.com.br'; });
        }
    }

    function applyFooter() {
        document.querySelectorAll('a[href="https://www.localiza.com/"], a[href="https://zarp.localiza.com/"]').forEach(link => {
            const parent = link.closest('.Footer_product__RLAJk');
            if (parent) parent.remove();
        });
        document.querySelectorAll('.Footer_product__RLAJk').forEach(div => {
            if (div.innerText.trim() === '' && div.children.length === 0) div.remove();
        });
        const meoo = document.querySelector('a[href="https://meoo.localiza.com"]')?.closest('.Footer_product__RLAJk');
        if (meoo && !meoo.querySelector('img[alt="Instagram"]')) {
            meoo.innerHTML = '<a href="https://www.instagram.com/universalautorepasse_/" target="_blank" style="display:flex;align-items:center;gap:8px;text-decoration:none;"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/960px-Instagram_logo_2016.svg.png" alt="Instagram" style="height:24px;width:24px;"><div><span style="font-size:16px;font-weight:700;background:linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">Instagram</span><p style="margin:0;color:#888;font-size:11px;">Redes Sociais</p></div></a>';
        }
        const frotas = document.querySelector('a[href="https://frotas.localiza.com/"]')?.closest('.Footer_product__RLAJk');
        if (frotas && !frotas.querySelector('img[alt="Universal Auto Repasse"]')) {
            frotas.innerHTML = '<a href="https://universalautorepasse.com.br/" target="_blank" style="display:flex;align-items:center;gap:8px;"><img src="https://raw.githubusercontent.com/SiteHosterBabe/universalauto/refs/heads/main/logouniversall.png" alt="Universal Auto Repasse" style="height:24px;"><div><span style="font-size:16px;font-weight:700;color:#1A3C6E;">Universal</span><p style="margin:0;color:#888;font-size:11px;">Gestão de frotas</p></div></a>';
        }
    }

    function applyTextReplacements() {
        const replacements = [
            ['Av. Bernardo Vasconcelos, 377, Cachoeirinha 31150-000 - Belo Horizonte/MG', 'Av. Pereira Barreto, 42\nVila Gilda, Santo André – SP'],
            ['CNPJ nº 16.670.085/0001-55', 'CEP: 09190-210'],
            ['LOCALIZA Rent a Car S/A', 'UNIVERSAL Auto Repasse S/A'],
            ['© Localiza - Todos os direitos reservados.', '© Universal - Todos os direitos reservados.']
        ];
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        const nodes = [];
        while (walker.nextNode()) nodes.push(walker.currentNode);
        for (let node of nodes) {
            let text = node.nodeValue;
            let changed = false;
            for (let [oldText, newText] of replacements) {
                if (text.includes(oldText)) {
                    text = text.replace(new RegExp(oldText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newText);
                    changed = true;
                }
            }
            if (changed) node.nodeValue = text;
        }
    }

    function applyLogo() {
        document.querySelectorAll('.DisplayContent_displayContent__I14hU.DisplayContent_hideMobile__K13cl.DisplayContent_hideTablet__ISpUr.DisplayContent_hideLargeTablet__jiADA').forEach(div => {
            const svgEl = div.querySelector('svg');
            if (svgEl && svgEl.getAttribute('viewBox') === '0 0 149 39' && div.innerHTML.includes('#FF8026') && !div.querySelector('img')) {
                div.innerHTML = `<div style="display:flex;align-items:center;gap:8px;"><img src="${UA_LOGO_URL}" alt="Universal Repasses" style="height:39px;"><div><span style="font-size:10px;color:#1565C0;font-weight:600;">Repasses</span><br><span style="font-size:17px;color:#0D3B8C;font-weight:800;">Universal Auto</span></div></div>`;
            }
        });
        replaceLocalizaSVGInstances();
        replaceLocalizaNavbarLogo();
    }

    function applyCarouselDots() {
        const activeDot = document.querySelector('.Carousel_circle__nA3ia.Carousel_active__Hg2HB');
        if (activeDot) { activeDot.style.backgroundColor = '#0055a4'; activeDot.style.borderColor = '#0055a4'; }
    }

    function injectGlobalCSS() {
        if (document.getElementById('ua-styles')) return;
        const style = document.createElement('style');
        style.id = 'ua-styles';
        style.textContent = `
            .VehicleTitle_version__d4gVg{color:#0055a4!important;}
            .VehicleLocation_container__m8i4B svg{color:#0055a4!important;}
            .whatsapp-button-custom{display:flex;align-items:center;justify-content:center;width:100%;background:#25D366;border:none;border-radius:8px;padding:12px;font-size:18px;font-weight:bold;color:white;cursor:pointer;animation:pulse 1.5s infinite;}
            @keyframes pulse{0%{transform:scale(1);box-shadow:0 0 0 0 rgba(37,211,102,0.7);}70%{transform:scale(1.03);box-shadow:0 0 0 10px rgba(37,211,102,0);}100%{transform:scale(1);box-shadow:0 0 0 0 rgba(37,211,102,0);}}
            .botao-personalizado{background:#1e40af!important;color:#fff!important;}
            [class*="blurred"]{filter:none!important;opacity:1!important;}
        `;
        document.head.appendChild(style);
    }

    function applyMobileNavLogo() {
        document.querySelectorAll('.DisplayContent_displayContent__I14hU.DisplayContent_hideDesktop__hlDJO').forEach(div => {
            const svgEl = div.querySelector('svg[viewBox="0 0 39 39"], svg[viewBox="0 0 32 32"]');
            if (!svgEl || div.querySelector('img[data-ua-mobile-logo]')) return;
            const parentLink = div.closest('a');
            if (parentLink) {
                parentLink.setAttribute('href', UA_REDIRECT);
                parentLink.setAttribute('title', 'Universal Auto');
                parentLink.removeAttribute('data-testid');
                parentLink.addEventListener('click', (e) => { e.preventDefault(); window.location.href = UA_REDIRECT; });
                const newDiv = parentLink.querySelector('.DisplayContent_hideDesktop__hlDJO');
                if (newDiv) newDiv.innerHTML = `<img data-ua-mobile-logo="1" src="${UA_LOGO_URL}" alt="Universal Auto" style="height:39px;">`;
            } else {
                div.innerHTML = `<img data-ua-mobile-logo="1" src="${UA_LOGO_URL}" alt="Universal Auto" style="height:39px;">`;
            }
        });
    }

    function applyMobileInterestSection() {
        const interestDivs = document.querySelectorAll('.MobilePage_contentInterest__dY5dv');
        if (!interestDivs.length) return;
        const carroId = parseInt((window.location.href.match(/-(\d+)/) || [])[1]);
        interestDivs.forEach(div => {
            if (div.querySelector('.whatsapp-button-custom')) return;
            let precoHtml = '';
            if (carroId && dadosCarregados && precoPorId.has(carroId)) {
                precoHtml = `<div style="text-align:center;margin-bottom:10px;font-size:26px;font-weight:800;color:#1e40af;">${precoPorId.get(carroId).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>`;
            }
            div.innerHTML = precoHtml + '<button type="button" class="whatsapp-button-custom"><span style="font-size:24px; margin-right:8px;">💬</span><span>WhatsApp</span></button>';
        });
    }

    function applyMobileHeroImage() {
        const mobileHero = document.querySelector('img.Hero_heroImageMobile__TXyFn');
        if (mobileHero && (mobileHero.src.includes('computer-mobile.webp') || mobileHero.src === '/home/computer-mobile.webp')) {
            mobileHero.src = 'https://raw.githubusercontent.com/SiteHosterBabe/universalauto/refs/heads/main/banerzaoinicial.png';
        }
    }

    function removeHamburgerMenu() {
        document.querySelector('button[aria-label="abrir menu"]')?.remove();
    }

    function removeEntrarFromFilterModal() {
        document.querySelectorAll('.VehiclesFilters_buttonsContainer__lY4oa').forEach(container => {
            container.querySelectorAll('button').forEach(btn => {
                if (btn.innerText === 'Entrar' || btn.innerText === 'Cadastrar') btn.remove();
            });
        });
    }

    function observeFilterModal() {
        const obs = new MutationObserver(mutations => {
            mutations.forEach(mut => {
                mut.addedNodes.forEach(node => {
                    if (node.nodeType === 1 && (node.classList?.contains('VehiclesFilters_buttonsContainer__lY4oa') || node.querySelector?.('.VehiclesFilters_buttonsContainer__lY4oa'))) {
                        const containers = node.classList?.contains('VehiclesFilters_buttonsContainer__lY4oa') ? [node] : Array.from(node.querySelectorAll('.VehiclesFilters_buttonsContainer__lY4oa'));
                        containers.forEach(c => c.style.visibility = 'hidden');
                        requestAnimationFrame(() => {
                            removeEntrarFromFilterModal();
                            containers.forEach(c => c.style.visibility = '');
                        });
                    }
                });
            });
        });
        obs.observe(document.body, { childList: true, subtree: true });
    }

    function updatePageTitle() { if (document.title !== 'Universal Auto') document.title = 'Universal Auto'; }
    function updateMetaDescription() {
        const newDesc = 'Com sede em Santo André, a Universal Auto atua no mercado automotivo oferecendo soluções de compra e venda de veículos com foco no custo-benefício. Nossa missão é facilitar o acesso a automóveis de qualidade através do modelo de repasse e comércio varejista, garantindo uma negociação ágil e segura para nossos clientes. Seja para uso pessoal ou revenda, temos o veículo ideal para o seu perfil.';
        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.setAttribute('name', 'description');
            document.head.appendChild(metaDesc);
        }
        if (metaDesc.getAttribute('content') !== newDesc) metaDesc.setAttribute('content', newDesc);
    }
    function updateFavicon() {
        let favicon = document.querySelector('link[rel="shortcut icon"], link[rel="icon"]');
        if (favicon) {
            if (favicon.href !== UA_LOGO_URL) favicon.href = UA_LOGO_URL;
        } else {
            favicon = document.createElement('link');
            favicon.rel = 'shortcut icon';
            favicon.href = UA_LOGO_URL;
            document.head.appendChild(favicon);
        }
    }

    function preventModalOnCardClick() {
        document.body.addEventListener('click', (e) => {
            const target = e.target.closest('a[href*="/carro/"]');
            if (target && target.target !== '_blank') {
                e.preventDefault();
                window.location.href = target.href;
            }
        }, true);
    }

    // ============================================================
    // FUNÇÃO PRINCIPAL DE MODIFICAÇÕES (agrupada)
    // ============================================================
    function runAllModifications() {
        if (isModifying) return;
        isModifying = true;
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
            modifyCadastroButton();
            replaceCadastroParagraph();
            replaceMainTitle();
            modifyVerMaisCarrosButton();
            modifyHowItWorksBackground();
            modifySeparatorsBackground();
            modifyHowItWorksCadastroButton();
            replaceHowItWorksTexts();
            modifyEquipeEspecializadaBackground();
            modifyFAQSection();
            modifyFaqCadastroButton();
            modifyLoginDialog();
            modifyContatoButton();
            modifyAccordionFaq();
            modifyHowItWorksTitle();
            applyMobileNavLogo();
            applyMobileHeroImage();
            applyMobileInterestSection();
            removeHamburgerMenu();
            removeEntrarFromFilterModal();
            updatePageTitle();
            updateMetaDescription();
            updateFavicon();
            const carroId = parseInt((window.location.href.match(/-(\d+)/) || [])[1]);
            if (carroId && todosVeiculos.length) {
                const carroData = todosVeiculos.find(c => c.id === carroId);
                if (carroData) {
                    applySidebar(carroData);
                    applyMobileDetailPage(carroData);
                }
            }
        } catch(e) { console.warn('[UA] Erro:', e); }
        isModifying = false;
    }

    // ============================================================
    // SCHEDULER (debounced)
    // ============================================================
    function scheduleModifications() {
        if (modificationTimeout) clearTimeout(modificationTimeout);
        modificationTimeout = setTimeout(() => runAllModifications(), 200);
    }

    // ============================================================
    // MUTATION OBSERVER (leve)
    // ============================================================
    function startMutationObserver() {
        if (globalObserver) globalObserver.disconnect();
        globalObserver = new MutationObserver(() => scheduleModifications());
        globalObserver.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
    }

    // ============================================================
    // INICIALIZAÇÃO
    // ============================================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initLoader();
            loadDataAsync();
            scheduleModifications();
            startMutationObserver();
            observeAccordionExpansion();
            watchFaqPermanently();
            observeModalInstant();
            observeFilterModal();
            preventModalOnCardClick();
            document.body.addEventListener('click', (e) => {
                const btn = e.target.closest('.whatsapp-button-custom');
                if (btn) {
                    e.preventDefault();
                    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_BASE_MESSAGE + ' ' + window.location.href)}`, '_blank');
                }
            });
        });
    } else {
        initLoader();
        loadDataAsync();
        scheduleModifications();
        startMutationObserver();
        observeAccordionExpansion();
        watchFaqPermanently();
        observeModalInstant();
        observeFilterModal();
        preventModalOnCardClick();
        document.body.addEventListener('click', (e) => {
            const btn = e.target.closest('.whatsapp-button-custom');
            if (btn) {
                e.preventDefault();
                window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_BASE_MESSAGE + ' ' + window.location.href)}`, '_blank');
            }
        });
    }
})();