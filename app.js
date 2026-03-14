'use strict';
/* ═══════════════════════════════════════════════════════════════
   APUNTES DE FISICA 3 — LOGICA PRINCIPAL
   SPA · Hash Router · Busqueda · Menu · TOC · KaTeX
   Universidad Tecnologica de Pereira
   ═══════════════════════════════════════════════════════════════ */

// ════════════════════════════════════════════
// 1. DATOS DE TEMAS
// ════════════════════════════════════════════
const TOPICS = [
  {
    id: 'movimiento-oscilatorio',
    title: 'Movimiento Oscilatorio',
    number: 'I',
    abstract: 'Estudio del movimiento vibratorio u oscilatorio, tipos de oscilacion, movimiento periodico, periodo, frecuencia y su relacion inversa.',
    simulation: null,
    sections: [
      {
        id: 'mo-definicion',
        title: 'Definicion',
        content: `
<p class="ieee-text">Un movil esta animado de <strong>movimiento vibratorio u oscilatorio</strong> cuando se desplaza a uno y otro lado de una posicion fija siguiendo una ley cualquiera. El embolo de una locomotora o el movimiento de un pendulo, por ejemplo, estan animados de movimiento oscilatorio.</p>
<p class="ieee-text">Este tipo de movimiento es fundamental en la fisica, ya que aparece en una enorme variedad de fenomenos naturales: desde las vibraciones de las moleculas en un solido hasta las oscilaciones de las ondas electromagneticas.</p>`
      },
      {
        id: 'mo-tipos',
        title: 'Tipos de oscilacion',
        content: `
<p class="ieee-text"><strong>Oscilacion sencilla:</strong> es el movimiento desde un extremo hasta el otro de la trayectoria.</p>
<p class="ieee-text"><strong>Oscilacion completa:</strong> es el movimiento desde un extremo hasta el otro de la trayectoria y regreso al punto de partida.</p>`
      },
      {
        id: 'mo-periodico',
        title: 'Movimiento periodico',
        content: `
<p class="ieee-text">Un movimiento es <strong>periodico</strong> si se repite exactamente cada vez que transcurre un intervalo de tiempo determinado llamado <strong>periodo</strong>.</p>
<h3 class="ieee-subsection-title">Periodo</h3>
<p class="ieee-text">En un movimiento oscilatorio periodico, el periodo es el tiempo que tarda una particula en efectuar una oscilacion completa. El periodo \\(T\\) se calcula dividiendo el tiempo \\(t\\) entre el numero de oscilaciones \\(n\\):</p>
<div class="equation-block" id="eq-periodo">
  <span>$$T = \\frac{t}{n} = \\frac{\\text{tiempo transcurrido}}{\\text{numero de oscilaciones completas}}$$</span>
  <span class="equation-number">(1)</span>
</div>
<h3 class="ieee-subsection-title">Frecuencia</h3>
<p class="ieee-text">La frecuencia es el numero de oscilaciones completas efectuadas en la unidad de tiempo:</p>
<div class="equation-block" id="eq-frecuencia">
  <span>$$f = \\frac{n}{t} = \\frac{\\text{numero de oscilaciones completas}}{\\text{tiempo}}$$</span>
  <span class="equation-number">(2)</span>
</div>
<p class="ieee-text">Segun el Sistema Internacional de Medidas, la unidad de frecuencia es el <strong>Hertz</strong> (\\(1\\text{ Hz} = 1/\\text{s}\\)) en honor al fisico aleman <strong>Heinrich Rudolf Hertz (1857–1894)</strong>, quien fue el primero en demostrar la existencia de la radiacion electromagnetica, construyendo un aparato para transmitir y recibir ondas de radio.</p>`
      },
      {
        id: 'mo-relacion',
        title: 'Relacion entre periodo y frecuencia',
        content: `
<p class="ieee-text">De las definiciones anteriores se deduce que el periodo y la frecuencia son magnitudes inversamente proporcionales:</p>
<div class="equation-block" id="eq-relacion-tf">
  <span>$$f = \\frac{1}{T} \\qquad \\text{y} \\qquad T = \\frac{1}{f}$$</span>
  <span class="equation-number">(3)</span>
</div>
<p class="ieee-text">Un <strong>Hertz</strong> corresponde a la frecuencia de una particula que oscila con movimiento periodico, efectuando una oscilacion completa en un segundo: \\(1\\text{ Hz} = 1\\text{ oscilacion completa/segundo}\\).</p>
<p class="ieee-text">Otras unidades para indicar la frecuencia son las <strong>revoluciones por minuto (rpm)</strong> y los <strong>radianes por segundo (rad/s)</strong>.</p>`
      }
    ],
    equations: [
      { id: 'eq-periodo', name: 'Periodo', latex: 'T = t / n' },
      { id: 'eq-frecuencia', name: 'Frecuencia', latex: 'f = n / t' },
      { id: 'eq-relacion-tf', name: 'Relacion T-f', latex: 'f = 1/T ;  T = 1/f' }
    ]
  },

  // ────────────────────────────────────────
  // TEMA 2: MAS
  // ────────────────────────────────────────
  {
    id: 'movimiento-armonico-simple',
    title: 'Movimiento Armonico Simple',
    number: 'II',
    abstract: 'Definicion formal del MAS, conceptos de elongacion y amplitud, ecuacion del movimiento, visualizacion como proyeccion del movimiento circular uniforme y deduccion de la ecuacion.',
    simulation: { file: 'simulaciones/Simulador_MAS_con_proyeccion.html', title: 'Simulador MAS — Proyeccion del movimiento circular' },
    sections: [
      {
        id: 'mas-conceptos',
        title: 'Conceptos fundamentales',
        content: `
<h3 class="ieee-subsection-title">Elongacion</h3>
<p class="ieee-text">En un movimiento oscilatorio, la <strong>elongacion</strong> es la distancia que separa la particula del centro de la trayectoria. Usualmente se representa con las letras \\(x\\), \\(y\\) o \\(s\\).</p>
<div class="simulation-container animate-in" style="margin: 2rem 0;">
  <div class="simulation-header">
    <span><i class="fa-solid fa-arrows-left-right"></i> Concepto de Elongacion</span>
    <div>
      <span class="sim-badge">Interactivo</span>
      <button class="sim-fullscreen-btn" onclick="toggleFullscreen(this.closest('.simulation-container'))" title="Ampliar pantalla">
        <i class="fa-solid fa-expand"></i>
      </button>
    </div>
  </div>
  <iframe class="simulation-iframe" src="simulaciones/Simulador_Elongacion.html" title="Simulador de Elongacion" allowfullscreen style="height: 350px;"></iframe>
</div>
<h3 class="ieee-subsection-title">Amplitud</h3>
<p class="ieee-text">La <strong>amplitud</strong> es la distancia desde el centro de la trayectoria hasta un extremo. Es el maximo valor de la elongacion.</p>`
      },
      {
        id: 'mas-definicion',
        title: 'Definicion del MAS',
        content: `
<p class="ieee-text">De todos los movimientos oscilatorios periodicos, el mas importante es el <strong>movimiento armonico simple (MAS)</strong>, debido a que, ademas de ser el mas simple de describir matematicamente, constituye una aproximacion muy cercana de muchas oscilaciones encontradas en la naturaleza.</p>
<p class="ieee-text">Una particula esta animada de movimiento armonico simple si:</p>
<ol style="color: var(--text-secondary); margin: 1rem 0 1rem 1.5rem; line-height: 2;">
  <li>Se mueve con movimiento oscilatorio.</li>
  <li>El movimiento es periodico.</li>
  <li>La amplitud de las oscilaciones es constante.</li>
</ol>`
      },
      {
        id: 'mas-ecuacion',
        title: 'Ecuacion del MAS',
        content: `
<p class="ieee-text">Por definicion, una particula que se mueve a lo largo del eje de las \\(X\\) tiene un movimiento armonico simple cuando su desplazamiento \\(x\\) respecto al origen esta dado en funcion del tiempo por la relacion:</p>
<div class="equation-block" id="eq-mas">
  <span>$$x = A\\sin(\\omega t + \\alpha)$$</span>
  <span class="equation-number">(4)</span>
</div>
<p class="ieee-text">Donde:</p>
<ul style="color: var(--text-secondary); margin: 0.5rem 0 1rem 1.5rem; line-height: 2;">
  <li><strong>\\(A\\)</strong> es la amplitud (elongacion maxima).</li>
  <li><strong>\\(O\\)</strong> es la posicion de equilibrio (donde la aceleracion y la fuerza son cero).</li>
  <li><strong>\\(\\omega\\)</strong> es la frecuencia angular, relacionada con el periodo por: \\(\\omega = 2\\pi / T\\).</li>
  <li><strong>\\(\\theta = \\omega t + \\alpha\\)</strong> se denomina <em>fase</em>.</li>
  <li><strong>\\(\\alpha\\)</strong> es la <em>fase inicial</em> (su valor cuando \\(t = 0\\)).</li>
</ul>
<p class="ieee-text">La frecuencia angular se relaciona con el periodo mediante:</p>
<div class="equation-block" id="eq-omega">
  <span>$$\\omega = \\frac{2\\pi}{T}$$</span>
  <span class="equation-number">(5)</span>
</div>
<p class="ieee-text">Aunque hemos definido el MAS en funcion de una expresion senoidal, puede igualmente expresarse en funcion de una expresion cosenoidal. El unico cambio seria una diferencia inicial de fase de \\(\\pi/2\\). Puesto que la funcion seno o coseno varia entre \\(-1\\) y \\(+1\\), la elongacion de la particula varia entre \\(x = -A\\) y \\(x = +A\\).</p>`
      },
      {
        id: 'mas-visualizacion',
        title: 'Visualizacion del MAS',
        content: `
<p class="ieee-text">El movimiento armonico simple se puede visualizar como la <strong>proyeccion de un movimiento circular uniforme</strong> sobre un plano.</p>
<p class="ieee-text">Imaginemos un manubrio unido al borde de una rueda que gira con velocidad angular \\(\\omega\\) constante. Como la rueda tiene un movimiento circular uniforme, el manubrio siempre emplea el mismo tiempo en dar una vuelta.</p>
<p class="ieee-text">La proyeccion o sombra del manubrio sobre una pared es un movimiento oscilatorio periodico, pero no uniforme, ya que al acercarse a los extremos la velocidad disminuye. Ademas, el periodo del manubrio es igual al periodo de la sombra sobre la pared.</p>
<p class="ieee-text">Como la sombra del manubrio tiene un movimiento oscilatorio, periodico y con amplitud constante, posee un <strong>movimiento armonico simple</strong>.</p>`
      },
      {
        id: 'mas-deduccion',
        title: 'Deduccion de la ecuacion',
        content: `
<p class="ieee-text">La velocidad angular \\(\\omega\\) se define como el angulo girado por la particula (en radianes) dividido por el tiempo transcurrido. Cuando da una vuelta completa gira \\(2\\pi\\) radianes en un tiempo igual al periodo \\(T\\):</p>
<div class="equation-block" id="eq-omega-deduccion">
  <span>$$\\omega = \\frac{2\\pi}{T}$$</span>
  <span class="equation-number">(5')</span>
</div>
<p class="ieee-text">Supongamos que la particula inicia su movimiento en el punto \\(Q\\) (cuya posicion angular es \\(\\alpha\\)) y gira con velocidad angular constante \\(\\omega\\). En el tiempo \\(t\\) habra girado el angulo \\(\\omega \\cdot t\\), llegando hasta la posicion \\(P\\). El angulo total \\(\\theta\\) es:</p>
<div class="equation-block" id="eq-fase">
  <span>$$\\theta = \\omega t + \\alpha$$</span>
  <span class="equation-number">(6)</span>
</div>
<p class="ieee-text">Cuando la particula llega al punto \\(P\\), su proyeccion sobre la pared llega al punto \\(P'\\). Aplicando trigonometria:</p>
<p class="ieee-text">$$\\sin \\theta = \\frac{\\text{cateto opuesto}}{\\text{hipotenusa}} = \\frac{x}{A}$$</p>
<p class="ieee-text">Obtenemos:</p>
<div class="equation-block" id="eq-mas-final">
  <span>$$x = A\\sin(\\omega t + \\alpha)$$</span>
  <span class="equation-number">(4')</span>
</div>
<p class="ieee-text">La cantidad \\(A\\) se denomina <strong>amplitud</strong>. La velocidad angular \\(\\omega\\) recibe el nombre de <strong>frecuencia angular</strong>, y el angulo \\(\\alpha\\) que determina la posicion angular inicial se llama <strong>fase inicial</strong>.</p>`
      }
    ],
    equations: [
      { id: 'eq-mas', name: 'Ecuacion del MAS', latex: 'x = A\\sin(\\omega t + \\alpha)' },
      { id: 'eq-omega', name: 'Frecuencia angular', latex: '\\omega = \\frac{2\\pi}{T}' },
      { id: 'eq-fase', name: 'Fase', latex: '\\theta = \\omega t + \\alpha' }
    ]
  },

  // ────────────────────────────────────────
  // TEMA 3: CINEMATICA DEL MAS
  // ────────────────────────────────────────
  {
    id: 'cinematica-mas',
    title: 'Cinematica del MAS',
    number: 'III',
    abstract: 'Velocidad y aceleracion en el movimiento armonico simple, relaciones con la elongacion, valores maximos y minimos, y resumen completo de las ecuaciones cinematicas.',
    simulation: { file: 'simulaciones/Laboratorio_MAS.html', title: 'Laboratorio MAS — Graficas de posicion, velocidad y aceleracion' },
    sections: [
      {
        id: 'cin-magnitudes',
        title: 'Magnitudes caracteristicas',
        content: `
<p class="ieee-text">Recordemos las magnitudes fundamentales que caracterizan al MAS:</p>
<div class="equation-block" id="eq-cin-periodo">
  <span>$$T = \\frac{t}{n} \\qquad f = \\frac{1}{T} = \\frac{\\omega}{2\\pi} = \\frac{n}{t}$$</span>
  <span class="equation-number">(7)</span>
</div>`
      },
      {
        id: 'cin-velocidad',
        title: 'Velocidad en el MAS',
        content: `
<p class="ieee-text">La velocidad en el MAS puede obtenerse proyectando la velocidad de una particula que se mueve con movimiento circular uniforme sobre un plano.</p>
<p class="ieee-text">En el movimiento circular uniforme, la velocidad es un vector tangente a la circunferencia y, por tanto, perpendicular al radio. Su magnitud viene dada por \\(v = \\omega \\cdot r\\). Como el radio de la circunferencia es igual a la amplitud \\(A\\):</p>
<div class="equation-block" id="eq-v-magnitud">
  <span>$$v = \\omega \\cdot A$$</span>
  <span class="equation-number">(8)</span>
</div>
<p class="ieee-text">La proyeccion de la velocidad \\(\\vec{v}\\) sobre el eje del MAS da lugar a la velocidad del punto \\(P'\\). Dado que el angulo varia con el tiempo segun \\(\\theta = \\omega t + \\alpha\\), se concluye:</p>
<div class="equation-block" id="eq-vx">
  <span>$$v_x = \\omega \\cdot A \\cdot \\cos(\\omega t + \\alpha)$$</span>
  <span class="equation-number">(9)</span>
</div>
<h3 class="ieee-subsection-title">Velocidad maxima y minima</h3>
<ul style="color: var(--text-secondary); margin: 0.5rem 0 1rem 1.5rem; line-height: 2;">
  <li>La velocidad es <strong>maxima</strong> en el origen (\\(x = 0\\)): \\(|v_{\\text{max}}| = \\omega \\cdot A\\)</li>
  <li>La velocidad es <strong>cero</strong> en los extremos (\\(x = +A\\) y \\(x = -A\\)).</li>
</ul>`
      },
      {
        id: 'cin-vel-elong',
        title: 'Relacion entre velocidad y elongacion',
        content: `
<p class="ieee-text">Usando la identidad trigonometrica \\(\\sin^2\\theta + \\cos^2\\theta = 1\\) y a partir de la ecuacion de velocidad, se puede demostrar:</p>
<p class="ieee-text">$$v_x^2 = \\omega^2 A^2 - \\omega^2 x^2 = \\omega^2(A^2 - x^2)$$</p>
<p class="ieee-text">Despejando la velocidad en funcion de la elongacion:</p>
<div class="equation-block" id="eq-v-elongacion">
  <span>$$v_x = \\pm\\,\\omega\\sqrt{A^2 - x^2}$$</span>
  <span class="equation-number">(10)</span>
</div>`
      },
      {
        id: 'cin-aceleracion',
        title: 'Aceleracion en el MAS',
        content: `
<p class="ieee-text">La aceleracion en el MAS puede obtenerse proyectando la aceleracion centripeta de una particula que se mueve con MCU sobre un plano. La magnitud de la aceleracion centripeta es \\(a_c = \\omega^2 \\cdot A\\).</p>
<p class="ieee-text">El signo negativo se incluye para indicar que la aceleracion del punto \\(P'\\) apunta hacia la posicion de equilibrio \\(O'\\). Dado que \\(\\theta = \\omega t + \\alpha\\):</p>
<div class="equation-block" id="eq-ax">
  <span>$$a_x = -\\omega^2 \\cdot A \\cdot \\sin(\\omega t + \\alpha)$$</span>
  <span class="equation-number">(11)</span>
</div>
<h3 class="ieee-subsection-title">Relacion entre aceleracion y elongacion</h3>
<p class="ieee-text">Puesto que \\(x = A \\sin(\\omega t + \\alpha)\\), se puede escribir:</p>
<div class="equation-block" id="eq-ax-x">
  <span>$$a_x = -\\omega^2 \\cdot x$$</span>
  <span class="equation-number">(12)</span>
</div>
<blockquote>
  <p class="ieee-text" style="margin: 0;">Esta es la <strong>ecuacion caracteristica del MAS</strong>: la aceleracion es proporcional a la elongacion y de signo opuesto. Esto implica que la fuerza neta sobre la particula siempre apunta hacia el punto de equilibrio.</p>
</blockquote>
<h3 class="ieee-subsection-title">Aceleracion maxima y minima</h3>
<ul style="color: var(--text-secondary); margin: 0.5rem 0 1rem 1.5rem; line-height: 2;">
  <li>La aceleracion es <strong>maxima</strong> en los extremos (\\(x = \\pm A\\)): \\(|a_{\\text{max}}| = \\omega^2 \\cdot A\\)</li>
  <li>La aceleracion es <strong>cero</strong> en el origen (\\(x = 0\\)).</li>
</ul>`
      },
      {
        id: 'cin-resumen',
        title: 'Resumen de ecuaciones cinematicas',
        content: `
<p class="ieee-text">La siguiente tabla resume las ecuaciones cinematicas del MAS tanto en funcion del tiempo como en funcion de la elongacion:</p>
<div style="overflow-x: auto; margin: 1.5rem 0;">
<table class="equations-table">
  <thead><tr><th>Magnitud</th><th>En funcion del tiempo</th><th>En funcion de la elongacion</th></tr></thead>
  <tbody>
    <tr><td>Elongacion</td><td>\\(x(t) = A\\sin(\\omega t + \\alpha)\\)</td><td>—</td></tr>
    <tr><td>Velocidad</td><td>\\(v(t) = \\omega A\\cos(\\omega t + \\alpha)\\)</td><td>\\(v = \\pm\\omega\\sqrt{A^2 - x^2}\\)</td></tr>
    <tr><td>Aceleracion</td><td>\\(a(t) = -\\omega^2 A\\sin(\\omega t + \\alpha)\\)</td><td>\\(a = -\\omega^2 x\\)</td></tr>
  </tbody>
</table>
</div>
<p class="ieee-text"><strong>Valores extremos:</strong></p>
<p class="ieee-text">$$|v_{\\text{max}}| = \\omega \\cdot A \\quad (\\text{en } x = 0) \\qquad |a_{\\text{max}}| = \\omega^2 \\cdot A \\quad (\\text{en } x = \\pm A)$$</p>
<p class="ieee-text"><strong>Relaciones entre magnitudes:</strong></p>
<div class="equation-block" id="eq-cin-relaciones">
  <span>$$\\omega = \\frac{2\\pi}{T} = 2\\pi f \\qquad T = \\frac{1}{f} \\qquad f = \\frac{\\omega}{2\\pi}$$</span>
  <span class="equation-number">(13)</span>
</div>`
      }
    ],
    equations: [
      { id: 'eq-vx', name: 'Velocidad (tiempo)', latex: 'v = \\omega A \\cos(\\omega t + \\alpha)' },
      { id: 'eq-v-elongacion', name: 'Velocidad (posicion)', latex: 'v = \\pm\\omega\\sqrt{A^2-x^2}' },
      { id: 'eq-ax', name: 'Aceleracion (tiempo)', latex: 'a = -\\omega^2 A \\sin(\\omega t + \\alpha)' },
      { id: 'eq-ax-x', name: 'Ec. caracteristica MAS', latex: 'a = -\\omega^2 x' }
    ]
  },

  // ────────────────────────────────────────
  // TEMA 4: DINAMICA Y ENERGIA DEL MAS
  // ────────────────────────────────────────
  {
    id: 'dinamica-energia-mas',
    title: 'Dinamica y Energia del MAS',
    number: 'IV',
    abstract: 'Aplicacion de la segunda ley de Newton al MAS, Ley de Hooke, energia cinetica, energia potencial elastica y conservacion de la energia mecanica total.',
    simulation: { file: 'simulaciones/simulador_masa_resorte.html', title: 'Simulador Masa-Resorte con Energia' },
    sections: [
      {
        id: 'din-newton',
        title: 'Dinamica del MAS',
        content: `
<p class="ieee-text">Aplicando la segunda ley de Newton al movimiento de una particula que oscila con MAS:</p>
<p class="ieee-text">$$F = m \\cdot a$$</p>
<p class="ieee-text">Dado que la aceleracion en el MAS es \\(a = -\\omega^2 \\cdot x\\):</p>
<p class="ieee-text">$$F = -m \\cdot \\omega^2 \\cdot x$$</p>
<p class="ieee-text">Definiendo la <strong>constante elastica</strong> como \\(k = m \\cdot \\omega^2\\), se obtiene la <strong>Ley de Hooke</strong>:</p>
<div class="equation-block" id="eq-hooke">
  <span>$$F = -k \\cdot x$$</span>
  <span class="equation-number">(14)</span>
</div>
<blockquote style="border-left: 3px solid var(--accent); padding: 1rem 1.2rem; margin: 1.5rem 0; background: rgba(6,182,212,0.06); border-radius: 0 8px 8px 0;">
  <p class="ieee-text" style="margin: 0;">La fuerza responsable del MAS es una fuerza recuperadora (restauradora), analoga a la fuerza elastica de un resorte descrita por la Ley de Hooke. La constante \\(k\\) se denomina <strong>modulo de elasticidad</strong> y se expresa en N/m en el SI.</p>
</blockquote>
<div class="equation-block" id="eq-k-def">
  <span>$$k = m \\cdot \\omega^2$$</span>
  <span class="equation-number">(15)</span>
</div>`
      },
      {
        id: 'din-ec',
        title: 'Energia cinetica',
        content: `
<p class="ieee-text">La energia cinetica de una particula con rapidez \\(v\\) es \\(E_c = mv^2/2\\). En el MAS, sustituyendo \\(v = \\pm\\omega\\sqrt{A^2 - x^2}\\) y usando \\(k = m\\omega^2\\):</p>
<div class="equation-block" id="eq-ec">
  <span>$$E_c = \\frac{k(A^2 - x^2)}{2}$$</span>
  <span class="equation-number">(16)</span>
</div>
<p class="ieee-text">La energia cinetica es <strong>maxima</strong> en la posicion de equilibrio (\\(x = 0\\)) y <strong>cero</strong> en los extremos (\\(x = \\pm A\\)).</p>`
      },
      {
        id: 'din-ep',
        title: 'Energia potencial',
        content: `
<p class="ieee-text">La energia potencial asociada a la fuerza recuperadora \\(F = -kx\\) se define como:</p>
<div class="equation-block" id="eq-ep">
  <span>$$U_k = \\frac{k \\cdot x^2}{2}$$</span>
  <span class="equation-number">(17)</span>
</div>
<p class="ieee-text">La energia potencial es <strong>maxima</strong> en los extremos (\\(x = \\pm A\\)) y <strong>cero</strong> en la posicion de equilibrio (\\(x = 0\\)).</p>`
      },
      {
        id: 'din-et',
        title: 'Energia mecanica total',
        content: `
<p class="ieee-text">La energia mecanica total es la suma de la energia cinetica y la energia potencial:</p>
<p class="ieee-text">$$E = E_c + U_k = \\frac{k(A^2 - x^2)}{2} + \\frac{kx^2}{2}$$</p>
<p class="ieee-text">Simplificando:</p>
<div class="equation-block" id="eq-et">
  <span>$$E = \\frac{k \\cdot A^2}{2}$$</span>
  <span class="equation-number">(18)</span>
</div>
<blockquote style="border-left: 3px solid var(--accent); padding: 1rem 1.2rem; margin: 1.5rem 0; background: rgba(6,182,212,0.06); border-radius: 0 8px 8px 0;">
  <p class="ieee-text" style="margin: 0;">La energia mecanica total es <strong>constante</strong> y proporcional al cuadrado de la amplitud. Se trata de un sistema conservativo: la energia se transforma continuamente entre cinetica y potencial, pero su suma permanece invariable.</p>
</blockquote>`
      }
    ],
    equations: [
      { id: 'eq-hooke', name: 'Ley de Hooke', latex: 'F = -kx' },
      { id: 'eq-k-def', name: 'Constante elastica', latex: 'k = m\\omega^2' },
      { id: 'eq-ec', name: 'Energia cinetica', latex: 'E_c = \\frac{k(A^2-x^2)}{2}' },
      { id: 'eq-ep', name: 'Energia potencial', latex: 'U_k = \\frac{kx^2}{2}' },
      { id: 'eq-et', name: 'Energia total', latex: 'E = \\frac{kA^2}{2}' }
    ]
  },

  // ────────────────────────────────────────
  // TEMA 5: PENDULO SIMPLE
  // ────────────────────────────────────────
  {
    id: 'pendulo-simple',
    title: 'Pendulo Simple',
    number: 'V',
    abstract: 'El pendulo simple como sistema oscilatorio, descomposicion de fuerzas, tension del hilo, aproximacion para angulos pequenos y deduccion del periodo de oscilacion.',
    simulation: { file: 'simulaciones/Simulador_Pendulo.html', title: 'Laboratorio Interactivo Péndulo Simple' },
    sections: [
      {
        id: 'pend-desc',
        title: 'Descripcion del sistema',
        content: `
<p class="ieee-text">Un pendulo simple consiste en una particula suspendida de un punto fijo mediante un hilo inextensible y de masa despreciable, que puede oscilar libremente en un plano vertical.</p>`
      },
      {
        id: 'pend-fuerzas',
        title: 'Descomposicion de fuerzas',
        content: `
<p class="ieee-text">El peso \\(w = mg\\) de la particula se descompone en dos componentes:</p>
<ul style="color: var(--text-secondary); margin: 0.5rem 0 1rem 1.5rem; line-height: 2;">
  <li><strong>Componente radial:</strong> \\(F_r = m \\cdot g \\cdot \\cos\\theta\\)</li>
  <li><strong>Componente tangencial:</strong> \\(F_t = m \\cdot g \\cdot \\sin\\theta\\)</li>
</ul>
<h3 class="ieee-subsection-title">Tension del hilo</h3>
<p class="ieee-text">La resultante de fuerzas en la direccion radial es igual a la fuerza centripeta. La tension del hilo se calcula como:</p>
<div class="equation-block" id="eq-tension">
  <span>$$T = m \\cdot g \\cdot \\cos\\theta + \\frac{m \\cdot v^2}{L}$$</span>
  <span class="equation-number">(19)</span>
</div>
<blockquote style="border-left: 3px solid var(--accent); padding: 1rem 1.2rem; margin: 1.5rem 0; background: rgba(6,182,212,0.06); border-radius: 0 8px 8px 0;">
  <p class="ieee-text" style="margin: 0;">La tension es <strong>maxima</strong> en la posicion de equilibrio y <strong>minima</strong> en los extremos, cuando la velocidad es cero.</p>
</blockquote>`
      },
      {
        id: 'pend-ecuacion',
        title: 'Ecuacion del movimiento',
        content: `
<p class="ieee-text">La fuerza tangencial, que se opone al desplazamiento angular, es la unica responsable del movimiento. Por la segunda ley de Newton:</p>
<p class="ieee-text">$$F_t = -m \\cdot g \\cdot \\sin\\theta = m \\cdot a_T \\implies a_T = -g \\cdot \\sin\\theta$$</p>
<h3 class="ieee-subsection-title">Aproximacion para angulos pequenos</h3>
<p class="ieee-text">Cuando el angulo \\(\\theta\\) es muy pequeno, se puede aproximar \\(\\sin\\theta \\approx x/L\\), con lo cual:</p>
<p class="ieee-text">$$a_T \\approx -\\frac{g \\cdot x}{L} \\qquad F_t \\approx -\\frac{m \\cdot g \\cdot x}{L}$$</p>
<p class="ieee-text">Como la masa, la gravedad y la longitud son constantes, la fuerza toma la forma \\(F = -kx\\) con \\(k = mg/L\\). Esto demuestra que, para pequenas oscilaciones, <strong>el movimiento del pendulo simple es armonico simple</strong>.</p>`
      },
      {
        id: 'pend-periodo',
        title: 'Periodo del pendulo simple',
        content: `
<p class="ieee-text">Como \\(k = m\\omega^2\\) y \\(k = mg/L\\), se tiene:</p>
<p class="ieee-text">$$\\frac{mg}{L} = m\\omega^2 \\implies \\omega = \\sqrt{\\frac{g}{L}}$$</p>
<p class="ieee-text">El periodo de oscilacion del pendulo simple es:</p>
<div class="equation-block" id="eq-periodo-pendulo">
  <span>$$T = 2\\pi\\sqrt{\\frac{L}{g}}$$</span>
  <span class="equation-number">(20)</span>
</div>
<p class="ieee-text">Esta formula permite medir experimentalmente la aceleracion de la gravedad. Midiendo el periodo y despejando \\(g\\):</p>
<div class="equation-block" id="eq-gravedad">
  <span>$$g = \\frac{4\\pi^2 L}{T^2}$$</span>
  <span class="equation-number">(21)</span>
</div>`
      }
    ],
    equations: [
      { id: 'eq-tension', name: 'Tension del hilo', latex: 'T = mg\\cos\\theta + \\frac{mv^2}{L}' },
      { id: 'eq-periodo-pendulo', name: 'Periodo del pendulo', latex: 'T = 2\\pi\\sqrt{\\frac{L}{g}}' },
      { id: 'eq-gravedad', name: 'Gravedad experimental', latex: 'g = \\frac{4\\pi^2 L}{T^2}' }
    ]
  },

  // ────────────────────────────────────────
  // TEMA 6: SISTEMA MASA-RESORTE
  // ────────────────────────────────────────
  {
    id: 'sistema-masa-resorte',
    title: 'Sistema Masa-Resorte',
    number: 'VI',
    abstract: 'Analisis del sistema masa-resorte como caso particular del MAS, periodo de oscilacion y calculo de la constante elastica del resorte.',
    simulation: { file: 'simulaciones/Simulador_Resorte.html', title: 'Laboratorio Interactivo Masa-Resorte' },
    sections: [
      {
        id: 'resorte-desc',
        title: 'Descripcion del sistema',
        content: `
<p class="ieee-text">Consideremos un bloque de masa \\(m\\) apoyado sobre una superficie horizontal sin friccion y unido a un resorte de constante elastica \\(k\\). De acuerdo con la ley de Hooke, la fuerza elastica que actua sobre el bloque es:</p>
<p class="ieee-text">$$F = -k \\cdot x$$</p>`
      },
      {
        id: 'resorte-periodo',
        title: 'Periodo del sistema masa-resorte',
        content: `
<p class="ieee-text">Como \\(k = m \\cdot \\omega^2\\), el periodo de las oscilaciones es:</p>
<div class="equation-block" id="eq-periodo-resorte">
  <span>$$T = 2\\pi\\sqrt{\\frac{m}{k}}$$</span>
  <span class="equation-number">(22)</span>
</div>
<p class="ieee-text">Esta formula permite calcular el modulo de elasticidad del resorte:</p>
<div class="equation-block" id="eq-k-resorte">
  <span>$$k = \\frac{4\\pi^2 m}{T^2}$$</span>
  <span class="equation-number">(23)</span>
</div>`
      },
      {
        id: 'resorte-frecuencia',
        title: 'Frecuencia angular del resorte',
        content: `
<p class="ieee-text">La frecuencia angular de oscilacion del sistema masa-resorte se obtiene de \\(k = m\\omega^2\\):</p>
<div class="equation-block" id="eq-omega-resorte">
  <span>$$\\omega = \\sqrt{\\frac{k}{m}}$$</span>
  <span class="equation-number">(24)</span>
</div>
<p class="ieee-text">Observese que el periodo y la frecuencia del sistema masa-resorte <strong>no dependen de la amplitud</strong>, sino unicamente de la masa \\(m\\) y la constante elastica \\(k\\). Esta propiedad se denomina <strong>isocronia</strong>.</p>`
      }
    ],
    equations: [
      { id: 'eq-periodo-resorte', name: 'Periodo (resorte)', latex: 'T = 2\\pi\\sqrt{\\frac{m}{k}}' },
      { id: 'eq-k-resorte', name: 'Constante elastica', latex: 'k = \\frac{4\\pi^2 m}{T^2}' },
      { id: 'eq-omega-resorte', name: 'Frecuencia angular', latex: '\\omega = \\sqrt{\\frac{k}{m}}' }
    ]
  }
];


// ════════════════════════════════════════════
// 2. ESTADO DE LA APLICACION
// ════════════════════════════════════════════
const state = {
  currentView: 'inicio',
  currentTopic: null,
  isDarkTheme: false,
  menuOpen: false,
  tocOpen: false
};


// ════════════════════════════════════════════
// 3. INICIALIZACION
// ════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initRouter();
  initMenu();
  initSearch();
  initHeroAnimation();
  handleRoute();
  // Render KaTeX on home page (deferred scripts may not be ready yet)
  setTimeout(renderKaTeX, 100);
});
// Fallback: re-render KaTeX when all scripts (including deferred) are loaded
window.addEventListener('load', () => { renderKaTeX(); });


// ════════════════════════════════════════════
// 4. ROUTER (Hash-based)
// ════════════════════════════════════════════
function initRouter() {
  window.addEventListener('hashchange', handleRoute);
}

function handleRoute() {
  const hash = location.hash.slice(1) || 'inicio';
  const parts = hash.split('/');

  closeMenu();

  if (parts[0] === 'tema' && parts[1]) {
    showView('tema');
    renderTopic(parts[1]);
  } else if (parts[0] === 'recursos') {
    showView('recursos');
  } else if (parts[0] === 'sobre-nosotros') {
    showView('sobre-nosotros');
  } else {
    showView('inicio');
  }
}

function showView(viewId) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  const view = document.getElementById('view-' + viewId);
  if (view) view.classList.add('active');

  // TOC toggle visibilidad
  const tocBtn = document.getElementById('toc-toggle');
  if (tocBtn) tocBtn.style.display = viewId === 'tema' ? '' : 'none';

  state.currentView = viewId;
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Resaltar nav item correspondiente
  if (viewId !== 'tema') {
    document.querySelectorAll('.nav-sidebar .nav-item').forEach(item => {
      item.classList.remove('active');
      if (item.dataset.navId === viewId) {
        item.classList.add('active');
      }
    });
  }
}

function navigate(hash) {
  location.hash = hash;
}


// ════════════════════════════════════════════
// 5. MENU HAMBURGUESA
// ════════════════════════════════════════════
function initMenu() {
  const btn = document.getElementById('hamburger-btn');
  const overlay = document.getElementById('nav-overlay');

  btn.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', closeMenu);

  // Poblar menu con temas
  const topicsList = document.getElementById('nav-topics-list');
  TOPICS.forEach(t => {
    const item = document.createElement('a');
    item.className = 'nav-item';
    item.textContent = t.title;
    item.dataset.topicId = t.id;
    item.addEventListener('click', () => {
      navigate('tema/' + t.id);
      closeMenu();
    });
    topicsList.appendChild(item);
  });
}

function toggleMenu() {
  state.menuOpen = !state.menuOpen;
  document.getElementById('hamburger-btn').classList.toggle('active', state.menuOpen);
  document.getElementById('nav-sidebar').classList.toggle('active', state.menuOpen);
  document.getElementById('nav-overlay').classList.toggle('active', state.menuOpen);
}

function closeMenu() {
  state.menuOpen = false;
  document.getElementById('hamburger-btn').classList.remove('active');
  document.getElementById('nav-sidebar').classList.remove('active');
  document.getElementById('nav-overlay').classList.remove('active');
}

// ════════════════════════════════════════════
// THEME TOGGLE
// ════════════════════════════════════════════
function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle');
  const icon = toggleBtn.querySelector('i');

  // Revisar preferencia guardada
  const savedTheme = localStorage.getItem('fisica3-theme');
  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    state.isDarkTheme = true;
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  }

  toggleBtn.addEventListener('click', () => {
    state.isDarkTheme = !state.isDarkTheme;
    if (state.isDarkTheme) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('fisica3-theme', 'dark');
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('fisica3-theme', 'light');
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
    }
    // Re-render hero canvas on theme switch to update colors if needed
    initHeroAnimation();
  });
}

// ════════════════════════════════════════════
// 6. BUSCADOR
// ════════════════════════════════════════════
function initSearch() {
  const input = document.getElementById('search-input');
  const results = document.getElementById('search-results');

  input.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    if (query.length < 2) {
      results.classList.remove('active');
      results.innerHTML = '';
      return;
    }

    const matches = [];
    TOPICS.forEach(topic => {
      if (topic.title.toLowerCase().includes(query)) {
        matches.push({ title: topic.title, desc: topic.abstract, id: topic.id });
      }
      topic.sections.forEach(sec => {
        if (sec.title.toLowerCase().includes(query)) {
          matches.push({ title: sec.title, desc: 'En: ' + topic.title, id: topic.id, sectionId: sec.id });
        }
      });
    });

    if (matches.length === 0) {
      results.innerHTML = '<div class="search-result-item"><h4>Sin resultados</h4><p>Intenta con otro termino</p></div>';
    } else {
      results.innerHTML = matches.slice(0, 8).map(m =>
        `<div class="search-result-item" data-topic="${m.id}" data-section="${m.sectionId || ''}">
          <h4>${m.title}</h4><p>${m.desc}</p>
        </div>`
      ).join('');

      results.querySelectorAll('.search-result-item').forEach(item => {
        item.addEventListener('click', () => {
          const tid = item.dataset.topic;
          const sid = item.dataset.section;
          navigate('tema/' + tid);
          results.classList.remove('active');
          input.value = '';
          if (sid) {
            setTimeout(() => {
              const el = document.getElementById(sid);
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 300);
          }
        });
      });
    }
    results.classList.add('active');
  });

  input.addEventListener('blur', () => {
    setTimeout(() => results.classList.remove('active'), 200);
  });
}


// ════════════════════════════════════════════
// 7. RENDERIZADO DE TEMA
// ════════════════════════════════════════════
function renderTopic(topicId) {
  const topic = TOPICS.find(t => t.id === topicId);
  if (!topic) { navigate('inicio'); return; }
  state.currentTopic = topic;

  const container = document.getElementById('topic-content');
  const tocSidebar = document.getElementById('toc-sidebar');

  // ── HEADER IEEE ──
  let html = `
    <h1 class="ieee-paper-title animate-in">${topic.title}</h1>
    <p class="ieee-authors animate-in animate-delay-1">Apuntes de Fisica 3 — Universidad Tecnologica de Pereira</p>
    <div class="ieee-abstract animate-in animate-delay-2">
      <h4>Resumen</h4>
      <p>${topic.abstract}</p>
    </div>`;

  // ── SECCIONES ──
  let simInserted = false;
  topic.sections.forEach((sec, i) => {
    html += `
    <div class="ieee-section animate-in" id="${sec.id}" style="animation-delay: ${0.1 * (i + 3)}s">
      <h2 class="ieee-section-title">
        <span class="ieee-section-number">${topic.number}.${i + 1}</span>
        ${sec.title}
      </h2>
      ${sec.content}
    </div>`;

    // Insertar simulacion despues de la segunda seccion
    if (topic.simulation && !simInserted && i >= 1 && i <= Math.floor(topic.sections.length / 2)) {
      html += renderSimulation(topic.simulation);
      simInserted = true;
    }
  });

  // Si no se inserto la simulacion aun, ponerla antes de la tabla
  if (topic.simulation && !simInserted) {
    html += renderSimulation(topic.simulation);
  }

  // ── TABLA RESUMEN ECUACIONES ──
  if (topic.equations.length > 0) {
    html += `
    <div class="equations-table-wrapper animate-in">
      <h2 class="equations-table-title">
        <i class="fa-solid fa-table"></i> Tabla resumen de ecuaciones
      </h2>
      <table class="equations-table">
        <thead><tr><th>#</th><th>Nombre</th><th>Ecuacion</th><th>Ir a</th></tr></thead>
        <tbody>
          ${topic.equations.map((eq, i) => `
            <tr>
              <td>${i + 1}</td>
              <td>${eq.name}</td>
              <td>\\( ${eq.latex} \\)</td>
              <td><a class="eq-link" href="#${eq.id}" onclick="event.preventDefault(); document.getElementById('${eq.id}').scrollIntoView({behavior:'smooth',block:'center'});">Ver</a></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>`;
  }

  container.innerHTML = html;

  // ── TOC SIDEBAR ──
  let tocHtml = '<div class="toc-title">Contenido</div>';
  topic.sections.forEach(sec => {
    tocHtml += `<a class="toc-item" data-target="${sec.id}" onclick="document.getElementById('${sec.id}').scrollIntoView({behavior:'smooth',block:'start'})">${sec.title}</a>`;
  });
  if (topic.equations.length > 0) {
    tocHtml += `<a class="toc-item toc-sub" onclick="document.querySelector('.equations-table-wrapper').scrollIntoView({behavior:'smooth',block:'start'})">Tabla de ecuaciones</a>`;
  }
  tocSidebar.innerHTML = tocHtml;

  // Limpiar seleccion previa y resaltar item activo del nav
  document.querySelectorAll('.nav-sidebar .nav-item').forEach(item => {
    item.classList.remove('active');
  });
  document.querySelectorAll('#nav-topics-list .nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.topicId === topicId);
  });

  // Re-renderizar KaTeX
  renderKaTeX();

  // Observador para TOC activo
  initTocObserver();
}

function renderSimulation(sim) {
  return `
  <div class="simulation-container animate-in">
    <div class="simulation-header">
      <span><i class="fa-solid fa-flask"></i> ${sim.title}</span>
      <div>
        <span class="sim-badge">Interactivo</span>
        <button class="sim-fullscreen-btn" onclick="toggleFullscreen(this.closest('.simulation-container'))" title="Ampliar pantalla">
          <i class="fa-solid fa-expand"></i>
        </button>
      </div>
    </div>
    <iframe class="simulation-iframe" src="${sim.file}" loading="lazy" title="${sim.title}"></iframe>
  </div>`;
}

function toggleFullscreen(elem) {
  // Pseudo-pantalla completa: alterna .expanded-mode sobre el contenedor .simulation-container
  const isExpanded = elem.classList.contains('expanded-mode');

  // Icono del botón dentro del contenedor
  const btn = elem.querySelector('.sim-fullscreen-btn');
  const icon = btn ? btn.querySelector('i') : null;

  if (isExpanded) {
    elem.classList.remove('expanded-mode');
    document.body.style.overflow = '';
    if (icon) { icon.classList.remove('fa-compress'); icon.classList.add('fa-expand'); }

    // Restaurar a su posicion original
    if (elem.dataset.placeholderId) {
      const placeholder = document.getElementById(elem.dataset.placeholderId);
      if (placeholder) {
        placeholder.parentNode.insertBefore(elem, placeholder);
        placeholder.remove();
      }
      delete elem.dataset.placeholderId;
    }
  } else {
    elem.classList.add('expanded-mode');
    document.body.style.overflow = 'hidden';
    if (icon) { icon.classList.remove('fa-expand'); icon.classList.add('fa-compress'); }

    // Mover a document.body para evitar que transform/animation del padre rompan el position: fixed
    const placeholderId = 'placeholder-' + Math.random().toString(36).substring(2, 9);
    elem.dataset.placeholderId = placeholderId;
    const placeholder = document.createElement('div');
    placeholder.id = placeholderId;
    placeholder.className = 'simulation-placeholder';
    // Ocupar el mismo espacio si es necesario, pero display none está bien si no queremos huecos.
    placeholder.style.display = 'none';
    elem.parentNode.insertBefore(placeholder, elem);
    document.body.appendChild(elem);
  }
}

// Al presionar Escape salir del modo expandido
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.expanded-mode').forEach(el => {
      toggleFullscreen(el);
    });
  }
});


// ════════════════════════════════════════════
// 8. TOC INTERSECTION OBSERVER
// ════════════════════════════════════════════
let tocObserver = null;
function initTocObserver() {
  if (tocObserver) tocObserver.disconnect();

  const sections = document.querySelectorAll('.ieee-section');
  if (!sections.length) return;

  tocObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.toc-item').forEach(item => {
          item.classList.toggle('active', item.dataset.target === entry.target.id);
        });
      }
    });
  }, { rootMargin: '-80px 0px -60% 0px', threshold: 0 });

  sections.forEach(sec => tocObserver.observe(sec));
}

// Toggle TOC en mobile
function toggleToc() {
  const toc = document.getElementById('toc-sidebar');
  toc.classList.toggle('mobile-active');
}


// ════════════════════════════════════════════
// 9. KATEX RENDERIZADO
// ════════════════════════════════════════════
function renderKaTeX() {
  if (typeof renderMathInElement !== 'undefined') {
    renderMathInElement(document.body, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '\\(', right: '\\)', display: false }
      ],
      throwOnError: false
    });
  }
}


// ════════════════════════════════════════════
// 10. ANIMACION HERO (Canvas de particulas)
// ════════════════════════════════════════════
function initHeroAnimation() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const particles = [];
  const count = 80;
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.5 + 0.2
    });
  }

  let time = 0;
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    time += 0.01;

    // Ondas sinusoidales de fondo
    for (let w = 0; w < 3; w++) {
      ctx.beginPath();
      ctx.strokeStyle = `rgba(255, 255, 255, ${0.06 - w * 0.015})`;
      ctx.lineWidth = 1.5;
      const amp = 40 + w * 20;
      const freq = 0.02 - w * 0.005;
      const yOff = canvas.height * (0.3 + w * 0.2);
      for (let x = 0; x < canvas.width; x += 2) {
        const y = yOff + amp * Math.sin(freq * x + time * (1 + w * 0.3));
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    // Particulas
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * 0.5})`;
      ctx.fill();
    });

    // Conexiones
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.08 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }
  animate();
}
