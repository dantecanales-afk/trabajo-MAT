// Referencias a los elementos del DOM
const spanB = document.getElementById("valor-b");
const spanC = document.getElementById("valor-c");
const spanExpresion = document.getElementById("expresion-funcion");
const btnGenerar = document.getElementById("btn-generar");
const btnCopiar = document.getElementById("btn-copiar");

const cajaLineal = document.getElementById("caja-lineal");
const contenidoLineal = document.getElementById("contenido-lineal");

const cajaAfin = document.getElementById("caja-afin");
const contenidoAfin = document.getElementById("contenido-afin");

const inputGgb = document.getElementById("archivo-ggb");
const estadoArchivo = document.getElementById("estado-archivo");

// Genera un número entero aleatorio entre min y max (ambos incluidos)
function generarEnteroAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Formatea la expresión f(x) = bx + c de forma legible
function formatearFuncion(b, c) {
  let textoB = "";
  if (b === 1) textoB = "x";
  else if (b === -1) textoB = "-x";
  else textoB = `${b}x`;

  if (c === 0) {
    return `f(x) = ${textoB}`;
  } else if (c > 0) {
    return `f(x) = ${textoB} + ${c}`;
  } else {
    return `f(x) = ${textoB} - ${Math.abs(c)}`;
  }
}

// Describe el comportamiento de la pendiente b
function obtenerTextoPendiente(b) {
  if (b > 0) {
    return `<strong>Pendiente (b = ${b} &gt; 0):</strong> Función creciente (sube de izquierda a derecha).`;
  } else if (b < 0) {
    return `<strong>Pendiente (b = ${b} &lt; 0):</strong> Función decreciente (baja de izquierda a derecha).`;
  } else {
    return `<strong>Pendiente (b = 0):</strong> Pendiente nula (recta horizontal constante).`;
  }
}

// Función principal que genera b y c y clasifica la función
function generarYClasificar() {
  // 1. Generar coeficientes aleatorios entre -10 y 10
  const b = generarEnteroAleatorio(-10, 10);
  const c = generarEnteroAleatorio(-10, 10);

  // 2. Actualizar valores en la interfaz
  spanB.textContent = b;
  spanC.textContent = c;
  const expresion = formatearFuncion(b, c);
  spanExpresion.textContent = expresion;

  // 3. Evaluar condición (c === 0 -> Lineal | c !== 0 -> Afín)
  if (c === 0) {
    // Activar caja LINEAL y desactivar caja AFÍN
    cajaLineal.classList.add("activa");
    cajaAfin.classList.remove("activa");

    contenidoLineal.innerHTML = `
      <ul>
        <li><strong>Expresión:</strong> ${expresion}</li>
        <li><strong>Gráfica:</strong> Línea recta continua.</li>
        <li><strong>Paso Obligatorio:</strong> Pasa por el origen de coordenadas <strong>(0, 0)</strong>.</li>
        <li>${obtenerTextoPendiente(b)}</li>
      </ul>
    `;

    contenidoAfin.innerHTML = `<p class="mensaje-espera">No aplica (el valor actual de c es 0).</p>`;
  } else {
    // Activar caja AFÍN y desactivar caja LINEAL
    cajaAfin.classList.add("activa");
    cajaLineal.classList.remove("activa");

    contenidoAfin.innerHTML = `
      <ul>
        <li><strong>Expresión:</strong> ${expresion}</li>
        <li><strong>Gráfica:</strong> Línea recta que <strong>no</strong> pasa por el origen.</li>
        <li><strong>Corte Eje Y:</strong> Interseca al eje Y en las coordenadas <strong>(0, ${c})</strong>.</li>
        <li><strong>Inclinación:</strong> ${obtenerTextoPendiente(b)}</li>
        <li><strong>Traslación:</strong> Es una traslación vertical de la función lineal <em>f(x) = ${b}x</em> en <strong>${c}</strong> unidades.</li>
      </ul>
    `;

    contenidoLineal.innerHTML = `<p class="mensaje-espera">No aplica (el valor actual de c es ${c} ≠ 0).</p>`;
  }
}

// Evento al hacer clic en "Generar / Cambiar"
btnGenerar.addEventListener("click", generarYClasificar);

// Evento para copiar la función al portapapeles (útil para GeoGebra)
btnCopiar.addEventListener("click", () => {
  navigator.clipboard.writeText(spanExpresion.textContent);
  btnCopiar.textContent = "¡Copiado!";
  setTimeout(() => (btnCopiar.textContent = "Copiar"), 1500);
});

// Validación al seleccionar un archivo .ggb en la interfaz
inputGgb.addEventListener("change", (evento) => {
  const archivo = evento.target.files[0];
  if (!archivo) return;

  if (archivo.name.endsWith(".ggb")) {
    estadoArchivo.textContent = `Archivo cargado correctamente: ${archivo.name}`;
    estadoArchivo.style.color = "#166534";
  } else {
    estadoArchivo.textContent = "Error: Por favor selecciona un archivo válido con extensión .ggb";
    estadoArchivo.style.color = "#dc2626";
  }
});

// Ejecutar una vez al cargar la página para mostrar datos iniciales
generarYClasificar();