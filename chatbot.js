'use strict';
/* ═══════════════════════════════════════════════════════════════
   CHATBOT IA — ASISTENTE DE FÍSICA 3
   Integración con Google Gemini API (gemini-2.0-flash)
   ═══════════════════════════════════════════════════════════════ */

// ════════════════════════════════════════════
// 1. CONFIGURACIÓN
// ════════════════════════════════════════════
const CHATBOT_CONFIG = {
    model: 'gemini-2.5-flash', // Modelo por defecto, se sobrescribirá tras el diagnóstico
    apiUrl: 'https://generativelanguage.googleapis.com/v1beta/models/',
    maxTokens: 4096,
    temperature: 0.7,
    storageKeyApi: 'fisica3-gemini-api-key',
    storageKeyModel: 'fisica3-gemini-model',
    storageKeyHistory: 'fisica3-chat-history'
};

const DIAGNOSTIC_MODELS = [
    'gemini-2.5-flash',
    'gemini-flash',
    'gemini-2.5-flash-preview-09-2025',
    'gemini-2.0-flash',
    'gemini-2.0-flash-lite',
    'gemini-pro'
];

// ════════════════════════════════════════════
// 2. SYSTEM PROMPT CON CONTEXTO DEL CURSO
// ════════════════════════════════════════════
function buildSystemPrompt() {
    // Extraer contenido estructurado de TOPICS
    let courseContext = '';
    if (typeof TOPICS !== 'undefined') {
        TOPICS.forEach(topic => {
            courseContext += `\n\n## TEMA ${topic.number}: ${topic.title}\n`;
            courseContext += `Resumen: ${topic.abstract}\n`;
            topic.sections.forEach(sec => {
                // Eliminar tags HTML para el contexto
                const cleanContent = sec.content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
                courseContext += `\n### ${sec.title}\n${cleanContent}\n`;
            });
            if (topic.equations && topic.equations.length > 0) {
                courseContext += '\nEcuaciones clave:\n';
                topic.equations.forEach(eq => {
                    courseContext += `- ${eq.name}: ${eq.latex}\n`;
                });
            }
        });
    }

    // Mapa de navegación para recomendaciones
    const navigationMap = typeof TOPICS !== 'undefined' ? TOPICS.map(t => ({
        tema: t.title,
        numero: t.number,
        hash: `#tema/${t.id}`,
        secciones: t.sections.map(s => ({ titulo: s.title, id: s.id }))
    })) : [];

    return `Eres el **Asistente de Física 3** de la Universidad Tecnológica de Pereira. Tu nombre es **PhysBot**. Tienes una personalidad **excéntrica, brillante y muy entusiasta**, al estilo de un "científico loco" pero amigable (inspirado en personalidades como Albert Einstein o Richard Feynman). Te fascina el universo y te encanta contagiar esa curiosidad.

## Tu rol
Eres un tutor experto en física, especialmente en movimiento oscilatorio, MAS, cinemática del MAS, dinámica y energía del MAS, péndulo simple y sistema masa-resorte. Ayudas a estudiantes a:
1. **Comprender conceptos**: Explicar temas con claridad usando analogías y ejemplos
2. **Resolver ejercicios**: Guiar paso a paso, usando las ecuaciones correctas
3. **Practicar**: Generar ejercicios de práctica con diferentes niveles de dificultad
4. **Estudiar**: Hacer preguntas tipo quiz para evaluar comprensión
5. **Navegar la página**: Recomendar secciones específicas de la página donde encontrar información

## Reglas ESTRICTAS
- Responde SIEMPRE en español
- Usa notación LaTeX entre \\( y \\) para ecuaciones inline, y entre $$ $$ para ecuaciones en bloque
- Muestra tu personalidad entusiasta y fascinada por la física en tus respuestas
- **De vez en cuando (aprox. 1 de cada 3 o 4 respuestas largas)** remata con o incluye una **frase célebre o cita inspiradora** (breve) de algún científico famoso (Einstein, Newton, Feynman, Marie Curie, etc.) relacionada con el tema o el estudio
- Sé amigable, motivador y pedagógico
- Cuando generes ejercicios, incluye: enunciado, datos, incógnitas y solución paso a paso
- Para ejercicios de práctica, ofrece 3 niveles: Básico, Intermedio y Avanzado
- Cuando el usuario pida recomendaciones de dónde encontrar info en la página, usa los links internos
- NO recomiendes secciones de la página a menos que el usuario lo pida explícitamente
- Si no sabes algo, admítelo honestamente
- Usa emojis para hacer la conversación más viva

## Contenido del curso al que tienes acceso
${courseContext}

## Mapa de navegación de la página (para recomendaciones)
Cuando el usuario pida dónde encontrar algo, usa estos enlaces internos (se abren en la misma página):
${JSON.stringify(navigationMap, null, 2)}

Para recomendar una sección, usa el formato: "Puedes encontrar esto en [Nombre del tema](#tema/id-del-tema)"
Además existen las secciones:
- Recursos: #recursos (contiene Taller 1, Guías de Teoría, Solución del Taller 1, y videos de clase)
- Sobre Nosotros: #sobre-nosotros

## Formato de respuesta
- Usa **negrita** para conceptos importantes
- Usa listas numeradas para pasos de resolución
- Usa bloques de ecuación para fórmulas destacadas
- Sé conciso pero completo`;
}

// ════════════════════════════════════════════
// 3. ESTADO DEL CHATBOT
// ════════════════════════════════════════════
// Para evitar que inicie con una API Key previa, la borramos del caché al iniciar.
localStorage.removeItem(CHATBOT_CONFIG.storageKeyApi);
localStorage.removeItem(CHATBOT_CONFIG.storageKeyModel);

const chatState = {
    isOpen: false,
    isLoading: false,
    messages: [],
    apiKey: '', // Inicia vacío siempre
    model: '',
    conversationHistory: []
};

// ════════════════════════════════════════════
// 4. CREACIÓN DEL DOM DEL CHATBOT
// ════════════════════════════════════════════
function createChatbotDOM() {
    // Botón flotante
    const fab = document.createElement('button');
    fab.id = 'chatbot-fab';
    fab.className = 'chatbot-fab';
    fab.setAttribute('aria-label', 'Abrir asistente de Física 3');
    fab.title = 'Asistente PhysBot';
    fab.innerHTML = `
    <span class="chatbot-fab-icon">
      <i class="fa-solid fa-user-astronaut fa-bounce" style="--fa-animation-duration: 3s; --fa-bounce-jump-scale-x: 1; --fa-bounce-jump-scale-y: 1;"></i>
    </span>
    <span class="chatbot-fab-pulse"></span>
  `;
    fab.addEventListener('click', toggleChatbot);

    // Panel del chatbot
    const panel = document.createElement('div');
    panel.id = 'chatbot-panel';
    panel.className = 'chatbot-panel';
    panel.innerHTML = `
    <div class="chatbot-header">
      <div class="chatbot-header-info">
        <div class="chatbot-avatar">
          <i class="fa-solid fa-user-astronaut fa-fade" style="--fa-animation-duration: 4s;"></i>
        </div>
        <div>
          <div class="chatbot-header-title">PhysBot</div>
          <div class="chatbot-header-status">Asistente de Física 3</div>
        </div>
      </div>
      <div class="chatbot-header-actions">
        <button class="chatbot-header-btn" id="chatbot-clear" title="Limpiar chat">
          <i class="fa-solid fa-trash-can"></i>
        </button>
        <button class="chatbot-header-btn" id="chatbot-config" title="Configurar API Key">
          <i class="fa-solid fa-gear"></i>
        </button>
        <button class="chatbot-header-btn" id="chatbot-close" title="Cerrar">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
    </div>

    <div class="chatbot-messages" id="chatbot-messages">
      <!-- Mensajes dinámicos -->
    </div>

    <div class="chatbot-suggestions" id="chatbot-suggestions">
      <button class="chatbot-chip" data-prompt="Genera un ejercicio de MAS nivel intermedio">
        <i class="fa-solid fa-dumbbell"></i> Ejercicio MAS
      </button>
      <button class="chatbot-chip" data-prompt="Hazme un quiz rápido de 3 preguntas sobre el curso">
        <i class="fa-solid fa-brain"></i> Quiz rápido
      </button>
      <button class="chatbot-chip" data-prompt="Explícame el péndulo simple de forma sencilla">
        <i class="fa-solid fa-lightbulb"></i> Explicar tema
      </button>
      <button class="chatbot-chip" data-prompt="¿Dónde encuentro información sobre energía en el MAS?">
        <i class="fa-solid fa-map-signs"></i> Buscar en la página
      </button>
    </div>

    <div class="chatbot-input-area">
      <div class="chatbot-api-setup" id="chatbot-api-setup" style="display:none;">
        <p><i class="fa-solid fa-key"></i> Ingresa tu API Key de Google AI</p>
        <div class="chatbot-api-row">
          <input type="password" id="chatbot-api-input" placeholder="API Key de Gemini..."
                 autocomplete="off">
          <button id="chatbot-api-save"><i class="fa-solid fa-check"></i></button>
        </div>
        <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener noreferrer"
           class="chatbot-api-link">
          <i class="fa-solid fa-arrow-up-right-from-square"></i> Obtener API Key gratis
        </a>
      </div>
      <div class="chatbot-input-row" id="chatbot-input-row">
        <input type="text" id="chatbot-input" placeholder="Pregunta sobre física, pide ejercicios..."
               autocomplete="off">
        <button id="chatbot-send" title="Enviar">
          <i class="fa-solid fa-paper-plane"></i>
        </button>
      </div>
    </div>
  `;

    document.body.appendChild(fab);
    document.body.appendChild(panel);

    // Hacer arrastrable el panel
    makeDraggable(panel, panel.querySelector('.chatbot-header'));

    // Event listeners
    document.getElementById('chatbot-close').addEventListener('click', toggleChatbot);
    document.getElementById('chatbot-clear').addEventListener('click', clearChat);
    document.getElementById('chatbot-config').addEventListener('click', showApiSetup);
    document.getElementById('chatbot-send').addEventListener('click', sendMessage);
    document.getElementById('chatbot-input').addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    document.getElementById('chatbot-api-save').addEventListener('click', saveApiKey);
    document.getElementById('chatbot-api-input').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') saveApiKey();
    });

    // Chips de sugerencia
    document.querySelectorAll('.chatbot-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            const prompt = chip.dataset.prompt;
            document.getElementById('chatbot-input').value = prompt;
            sendMessage();
        });
    });
}

function makeDraggable(panel, header) {
    let isDragging = false;
    let startX, startY;
    let currentDragX = 0;
    let currentDragY = 0;
    let tempDragX = 0;
    let tempDragY = 0;

    header.style.cursor = 'grab';
    header.title = 'Arrastrar para mover';

    header.addEventListener('mousedown', (e) => {
        // No arrastrar si presiona un botón del header
        if (e.target.closest('.chatbot-header-btn')) return;

        isDragging = true;
        header.style.cursor = 'grabbing';
        
        startX = e.clientX;
        startY = e.clientY;

        // Quitar transiciones mientras se arrastra para evitar latencia
        panel.style.transition = 'none';
        e.preventDefault(); // Evitar selección de texto
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        tempDragX = currentDragX + dx;
        tempDragY = currentDragY + dy;
        
        // Aplicar a variables CSS para que no sobrescriban la clase .active
        panel.style.setProperty('--drag-x', `${tempDragX}px`);
        panel.style.setProperty('--drag-y', `${tempDragY}px`);
    });

    document.addEventListener('mouseup', () => {
        if (!isDragging) return;
        isDragging = false;
        header.style.cursor = 'grab';
        
        currentDragX = tempDragX;
        currentDragY = tempDragY;
        
        // Restaurar transiciones base
        panel.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
}

// ════════════════════════════════════════════
// 5. CONTROL DE UI
// ════════════════════════════════════════════
function toggleChatbot() {
    chatState.isOpen = !chatState.isOpen;
    const panel = document.getElementById('chatbot-panel');
    const fab = document.getElementById('chatbot-fab');

    if (chatState.isOpen) {
        panel.classList.add('active');
        fab.classList.add('active');

        // Si no hay api key, mostrar setup
        if (!chatState.apiKey) {
            showApiSetup();
        } else {
            hideApiSetup();
            document.getElementById('chatbot-input').focus();
        }

        // Mensaje de bienvenida si es la primera vez
        if (chatState.messages.length === 0) {
            addBotMessage(`¡Hola! 👋 Soy **PhysBot**, tu asistente de Física 3.

Puedo ayudarte a:
- 📚 **Comprender** conceptos del curso
- ✏️ **Generar ejercicios** de práctica con solución
- 🧠 **Hacer quizzes** para estudiar
- 🗺️ **Encontrar contenido** en la página

¡Pregúntame lo que necesites!`);
        }
    } else {
        panel.classList.remove('active');
        fab.classList.remove('active');
    }
}

function showApiSetup() {
    document.getElementById('chatbot-api-setup').style.display = 'flex';
    document.getElementById('chatbot-input-row').style.display = 'none';
    setTimeout(() => document.getElementById('chatbot-api-input').focus(), 100);
}

function hideApiSetup() {
    document.getElementById('chatbot-api-setup').style.display = 'none';
    document.getElementById('chatbot-input-row').style.display = 'flex';
}

async function saveApiKey() {
    const input = document.getElementById('chatbot-api-input');
    const btn = document.getElementById('chatbot-api-save');
    const key = input.value.trim();
    if (!key) return;

    // UI feedback during test
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
    input.disabled = true;

    // Probar modelos secuencialmente
    let workingModel = null;
    for (const model of DIAGNOSTIC_MODELS) {
        try {
            const url = `${CHATBOT_CONFIG.apiUrl}${model}:generateContent?key=${key}`;
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: 'Responde solo: HOLA' }] }],
                    generationConfig: { maxOutputTokens: 10 }
                })
            });

            const data = await res.json();
            if (res.ok && data.candidates && data.candidates.length > 0) {
                workingModel = model;
                break; // Encontramos uno que funciona
            }
        } catch (error) {
            console.warn(`Falló modelo ${model}`, error);
        }
        // Pequeña pausa para no sobrecargar la API
        await new Promise(r => setTimeout(r, 400));
    }

    // Restaurar UI
    btn.disabled = false;
    btn.innerHTML = '<i class="fa-solid fa-check"></i>';
    input.disabled = false;

    if (workingModel) {
        chatState.apiKey = key;
        chatState.model = workingModel;
        CHATBOT_CONFIG.model = workingModel;
        localStorage.setItem(CHATBOT_CONFIG.storageKeyApi, key);
        localStorage.setItem(CHATBOT_CONFIG.storageKeyModel, workingModel);
        
        hideApiSetup();
        input.value = '';
        document.getElementById('chatbot-input').focus();

        addBotMessage(`✅ ¡API Key guardada!\n\nSe ha configurado exitosamente usando el modelo **${workingModel}**. Ya puedes empezar a preguntar.`);
    } else {
        addBotMessage('❌ **API Key no válida o sin modelos disponibles.** No se obtuvo respuesta de ninguno de los modelos verificados. Por favor, verifica tu clave.');
    }
}

function clearChat() {
    chatState.messages = [];
    chatState.conversationHistory = [];
    const container = document.getElementById('chatbot-messages');
    container.innerHTML = '';

    addBotMessage(`💫 Chat limpiado. ¡Empecemos de nuevo!

¿Qué te gustaría repasar hoy?`);
}

// ════════════════════════════════════════════
// 6. MENSAJES
// ════════════════════════════════════════════
function addUserMessage(text) {
    const msg = { role: 'user', content: text, timestamp: new Date() };
    chatState.messages.push(msg);
    renderMessage(msg);
    scrollToBottom();
}

function addBotMessage(text) {
    const msg = { role: 'bot', content: text, timestamp: new Date() };
    chatState.messages.push(msg);
    renderMessage(msg);
    scrollToBottom();
}

function renderMessage(msg) {
    const container = document.getElementById('chatbot-messages');
    const div = document.createElement('div');
    div.className = `chatbot-msg chatbot-msg-${msg.role}`;

    if (msg.role === 'bot') {
        div.innerHTML = `
      <div class="chatbot-msg-avatar">
        <i class="fa-solid fa-atom"></i>
      </div>
      <div class="chatbot-msg-bubble">${formatBotMessage(msg.content)}</div>
    `;
    } else {
        div.innerHTML = `
      <div class="chatbot-msg-bubble">${escapeHtml(msg.content)}</div>
      <div class="chatbot-msg-avatar chatbot-msg-avatar-user">
        <i class="fa-solid fa-user"></i>
      </div>
    `;
    }

    container.appendChild(div);

    // Re-renderizar KaTeX en el nuevo mensaje
    if (typeof renderMathInElement !== 'undefined') {
        const bubble = div.querySelector('.chatbot-msg-bubble');
        renderMathInElement(bubble, {
            delimiters: [
                { left: '$$', right: '$$', display: true },
                { left: '\\(', right: '\\)', display: false },
                { left: '\\[', right: '\\]', display: true }
            ],
            throwOnError: false
        });
    }

    // Activar links internos de navegación
    div.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const hash = link.getAttribute('href').substring(1);
            if (typeof navigate === 'function') {
                navigate(hash);
            } else {
                location.hash = hash;
            }
        });
    });

    // Ocultar sugerencias después del primer mensaje
    if (chatState.messages.length > 1) {
        const suggestions = document.getElementById('chatbot-suggestions');
        if (suggestions) suggestions.style.display = 'none';
    }
}

function showTypingIndicator() {
    const container = document.getElementById('chatbot-messages');
    const indicator = document.createElement('div');
    indicator.id = 'chatbot-typing';
    indicator.className = 'chatbot-msg chatbot-msg-bot chatbot-typing';
    indicator.innerHTML = `
    <div class="chatbot-msg-avatar">
      <i class="fa-solid fa-atom fa-spin" style="--fa-animation-duration: 2s;"></i>
    </div>
    <div class="chatbot-msg-bubble chatbot-typing-bubble">
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
    </div>
  `;
    container.appendChild(indicator);
    scrollToBottom();
}

function removeTypingIndicator() {
    const indicator = document.getElementById('chatbot-typing');
    if (indicator) indicator.remove();
}

function scrollToBottom() {
    const container = document.getElementById('chatbot-messages');
    requestAnimationFrame(() => {
        container.scrollTop = container.scrollHeight;
    });
}

// ════════════════════════════════════════════
// 7. FORMATEO DE MENSAJES
// ════════════════════════════════════════════
function formatBotMessage(text) {
    // Primero proteger los bloques LaTeX para que no se afecten por markdown
    const latexBlocks = [];
    let processed = text;

    // Proteger bloques $$ ... $$
    processed = processed.replace(/\$\$([^$]+?)\$\$/g, (match) => {
        latexBlocks.push(match);
        return `%%LATEX_BLOCK_${latexBlocks.length - 1}%%`;
    });

    // Proteger inline \( ... \)
    processed = processed.replace(/\\\((.+?)\\\)/g, (match) => {
        latexBlocks.push(match);
        return `%%LATEX_BLOCK_${latexBlocks.length - 1}%%`;
    });

    // Markdown básico
    // Negrita
    processed = processed.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    // Cursiva
    processed = processed.replace(/\*(.+?)\*/g, '<em>$1</em>');
    // Links internos [texto](#hash)
    processed = processed.replace(/\[([^\]]+)\]\(#([^)]+)\)/g, '<a href="#$2" class="chatbot-link">$1</a>');
    // Links externos [texto](url)
    processed = processed.replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener" class="chatbot-link-ext">$1 ↗</a>');
    // Listas con números
    processed = processed.replace(/^(\d+)\.\s+(.+)$/gm, '<li class="chatbot-list-num">$2</li>');
    // Listas con guion
    processed = processed.replace(/^[-•]\s+(.+)$/gm, '<li>$1</li>');
    // Envolver <li> consecutivos en <ul>
    processed = processed.replace(/((<li[^>]*>.*?<\/li>\s*)+)/g, '<ul class="chatbot-list">$1</ul>');
    // Párrafos (saltos de línea dobles)
    processed = processed.replace(/\n\n/g, '</p><p>');
    // Saltos de línea simples
    processed = processed.replace(/\n/g, '<br>');

    // Restaurar bloques LaTeX
    latexBlocks.forEach((block, i) => {
        processed = processed.replace(`%%LATEX_BLOCK_${i}%%`, block);
    });

    return `<p>${processed}</p>`;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ════════════════════════════════════════════
// 8. ENVÍO DE MENSAJES A GEMINI
// ════════════════════════════════════════════
async function sendMessage() {
    const input = document.getElementById('chatbot-input');
    const text = input.value.trim();
    if (!text || chatState.isLoading) return;

    // Verificar API key
    if (!chatState.apiKey) {
        showApiSetup();
        return;
    }

    // Mostrar mensaje del usuario
    addUserMessage(text);
    input.value = '';
    input.focus();

    // Agregar al historial de conversación
    chatState.conversationHistory.push({
        role: 'user',
        parts: [{ text: text }]
    });

    // Mostrar indicador de carga
    chatState.isLoading = true;
    showTypingIndicator();
    document.getElementById('chatbot-send').disabled = true;

    try {
        const response = await callGeminiAPI(text);
        removeTypingIndicator();
        addBotMessage(response);

        // Agregar respuesta al historial
        chatState.conversationHistory.push({
            role: 'model',
            parts: [{ text: response }]
        });

    } catch (error) {
        removeTypingIndicator();
        console.error('Chatbot error:', error);

        if (error.message.includes('API key')) {
            addBotMessage('⚠️ **API Key inválida o expirada.** Por favor, verifica tu clave haciendo clic en el ícono de ⚙️ configuración.');
            chatState.apiKey = '';
            localStorage.removeItem(CHATBOT_CONFIG.storageKeyApi);
        } else if (error.message.includes('quota') || error.message.includes('429')) {
            addBotMessage('⏳ **Se alcanzó el límite de solicitudes.** Espera unos segundos e intenta de nuevo. La API gratuita tiene un límite de solicitudes por minuto.');
        } else {
            addBotMessage(`❌ **Error al obtener respuesta:** ${error.message}\n\nIntenta de nuevo en unos momentos.`);
        }
    } finally {
        chatState.isLoading = false;
        document.getElementById('chatbot-send').disabled = false;
    }
}

async function callGeminiAPI(userMessage) {
    const systemPrompt = buildSystemPrompt();

    // Detectar contexto adicional: en qué vista está el usuario
    let contextExtra = '';
    if (typeof state !== 'undefined') {
        if (state.currentView === 'tema' && state.currentTopic) {
            contextExtra = `\n\n[CONTEXTO: El usuario está viendo actualmente el tema "${state.currentTopic.title}" (Tema ${state.currentTopic.number})]`;
        } else if (state.currentView === 'recursos') {
            contextExtra = '\n\n[CONTEXTO: El usuario está en la sección de Recursos]';
        } else if (state.currentView === 'inicio') {
            contextExtra = '\n\n[CONTEXTO: El usuario está en la página de inicio]';
        }
    }

    // Construir el cuerpo de la solicitud
    const body = {
        system_instruction: {
            parts: [{ text: systemPrompt + contextExtra }]
        },
        contents: chatState.conversationHistory.slice(-20), // Últimos 20 mensajes para contexto
        generationConfig: {
            temperature: CHATBOT_CONFIG.temperature,
            maxOutputTokens: CHATBOT_CONFIG.maxTokens,
            topP: 0.95,
            topK: 40
        }
    };

    const activeModel = chatState.model || CHATBOT_CONFIG.model;
    const url = `${CHATBOT_CONFIG.apiUrl}${activeModel}:generateContent?key=${chatState.apiKey}`;

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMsg = errorData?.error?.message || `HTTP ${response.status}`;

        if (response.status === 400 && errorMsg.toLowerCase().includes('api key')) {
            throw new Error('API key inválida');
        }
        if (response.status === 429) {
            throw new Error('quota exceeded (429)');
        }
        throw new Error(errorMsg);
    }

    const data = await response.json();

    // Extraer texto de la respuesta
    const candidates = data?.candidates;
    if (!candidates || candidates.length === 0) {
        throw new Error('No se recibió respuesta del modelo');
    }

    const parts = candidates[0]?.content?.parts;
    if (!parts || parts.length === 0) {
        throw new Error('Respuesta vacía del modelo');
    }

    return parts.map(p => p.text).join('');
}

// ════════════════════════════════════════════
// 9. INICIALIZACIÓN
// ════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
    createChatbotDOM();
});
