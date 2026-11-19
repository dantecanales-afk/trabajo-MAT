const spanB = document.getElementById("valor-b");
const spanC = document.getElementById("valor-c");
const spanExpresion = document.getElementById("expresion-funcion");
const btnGenerar = document.getElementById("btn-generar");
const btnCopiar = document.getElementById("btn-copiar");

const cajaLineal = document.getElementById("caja-lineal");
const contenidoLineal = document.getElementById("contenido-lineal");

const cajaAfin = document.getElementById("caja-afin");
const contenidoAfin = document.getElementById("contenido-afin");

const cajaConstante = document.getElementById("caja-constante");
const contenidoConstante = document.getElementById("contenido-constante");

const cajaNula = document.getElementById("caja-nula");
const contenidoNula = document.getElementById("contenido-nula");

const inputGgb = document.getElementById("archivo-ggb");
const estadoArchivo = document.getElementById("estado-archivo");


function generarEnteroAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function formatearFuncion(b, c) {
 
  if (b === 0 && c === 0) {
    return "f(x) = 0 (Sin función)";
  }

  
  if (b === 0) {
    return `f(x) = ${c}`;
  }

 
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


function obtenerTextoPendiente(b) {
  if (b > 0) {
    return `<strong>Pendiente (b = ${b} &gt; 0):</strong> Función creciente (sube de izquierda a derecha).`;
  } else {
    return `<strong>Pendiente (b = ${b} &lt; 0):</strong> Función decreciente (baja de izquierda a derecha).`;
  }
}


function reiniciarCajas() {
  [cajaLineal, cajaAfin, cajaConstante, cajaNula].forEach((caja) => {
    caja.classList.remove("activa", "activa-alerta");
  });

  contenidoLineal.innerHTML = `<p class="mensaje-espera">No cumple la condición.</p>`;
  contenidoAfin.innerHTML = `<p class="mensaje-espera">No cumple la condición.</p>`;
  contenidoConstante.innerHTML = `<p class="mensaje-espera">No cumple la condición.</p>`;
  contenidoNula.innerHTML = `<p class="mensaje-espera">No cumple la condición.</p>`;
}


function generarYClasificar() {
 
  const b = generarEnteroAleatorio(-3, 3);
  const c = generarEnteroAleatorio(-3, 3);

 
  spanB.textContent = b;
  spanC.textContent = c;
  const expresion = formatearFuncion(b, c);
  spanExpresion.textContent = expresion;


  reiniciarCajas();

  
  if (b === 0 && c === 0) {
    
    cajaNula.classList.add("activa-alerta");
    contenidoNula.innerHTML = `
      <ul>
        <li><strong>Resultado:</strong> No hay función (ambos coeficientes son iguales a 0).</li>
        <li><strong>Valores obtenidos:</strong> b = 0 y c = 0.</li>
        <li><strong>Observación:</strong> Al anularse ambos términos, no se clasifica como Lineal, Afín ni Constante.</li>
      </ul>
    `;
  } else if (b === 0 && c !== 0) {
    
    cajaConstante.classList.add("activa");
    contenidoConstante.innerHTML = `
      <ul>
        <li><strong>Expresión:</strong> ${expresion}</li>
        <li><strong>Gráfica:</strong> Línea recta completamente horizontal (paralela al eje X).</li>
        <li><strong>Pendiente (b = 0):</strong> Pendiente nula (no sube ni baja).</li>
        <li><strong>Corte Eje Y:</strong> Interseca al eje Y en el punto <strong>(0, ${c})</strong>.</li>
      </ul>
    `;
  } else if (b !== 0 && c === 0) {
    
    cajaLineal.classList.add("activa");
    contenidoLineal.innerHTML = `
      <ul>
        <li><strong>Expresión:</strong> ${expresion}</li>
        <li><strong>Gráfica:</strong> Línea recta continua.</li>
        <li><strong>Paso Obligatorio:</strong> Pasa por el origen de coordenadas <strong>(0, 0)</strong>.</li>
        <li>${obtenerTextoPendiente(b)}</li>
      </ul>
    `;
  } else {
    
    cajaAfin.classList.add("activa");
    contenidoAfin.innerHTML = `
      <ul>
        <li><strong>Expresión:</strong> ${expresion}</li>
        <li><strong>Gráfica:</strong> Línea recta que <strong>no</strong> pasa por el origen.</li>
        <li><strong>Corte Eje Y:</strong> Interseca al eje Y en las coordenadas <strong>(0, ${c})</strong>.</li>
        <li><strong>Inclinación:</strong> ${obtenerTextoPendiente(b)}</li>
        <li><strong>Traslación:</strong> Traslación vertical de <em>f(x) = ${b}x</em> en <strong>${c}</strong> unidades.</li>
      </ul>
    `;
  }
}


btnGenerar.addEventListener("click", generarYClasificar);


btnCopiar.addEventListener("click", () => {
  navigator.clipboard.writeText(spanExpresion.textContent);
  btnCopiar.textContent = "¡Copiado!";
  setTimeout(() => (btnCopiar.textContent = "Copiar"), 1500);
});


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


generarYClasificar();