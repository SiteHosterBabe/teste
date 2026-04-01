(function() {

    if (document.getElementById('elite-popup-overlay')) return;

    // CSS PREMIUM
    const style = document.createElement('style');
    style.innerHTML = `
        .elite-popup-overlay {
            position: fixed;
            top:0;
            left:0;
            width:100%;
            height:100%;
            background: radial-gradient(circle at center, rgba(0,0,0,0.85), rgba(0,0,0,0.95));
            display:flex;
            align-items:center;
            justify-content:center;
            z-index:999999;
            backdrop-filter: blur(6px);
        }

        .elite-popup {
            width: 95%;
            max-width: 720px;
            border-radius: 18px;
            overflow: hidden;
            background: #0b0f19;
            box-shadow: 0 50px 120px rgba(0,0,0,0.8);
            animation: popupFade 0.5s ease;
            color: white;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        @keyframes popupFade {
            from {opacity:0; transform: scale(0.9);}
            to {opacity:1; transform: scale(1);}
        }

        .elite-header {
            padding: 32px;
            background: linear-gradient(135deg, #000000, #1f2937);
            border-bottom: 1px solid rgba(255,255,255,0.08);
        }

        .elite-title {
            font-size: 26px;
            font-weight: 700;
            letter-spacing: 0.5px;
        }

        .elite-sub {
            font-size: 14px;
            opacity: 0.7;
            margin-top: 6px;
        }

        .elite-body {
            padding: 32px;
        }

        .elite-highlight {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 14px;
        }

        .elite-box {
            background: linear-gradient(135deg, #111827, #020617);
            border-radius: 12px;
            padding: 18px;
            margin-top: 18px;
            border: 1px solid rgba(255,255,255,0.06);
        }

        .elite-footer {
            padding: 30px;
            text-align: center;
        }

        .elite-btn {
            background: linear-gradient(135deg, #ffffff, #d1d5db);
            color: black;
            border: none;
            padding: 14px 34px;
            border-radius: 10px;
            font-weight: 700;
            cursor: pointer;
            font-size: 15px;
            transition: 0.25s;
        }

        .elite-btn:hover {
            transform: scale(1.05);
            box-shadow: 0 10px 30px rgba(255,255,255,0.2);
        }
    `;
    document.head.appendChild(style);

    const overlay = document.createElement('div');
    overlay.className = 'elite-popup-overlay';
    overlay.id = 'elite-popup-overlay';

    const popup = document.createElement('div');
    popup.className = 'elite-popup';

    popup.innerHTML = `
        <div class="elite-header">
            <div class="elite-title">🚗 Universal Auto Repasse</div>
            <div class="elite-sub">Veículos selecionados • Oportunidades reais • Negócios inteligentes</div>
        </div>

        <div class="elite-body">

            <div class="elite-highlight">
                Existe uma forma mais inteligente de comprar veículos...
            </div>

            <div style="font-size:15px; line-height:1.7; opacity:0.85;">
                Além do nosso sistema de leilão, disponibilizamos uma loja exclusiva com veículos 
                prontos para compra direta, cuidadosamente selecionados para quem procura margem, oportunidade e segurança.
            </div>

            <div class="elite-box">
                ✔ Veículos abaixo do valor de mercado<br>
                ✔ Oportunidades limitadas (alta rotatividade)<br>
                ✔ Ideal para revenda ou compra estratégica<br>
                ✔ Estoque constantemente atualizado
            </div>

            <div style="margin-top:20px;font-size:13px;opacity:0.6;text-align:center;">
                Muitos dos nossos melhores negócios não permanecem disponíveis por muito tempo.
            </div>

        </div>

        <div class="elite-footer">
            <button class="elite-btn" id="eliteClose">
                Entendi
            </button>
        </div>
    `;

    overlay.appendChild(popup);
    document.body.appendChild(overlay);

    document.getElementById('eliteClose').onclick = () => {
        overlay.remove();
    };

})();
