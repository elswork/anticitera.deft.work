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

    // Helper: Convert content paths to public URLs
    function pathToUrl(path) {
        if (!path) return '#';
        // content/en/blog/post.md -> /en/blog/post/
        // content/index.md -> /
        let url = path.replace(/^content\//, '/');
        url = url.replace(/\.md$/, '/');
        if (url === '/index/') return '/';
        // Ensure leading/trailing slashes
        if (!url.startsWith('/')) url = '/' + url;
        if (!url.endsWith('/')) url = url + '/';
        return url.replace(/\/+/g, '/');
    }

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
            const typingEl = document.getElementById(typingId);
            if (typingEl) typingEl.remove();

            if (data.answer) {
                addMessage(data.answer, 'ai', data.sources);
            } else {
                addMessage('Lo siento, el oráculo está nublado en este momento.', 'ai');
            }
        } catch (error) {
            console.error('Error:', error);
            const typingEl = document.getElementById(typingId);
            if (typingEl) typingEl.remove();
            addMessage('He perdido la conexión con el Nexo. Inténtalo de nuevo más tarde.', 'ai');
        }
    };

    sendBtn.addEventListener('click', handleSend);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSend();
    });

    function addMessage(text, side, sources = []) {
        const div = document.createElement('div');
        div.className = `prometeo-msg ${side}`;
        
        // Render Markdown if AI, else plain text
        if (side === 'ai' && window.marked) {
            div.innerHTML = marked.parse(text);
            
            // Add Sources if available
            if (sources && sources.length > 0) {
                const sourcesDiv = document.createElement('div');
                sourcesDiv.className = 'prometeo-sources';
                sourcesDiv.innerHTML = '<hr><p><small>Lecturas recomendadas:</small></p>';
                const ul = document.createElement('ul');
                sources.forEach(src => {
                    const li = document.createElement('li');
                    const url = pathToUrl(src);
                    const name = src.split('/').pop().replace('.md', '').replace(/_/g, ' ');
                    li.innerHTML = `<a href="${url}" target="_blank" rel="noopener">${name}</a>`;
                    ul.appendChild(li);
                });
                sourcesDiv.appendChild(ul);
                div.appendChild(sourcesDiv);
            }
        } else {
            div.innerText = text;
        }
        
        messagesContainer.appendChild(div);
        scrollToBottom();
    }

    function scrollToBottom() {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Proactividad (Lanzar pulso tras 3s si no se ha abierto)
    setTimeout(() => {
        if (!chatBox.classList.contains('active')) {
            bubble.classList.add('pulse');
        }
    }, 3000);
});
