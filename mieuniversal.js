(function() {

    if (document.getElementById('elite-popup-overlay')) return;

    // cria overlay
    const overlay = document.createElement('div');
    overlay.id = 'elite-popup-overlay';

    Object.assign(overlay.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        background: 'rgba(0,0,0,0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: '999999999'
    });

    // popup
    const box = document.createElement('div');

    Object.assign(box.style, {
        width: '95%',
        maxWidth: '720px',
        background: '#0b0f19',
        borderRadius: '18px',
        color: 'white',
        padding: '30px',
        boxShadow: '0 50px 120px rgba(0,0,0,0.8)',
        fontFamily: 'sans-serif'
    });

    box.innerHTML = `
        <div style="font-size:26px;font-weight:700;margin-bottom:10px;">
            🚗 Universal Auto Repasse
        </div>

        <div style="font-size:15px;opacity:0.7;margin-bottom:20px;">
            Loja oficial de veículos • Oportunidades reais
        </div>

        <div style="font-size:18px;font-weight:600;margin-bottom:10px;">
            Existe uma forma mais inteligente de comprar veículos
        </div>

        <p style="line-height:1.6;opacity:0.85;">
            Além do leilão, você também pode acessar nossa loja com veículos 
            disponíveis para compra direta, com preços abaixo do mercado 
            e oportunidades que não ficam disponíveis por muito tempo.
        </p>

        <div style="margin-top:20px;background:#111827;padding:15px;border-radius:10px;">
            ✔ Preços abaixo da tabela<br>
            ✔ Alta rotatividade<br>
            ✔ Ideal para revenda<br>
            ✔ Estoque atualizado
        </div>

        <div style="text-align:center;margin-top:25px;">
            <button id="eliteClose" style="
                background:white;
                color:black;
                padding:14px 30px;
                border:none;
                border-radius:10px;
                font-weight:700;
                cursor:pointer;
            ">
                Entendi
            </button>
        </div>
    `;

    overlay.appendChild(box);

    // função que força o popup a existir
    function keepAlive() {
        if (!document.body.contains(overlay)) {
            document.body.appendChild(overlay);
        }
        requestAnimationFrame(keepAlive);
    }

    document.body.appendChild(overlay);
    keepAlive(); // 🔥 ANTI-REMOÇÃO

    document.getElementById('eliteClose').onclick = () => {
        overlay.remove();
    };

})();