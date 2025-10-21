// Script para detectar clique no botão do microfone do Jitsi
// Funciona dentro do iframe 8x8.vc

(function() {
  'use strict';
  
  console.log('🎯 [JITSI] Iniciando detecção do botão do microfone...');
  
  let eventoAdicionado = false;
  let tentativas = 0;
  const MAX_TENTATIVAS = 120; // 60 segundos (500ms x 120)
  
  // Adicionar estilos
  function adicionarEstilos() {
    if (document.getElementById('popup-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'popup-styles';
    style.textContent = `
      @keyframes popupFadeIn {
        from { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
        to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
      }
      @keyframes popupFadeOut {
        from { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        to { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
      }
    `;
    document.head.appendChild(style);
  }
  
  // Função para criar e mostrar o popup
  function mostrarPopup() {
    console.log('🎤 [POPUP] Botão clicado! Mostrando popup...');
    
    const popup = document.createElement('div');
    popup.textContent = 'Olá!';
    popup.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 40px 80px;
      font-size: 32px;
      font-weight: bold;
      border-radius: 20px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
      z-index: 999999;
      animation: popupFadeIn 0.3s ease-out;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    `;
    
    document.body.appendChild(popup);
    
    setTimeout(() => {
      popup.style.animation = 'popupFadeOut 0.3s ease-out';
      setTimeout(() => popup.remove(), 300);
    }, 5000);
  }
  
  // Procurar o botão na toolbar do Jitsi
  function encontrarBotaoMicrofone() {
    // O Jitsi usa classes específicas
    const seletores = [
      'div.toolbox-button[aria-label*="microphone" i]',
      'div.toolbox-button[aria-label*="mute" i]',
      'div.toolbox-button[aria-label*="unmute" i]',
      'button[aria-label*="microphone" i]',
      'div[aria-label*="microphone" i]',
      '.toolbox-content-items div[role="button"]',
      '.new-toolbox div[role="button"]'
    ];
    
    for (let seletor of seletores) {
      const elementos = document.querySelectorAll(seletor);
      for (let el of elementos) {
        const label = el.getAttribute('aria-label') || '';
        if (label.toLowerCase().includes('microphone') || 
            label.toLowerCase().includes('mute')) {
          return el;
        }
      }
    }
    
    return null;
  }
  
  // Adicionar evento ao botão
  function adicionarEventoAoBotao(botao) {
    if (eventoAdicionado) return;
    
    console.log('✅ [SUCESSO] Botão encontrado! Adicionando evento...');
    console.log('📍 Elemento:', botao);
    console.log('📍 aria-label:', botao.getAttribute('aria-label'));
    
    adicionarEstilos();
    
    // Usar 'mousedown' ao invés de 'click' para capturar mais cedo
    botao.addEventListener('mousedown', mostrarPopup, true);
    botao.addEventListener('click', mostrarPopup, true);
    
    eventoAdicionado = true;
    console.log('🎉 [ATIVO] Script totalmente funcional!');
  }
  
  // Tentar encontrar o botão repetidamente
  function tentarEncontrar() {
    if (eventoAdicionado) return;
    
    tentativas++;
    const botao = encontrarBotaoMicrofone();
    
    if (botao) {
      adicionarEventoAoBotao(botao);
    } else {
      if (tentativas % 10 === 0) {
        console.log(`⏳ [PROCURANDO] Tentativa ${tentativas}/${MAX_TENTATIVAS}...`);
      }
      
      if (tentativas < MAX_TENTATIVAS) {
        setTimeout(tentarEncontrar, 500);
      } else {
        console.error('❌ [TIMEOUT] Botão não encontrado após 60 segundos');
        console.log('🔍 [DEBUG] HTML do body:', document.body ? 'existe' : 'não existe');
        console.log('🔍 [DEBUG] Toolbox:', document.querySelector('.toolbox-content-items'));
      }
    }
  }
  
  // Iniciar quando o DOM estiver pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', tentarEncontrar);
  } else {
    tentarEncontrar();
  }
  
  console.log('🚀 [INICIALIZADO] Sistema de detecção ativo');
})();