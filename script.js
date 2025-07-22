const form = document.getElementById('grow-form');
const chatbox = document.getElementById('chatbox');
const chatInput = document.getElementById('chat-input');
const sendChat = document.getElementById('send-chat');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = {
        user: form.user.value,
        plant: form.plant.value,
        ec: form.ec.value,
        ph: form.ph.value,
        notes: form.notes.value
    };
    console.log('Grow data:', data);
    form.reset();
});

sendChat.addEventListener('click', () => {
    const text = chatInput.value.trim();
    if (text) {
        const p = document.createElement('p');
        p.textContent = text;
        chatbox.appendChild(p);
        chatInput.value = '';
        chatbox.scrollTop = chatbox.scrollHeight;
    }
});
