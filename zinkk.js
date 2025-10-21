// Script para mostrar popup ao clicar no botão do microfone

// Função para encontrar o botão (mesmo dentro de iframes)
function encontrarBotaoMicrofone() {
  // Tentar encontrar no documento principal
  let micButton = document.querySelector('.toolbox-button[aria-label="Unmute microphone"]');
  
  // Se não encontrar, procurar em todos os iframes
  if (!micButton) {
    const iframes = document.querySelectorAll('iframe');
    for (let iframe of iframes) {
      try {
        micButton = iframe.contentDocument?.querySelector('.toolbox-button[aria-label="Unmute microphone"]');
        if (micButton) break;
      } catch (e) {
        // Ignorar erros de acesso cross-origin
      }
    }
  }
  
  return micButton;
}

// Função para adicionar o evento
function adicionarEvento() {
  const micButton = encontrarBotaoMicrofone();
  
  if (micButton) {
  // Adicionar evento de clique
  micButton.addEventListener('click', function() {
    // Criar elemento do popup
    const popup = document.createElement('div');
    popup.textContent = 'Olá!';
    
    // Estilos do popup
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.backgroundColor = '#4CAF50';
    popup.style.color = 'white';
    popup.style.padding = '30px 60px';
    popup.style.fontSize = '24px';
    popup.style.fontWeight = 'bold';
    popup.style.borderRadius = '10px';
    popup.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.3)';
    popup.style.zIndex = '99999';
    popup.style.animation = 'fadeIn 0.3s ease-in';
    
    // Adicionar animação de fade in
    const style = document.createElement('style');
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
    
    // Adicionar popup ao body
    document.body.appendChild(popup);
    
    // Remover popup após 5 segundos
    setTimeout(function() {
      popup.style.animation = 'fadeOut 0.3s ease-out';
      setTimeout(function() {
        popup.remove();
      }, 300);
    }, 5000);
  });
  
  console.log('✓ Script ativado! Clique no botão do microfone para ver o popup.');
  return true;
} else {
  return false;
}
}

// Tentar adicionar o evento imediatamente
if (!adicionarEvento()) {
  console.log('⏳ Aguardando carregamento do botão do microfone...');
  
  // Se não encontrar, tentar novamente a cada 500ms até encontrar
  const intervalo = setInterval(() => {
    if (adicionarEvento()) {
      clearInterval(intervalo);
    }
  }, 500);
  
  // Desistir após 30 segundos
  setTimeout(() => {
    clearInterval(intervalo);
    console.error('✗ Timeout: Botão do microfone não encontrado após 30 segundos.');
  }, 30000);
}