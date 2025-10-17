// Criar um elemento de teste EXATAMENTE como o Jitsi cria
const testDiv = document.createElement('div');
testDiv.className = 'css-weia6j-textContainer';
testDiv.innerHTML = '<span class="css-mepu61-title">Your microphone is muted by the moderator</span>';
document.body.appendChild(testDiv);

console.log("✅ Elemento criado!");
console.log("Texto ANTES:", testDiv.querySelector('.css-mepu61-title').textContent);

// Aguardar 3 segundos para o MutationObserver do nosso script processar
setTimeout(() => {
    const span = testDiv.querySelector('.css-mepu61-title');
    console.log("Texto DEPOIS:", span.textContent);
    
    if(span.textContent === "Seu microfone está mutado") {
        console.log("✅✅✅ SUCESSO! O script está funcionando perfeitamente!");
        testDiv.style.cssText = "position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:green;color:white;padding:20px;font-size:24px;z-index:9999;border-radius:10px;";
    } else {
        console.log("❌ O script NÃO está funcionando. Texto atual:", span.textContent);
        testDiv.style.cssText = "position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:red;color:white;padding:20px;font-size:24px;z-index:9999;border-radius:10px;";
    }
}, 3000);