(() => {

  // ===== TROCAR LOGO =====
  const container = document.querySelector(
    '.DisplayContent_displayContent__I14hU.DisplayContent_hideMobile__K13cl.DisplayContent_hideTablet__ISpUr.DisplayContent_hideLargeTablet__jiADA'
  );

  if (container) {
    container.innerHTML = "";

    const img = document.createElement("img");
    img.src = "https://universalautorepasse.com.br/wp-content/uploads/2024/10/Universal-Veiculos-e-Repasses-300x275.png";

    img.style.height = "39px";
    img.style.width = "auto";
    img.style.objectFit = "contain";

    container.appendChild(img);
  }

  // ===== TROCAR TEXTO =====
  function replaceText(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      node.nodeValue = node.nodeValue.replace(/Portal do Lojista/gi, "Universal Auto");
    } else {
      node.childNodes.forEach(replaceText);
    }
  }

  replaceText(document.body);

  // observer pra React não reverter
  const observer = new MutationObserver(() => {
    replaceText(document.body);
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  // ===== ALTERAR HERO =====
  const hero = document.querySelector('.Hero_heroBackground__n2WjH');

  if (hero) {
    hero.style.position = "relative";

    hero.style.setProperty("background", `
      linear-gradient(135deg, #2563eb 0%, #1e40af 50%, #1e3a8a 100%)
    `, "important");

    // evita duplicar glow se rodar mais de uma vez
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
    }
  }

  console.log("Tudo aplicado com sucesso 🚀");

})();