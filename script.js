
document.getElementById("sendBtn").addEventListener("click", sendMessage);

const API_KEY = "AIzaSyBN4UIH-n3ZKDqXggccAatrcpi_fBf6XiA";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

const predefinedResponses = {
    "qui es-tu ?": "Je suis l'intelligence artificielle créée par Messie Osango.",
    "créateur": "Mon créateur est Messie Osango.",
    "qui t'a créé": "J'ai été développée par Messie Osango, un passionné d'intelligence artificielle.",
    "que fais-tu": "Je suis ici pour répondre à vos questions et vous aider dans vos tâches quotidiennes !",
    "qui est messie osango": "Messie Osango est mon créateur"
};

async function sendMessage() {
    const userMessage = document.getElementById("txt").value.trim();
    if (!userMessage) return;

    const chatBox = document.getElementById("list_cont");
    
    
    const userElement = document.createElement("li");
    userElement.classList.add("schat");
    userElement.textContent = userMessage;
    chatBox.appendChild(userElement);

    document.getElementById("txt").value = '';
    
    
    const cleanMsg = userMessage.toLowerCase();
    let response = predefinedResponses[cleanMsg];

    if (!response) {
        try {
            response = await fetchGeminiData(userMessage);
        } catch (error) {
            response = "Désolé, une erreur s'est produite. Veuillez réessayer.";
        }
    }

    const botElement = document.createElement("li");
    botElement.classList.add("rchat");
    botElement.textContent = response;
    chatBox.appendChild(botElement);

    chatBox.scrollTop = chatBox.scrollHeight;
}

async function fetchGeminiData(prompt) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            contents: [{
                parts: [{
                    text: prompt
                }]
            }]
        })
    });

    if (!response.ok) throw new Error('API error');
    const data = await response.json();
    
    if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
        throw new Error('Réponse API invalide');
    }
    
    return data.candidates[0].content.parts[0].text;
    }
