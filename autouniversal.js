// CSS obrigatório
if (!document.getElementById('popup-style')) {
    const style = document.createElement('style');
    style.id = 'popup-style';
    style.innerHTML = `
        .professional-notification-overlay {
            position: fixed;
            top:0;
            left:0;
            width:100%;
            height:100%;
            background: rgba(0,0,0,0.65);
            display:flex;
            align-items:center;
            justify-content:center;
            z-index:999999;
        }
    `;
    document.head.appendChild(style);
}

// função
function showWelcomeNotification() {
    if (document.getElementById('professional-notification-overlay')) return;

    const overlay = document.createElement('div');
    overlay.className = 'professional-notification-overlay';
    overlay.id = 'professional-notification-overlay';

    const box = document.createElement('div');
    box.style.cssText = `
        background:white;
        border-radius:16px;
        max-width:600px;
        width:92%;
        box-shadow:0 40px 80px rgba(0,0,0,0.35);
        overflow:hidden;
        font-family:sans-serif;
    `;

    box.innerHTML = `
        <div style="background:#111827;color:white;padding:24px;">
            <div style="font-size:22px;font-weight:700;">
                🚗 Universal Auto Repasse
            </div>
            <div style="font-size:14px;opacity:0.8;">
                Loja oficial de veículos
            </div>
        </div>

        <div style="padding:24px;">
            <div style="font-size:16px;font-weight:600;margin-bottom:10px;">
                Também temos uma loja de veículos online
            </div>

            <p style="color:#444;font-size:14px;line-height:1.5;">
                Além do leilão, você pode acessar nossa loja com veículos
                disponíveis para compra direta, com ótimas oportunidades.
            </p>

            <div style="margin-top:15px;background:#f3f4f6;padding:12px;border-radius:8px;font-size:13px;">
                ✔ Preços competitivos<br>
                ✔ Estoque atualizado<br>
                ✔ Compra rápida
            </div>

            <div style="text-align:center;margin-top:20px;">
                <button id="fecharPopup" style="
                    background:#111827;
                    color:white;
                    border:none;
                    padding:12px 24px;
                    border-radius:8px;
                    cursor:pointer;
                ">
                    Entendi
                </button>
            </div>
        </div>
    `;

    overlay.appendChild(box);
    document.body.appendChild(overlay);

    document.getElementById("fecharPopup").onclick = () => {
        overlay.remove();
    };
}

// EXECUTAR
showWelcomeNotification();