/**
 * Prometeo JS - Inteligencia Soberana de Anticitera
 */

document.addEventListener('DOMContentLoaded', () => {
    const bubble = document.getElementById('prometeo-bubble');
    const chatBox = document.getElementById('prometeo-chat-box');
    const closeBtn = document.getElementById('prometeo-close');
    const sendBtn = document.getElementById('prometeo-send');
    const input = document.getElementById('prometeo-input');
    const messagesContainer = document.getElementById('prometeo-messages');

    const API_URL = 'https://askprometeo-7uaiyegy4a-uc.a.run.app';

    // Toggle Chat
    bubble.addEventListener('click', () => {
        chatBox.classList.add('active');
        bubble.style.display = 'none';
        if (messagesContainer.children.length === 0) {
            addMessage('¡Saludos, buscador! Soy Prometeo. ¿Qué secretos de Anticitera deseas desentrañar hoy?', 'ai');
        }
    });

    closeBtn.addEventListener('click', () => {
        chatBox.classList.remove('active');
        bubble.style.display = 'flex';
    });

    // Send Message
    const handleSend = async () => {
        const question = input.value.trim();
        if (!question) return;

        addMessage(question, 'user');
        input.value = '';

        // Typing indicator
        const typingId = 'typing-' + Date.now();
        const typingDiv = document.createElement('div');
        typingDiv.id = typingId;
        typingDiv.className = 'typing';
        typingDiv.innerText = 'Prometeo está consultando los engranajes...';
        messagesContainer.appendChild(typingDiv);
        scrollToBottom();

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question })
            });

            const data = await response.json();
            document.getElementById(typingId).remove();

            if (data.answer) {
                addMessage(data.answer, 'ai');
            } else {
                addMessage('Lo siento, el oráculo está nublado en este momento.', 'ai');
            }
        } catch (error) {
            console.error('Error:', error);
            document.getElementById(typingId).remove();
            addMessage('He perdido la conexión con el Nexo. Inténtalo de nuevo más tarde.', 'ai');
        }
    };

    sendBtn.addEventListener('click', handleSend);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSend();
    });

    function addMessage(text, side) {
        const div = document.createElement('div');
        div.className = `prometeo-msg ${side}`;
        
        // Simple Markdown-ish line break handling
        const formattedText = text.replace(/\n/g, '<br>');
        div.innerHTML = formattedText;
        
        messagesContainer.appendChild(div);
        scrollToBottom();
    }

    function scrollToBottom() {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Proactividad (Opcional: Lanzar saludo tras 30s si no se ha abierto)
    setTimeout(() => {
        if (!chatBox.classList.contains('active')) {
            bubble.classList.add('pulse'); // Requiere CSS pulse
        }
    }, 30000);
});
