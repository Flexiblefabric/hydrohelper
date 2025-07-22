const form = document.getElementById('grow-form');
const chatbox = document.getElementById('chatbox');
const chatInput = document.getElementById('chat-input');
const sendChat = document.getElementById('send-chat');

const endpoint = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = {
        user: form.user.value,
        plant: form.plant.value,
        ec: form.ec.value,
        ph: form.ph.value,
        notes: form.notes.value
    };

    fetch(endpoint, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
        .then(() => console.log('Grow data sent'))
        .catch(err => console.error('Error sending data:', err));

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
