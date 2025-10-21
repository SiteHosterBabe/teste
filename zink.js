// Script para mostrar popup ao clicar no botão do microfone

// Encontrar o botão do microfone
const micButton = document.querySelector('.toolbox-button[aria-label="Unmute microphone"]');

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
} else {
  console.error('✗ Botão do microfone não encontrado. Verifique o seletor.');
}