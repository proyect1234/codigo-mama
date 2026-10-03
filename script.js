/* ==========================================================
   CÓDIGO FUENTE DE MAMÁ
   Todo el contenido editable está en la sección PERSONALIZACIÓN.
   No hace falta tocar nada por debajo de esa sección.
   ========================================================== */

// ==============================
// PERSONALIZACIÓN
// ==============================
const CONFIG = {

  // ---- Colores (formato #rrggbb) ----
  colores: {
    // Editor oscuro
    fondo: "#0c0e12",          // fondo del editor
    panel: "#12151b",          // barras superior, inferior y panel de salida
    texto: "#d9dee5",          // texto general
    tenue: "#7d8895",          // texto secundario
    linea: "#232832",          // líneas divisorias
    numeros: "#525b67",        // números de línea
    // Resaltado de sintaxis
    clave: "#5fcfdc",          // class, def, return, True...
    cadena: "#b2dca3",         // textos entre comillas
    nombre: "#f2f5f8",         // nombres de clases y funciones
    variable: "#9db4cc",       // variables (amor, paciencia...)
    comentario: "#7a9187",     // comentarios
    funcion: "#8fe3c0",        // llamadas como print()
    // Detalles
    acento: "#6fe3d3",         // cursor, barra de ejecución, partículas, resultado
    corazon: "#ff7f95",        // rosa del editor
    // Amanecer (pantalla cálida final)
    amanecerArriba: "#fde9da", // color superior del fondo cálido
    amanecerAbajo: "#f4bfc2",  // color inferior del fondo cálido
    sol: "#ffd9a8",            // resplandor inferior
    tinta: "#3b2230",          // color del texto del mensaje final
    corazonCalido: "#d6486a",  // corazones de la pantalla cálida
    particulaCalida: "#e8a48a",// partículas de la pantalla cálida
  },

  // ---- Velocidad ----
  velocidad: {
    escritura: 26,   // milisegundos por carácter (más alto = más lento)
    pausaLinea: 130, // pausa al terminar cada línea de código
    pausas: 1,       // multiplicador de pausas: 1 = normal, 1.5 = más pausado, 0.6 = más ágil
    amanecer: 3500,  // duración de la transformación a la pantalla cálida (ms)
  },

  // ---- Partículas y corazones (0 para quitarlos) ----
  efectos: {
    particulas: 16,
    corazones: 7,
  },

  // ---- Música (opcional) ----
  musica: {
    activada: true,                       // false = oculta el botón de música
    archivo: "audio/music.mp3",           // ruta del archivo local
    volumen: 0.6,                         // de 0 a 1
    texto: "🎵 Música",
    textoNoDisponible: "Música no disponible",
  },

  // ---- Textos ----
  textos: {

    // Interfaz del editor
    ui: {
      lenguaje: "Python",
      codificacion: "UTF-8",
      ejecutando: "Ejecutando",
      listo: "Listo",
      linea: "Ln",
      columna: "Col",
      panel: "terminal",
      saltar: "saltar",
      continuar: "Continuar",
      reiniciar: "↺ Volver a ver",
    },

    // 1, 2 y 3. Archivo, código y comentarios (Python). Puedes cambiar cualquier línea.
    codigo: {
      archivo: "source_code/mama.py",
      fuente: `
class Mama:

    # La variable "amor" no tiene límite.
    amor = "infinito"
    paciencia = "infinita"
    abrazos = "ilimitados"
    cariño = "incondicional"
    fortaleza = "extraordinaria"


# Algunos sistemas necesitan mantenimiento.
# Este amor no.
def cuidar():
    return True


def enseñar():
    return "cada día"


def acompañar():
    return "siempre"


def amar():
    return "para siempre"


# Existen cosas que ningún algoritmo puede calcular.
mama = Mama()

print("Ejecutando...")
`,
    },

    // 4. Ejecución
    ejecucion: {
      ejecutando: "Ejecutando",
      salida: [
        "Output:",
        "",
        "Sistema iniciado correctamente.",
        "",
        "Resultado:",
      ],
      resultado: "AMOR INFINITO ❤️",
    },

    // 5. Transición. Cada elemento es un párrafo.
    //    - **Texto entre dos asteriscos** se muestra grande y destacado.
    //    - `Texto entre comillas invertidas` se muestra como código.
    //    - Un elemento que solo tiene símbolos (como "❤️") se muestra grande y centrado.
    transicion: [
      "Hay cosas que pueden explicarse con código.",
      "Hay cosas que pueden resolverse con algoritmos.",
      "Hay cosas que pueden almacenarse en una memoria.",
      "Pero hay algo que ningún lenguaje de programación puede expresar completamente:",
      "**el amor de una madre.**",
    ],

    // 6. Mensaje final (mismas reglas de formato que la transición)
    final: [
      "Gracias por cuidar.",
      "Gracias por enseñar.",
      "Gracias por escuchar.",
      "Gracias por estar.",
      "Y gracias por hacer que incluso los momentos difíciles sean un poco más fáciles.",
      "❤️",
      "`amor = infinito`",
    ],
  },
};

// ==============================
// FIN DE LA PERSONALIZACIÓN
// (no es necesario modificar nada de aquí hacia abajo)
// ==============================

(() => {
  "use strict";

  const $ = (selector) => document.querySelector(selector);
  const reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const V = CONFIG.velocidad;
  const U = CONFIG.textos.ui;

  const lienzo = $("#lienzo");
  const escena = $("#escena");

  const estado = {
    saltar: false,
    despertadores: new Set(),
  };

  // ---------- Colores ----------

  function hexARgb(hex) {
    const m = /^#?([0-9a-f]{6})$/i.exec(String(hex).trim());
    if (!m) return null;
    const n = parseInt(m[1], 16);
    return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
  }

  function aplicarColores() {
    const c = CONFIG.colores;
    const raiz = document.documentElement.style;
    const mapa = {
      fondo: "--fondo",
      panel: "--panel",
      texto: "--texto",
      tenue: "--tenue",
      linea: "--linea",
      numeros: "--numeros",
      clave: "--clave",
      cadena: "--cadena",
      nombre: "--nombre",
      variable: "--variable",
      comentario: "--comentario",
      funcion: "--funcion",
      acento: "--acento",
      corazon: "--corazon",
      amanecerArriba: "--amanecer-arriba",
      amanecerAbajo: "--amanecer-abajo",
      sol: "--sol",
      tinta: "--tinta",
      corazonCalido: "--corazon-calido",
      particulaCalida: "--particula-calida",
    };
    const conRgb = new Set([
      "fondo", "panel", "acento", "corazon", "sol", "tinta", "corazonCalido", "particulaCalida",
    ]);
    Object.entries(mapa).forEach(([clave, variable]) => {
      if (!c[clave]) return;
      raiz.setProperty(variable, c[clave]);
      if (conRgb.has(clave)) {
        const rgb = hexARgb(c[clave]);
        if (rgb) raiz.setProperty(variable + "-rgb", rgb);
      }
    });
    raiz.setProperty("--t-amanecer", V.amanecer + "ms");
    raiz.setProperty("--t-editor", Math.round(V.amanecer * 0.7) + "ms");
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta && c.fondo) meta.setAttribute("content", c.fondo);
  }

  // ---------- Tiempo: pausas y "saltar" ----------

  // Espera interrumpible. Si se pulsa "saltar", todas las esperas terminan al instante.
  function dormir(ms) {
    if (estado.saltar) return Promise.resolve();
    const tiempo = reducido ? Math.min(ms, 200) : ms;
    return new Promise((resolver) => {
      const fin = () => {
        clearTimeout(id);
        estado.despertadores.delete(fin);
        resolver();
      };
      const id = setTimeout(fin, tiempo);
      estado.despertadores.add(fin);
    });
  }

  const pausa = (ms) => dormir(ms * V.pausas);

  function saltar() {
    estado.saltar = true;
    [...estado.despertadores].forEach((fin) => fin());
  }

  function mostrarSaltar(visible) {
    $("#btn-saltar").hidden = !visible;
  }

  function reflujo(el) {
    void el.offsetWidth;
  }

  // ---------- DOM ----------

  function crear(padre, etiqueta, clase, texto) {
    const el = document.createElement(etiqueta);
    if (clase) el.className = clase;
    if (texto) el.textContent = texto;
    padre.append(el);
    return el;
  }

  const span = (padre, clase = "", texto = "") => crear(padre, "span", clase, texto);

  // ---------- Scroll automático (solo si la persona sigue al final) ----------

  let pegado = true;
  lienzo.addEventListener(
    "scroll",
    () => {
      pegado = lienzo.scrollTop + lienzo.clientHeight >= lienzo.scrollHeight - 40;
    },
    { passive: true }
  );

  function seguir() {
    if (pegado) lienzo.scrollTop = lienzo.scrollHeight;
  }

  let pegadoEscena = true;
  escena.addEventListener(
    "scroll",
    () => {
      pegadoEscena = escena.scrollTop + escena.clientHeight >= escena.scrollHeight - 60;
    },
    { passive: true }
  );

  function mostrarEnEscena(el) {
    if (!pegadoEscena) return;
    el.scrollIntoView({ block: "nearest", behavior: reducido ? "auto" : "smooth" });
  }

  // ---------- Barra de estado ----------

  function setEstado(texto) {
    $("#estado-izq").textContent = texto;
  }

  function setPos(linea, columna) {
    $("#estado-pos").textContent = `${U.linea} ${linea}, ${U.columna} ${columna}`;
  }

  // ---------- Escritura ----------

  const caret = document.createElement("span");
  caret.className = "caret";
  caret.setAttribute("aria-hidden", "true");

  // Escribe "texto" dentro de "el" carácter a carácter, con un ritmo natural.
  async function escribir(el, texto, ms = V.escritura, alPaso = null) {
    el.after(caret);
    const caracteres = Array.from(texto);
    if (reducido || estado.saltar || ms <= 0) {
      el.textContent += texto;
      if (alPaso) alPaso(caracteres.length);
      seguir();
      return;
    }
    for (let i = 0; i < caracteres.length; i++) {
      if (estado.saltar) {
        el.textContent += caracteres.slice(i).join("");
        if (alPaso) alPaso(caracteres.length);
        break;
      }
      const c = caracteres[i];
      el.textContent += c;
      if (alPaso) alPaso(i + 1);
      seguir();
      let espera = ms * (0.75 + Math.random() * 0.5);
      if (".…,;:".includes(c)) espera += ms * 4;
      await dormir(espera);
    }
    seguir();
  }

  // ---------- Resaltado de sintaxis (Python) ----------

  function tokenizar(fuente) {
    const re = /"[^"\n]*"|'[^'\n]*'|#[^\n]*|[\p{L}_][\p{L}\p{N}_]*|\d+|\s+|[^\s]/gu;
    const claves = new Set([
      "class", "def", "return", "if", "else", "elif", "for", "while", "in", "import",
      "from", "as", "and", "or", "not", "pass", "try", "except", "with", "lambda",
      "True", "False", "None",
    ]);
    const integradas = new Set(["print", "len", "range", "input", "str", "int"]);
    const tokens = [];
    let previo = "";
    let m;
    while ((m = re.exec(fuente))) {
      const t = m[0];
      let cls = "";
      if (t[0] === '"' || t[0] === "'") cls = "t-str";
      else if (t[0] === "#") cls = "t-com";
      else if (/^[\p{L}_]/u.test(t)) {
        const resto = fuente.slice(re.lastIndex);
        if (claves.has(t)) cls = "t-kw";
        else if (previo === "class" || previo === "def") cls = "t-nom";
        else if (resto[0] === "(") cls = integradas.has(t) ? "t-fn" : /^\p{Lu}/u.test(t) ? "t-nom" : "t-fn";
        else if (/^\s*=(?!=)/.test(resto)) cls = "t-var";
      }
      tokens.push({ texto: t, cls });
      if (!/^\s+$/.test(t)) previo = t;
    }
    return tokens;
  }

  // ---------- Etapa 1: el código se escribe ----------

  let lineaActiva = null;

  function activar(linea) {
    if (lineaActiva) lineaActiva.classList.remove("activa");
    linea.classList.add("activa");
    lineaActiva = linea;
  }

  async function secuenciaCodigo() {
    const C = CONFIG.textos.codigo;
    const cont = $("#codigo");
    const fuente = C.fuente.replace(/^\n+|\s+$/g, "");

    mostrarSaltar(true);
    setEstado(U.lenguaje);
    await pausa(900);

    let numero = 0;
    let columna = 1;
    let celda = null;

    const nuevaLinea = () => {
      const linea = crear(cont, "div", "l");
      celda = crear(linea, "div", "c");
      celda.append(caret);
      numero++;
      columna = 1;
      activar(linea);
      setPos(numero, columna);
      seguir();
    };

    nuevaLinea();

    for (const token of tokenizar(fuente)) {
      if (/^\s+$/.test(token.texto)) {
        // Espacios y saltos de línea: se colocan al instante (los saltos llevan una pausa).
        let tramo = "";
        const volcar = () => {
          if (!tramo) return;
          const s = span(celda, "", tramo);
          s.after(caret);
          columna += tramo.length;
          tramo = "";
          setPos(numero, columna);
        };
        for (const ch of token.texto) {
          if (ch === "\n") {
            volcar();
            await pausa(V.pausaLinea);
            nuevaLinea();
          } else {
            tramo += ch;
          }
        }
        volcar();
      } else {
        const s = span(celda, token.cls);
        const base = columna;
        await escribir(s, token.texto, V.escritura, (n) => setPos(numero, base + n));
        columna = base + Array.from(token.texto).length;
      }
    }

    await pausa(900);
  }

  // ---------- Etapa 2: ejecución ----------

  async function secuenciaEjecucion() {
    const E = CONFIG.textos.ejecucion;
    const panel = $("#panel");
    const cuerpo = $("#panel-cuerpo");
    const barrido = $("#barrido");

    setEstado("▶ " + U.ejecutando);
    panel.classList.add("abierto");
    barrido.classList.add("activo");
    await dormir(850);
    pegado = true;
    seguir();

    // Pequeña animación de ejecución
    const espera = crear(cuerpo, "div", "sl tenue");
    span(espera, "", E.ejecutando);
    span(espera, "pt", ".");
    span(espera, "pt", ".");
    span(espera, "pt", ".");
    await pausa(1900);

    espera.remove();
    barrido.classList.remove("activo");
    setEstado("✓ " + U.listo);

    // Salida del programa
    for (let i = 0; i < E.salida.length; i++) {
      const texto = E.salida[i];
      if (texto === "") {
        crear(cuerpo, "div", "sl vacia");
        continue;
      }
      const linea = crear(cuerpo, "div", i === 0 ? "sl tenue" : "sl");
      await escribir(span(linea), texto, V.escritura * 0.9);
      cuerpo.scrollTop = cuerpo.scrollHeight;
      await pausa(i === 0 ? 400 : 250);
    }
    const resultado = crear(cuerpo, "div", "sl");
    await escribir(span(resultado, "resultado-salida"), E.resultado, V.escritura * 1.3);
    cuerpo.scrollTop = cuerpo.scrollHeight;

    await pausa(2800);
  }

  // ---------- Etapa 3: el amanecer ----------

  async function secuenciaAmanecer() {
    mostrarSaltar(false);
    estado.saltar = false;

    if (lineaActiva) lineaActiva.classList.remove("activa");
    caret.remove();

    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta && CONFIG.colores.amanecerArriba) meta.setAttribute("content", CONFIG.colores.amanecerArriba);

    const editor = $("#editor");
    document.body.classList.add("amanecer");
    reflujo(editor);
    editor.classList.add("disolviendo");
    await dormir(V.amanecer * 0.75);
    editor.hidden = true;
    await dormir(V.amanecer * 0.3);
    escena.hidden = false;
    escena.scrollTop = 0;
  }

  // ---------- Mensajes (transición y final) ----------

  function crearParrafos(lista, contenedor) {
    return lista.map((texto) => {
      const p = document.createElement("p");
      let m;
      if ((m = /^\*\*(.+)\*\*$/.exec(texto))) {
        p.className = "enfasis";
        p.textContent = m[1];
      } else if ((m = /^`(.+)`$/.exec(texto))) {
        p.className = "cod-linea";
        crear(p, "code", "", m[1]);
      } else if (/^[^\p{L}\p{N}]+$/u.test(texto)) {
        p.className = "simbolo";
        p.textContent = texto;
      } else {
        p.textContent = texto;
      }
      contenedor.append(p);
      return p;
    });
  }

  function esperaAntes(p) {
    if (p.classList.contains("enfasis")) return 2600;
    if (p.classList.contains("simbolo")) return 1400;
    if (p.classList.contains("cod-linea")) return 1200;
    return 1700;
  }

  async function revelar(parrafos) {
    await pausa(900);
    for (let i = 0; i < parrafos.length; i++) {
      if (i > 0) await pausa(esperaAntes(parrafos[i]));
      reflujo(parrafos[i]);
      parrafos[i].classList.add("visible");
      mostrarEnEscena(parrafos[i]);
    }
  }

  async function mensajeTransicion() {
    const bloque = $("#bloque");
    const boton = $("#btn-continuar");

    const parrafos = crearParrafos(CONFIG.textos.transicion, bloque);
    await revelar(parrafos);

    await pausa(1800);
    boton.hidden = false;
    reflujo(boton);
    boton.classList.add("visible");
    mostrarEnEscena(boton);

    await new Promise((resolver) => boton.addEventListener("click", resolver, { once: true }));
    boton.disabled = true;
    boton.classList.remove("visible");
    bloque.classList.add("saliendo");
    await dormir(1300);
    boton.hidden = true;
    bloque.textContent = "";
    bloque.classList.remove("saliendo");
    escena.scrollTop = 0;
    pegadoEscena = true;
  }

  async function mensajeFinal() {
    const bloque = $("#bloque");
    const reiniciar = $("#btn-reiniciar");

    const parrafos = crearParrafos(CONFIG.textos.final, bloque);
    await revelar(parrafos);

    await pausa(2200);
    reiniciar.hidden = false;
    reflujo(reiniciar);
    reiniciar.classList.add("visible");
    mostrarEnEscena(reiniciar);
  }

  // ---------- Música ----------

  function configurarMusica() {
    const M = CONFIG.musica;
    const boton = $("#btn-musica");

    if (!M.activada) {
      boton.hidden = true;
      return;
    }

    boton.textContent = M.texto;

    let audio = null;
    let sonando = false;
    let fallo = false;

    function marcarFallo() {
      fallo = true;
      sonando = false;
      boton.textContent = M.textoNoDisponible;
      boton.disabled = true;
      boton.setAttribute("aria-pressed", "false");
    }

    boton.addEventListener("click", async () => {
      if (fallo) return;
      try {
        if (!audio) {
          // El archivo solo se pide cuando la persona pulsa el botón.
          audio = new Audio(M.archivo);
          audio.loop = true;
          audio.volume = Math.min(1, Math.max(0, M.volumen));
          audio.addEventListener("error", marcarFallo);
        }
        if (sonando) {
          audio.pause();
          sonando = false;
          boton.setAttribute("aria-pressed", "false");
        } else {
          await audio.play();
          sonando = true;
          boton.setAttribute("aria-pressed", "true");
        }
      } catch (e) {
        // Archivo inexistente o reproducción bloqueada: la página sigue funcionando.
        marcarFallo();
      }
    });
  }

  // ---------- Partículas y corazones ----------

  function crearEfectos() {
    const E = CONFIG.efectos;
    const particulas = $("#particulas");
    const corazones = $("#corazones");

    for (let i = 0, n = Math.max(0, E.particulas | 0); i < n; i++) {
      const p = crear(particulas, "span", "particula");
      p.style.setProperty("--x", Math.random() * 98 + "%");
      p.style.setProperty("--tam", 2 + Math.random() * 2 + "px");
      p.style.setProperty("--d", 22 + Math.random() * 16 + "s");
      p.style.setProperty("--delay", Math.random() * 18 + "s");
      p.style.setProperty("--dx", Math.random() * 60 - 30 + "px");
    }

    for (let i = 0, n = Math.max(0, E.corazones | 0); i < n; i++) {
      const h = crear(corazones, "span", "corazon", "♥");
      h.style.setProperty("--x", Math.random() * 94 + "%");
      h.style.setProperty("--s", 0.7 + Math.random() * 0.6 + "rem");
      h.style.setProperty("--d", 18 + Math.random() * 12 + "s");
      h.style.setProperty("--delay", Math.random() * 14 + "s");
      h.style.setProperty("--dx", Math.random() * 60 - 30 + "px");
    }
  }

  // ---------- Arranque del programa ----------

  async function main() {
    aplicarColores();
    $("#archivo-nombre").textContent = CONFIG.textos.codigo.archivo;
    $("#panel-tab").textContent = U.panel;
    $("#estado-cod").textContent = U.codificacion;
    $("#btn-saltar").textContent = U.saltar;
    $("#btn-continuar").textContent = U.continuar;
    $("#btn-reiniciar").textContent = U.reiniciar;

    $("#btn-saltar").addEventListener("click", saltar);
    $("#btn-reiniciar").addEventListener("click", () => window.location.reload());

    crearEfectos();
    configurarMusica();

    try {
      await secuenciaCodigo();
      await secuenciaEjecucion();
    } catch (e) {
      console.error(e);
    }
    await secuenciaAmanecer();
    await mensajeTransicion();
    await mensajeFinal();
  }

  main();
})();
