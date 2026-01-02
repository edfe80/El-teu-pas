document.addEventListener("DOMContentLoaded", () => {

  /* CONSTANTS I ESTAT GLOBAL  */

  // Per Guardar les dades al LocalStorage
  const CLAU_STORAGE = "elteupas_dades";

    const CONFIG_DEFECTE = {
    objectiu: 5000,        // objectiu diari de passos
    longitudPas: 0.75,     // longitud mitjana del pas (en metres)
    modeNit: false         // estat del mode fosc
  };

  // Estat actual de la configuració
  let config = { ...CONFIG_DEFECTE };

  // Registre de passos per dies (format: YYYY-MM-DD → passos)
  let registre = {};

  // Comptador de passos del dia actual
  let passosAvui = 0;

  // Marca temporal
  let darrerPas = 0;

  // Data actual en format ISO 
  const dataISO = new Date().toISOString().split("T")[0];

  /* FUNCIONS D’UTILITAT */

	function formatarData(dataISO) {
    const [any, mes, dia] = dataISO.split("-");
    return `${dia}/${mes}/${any}`;
  }

  /* DOM */

  const pasCount = document.getElementById("pasCount");
  const distEst = document.getElementById("distEst");
  const barraProgres = document.getElementById("barraProgres");
  const pasObjectiu = document.getElementById("pasObjectiu");
  const dataText = document.getElementById("dataAvui");

  const btnConfig = document.getElementById("btnConfig");
  const panelConfig = document.getElementById("configPanel");
  const overlay = document.getElementById("overlay");
  const btnTancarConfig = document.getElementById("closeConfig");
  const btnReset = document.getElementById("resetBtn");

  const chkModeNit = document.getElementById("modeNit");
  const inputObjectiu = document.getElementById("inputObjectiu");
  const inputLongitudPas = document.getElementById("stride");

  /* GESTIÓ DE DADES (LOCALSTORAGE) */

  function carregarDades() {
    try {
      const dadesText = localStorage.getItem(CLAU_STORAGE);
      if (!dadesText) return;

      const dades = JSON.parse(dadesText);

      config = { ...CONFIG_DEFECTE, ...dades.config };
      registre = dades.registre || {};
    } catch (error) {
      console.warn("No s’han pogut carregar les dades desades");
    }
  }

  function desarDades() {
    localStorage.setItem(
      CLAU_STORAGE,
      JSON.stringify({ config, registre })
    );
  }

  /* INICIALITZACIÓ DEL DIA ACTUAL */

  function iniciarDia() {
    if (!registre[dataISO]) {
      registre[dataISO] = 0;
      desarDades();
    }
    passosAvui = registre[dataISO];
  }

  /* INTERFÍCIE */

   function aplicarConfiguracio() {
    document.body.classList.toggle("nit", config.modeNit);

    chkModeNit.checked = config.modeNit;
    inputObjectiu.value = config.objectiu;
    inputLongitudPas.value = config.longitudPas;
    pasObjectiu.textContent = config.objectiu;
  }

  function actualitzarUI() {
    pasCount.textContent = passosAvui;

    const distancia = passosAvui * config.longitudPas;
    distEst.textContent = `${distancia.toFixed(2)} m`;

    const percentatge = Math.min(passosAvui / config.objectiu, 1);
    barraProgres.style.width = `${percentatge * 100}%`;
  }

  /* DETECCIÓ DE PASSOS */

  function detectarPas(acceleracio) {
    const ara = Date.now();
    const magnitud =
      Math.abs(acceleracio.x) +
      Math.abs(acceleracio.y) +
      Math.abs(acceleracio.z);

    // Llindar empíric i temps mínim entre passos
    if (magnitud > 25 && ara - darrerPas > 700) {
      darrerPas = ara;

      passosAvui++;
      registre[dataISO] = passosAvui;

      desarDades();
      actualitzarUI();
    }
  }

  window.addEventListener("devicemotion", (event) => {
    if (event.accelerationIncludingGravity) {
      detectarPas(event.accelerationIncludingGravity);
    }
  });

  /* GESTIÓ DEL PANELL DE CONFIGURACIÓ */

  btnConfig.onclick = () => {
    panelConfig.classList.add("show");
    overlay.classList.add("show");
  };

  function tancarConfiguracio() {
    panelConfig.classList.remove("show");
    overlay.classList.remove("show");
  }

  btnTancarConfig.onclick = tancarConfiguracio;
  overlay.onclick = tancarConfiguracio;

  chkModeNit.onchange = () => {
    config.modeNit = chkModeNit.checked;
    aplicarConfiguracio();
    desarDades();
  };

  inputObjectiu.onchange = () => {
    config.objectiu = Number(inputObjectiu.value);
    pasObjectiu.textContent = config.objectiu;
    desarDades();
    actualitzarUI();
  };

  inputLongitudPas.onchange = () => {
    config.longitudPas = Number(inputLongitudPas.value);
    desarDades();
    actualitzarUI();
  };

  btnReset.onclick = () => {
    passosAvui = 0;
    registre[dataISO] = 0;
    desarDades();
    actualitzarUI();
  };

  /* ANIMACIÓ GENERATIVA (p5.js) */

  new p5((p) => {
    let angleBase = 0;
    const PASSOS_PER_VOLTA = 1000;

    p.setup = () => {
      p.createCanvas(
        document.getElementById("canvasWrapper").clientWidth,
        220
      ).parent("canvasWrapper");
    };

    p.draw = () => {
      p.background(0);

      // Cada 1.000 passos es genera una nova volta
      const nombreVoltes = Math.floor(passosAvui / PASSOS_PER_VOLTA) + 1;

      angleBase += 0.01;
      p.noStroke();
      p.fill(59, 130, 246);

      for (let i = 0; i < nombreVoltes; i++) {
        const radi = 40 + i * 22;
        const angle = angleBase * (1 + i * 0.15);

        const x = p.width / 2 + Math.cos(angle) * radi;
        const y = p.height / 2 + Math.sin(angle) * radi;

        p.circle(x, y, 20);
      }
    };
  });

  /* INICIALITZACIÓ FINAL */

  dataText.textContent = formatarData(dataISO);

  carregarDades();
  iniciarDia();
  aplicarConfiguracio();
  actualitzarUI();

});