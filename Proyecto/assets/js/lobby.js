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
const recognition = new SpeechRecognition();

micButton.addEventListener('click', () => {
    recognition.start();
});

recognition.onresult = (event) => {
    const voiceInput = event.results[0][0].transcript;
    textInput.value = voiceInput;
};

// Enviar solicitud
async function enviarConsulta() {
    const consulta = textInput.value;
    respuesta.innerHTML += '<b>Tu: </b>' + consulta + '<br>';

    try {
        const response = await fetch('http://localhost:3000/consulta', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ consulta })
        });

        const data = await response.json();
        if (data.response === undefined) {
            respuesta.innerHTML += 'Gemini no puede responder a tu consulta.<br>';
            textInput.value = '';
            return;
        } else {
            respuesta.innerHTML += "<b>Gemini: </b>" + data.response + '<br>';
            textInput.value = '';
        }
    } catch (error) {
        console.error('Error:', error);
        respuesta.innerHTML += 'Hubo un error al procesar la consulta <br>';
    }
}
