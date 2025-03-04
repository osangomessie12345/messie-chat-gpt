      // Script unifié et corrigé
        document.getElementById("sendBtn").addEventListener("click", sendMessage);
        
        const predefinedResponses = {
            "qui es-tu ?": "Je suis l'intelligence artificielle créée par Messie Osango.",
            "créateur": "Mon créateur est Messie Osango.",
            "qui t'a créé": "J'ai été développée par Messie Osango, un passionné d'intelligence artificielle.",
            "que fais-tu": "Je suis ici pour répondre à vos questions et vous aider dans vos tâches quotidiennes !" ,
            "qui est messie osango":"messie osango est mon créateur "
        };

        async function sendMessage() {
            const userMessage = document.getElementById("txt").value.trim();
            if (!userMessage) return;

            const chatBox = document.getElementById("list_cont");
            
            // Ajout message utilisateur
            const userElement = document.createElement("li");
            userElement.classList.add("schat");
            userElement.textContent = userMessage;
            chatBox.appendChild(userElement);

            document.getElementById("txt").value = '';
            
            // Vérification réponse programmée
            const cleanMsg = userMessage.toLowerCase();
            let response = predefinedResponses[cleanMsg];

            if (!response) {
                try {
                    response = await fetchGroqData(userMessage);
                } catch (error) {
                    response = "Désolé, une erreur s'est produite. Veuillez réessayer.";
                }
            }

            // Ajout réponse
            const botElement = document.createElement("li");
            botElement.classList.add("rchat");
            botElement.textContent = response;
            chatBox.appendChild(botElement);

            chatBox.scrollTop = chatBox.scrollHeight;
        }

        async function fetchGroqData(prompt) {
            const apiKey = "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";
            const url = "https://api.groq.com/openai/v1/chat/completions";

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: "llama3-8b-8192",
                    messages: [{ role: "user", content: prompt }]
                })
            });

            if (!response.ok) throw new Error('API error');
            const data = await response.json();
            return data.choices[0].message.content;
              }
