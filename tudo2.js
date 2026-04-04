(async function universalAutoScript() {
    // ============================================================
    // CONFIGURAÇÕES GLOBAIS
    // ============================================================
    const WHATSAPP_NUMBER  = '5585999999999'; // ← Substitua
    const WHATSAPP_MESSAGE = 'Olá! Tenho interesse neste veículo.';
    const WHATSAPP_ICON_URL = 'https://confirent.pt/wp-content/uploads/2023/03/whatsapp-icone-2.png';
    const URL_JSON = 'https://raw.githubusercontent.com/SiteHosterBabe/universalauto/refs/heads/main/vinijunior.json';
    const ACRESCIMO = 3000;
    const LOADING_DURATION = 3000; // 3 segundos

    console.log('🚀 Universal Auto Script (v3) iniciado...');

    // --- 0. Criar tela de loading profissional ---
    function showLoadingScreen() {
        // Remove qualquer loading anterior
        const existing = document.getElementById('universal-loading-overlay');
        if (existing) existing.remove();

        const overlay = document.createElement('div');
        overlay.id = 'universal-loading-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: white;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 99999;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            transition: opacity 0.5s ease;
        `;

        // Logo girando
        const logo = document.createElement('img');
        logo.src = 'https://universalautorepasse.com.br/wp-content/uploads/2024/10/Universal-Veiculos-e-Repasses-300x275.png';
        logo.alt = 'Universal Auto Repasse';
        logo.style.cssText = `
            width: 120px;
            height: auto;
            animation: spin 1.5s linear infinite;
            margin-bottom: 2rem;
        `;

        // Barra de progresso
        const progressContainer = document.createElement('div');
        progressContainer.style.cssText = `
            width: 260px;
            height: 4px;
            background: #e2e8f0;
            border-radius: 4px;
            overflow: hidden;
            margin: 1rem 0;
        `;
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            width: 0%;
            height: 100%;
            background: #0055a4;
            border-radius: 4px;
            transition: width 0.3s ease;
        `;
        progressContainer.appendChild(progressBar);

        // Texto de status
        const statusText = document.createElement('p');
        statusText.style.cssText = `
            font-size: 14px;
            color: #4a4a4a;
            margin-top: 0.5rem;
            letter-spacing: 0.5px;
        `;
        statusText.innerText = 'Carregando experiência Universal...';

        overlay.appendChild(logo);
        overlay.appendChild(progressContainer);
        overlay.appendChild(statusText);

        // Adiciona keyframes da animação de giro
        const style = document.createElement('style');
        style.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(overlay);

        // Animar barra de progresso até 90% durante o carregamento
        let progress = 0;
        const interval = setInterval(() => {
            if (progress < 90) {
                progress += Math.random() * 15;
                if (progress > 90) progress = 90;
                progressBar.style.width = progress + '%';
            }
        }, 200);

        // Forçar remoção após LOADING_DURATION ms (garantia)
        setTimeout(() => {
            clearInterval(interval);
            progressBar.style.width = '100%';
            statusText.innerText = 'Pronto! Redirecionando...';
            setTimeout(() => {
                if (overlay && overlay.parentNode) overlay.remove();
            }, 500);
        }, LOADING_DURATION);

        return { overlay, interval, progressBar, statusText };
    }

    const loading = showLoadingScreen();

    // --- Dados globais ---
    let todosVeiculos = [];
    let precoPorId = new Map();
    let dadosCarregados = false;

    // Carrega JSON uma única vez
    try {
        const response = await fetch(URL_JSON);
        if (response.ok) {
            todosVeiculos = await response.json();
            todosVeiculos.forEach(v => {
                if (v.id && v.priceFor) precoPorId.set(v.id, v.priceFor + ACRESCIMO);
            });
            dadosCarregados = true;
            console.log(`✅ ${todosVeiculos.length} veículos carregados.`);
        } else {
            console.warn('⚠️ JSON não carregado, continuando sem preços dinâmicos.');
        }
    } catch (err) {
        console.error('❌ Erro ao carregar JSON:', err);
    }

    // --- Funções de modificação (idempotentes) ---

    function applyHero() {
        const hero = document.querySelector('.Hero_heroBackground__n2WjH');
        if (!hero) return;
        hero.style.position = 'relative';
        hero.style.setProperty('background', 'linear-gradient(135deg, #2563eb 0%, #1e40af 50%, #1e3a8a 100%)', 'important');
        if (!hero.querySelector('.custom-glow')) {
            const glow = document.createElement('div');
            glow.className = 'custom-glow';
            Object.assign(glow.style, {
                position: 'absolute', top: '-100px', left: '-100px',
                width: '400px', height: '400px', background: 'rgba(59,130,246,0.4)',
                filter: 'blur(120px)', borderRadius: '50%', pointerEvents: 'none'
            });
            hero.appendChild(glow);
        }
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
        const cards = document.querySelectorAll('[class*="VehicleCard"]');
        cards.forEach(card => {
            const link = card.querySelector('a[href*="/carro/"]');
            if (!link) return;
            const match = link.getAttribute('href').match(/-(\d+)$/);
            if (!match) return;
            const id = parseInt(match[1], 10);
            if (precoPorId.has(id)) {
                const precoFinal = precoPorId.get(id);
                const precoElem = card.querySelector('[class*="blurred"]');
                if (precoElem && !precoElem.innerText.includes(precoFinal.toLocaleString('pt-BR'))) {
                    precoElem.innerText = `R$ ${precoFinal.toLocaleString('pt-BR')}`;
                    precoElem.style.filter = 'none';
                }
            }
            const botoes = card.querySelectorAll('button');
            for (let btn of botoes) {
                if (btn.innerText.includes('Ver mais informações')) {
                    if (!btn.classList.contains('botao-personalizado')) {
                        btn.classList.remove('LdsButton-module_lds-button--outlined-primary__ZxRfx', 'LdsButton-module_lds-states--outlined__4D3s7');
                        btn.classList.add('LdsButton-module_lds-button--contained-primary__6r3Mk', 'LdsButton-module_lds-states--contained__vVTBv', 'botao-personalizado');
                        btn.innerText = 'Tenho interesse';
                        const novoBotao = btn.cloneNode(true);
                        btn.parentNode.replaceChild(novoBotao, btn);
                        novoBotao.addEventListener('click', (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            window.location.href = link.href;
                        });
                    }
                    break;
                }
            }
        });
    }

    function applySidebar(carroData) {
        const rightSidebar = document.querySelector('.DesktopPage_rightSide__uZfet');
        if (!rightSidebar || !carroData) return;
        const container = rightSidebar.querySelector('.DesktopPage_container__eiImn');
        if (!container) return;
        if (container.querySelector('#whatsapp-button-script')) return;
        const novoPreco = carroData.priceFor + ACRESCIMO;
        const precoFormatado = novoPreco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        const nomeLoja = carroData.store?.name || 'Loja não informada';
        const cidade = carroData.store?.city && carroData.store?.state
            ? `${carroData.store.city} - ${carroData.store.state}`
            : 'Fortaleza - CE';
        const km = carroData.odometer.toLocaleString('pt-BR');
        container.innerHTML = `
            <div class="VehicleTitle_container__mDy6V">
                <div class="VehicleTitle_header__bZBhS">
                    <h4 class="LdsTypography-module_lds-typography__-DOlx LdsTypography-module_lds-typography--heading-sm__5NKKy VehicleTitle_version__d4gVg">${carroData.brand}</h4>
                </div>
                <h2 class="LdsTypography-module_lds-typography__-DOlx LdsTypography-module_lds-typography--heading-lg__-4owW VehicleTitle_model__Ec3VK">
                    <strong>${carroData.modelFamilyDescription}</strong> ${carroData.model}
                </h2>
                <p class="LdsTypography-module_lds-typography__-DOlx LdsTypography-module_lds-typography--body-md__KI9TK">
                    ${carroData.manufactureYear}/${carroData.modelYear}&nbsp;&nbsp;&nbsp;&nbsp;${km} km
                </p>
            </div>
            <div class="VehicleReports_container__qAkuy"></div>
            <div style="background-color:var(--divider-color);height:1px;width:100%"></div>
            <div class="VehicleLocation_container__m8i4B">
                <svg width="20" height="20" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" fill="none" role="presentation" class="location-icon">
                    <path d="m5.0001 2.09998c-.3409 0-.65253.1926-.80499.4975l-2 4c-.06248.12497-.09501.26278-.09501.4025v1c0 1.03434.41089 2.02632 1.14228 2.75772.25691.2569.54597.4743.85772.6482v8.6941h-1.1c-.49706 0-.9.4029-.9.9 0 .497.40294.9.9.9h18c.4971 0 .9-.403.9-.9 0-.4971-.4029-.9-.9-.9h-1.1v-8.6941c.3117-.1739.6008-.3913.8577-.6482.7314-.7314 1.1423-1.72338 1.1423-2.75772v-1c0-.13972-.0325-.27753-.095-.4025l-2-4c-.1525-.3049-.4641-.4975-.805-.4975zm.9 18.00002v-8.2013c.03328.0008.06662.0013.1.0013 1.03434 0 2.02632-.4109 2.75771-1.1423.08516-.0852.16597-.1738.24229-.2657.07632.0919.15713.1805.24228.2657.73139.7314 1.72342 1.1423 2.75772 1.1423s2.0263-.4109 2.7577-1.1423c.0852-.0852.166-.1738.2423-.2657.0763.0919.1571.1805.2423.2657.7314.7314 1.7234 1.1423 2.7577 1.1423.0334 0 .0667-.0005.1-.0013v8.2013h-2.2v-3.1c0-.7692-.3055-1.5068-.8494-2.0506-.5438-.5439-1.2815-.8494-2.0506-.8494h-2c-.7691 0-1.50676.3055-2.05061.8494-.54386.5438-.84939 1.2814-.84939 2.0506v3.1zm4.6151-10.6151c-.3939-.39383-.6151-.92797-.6151-1.48492v-.1h4.2v.1c0 .55695-.2213 1.09109-.6151 1.48492s-.9279.6151-1.4849.6151-1.0911-.22127-1.4849-.6151zm-2.4151-1.48492c0 .55695-.22125 1.09109-.61508 1.48492-.39382.39383-.92797.6151-1.48492.6151-.55696 0-1.0911-.22127-1.48493-.6151-.39382-.39383-.61507-.92797-.61507-1.48492v-.1h4.2zm-3.64377-1.9 1.1-2.2h12.88757l1.1 2.2zm11.44377 1.8h4.2v.1c0 .55695-.2213 1.09109-.6151 1.48492s-.9279.6151-1.4849.6151-1.0911-.22127-1.4849-.6151c-.3939-.39383-.6151-.92797-.6151-1.48492zm-4.9 8.00002h2c.2917 0 .5715.1159.7778.3222.2063.2062.3222.486.3222.7778v3.1h-4.2v-3.1c0-.2918.1159-.5716.3222-.7778.2063-.2063.4861-.3222.7778-.3222z" fill="currentColor"></path>
                </svg>
                <p class="LdsTypography-module_lds-typography__-DOlx LdsTypography-module_lds-typography--body-sm__7uR1-">
                    ${nomeLoja}<br>
                    <span class="VehicleLocation_opacity__7fAgZ">${cidade}</span>
                </p>
            </div>
            <div style="background-color:var(--divider-color);height:1px;width:100%"></div>
            <div class="VehiclePrice_container__myGEh">
                <div class="Price_priceContainer__UFleO">
                    <div><h2 class="LdsTypography-module_lds-typography__-DOlx LdsTypography-module_lds-typography--heading-lg__-4owW">${precoFormatado}</h2></div>
                </div>
            </div>
            <div class="whatsapp-button-wrapper" style="margin-bottom:24px;">
                <button type="button" id="whatsapp-button-script" class="whatsapp-button-custom">
                    <img src="${WHATSAPP_ICON_URL}" alt="WhatsApp" class="whatsapp-icon" style="width:24px;height:24px;margin-right:8px;vertical-align:middle;">
                    <span>WhatsApp</span>
                </button>
            </div>
            <div id="banner-container" style="display:flex;flex-direction:column;justify-content:center;align-items:center;padding:0;background:white;border-radius:0;border:none!important;box-shadow:none!important;">
                <img src="https://raw.githubusercontent.com/SiteHosterBabe/universalauto/refs/heads/main/banneruniversal.png" alt="Banner Universal" style="width:100%;height:auto;max-height:600px;object-fit:contain;">
                <img src="https://universalautorepasse.com.br/wp-content/uploads/2024/10/Universal-Veiculos-e-Repasses-300x275.png" alt="Logo Universal" style="margin-top:20px;width:150px;height:auto;">
            </div>
        `;
        const whatsappBtn = document.getElementById('whatsapp-button-script');
        if (whatsappBtn) {
            whatsappBtn.addEventListener('click', () => {
                window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`, '_blank');
            });
        }
    }

    function applyHeaderButtons() {
        // Remove "Cadastrar" do header
        document.querySelectorAll('button').forEach(btn => {
            if (btn.innerText.trim() === 'Cadastrar' && !btn.closest('.VehiclesFilters_buttonsContainer__lY4oa')) {
                btn.remove();
            }
        });
        // "Entrar" do header → "Nossos Carros" (com redirecionamento para anonclub.space/carros)
        const entrarHeader = Array.from(document.querySelectorAll('button')).find(b => b.innerText.trim() === 'Entrar' && !b.closest('.VehiclesFilters_buttonsContainer__lY4oa'));
        if (entrarHeader && entrarHeader.innerText !== 'Nossos Carros') {
            entrarHeader.innerText = 'Nossos Carros';
            entrarHeader.style.borderColor = '#0055a4';
            entrarHeader.style.color = '#0055a4';
            const clone = entrarHeader.cloneNode(true);
            entrarHeader.parentNode.replaceChild(clone, entrarHeader);
            clone.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = 'https://anonclub.space/carros';
            });
        }
        // Botões dos filtros
        const filterCadastrar = document.querySelector('.VehiclesFilters_buttonsContainer__lY4oa button.LdsButton-module_lds-button--contained-primary__6r3Mk');
        if (filterCadastrar && filterCadastrar.innerText.trim() === 'Cadastrar') filterCadastrar.remove();
        const filterEntrar = document.querySelector('.VehiclesFilters_buttonsContainer__lY4oa button.LdsButton-module_lds-button--outlined-primary__ZxRfx');
        if (filterEntrar && filterEntrar.innerText.trim() === 'Entrar' && filterEntrar.innerText !== 'Fale conosco / Contato') {
            filterEntrar.innerText = 'Fale conosco / Contato';
            filterEntrar.style.borderColor = '#0055a4';
            filterEntrar.style.color = '#0055a4';
            const clone = filterEntrar.cloneNode(true);
            filterEntrar.parentNode.replaceChild(clone, filterEntrar);
            clone.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = 'mailto:contato@universalautorepasse.com.br';
            });
        }
    }

    function applyFooter() {
        document.querySelector('a[href="https://www.localiza.com/"]')?.closest('.Footer_product__RLAJk')?.remove();
        document.querySelector('a[href="https://zarp.localiza.com/"]')?.closest('.Footer_product__RLAJk')?.remove();
        document.querySelectorAll('.Footer_product__RLAJk').forEach(div => {
            if (div.innerText.trim() === '' && div.children.length === 0) div.remove();
        });
        const meoo = document.querySelector('a[href="https://meoo.localiza.com"]')?.closest('.Footer_product__RLAJk');
        if (meoo && !meoo.querySelector('img[alt="Instagram"]')) {
            meoo.innerHTML = `
                <a href="https://www.instagram.com/universalautorepasse_/" target="_blank" style="display:flex;align-items:center;gap:8px;text-decoration:none;">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/960px-Instagram_logo_2016.svg.png" alt="Instagram" style="height:24px;width:24px;object-fit:contain;">
                    <div style="display:flex;flex-direction:column;line-height:1.2;">
                        <span style="font-size:16px;font-weight:700;background:linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">Instagram</span>
                        <p class="LdsTypography-module_lds-typography__-DOlx LdsTypography-module_lds-typography--body-md__KI9TK" style="margin:0;color:#888;font-size:11px;">Redes Sociais</p>
                    </div>
                </a>
            `;
        }
        const frotas = document.querySelector('a[href="https://frotas.localiza.com/"]')?.closest('.Footer_product__RLAJk');
        if (frotas && !frotas.querySelector('img[alt="Universal Auto Repasse"]')) {
            frotas.innerHTML = `
                <a href="https://universalautorepasse.com.br/" target="_blank" style="display:flex;align-items:center;gap:8px;text-decoration:none;">
                    <img src="https://raw.githubusercontent.com/SiteHosterBabe/universalauto/refs/heads/main/logouniversall.png" alt="Universal Auto Repasse" style="height:24px;width:auto;object-fit:contain;">
                    <div style="display:flex;flex-direction:column;line-height:1.2;">
                        <span style="font-size:16px;font-weight:700;color:#1A3C6E;letter-spacing:0.3px;">Universal</span>
                        <p class="LdsTypography-module_lds-typography__-DOlx LdsTypography-module_lds-typography--body-md__KI9TK" style="margin:0;color:#888;font-size:11px;">Gestão de frotas</p>
                    </div>
                </a>
            `;
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
        for (const node of nodes) {
            let text = node.nodeValue;
            let changed = false;
            for (const [oldT, newT] of replacements) {
                if (text.includes(oldT)) {
                    text = text.replace(new RegExp(oldT.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newT);
                    changed = true;
                }
            }
            if (changed) node.nodeValue = text;
        }
    }

    function applyLogo() {
        document.querySelectorAll('.DisplayContent_displayContent__I14hU.DisplayContent_hideMobile__K13cl.DisplayContent_hideTablet__ISpUr.DisplayContent_hideLargeTablet__jiADA').forEach(div => {
            const svg = div.querySelector('svg');
            if (svg && svg.getAttribute('viewBox') === '0 0 149 39' && div.innerHTML.includes('#FF8026') && !div.querySelector('img')) {
                div.innerHTML = `
                    <div style="display:flex;align-items:center;gap:8px;">
                        <img src="https://universalautorepasse.com.br/wp-content/uploads/2024/10/Universal-Veiculos-e-Repasses-300x275.png" alt="Universal Repasses" style="height:39px;width:auto;object-fit:contain;">
                        <div style="display:flex;flex-direction:column;line-height:1.15;">
                            <span style="font-size:10px;color:#1565C0;font-weight:600;letter-spacing:2px;text-transform:uppercase;">Repasses</span>
                            <span style="font-size:17px;color:#0D3B8C;font-weight:800;letter-spacing:0.5px;">Universal</span>
                        </div>
                    </div>
                `;
            }
        });
    }

    function applyCarouselDots() {
        const activeDot = document.querySelector('.Carousel_circle__nA3ia.Carousel_active__Hg2HB');
        if (activeDot) {
            activeDot.style.backgroundColor = '#0055a4';
            activeDot.style.borderColor = '#0055a4';
        }
    }

    function injectGlobalCSS() {
        if (document.getElementById('universal-auto-styles')) return;
        const style = document.createElement('style');
        style.id = 'universal-auto-styles';
        style.textContent = `
            .VehicleTitle_version__d4gVg { color: #0055a4 !important; }
            .VehicleLocation_container__m8i4B svg, .StoreLocation_phone__Ewa4F svg, .StoreLocation_addressLink__gGjfy svg { color: #0055a4 !important; }
            .whatsapp-button-custom {
                display: flex; align-items: center; justify-content: center; width: 100%;
                background-color: #25D366; border: none; border-radius: 8px;
                padding: 12px 16px; font-size: 18px; font-weight: bold; color: white;
                cursor: pointer; transition: all 0.2s ease; box-shadow: 0 2px 5px rgba(0,0,0,0.2);
                animation: pulse 1.5s infinite;
            }
            .whatsapp-button-custom:hover { background-color: #20b859; transform: scale(1.02); }
            @keyframes pulse {
                0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(37,211,102,0.7); }
                70% { transform: scale(1.03); box-shadow: 0 0 0 10px rgba(37,211,102,0); }
                100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(37,211,102,0); }
            }
            .whatsapp-icon { filter: brightness(0) invert(1); }
            .Navbar_title__9x_zb { border-left-color: #0055a4 !important; }
            .Navbar_title__9x_zb, .Navbar_title__9x_zb h3 { background-color: transparent !important; color: inherit !important; }
            .botao-personalizado {
                background-color: #1e40af !important;
                border-color: #1e40af !important;
                color: #ffffff !important;
                font-weight: 600 !important;
            }
            [class*="blurred"] { filter: none !important; opacity: 1 !important; }
        `;
        document.head.appendChild(style);
    }

    // --- Função principal que aplica todas as transformações ---
    let primeiraExecucao = true;
    function applyAllTransformations() {
        replacePortalText(document.body);
        applyHero();
        if (dadosCarregados) applyListagem();
        applyHeaderButtons();
        applyFooter();
        applyTextReplacements();
        applyLogo();
        applyCarouselDots();
        injectGlobalCSS();

        const idMatch = window.location.href.match(/-(\d+)(?:\/|$)/);
        const carroId = idMatch ? parseInt(idMatch[1]) : null;
        if (carroId && todosVeiculos.length) {
            const carroData = todosVeiculos.find(c => c.id === carroId);
            if (carroData) applySidebar(carroData);
        }

        // Remove a tela de loading após a primeira execução bem-sucedida
        if (primeiraExecucao) {
            primeiraExecucao = false;
            // Finaliza a barra de progresso e remove o overlay
            const overlay = document.getElementById('universal-loading-overlay');
            if (overlay) {
                const progressBar = overlay.querySelector('div[style*="width"]');
                if (progressBar) progressBar.style.width = '100%';
                const status = overlay.querySelector('p');
                if (status) status.innerText = 'Pronto! Redirecionando...';
                setTimeout(() => overlay.remove(), 500);
            }
        }
    }

    // --- MutationObserver para reaplicar mudanças em SPAs ---
    let debounceTimer;
    const observer = new MutationObserver(() => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => applyAllTransformations(), 150);
    });
    observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class', 'style'] });

    // Executa imediatamente
    applyAllTransformations();
    console.log('✅ Universal Auto Script v3 - Tela de loading e redirecionamento corrigido.');
})();