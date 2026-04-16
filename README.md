# BMI & BMR Calculator with AI Health Assistant

A web-based health calculator built with HTML, CSS, and JavaScript that calculates BMI, BMR, and daily calorie needs — with an integrated AI chatbot for health-related questions.

## Features

- **BMI Calculator** — calculates Body Mass Index and shows category (Underweight / Normal / Overweight)
- **BMR Calculator** — uses the Mifflin-St Jeor formula to calculate Basal Metabolic Rate
- **Calorie Estimator** — multiplies BMR by activity level to show daily maintenance calories
- **Target Weight Suggestion** — suggests calorie intake based on whether you want to lose or gain weight
- **AI Health Chatbot** — floating chat panel powered by OpenRouter API that answers questions about BMI, BMR, calories, and fitness

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript (ES6+)
- OpenRouter API (google/gemma-4-26b-a4b-it:free)

## How to Run

1. Clone or download this repository
2. Get a free API key from https://openrouter.ai
3. Open script.js and replace "your-openrouter-key-here" with your API key
4. Open index.html in any browser — no build tools or installation needed

## Project Structure

project/
│
├── index.html
├── style.css
├── script.js
└── README.md

## Formulas Used

BMI
BMI = weight(kg) / height(m)²

BMR — Mifflin-St Jeor
Male:   BMR = (10 × weight) + (6.25 × height) - (5 × age) + 5
Female: BMR = (10 × weight) + (6.25 × height) - (5 × age) - 161

Daily Calories
Calories = BMR × Activity Level

## Chatbot

The chatbot uses the OpenRouter API to answer health and fitness questions. It is scoped only to BMI, BMR, calorie, and fitness topics. The API call is made directly from the frontend using fetch().

Note: In a production app, the API key should be kept on a backend server. For this demo project it is kept in the frontend JS file.

## Author

Made by Ajitek
