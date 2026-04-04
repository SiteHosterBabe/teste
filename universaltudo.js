(async function universalAutoScript() {

    // ============================================================
    // CONFIGURAÇÕES GLOBAIS
    // ============================================================
    const WHATSAPP_NUMBER  = '5585999999999'; // ← Substitua pelo seu número
    const WHATSAPP_MESSAGE = 'Olá! Tenho interesse neste veículo.';
    const WHATSAPP_ICON_URL = 'https://confirent.pt/wp-content/uploads/2023/03/whatsapp-icone-2.png';
    const URL_JSON = 'https://raw.githubusercontent.com/SiteHosterBabe/universalauto/refs/heads/main/vinijunior.json';
    const ACRESCIMO = 3000;

    console.log('🚀 Universal Auto Script iniciado...');


    // ============================================================
    // MÓDULO 1 — PÁGINA PRINCIPAL: Hero + troca de texto
    // ============================================================
    function updateHero() {
        const hero = document.querySelector('.Hero_heroBackground__n2WjH');
        if (!hero) return;
        hero.style.position = 'relative';
        hero.style.setProperty('background',
            'linear-gradient(135deg, #2563eb 0%, #1e40af 50%, #1e3a8a 100%)',
            'important'
        );
        if (!hero.querySelector('.custom-glow')) {
            const glow = document.createElement('div');
            glow.className = 'custom-glow';
            Object.assign(glow.style, {
                position: 'absolute', top: '-100px', left: '-100px',
                width: '400px', height: '400px',
                background: 'rgba(59,130,246,0.4)',
                filter: 'blur(120px)', borderRadius: '50%',
                pointerEvents: 'none'
            });
            hero.appendChild(glow);
            console.log('✅ Hero atualizado.');
        }
    }

    function replaceTextoPortal(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            node.nodeValue = node.nodeValue.replace(/Portal do Lojista/gi, 'Universal Auto');
        } else {
            node.childNodes.forEach(replaceTextoPortal);
        }
    }

    // MutationObserver para a página principal (hero + texto)
    const observerPrincipal = new MutationObserver(() => {
        replaceTextoPortal(document.body);
        updateHero();
    });
    observerPrincipal.observe(document.body, { childList: true, subtree: true });

    replaceTextoPortal(document.body);
    updateHero();


    // ============================================================
    // MÓDULO 2 — LISTAGEM: Corrigir preços + botão "Tenho interesse"
    // ============================================================
    console.log('🔍 Carregando dados do JSON para preços...');
    let precoPorId = new Map();
    let todosVeiculos = [];

    try {
        const response = await fetch(URL_JSON);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        todosVeiculos = await response.json();
        console.log(`✅ ${todosVeiculos.length} veículos carregados.`);

        todosVeiculos.forEach(v => {
            if (v.id && v.priceFor) precoPorId.set(v.id, v.priceFor + ACRESCIMO);
        });

        // CSS para remover blur e estilizar botão
        const styleListagem = document.createElement('style');
        styleListagem.textContent = `
            [class*="blurred"] { filter: none !important; opacity: 1 !important; }
            .botao-personalizado {
                background-color: #1e40af !important;
                border-color: #1e40af !important;
                color: #ffffff !important;
                font-weight: 600 !important;
                letter-spacing: 0.4px !important;
                transition: background-color 0.2s ease, transform 0.15s ease !important;
            }
            .botao-personalizado:hover {
                background-color: #1d3a9e !important;
                border-color: #1d3a9e !important;
                filter: none !important;
            }
            .botao-personalizado:active { transform: scale(0.98) !important; }
        `;
        document.head.appendChild(styleListagem);

        let totalCorrigidos = 0;

        function corrigirCards() {
            let corrigidos = 0;
            const cards = document.querySelectorAll('[class*="VehicleCard"]');
            cards.forEach(card => {
                const link = card.querySelector('a[href*="/carro/"]');
                if (!link) return;
                const match = link.getAttribute('href').match(/-(\d+)$/);
                if (!match) return;
                const id = parseInt(match[1], 10);

                // Corrigir preço
                if (precoPorId.has(id)) {
                    const precoFinal = precoPorId.get(id);
                    const precoElem = card.querySelector('[class*="blurred"]');
                    if (precoElem) {
                        const novoPreco = `R$ ${precoFinal.toLocaleString('pt-BR')}`;
                        if (precoElem.innerText !== novoPreco) {
                            precoElem.innerText = novoPreco;
                            precoElem.style.filter = 'none';
                            corrigidos++;
                        }
                    }
                }

                // Substituir botão "Ver mais informações"
                const botoes = card.querySelectorAll('button');
                for (let btn of botoes) {
                    if (btn.innerText.includes('Ver mais informações')) {
                        const destino = link.href;
                        btn.classList.remove(
                            'LdsButton-module_lds-button--outlined-primary__ZxRfx',
                            'LdsButton-module_lds-states--outlined__4D3s7'
                        );
                        btn.classList.add(
                            'LdsButton-module_lds-button--contained-primary__6r3Mk',
                            'LdsButton-module_lds-states--contained__vVTBv',
                            'botao-personalizado'
                        );
                        btn.innerText = 'Tenho interesse';
                        const novoBotao = btn.cloneNode(true);
                        btn.parentNode.replaceChild(novoBotao, btn);
                        novoBotao.addEventListener('click', (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            window.location.href = destino;
                        });
                        break;
                    }
                }
            });
            if (corrigidos > 0) {
                totalCorrigidos += corrigidos;
                console.log(`💰 Preços corrigidos: ${totalCorrigidos}`);
            }
        }

        corrigirCards();
        [1000, 2000, 3000, 5000].forEach(t => setTimeout(corrigirCards, t));

        const observerCards = new MutationObserver(() => corrigirCards());
        observerCards.observe(document.body, { childList: true, subtree: true });

        console.log(`✅ Preços + botão "Tenho interesse" ativos! (+R$ ${ACRESCIMO.toLocaleString('pt-BR')})`);

    } catch (erro) {
        console.error('❌ Erro ao carregar JSON de preços:', erro);
    }


    // ============================================================
    // MÓDULO 3 — PÁGINA DE DETALHES DO CARRO
    // ============================================================
    const url = window.location.href;
    const idMatch = url.match(/-(\d+)(?:\/|$)/);
    const carroId = idMatch ? parseInt(idMatch[1]) : null;

    if (carroId) {
        console.log('✅ ID do carro detectado:', carroId);
    } else {
        console.log('ℹ️ Nenhum ID de carro na URL. Apenas alterações visuais globais.');
    }

    let carro = null;
    if (carroId && todosVeiculos.length > 0) {
        carro = todosVeiculos.find(c => c.id === carroId) || null;
        if (carro) console.log('📦 Dados do carro obtidos:', carro);
        else console.warn('⚠️ ID não encontrado no JSON.');
    }

    let precoFormatado = null;
    let nomeLoja = 'Loja não informada';
    let cidade = 'Fortaleza - CE';
    let anoFabricacao = null, anoModelo = null, km = null;
    let brand = '', modelFamily = '', model = '';

    if (carro) {
        const novoPreco = carro.priceFor + ACRESCIMO;
        precoFormatado = novoPreco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        nomeLoja = carro.store?.name || 'Loja não informada';
        cidade = carro.store?.city && carro.store?.state
            ? `${carro.store.city} - ${carro.store.state}`
            : 'Fortaleza - CE';
        anoModelo      = carro.modelYear;
        anoFabricacao  = carro.manufactureYear;
        km             = carro.odometer.toLocaleString('pt-BR');
        brand          = carro.brand;
        modelFamily    = carro.modelFamilyDescription;
        model          = carro.model;
    }

    // Substituir barra lateral direita (apenas se houver dados)
    const rightSidebar = document.querySelector('.DesktopPage_rightSide__uZfet');
    if (rightSidebar && carro) {
        const container = rightSidebar.querySelector('.DesktopPage_container__eiImn');
        if (container) {
            container.innerHTML = `
                <div class="VehicleTitle_container__mDy6V">
                    <div class="VehicleTitle_header__bZBhS">
                        <h4 class="LdsTypography-module_lds-typography__-DOlx LdsTypography-module_lds-typography--heading-sm__5NKKy VehicleTitle_version__d4gVg">${brand}</h4>
                    </div>
                    <h2 class="LdsTypography-module_lds-typography__-DOlx LdsTypography-module_lds-typography--heading-lg__-4owW VehicleTitle_model__Ec3VK">
                        <strong>${modelFamily}</strong> ${model}
                    </h2>
                    <p class="LdsTypography-module_lds-typography__-DOlx LdsTypography-module_lds-typography--body-md__KI9TK">
                        ${anoFabricacao}/${anoModelo}&nbsp;&nbsp;&nbsp;&nbsp;${km} km
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
            console.log('✅ Barra lateral substituída com dados do carro.');

            // Evento do botão WhatsApp
            const whatsappBtn = document.getElementById('whatsapp-button-script');
            if (whatsappBtn) {
                whatsappBtn.addEventListener('click', () => {
                    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`, '_blank');
                });
            }
        }
    }

    // CSS global da página de detalhes
    const styleDetalhes = document.createElement('style');
    styleDetalhes.textContent = `
        .VehicleTitle_version__d4gVg { color: #0055a4 !important; }
        .Carousel_circle__nA3ia.Carousel_active__Hg2HB { background-color: #0055a4 !important; border-color: #0055a4 !important; }
        .VehicleLocation_container__m8i4B svg,
        .StoreLocation_phone__Ewa4F svg,
        .StoreLocation_addressLink__gGjfy svg,
        .VehicleLocation_container__m8i4B svg.location-icon { color: #0055a4 !important; }
        .whatsapp-button-custom {
            display: flex; align-items: center; justify-content: center; width: 100%;
            background-color: #25D366; border: none; border-radius: 8px;
            padding: 12px 16px; font-size: 18px; font-weight: bold; color: white;
            cursor: pointer; transition: all 0.2s ease; box-shadow: 0 2px 5px rgba(0,0,0,0.2);
            animation: pulse 1.5s infinite;
        }
        .whatsapp-button-custom:hover { background-color: #20b859; transform: scale(1.02); }
        @keyframes pulse {
            0%   { transform: scale(1);    box-shadow: 0 0 0 0   rgba(37,211,102,0.7); }
            70%  { transform: scale(1.03); box-shadow: 0 0 0 10px rgba(37,211,102,0); }
            100% { transform: scale(1);    box-shadow: 0 0 0 0   rgba(37,211,102,0); }
        }
        .whatsapp-icon { filter: brightness(0) invert(1); }
        .Navbar_title__9x_zb { border-left-color: #0055a4 !important; }
        .Navbar_title__9x_zb, .Navbar_title__9x_zb h3 { background-color: transparent !important; color: inherit !important; }
    `;
    document.head.appendChild(styleDetalhes);

    // Observer para dots do carrossel
    const observerCarrossel = new MutationObserver(() => {
        const activeDot = document.querySelector('.Carousel_circle__nA3ia.Carousel_active__Hg2HB');
        if (activeDot) {
            activeDot.style.backgroundColor = '#0055a4';
            activeDot.style.borderColor = '#0055a4';
        }
    });
    observerCarrossel.observe(document.body, { childList: true, subtree: true });


    // ============================================================
    // MÓDULO 4 — BOTÕES DO HEADER (sempre)
    // ============================================================

    // Remover botão "Cadastrar" do header
    const allButtons = document.querySelectorAll('button');
    for (let btn of allButtons) {
        if (btn.innerText.trim() === 'Cadastrar') {
            btn.remove();
            console.log('✅ Botão "Cadastrar" do header removido.');
            break;
        }
    }

    // Modificar botão "Entrar" do header para "Nossos Carros"
    const entrarBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.trim() === 'Entrar');
    if (entrarBtn) {
        entrarBtn.innerText = 'Nossos Carros';
        entrarBtn.style.borderColor = '#0055a4';
        entrarBtn.style.color = '#0055a4';
        const newEntrarBtn = entrarBtn.cloneNode(true);
        entrarBtn.parentNode.replaceChild(newEntrarBtn, entrarBtn);
        newEntrarBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'https://portaldolojista.localiza.com/carros';
        });
        console.log('✅ Botão "Entrar" modificado para "Nossos Carros".');
    }

    // Remover botão "Cadastrar" dos filtros
    const filterCadastrarBtn = document.querySelector('.VehiclesFilters_buttonsContainer__lY4oa button.LdsButton-module_lds-button--contained-primary__6r3Mk');
    if (filterCadastrarBtn && filterCadastrarBtn.innerText.trim() === 'Cadastrar') {
        filterCadastrarBtn.remove();
        console.log('✅ Botão "Cadastrar" do filtro removido.');
    }

    // Modificar botão "Entrar" dos filtros para "Fale conosco"
    const filterEntrarBtn = document.querySelector('.VehiclesFilters_buttonsContainer__lY4oa button.LdsButton-module_lds-button--outlined-primary__ZxRfx');
    if (filterEntrarBtn && filterEntrarBtn.innerText.trim() === 'Entrar') {
        filterEntrarBtn.innerText = 'Fale conosco / Contato';
        filterEntrarBtn.style.borderColor = '#0055a4';
        filterEntrarBtn.style.color = '#0055a4';
        const newFilterBtn = filterEntrarBtn.cloneNode(true);
        filterEntrarBtn.parentNode.replaceChild(newFilterBtn, filterEntrarBtn);
        newFilterBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'mailto:contato@universalautorepasse.com.br';
        });
        console.log('✅ Botão "Entrar" do filtro → "Fale conosco / Contato".');
    }


    // ============================================================
    // MÓDULO 5 — FOOTER: remover blocos Localiza, trocar links (sempre)
    // ============================================================

    // Remover bloco "Aluguel de carros"
    const localizaLink = document.querySelector('a[href="https://www.localiza.com/"]');
    if (localizaLink) {
        localizaLink.closest('.Footer_product__RLAJk')?.remove();
        console.log('✅ Bloco "Aluguel de carros" removido.');
    }

    // Remover bloco "Carros para motoristas de app"
    const zarpLink = document.querySelector('a[href="https://zarp.localiza.com/"]');
    if (zarpLink) {
        zarpLink.closest('.Footer_product__RLAJk')?.remove();
        console.log('✅ Bloco "Carros para motoristas" removido.');
    }

    // Remover divs vazias do footer
    document.querySelectorAll('.Footer_product__RLAJk').forEach(div => {
        if (div.innerText.trim() === '' && div.children.length === 0) {
            div.remove();
        }
    });

    // Substituir "Carros por assinatura" (meoo) → Instagram
    const meooLink = document.querySelector('a[href="https://meoo.localiza.com"]');
    if (meooLink) {
        const parentDiv = meooLink.closest('.Footer_product__RLAJk');
        if (parentDiv) {
            parentDiv.innerHTML = `
                <a href="https://www.instagram.com/universalautorepasse_/" target="_blank" style="display:flex;align-items:center;gap:8px;text-decoration:none;">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/960px-Instagram_logo_2016.svg.png"
                         alt="Instagram" style="height:24px;width:24px;object-fit:contain;">
                    <div style="display:flex;flex-direction:column;line-height:1.2;">
                        <span style="font-size:16px;font-weight:700;background:linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">Instagram</span>
                        <p class="LdsTypography-module_lds-typography__-DOlx LdsTypography-module_lds-typography--body-md__KI9TK" style="margin:0;color:#888;font-size:11px;">Redes Sociais</p>
                    </div>
                </a>
            `;
            console.log('✅ Footer: meoo → Instagram.');
        }
    }

    // Substituir "Gestão de frotas" (frotas.localiza) → Universal site
    const frotasLink = document.querySelector('a[href="https://frotas.localiza.com/"]');
    if (frotasLink) {
        const parentDiv = frotasLink.closest('.Footer_product__RLAJk');
        if (parentDiv) {
            parentDiv.innerHTML = `
                <a href="https://universalautorepasse.com.br/" target="_blank" style="display:flex;align-items:center;gap:8px;text-decoration:none;">
                    <img src="https://raw.githubusercontent.com/SiteHosterBabe/universalauto/refs/heads/main/logouniversall.png"
                         alt="Universal Auto Repasse" style="height:24px;width:auto;object-fit:contain;">
                    <div style="display:flex;flex-direction:column;line-height:1.2;">
                        <span style="font-size:16px;font-weight:700;color:#1A3C6E;letter-spacing:0.3px;">Universal</span>
                        <p class="LdsTypography-module_lds-typography__-DOlx LdsTypography-module_lds-typography--body-md__KI9TK" style="margin:0;color:#888;font-size:11px;">Gestão de frotas</p>
                    </div>
                </a>
            `;
            console.log('✅ Footer: frotas.localiza → Universal site.');
        }
    }


    // ============================================================
    // MÓDULO 6 — SUBSTITUIÇÃO DE TEXTOS DO FOOTER (empresa, CNPJ, endereço, copyright)
    // ============================================================
    function substituirTexto(textoAntigo, textoNovo) {
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
            acceptNode: n => n.textContent.includes(textoAntigo) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP
        });
        while (walker.nextNode()) {
            walker.currentNode.textContent = walker.currentNode.textContent.replace(
                new RegExp(textoAntigo.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),
                textoNovo
            );
        }
    }

    substituirTexto(
        'Av. Bernardo Vasconcelos, 377, Cachoeirinha 31150-000 - Belo Horizonte/MG',
        'Av. Pereira Barreto, 42\nVila Gilda, Santo André – SP'
    );
    substituirTexto('CNPJ nº 16.670.085/0001-55', 'CEP: 09190-210');
    substituirTexto('LOCALIZA Rent a Car S/A', 'UNIVERSAL Auto Repasse S/A');
    substituirTexto('© Localiza - Todos os direitos reservados.', '© Universal - Todos os direitos reservados.');


    // ============================================================
    // MÓDULO 7 — SUBSTITUIR LOGO PRINCIPAL (SVG → imagem + texto)
    // ============================================================
    const allLogoDivs = document.querySelectorAll(
        '.DisplayContent_displayContent__I14hU.DisplayContent_hideMobile__K13cl.DisplayContent_hideTablet__ISpUr.DisplayContent_hideLargeTablet__jiADA'
    );
    allLogoDivs.forEach(div => {
        const svg = div.querySelector('svg');
        if (svg && svg.getAttribute('viewBox') === '0 0 149 39' && div.innerHTML.includes('#FF8026')) {
            div.innerHTML = `
                <div style="display:flex;align-items:center;gap:8px;">
                    <img src="https://universalautorepasse.com.br/wp-content/uploads/2024/10/Universal-Veiculos-e-Repasses-300x275.png"
                         alt="Universal Repasses" style="height:39px;width:auto;object-fit:contain;">
                    <div style="display:flex;flex-direction:column;line-height:1.15;">
                        <span style="font-size:10px;color:#1565C0;font-weight:600;letter-spacing:2px;text-transform:uppercase;">Repasses</span>
                        <span style="font-size:17px;color:#0D3B8C;font-weight:800;letter-spacing:0.5px;">Universal</span>
                    </div>
                </div>
            `;
            console.log('✅ Logo principal substituída.');
        }
    });


    console.log('✅ Universal Auto Script — Todos os módulos aplicados com sucesso! 🎉');

})();
