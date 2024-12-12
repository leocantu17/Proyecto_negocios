// Variables de la interfaz
const openChat = document.getElementById('open-chat');
const chatBox = document.getElementById('chat-box');
const closeChat = document.getElementById('close-chat');
const micButton = document.getElementById('mic-button');
const textInput = document.getElementById('text-input');
const sendButton = document.getElementById('send-button');
const chatContent = document.getElementById('chat-content');
const respuesta = document.getElementById('respuesta');

// Mostrar y ocultar ventana de chat
openChat.addEventListener('click', () => {
    chatBox.style.right = '0';
});

closeChat.addEventListener('click', () => {
    chatBox.style.right = '-400px';
});

// Reconocimiento de voz
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (!SpeechRecognition) {
    respuesta.innerHTML += '<p class="error">Lo siento, tu navegador no es compatible con el ingreso de voz.<br> Usa los navegadores Chrome o Edge.</p>';
}
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    console.log("si llego")
    const voiceInput = event.results[0][0].transcript;
    textInput.value = voiceInput;
    enviarConsulta();
};

micButton.addEventListener('click', () => {
    console.log("ggg")
    recognition.start();
});

// Detectar Enter en el campo de texto
textInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        enviarConsulta();
    }
});

// Enviar solicitud
async function enviarConsulta() {
    const consulta = textInput.value;
    textInput.value = '';
    respuesta.innerHTML += '<b>Tu: </b>' + consulta + '<br>';
    console.log(consulta);
    try {
        const response = await fetch('http://localhost:3000/consulta', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                consulta: consulta
            })
        });

        const data = await response.json();
        if (data.respuesta === undefined) {
            respuesta.innerHTML += '<p class="p-error">Gemini no puede responder a tu consulta.</p>';
            textInput.value = '';
            return;
        } else {
            const geminiRespuesta = data.respuesta;

            // Crear contenedor para la respuesta
            const respuestaContainer = document.createElement('div');
            respuestaContainer.classList.add('respuesta-container');

            // Crear el texto de la respuesta
            const respuestaTexto = document.createElement('p');
            respuestaTexto.innerHTML = "<b>Gemini: </b>" + data.respuesta;

            // Crear el botón de recitar
            const recitar = document.createElement('button');
            recitar.classList.add('recitar-boton');
            recitar.textContent = "🔊";
            recitar.addEventListener('click', () => recitarTexto(geminiRespuesta));

            // Añadir texto y botón al contenedor
            respuestaContainer.appendChild(respuestaTexto);
            respuestaContainer.appendChild(recitar);

            // Añadir el contenedor al chat
            document.getElementById('respuesta').appendChild(respuestaContainer);

            // Limpiar campo de texto
            textInput.value = '';
        }
    } catch (error) {
        console.error('Error:', error);
        respuesta.innerHTML += 'Hubo un error al procesar la consulta <br>';
    }
}

function recitarTexto(texto) {
    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = 'es-ES';
    speechSynthesis.speak(utterance);
}