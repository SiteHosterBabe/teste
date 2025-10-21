// Script para mostrar popup ao clicar no botão do microfone
// Usando MutationObserver para detectar quando o botão é criado

(function() {
  'use strict';
  
  console.log('🎯 Iniciando detecção do botão do microfone...');
  
  let eventoAdicionado = false;
  
  // Função para encontrar o botão
  function encontrarBotao() {
    // Tentar vários seletores possíveis
    const seletores = [
      '.toolbox-button[aria-label*="microphone"]',
      '.toolbox-button[aria-label*="Unmute"]',
      'button[aria-label*="microphone"]',
      'div[aria-label*="microphone"]',
      '[class*="audio"][class*="button"]',
      '[data-testid*="microphone"]'
    ];
    
    for (let seletor of seletores) {
      const botao = document.querySelector(seletor);
      if (botao) {
        console.log(`✓ Botão encontrado com seletor: ${seletor}`);
        return botao;
      }
    }
    
    return null;
  }
  
  // Função para adicionar o evento ao botão
  function adicionarEvento(botao) {
    if (eventoAdicionado) return;
    
    console.log('✅ Adicionando evento de clique ao botão...');
    
    // Adicionar estilos para o popup
    if (!document.getElementById('popup-styles')) {
      const style = document.createElement('style');
      style.id = 'popup-styles';
      style.textContent = `
        @keyframes fadeIn {
          from { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
          to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
        @keyframes fadeOut {
          from { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          to { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        }
      `;
      document.head.appendChild(style);
    }
    
    // Evento de clique
    botao.addEventListener('click', function() {
      console.log('🎤 Botão do microfone clicado!');
      
      // Criar popup
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
        animation: fadeIn 0.3s ease-in;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      `;
      
      document.body.appendChild(popup);
      
      // Remover após 5 segundos
      setTimeout(function() {
        popup.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(function() {
          popup.remove();
        }, 300);
      }, 5000);
    });
    
    eventoAdicionado = true;
    console.log('✅ Script ativado! Clique no botão do microfone.');
  }
  
  // Tentar imediatamente
  const botaoInicial = encontrarBotao();
  if (botaoInicial) {
    adicionarEvento(botaoInicial);
  } else {
    console.log('⏳ Botão não encontrado ainda. Observando mudanças no DOM...');
    
    // Usar MutationObserver para detectar quando o botão aparecer
    const observer = new MutationObserver(function(mutations) {
      if (eventoAdicionado) {
        observer.disconnect();
        return;
      }
      
      const botao = encontrarBotao();
      if (botao) {
        console.log('✓ Botão detectado pelo MutationObserver!');
        adicionarEvento(botao);
        observer.disconnect();
      }
    });
    
    // Observar TODO o documento
    observer.observe(document.body || document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true
    });
    
    // Timeout de segurança (60 segundos)
    setTimeout(function() {
      if (!eventoAdicionado) {
        observer.disconnect();
        console.error('✗ Timeout: Botão não encontrado após 60 segundos.');
        console.log('📋 Estrutura do DOM:', document.body.innerHTML.substring(0, 500));
      }
    }, 60000);
  }
  
  console.log('🚀 Sistema de detecção inicializado!');
})();