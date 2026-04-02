(() => {

  // Função para trocar a logo
  function updateLogo() {
    const container = document.querySelector(
      '.DisplayContent_displayContent__I14hU.DisplayContent_hideMobile__K13cl.DisplayContent_hideTablet__ISpUr.DisplayContent_hideLargeTablet__jiADA'
    );
    if (!container) return;

    // evita duplicar
    if (!container.querySelector("img")) {
      container.innerHTML = "";

      const img = document.createElement("img");
      img.src = "https://universalautorepasse.com.br/wp-content/uploads/2024/10/Universal-Veiculos-e-Repasses-300x275.png";
      img.style.height = "39px";
      img.style.width = "auto";
      img.style.objectFit = "contain";

      container.appendChild(img);
      console.log("Logo atualizada");
    }
  }

  // Função para alterar o Hero
  function updateHero() {
    const hero = document.querySelector('.Hero_heroBackground__n2WjH');
    if (!hero) return;

    hero.style.position = "relative";
    hero.style.setProperty("background", `
      linear-gradient(135deg, #2563eb 0%, #1e40af 50%, #1e3a8a 100%)
    `, "important");

    if (!hero.querySelector(".custom-glow")) {
      const glow = document.createElement("div");
      glow.className = "custom-glow";
      glow.style.position = "absolute";
      glow.style.top = "-100px";
      glow.style.left = "-100px";
      glow.style.width = "400px";
      glow.style.height = "400px";
      glow.style.background = "rgba(59,130,246,0.4)";
      glow.style.filter = "blur(120px)";
      glow.style.borderRadius = "50%";
      glow.style.pointerEvents = "none";
      hero.appendChild(glow);
      console.log("Hero atualizado");
    }
  }

  // Função para trocar textos
  function replaceText(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      node.nodeValue = node.nodeValue.replace(/Portal do Lojista/gi, "Universal Auto");
    } else {
      node.childNodes.forEach(replaceText);
    }
  }

  // Observador para elementos dinâmicos
  const observer = new MutationObserver(() => {
    replaceText(document.body);
    updateLogo();
    updateHero();
  });

  observer.observe(document.body, { childList: true, subtree: true });

  // rodar uma vez no carregamento
  replaceText(document.body);
  updateLogo();
  updateHero();

  console.log("Tudo aplicado com observer ✅");

})();