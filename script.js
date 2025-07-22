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

const openaiApiKey = 'YOUR_OPENAI_API_KEY';
const openaiUrl = 'https://api.openai.com/v1/chat/completions';

async function sendToGPT(prompt) {
    const response = await fetch(openaiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${openaiApiKey}`
        },
        body: JSON.stringify({
            model: 'gpt-4',
            messages: [{ role: 'user', content: prompt }]
        })
    });

    if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
}

function appendMessage(sender, text) {
    const p = document.createElement('p');
    p.textContent = `${sender}: ${text}`;
    chatbox.appendChild(p);
}

sendChat.addEventListener('click', async () => {
    const text = chatInput.value.trim();
    if (text) {
        appendMessage('You', text);
        chatInput.value = '';
        chatbox.scrollTop = chatbox.scrollHeight;

        try {
            const reply = await sendToGPT(text);
            appendMessage('Assistant', reply);
        } catch (err) {
            appendMessage('Error', 'Failed to fetch response');
            console.error(err);
        }

        chatbox.scrollTop = chatbox.scrollHeight;
    }
});
