const questions = [
    {
        question: "How have you been feeling lately?",
        options: ["Good", "Okay", "Stressed", "Overwhelmed"]
    },
    {
        question: "How often do you feel anxious?",
        options: ["Never", "Sometimes", "Often", "Always"]
    },
    {
        question: "Do you find it hard to relax?",
        options: ["Yes", "No"]
    },
    {
        question: "How often do you feel overwhelmed by daily tasks?",
        options: ["Rarely", "Sometimes", "Often", "Very Often"]
    },
    {
        question: "How often do you feel sad or down?",
        options: ["Never", "Sometimes", "Often", "Always"]
    },
    {
        question: "Do you feel you have someone to talk to when you need support?",
        options: ["Yes", "No"]
    }
];

let currentQuestionIndex = 0;
const userResponses = {};

function displayQuestion() {
    const questionContainer = document.getElementById('question-container');
    questionContainer.innerHTML = '';

    const currentQuestion = questions[currentQuestionIndex];
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question');

    const questionLabel = document.createElement('label');
    questionLabel.textContent = currentQuestion.question;
    questionDiv.appendChild(questionLabel);

    const optionsDiv = document.createElement('div');
    optionsDiv.classList.add('options');

    currentQuestion.options.forEach(option => {
        const radioInput = document.createElement('input');
        radioInput.type = 'radio';
        radioInput.name = `question${currentQuestionIndex}`;
        radioInput.value = option;
        
        const label = document.createElement('label');
        label.textContent = option;

        optionsDiv.appendChild(radioInput);
        optionsDiv.appendChild(label);
        optionsDiv.appendChild(document.createElement('br'));
    });

    questionDiv.appendChild(optionsDiv);
    questionContainer.appendChild(questionDiv);
}

function handleNext() {
    const selectedOption = document.querySelector(`input[name="question${currentQuestionIndex}"]:checked`);
    if (selectedOption) {
        userResponses[`question${currentQuestionIndex}`] = selectedOption.value;
        currentQuestionIndex++;
        
        if (currentQuestionIndex < questions.length) {
            displayQuestion();
        } else {
            displayResults();
        }
    } else {
        alert("Please select an option before proceeding.");
    }
}

function displayResults() {
    const resultContainer = document.getElementById('result');
    let resultHtml = '<h2>Your Responses:</h2>';
    
    for (const [question, answer] of Object.entries(userResponses)) {
        resultHtml += `<p><strong>${questions[parseInt(question.replace('question', ''))].question}:</strong> ${answer}</p>`;
    }

    // Suggestions based on responses
    const suggestions = [];
    if (userResponses["question0"] === 'Stressed' || userResponses["question0"] === 'Overwhelmed') {
        suggestions.push("Consider practicing mindfulness or meditation.");
    }
    if (userResponses["question1"] === 'Often' || userResponses["question1"] === 'Always') {
        suggestions.push("Talking to a mental health professional could be beneficial.");
    }
    if (userResponses["question2"] === 'Yes') {
        suggestions.push("Try incorporating relaxation techniques into your daily routine.");
    }
    if (userResponses["question3"] === 'Often' || userResponses["question3"] === 'Very Often') {
        suggestions.push("It may help to prioritize your tasks and take breaks.");
    }
    if (userResponses["question4"] === 'Often' || userResponses["question4"] === 'Always') {
        suggestions.push("Please consider reaching out to a friend or professional for support.");
    }
    if (userResponses["question5"] === 'No') {
        suggestions.push("Building a support network can help during tough times.");
    }

    if (suggestions.length > 0) {
        resultHtml += '<h3>Suggestions:</h3><ul>';
        suggestions.forEach(suggestion => {
            resultHtml += `<li>${suggestion}</li>`;
        });
        resultHtml += '</ul>';
    }

    resultContainer.innerHTML = resultHtml;
    document.getElementById('questionnaire').style.display = 'none';
}

document.getElementById('next-button').addEventListener('click', handleNext);
displayQuestion();
