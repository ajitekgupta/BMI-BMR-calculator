// --- 1. CALCULATOR LOGIC ---
const form = document.querySelector('#calc-form');
const results = document.querySelector('#results');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const height = parseFloat(document.querySelector('#height').value);
  const weight = parseFloat(document.querySelector('#weight').value);
  const age = parseInt(document.querySelector('#age').value);
  const gender = document.querySelector('#gender').value;
  const activity = parseFloat(document.querySelector('#activity').value);
  const targetWeight = parseFloat(document.querySelector('#targetWeight').value);

  if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
    results.innerHTML = "Please enter valid height and weight.";
    results.className = "result-overweight";
    results.classList.remove('hidden');
    return;
  }

  const bmi = (weight / ((height / 100) ** 2)).toFixed(2);
  let category = ""; let colorClass = "";

  if (bmi < 18.6) {
    category = "Underweight"; colorClass = "result-underweight";
  } else if (bmi >= 18.6 && bmi <= 24.9) {
    category = "Normal"; colorClass = "result-normal";
  } else {
    category = "Overweight"; colorClass = "result-overweight";
  }

  let bmr = (10 * weight) + (6.25 * height) - (5 * age);
  bmr = gender === "male" ? bmr + 5 : bmr - 161;
  const calories = Math.round(bmr * activity);

  let suggestion = "";
  if (!isNaN(targetWeight) && targetWeight > 0) {
    if (targetWeight < weight) {
      suggestion = `🎯 Aim for roughly <strong>${calories - 500} kcal/day</strong> to lose weight safely.`;
    } else if (targetWeight > weight) {
      suggestion = `🎯 Aim for roughly <strong>${calories + 500} kcal/day</strong> to gain weight safely.`;
    } else {
      suggestion = "🎯 You are at your target weight! Maintain your current calories.";
    }
  }

  results.innerHTML = `
    <h3 style="margin-top:0; color: inherit;">Your Results</h3>
    <p>BMI: <strong>${bmi}</strong> (${category})</p>
    <p>Maintenance Calories: <strong>${calories} kcal/day</strong></p>
    <p style="margin-bottom:0;">${suggestion}</p>
  `;
  results.className = colorClass;
  results.classList.remove('hidden');
});


// --- 2. CHATBOT ---


const chatToggle = document.getElementById('chat-toggle');
const chatWindow = document.getElementById('chat-window');
const closeChat = document.getElementById('close-chat');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');
const chatMessages = document.getElementById('chat-messages');
const typingIndicator = document.getElementById('typing-indicator');

chatToggle.addEventListener('click', () => chatWindow.classList.toggle('hidden'));
closeChat.addEventListener('click', () => chatWindow.classList.add('hidden'));

async function fetchAIResponse(userMessage) {
  const url = `https://openrouter.ai/api/v1/chat/completions`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model:"liquid/lfm-2.5-1.2b-thinking:free", 
        messages: [
          {
            role: "system",
            content: "You are a helpful health and fitness assistant. Keep your answers under 3 sentences. Only answer questions related to BMI, BMR, calories, and fitness. If the user asks anything unrelated, politely say you can only help with health and fitness topics."
          },
          {
            role: "user",
            content: userMessage
          }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      return `API Error: ${errorData.error.message}`;
    }

    const data = await response.json();
    return data.choices[0].message.content;

  } catch (error) {
    console.error("Error:", error);
    return `Technical Error: ${error.message}`;
  }
}
async function handleSendMessage() {
  const message = chatInput.value.trim();
  if (!message) return;

  addMessageToUI(message, 'user');
  chatInput.value = '';

  typingIndicator.classList.remove('hidden');
  const aiResponse = await fetchAIResponse(message);
  typingIndicator.classList.add('hidden');

  addMessageToUI(aiResponse, 'bot');
}

function addMessageToUI(text, sender) {
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('message', sender);
  msgDiv.textContent = text;
  chatMessages.appendChild(msgDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

sendBtn.addEventListener('click', handleSendMessage);
chatInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') handleSendMessage();
});
