const startBtn = document.getElementById('start-btn');
const welcomeScreen = document.querySelector('.app');
const quizScreen = document.querySelector('.quiz');

startBtn.addEventListener("click", () => {
    welcomeScreen.classList.add('hidden');
    setTimeout(() => {
        toggleVisibility();
        startQuiz(); 
    }, 500);
});

function toggleVisibility() {
    toggleScreenVisibility(welcomeScreen, false);  
    toggleScreenVisibility(quizScreen, true);    
}

function toggleScreenVisibility(screen, isVisible) {
    screen.classList.toggle('hidden', !isVisible); 
    screen.classList.toggle('visible', isVisible);
}

const questions = [
    {
        question: "What is the output of console.log(typeof NaN); ?",
        answers: [
            { text: "NaN", correct: false },
            { text: "number", correct: true },
            { text: "undefined", correct: false },
            { text: "object", correct: false },
        ]
    },
    {
        question: "Which of the following is a valid way to create an array in JavaScript?",
        answers: [
            { text: "var arr = [];", correct: true },
            { text: "var arr = {};", correct: false },
            { text: "var arr = () => {};", correct: false },
            { text: "var arr = new Array();", correct: false },
        ]
    },
    {
        question: "Which symbol is used for single-line comments in JavaScript?",
        answers: [
            { text: "/*", correct: false },
            { text: "--", correct: false },
            { text: "//", correct: true },
            { text: "#", correct: false },
        ]
    },
    {
        question: "What will be the output of console.log(2 + '2'); ?",
        answers: [
            { text: "4", correct: false },
            { text: "'22'", correct: true },
            { text: "22", correct: false },
            { text: "'4'", correct: false },
        ]
    },
    {
        question: "Which method is used to remove the last element from an array in JavaScript?",
        answers: [
            { text: "pop()", correct: true },
            { text: "shift()", correct: false },
            { text: "slice()", correct: false },
            { text: "remove()", correct: false },
        ]
    },
    {
        question: "What does the Array.isArray() method do?",
        answers: [
            { text: "Checks if an object is an array.", correct: true },
            { text: "Converts an array to a string.", correct: false },
            { text: "Creates a new array.", correct: false },
            { text: "Merges two arrays.", correct: false },
        ]
    },
    {
        question: "Which of the following will create a new object in JavaScript?",
        answers: [
            { text: "var obj = new Object();", correct: false },
            { text: "var obj = Object.create();", correct: false },
            { text: "None of the above", correct: false },
            { text: "var obj = {};", correct: true },
        ]
    },
    {
        question: "What is the purpose of the return statement in a function?",
        answers: [
            { text: "To stop the function execution.", correct: false },
            { text: "To send a value back to the caller.", correct: true },
            { text: "To declare a variable.", correct: false },
            { text: "To define a new function.", correct: false },
        ]
    },
    {
        question: "Which operator is used to assign a value to a variable in JavaScript?",
        answers: [
            { text: "=", correct: true },
            { text: "==", correct: false },
            { text: "===", correct: false },
            { text: "!=", correct: false },
        ]
    },
    {
        question: "What will be the output of the following code: console.log(1 == '1'); ?",
        answers: [
            { text: "false", correct: false },
            { text: "undefined", correct: false },
            { text: "true", correct: true },
            { text: "NaN", correct: false },
        ]
    },
];


const questionText = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const questionCounter = document.getElementById("question-counter");
const motivation = document.getElementById("motivation");
let answerSelected = false;

let currentQuestionIndex = 0;
let result = 0;

function shuffleQuestions(array) {
    return array.slice().sort(() => Math.random() - 0.5);
}

function startQuiz() {
    currentQuestionIndex = 0; 
    result = 0;
    shuffleQuestions(questions);
    nextButton.innerHTML = "Next";
    showQuestion();
}


function showQuestion() {
    resetState();

    let currentQuestion = questions[currentQuestionIndex];
    let totalQuestionNo = questions.length;
    let currentQuestionNo = currentQuestionIndex + 1;

    questionText.innerHTML = currentQuestion.question;
    questionCounter.innerHTML = `#${currentQuestionNo} of ${totalQuestionNo}`;

    console.log(`Showing question ${currentQuestionNo} of ${totalQuestionNo}`); // Debugging line
    
    currentQuestion.answers.forEach(answer => createAnswerButton(answer));

}

function createAnswerButton(answer) {
    const button = document.createElement("button");
    button.classList.add("btn");
    button.innerHTML = answer.text;
    
    if (answer.correct) {
        button.dataset.correct = true;
    }

    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
}


function resetState() {
    nextButton.classList.add('hidden');
    answerSelected = false;
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    if (answerSelected) return; 

    const selectedBtn = e.target;
    const correct = selectedBtn.dataset.correct === "true";

    answerSelected = true;
    handleAnswerSelection(selectedBtn, correct);

    Array.from(answerButtons.children).forEach(button => {
        setAnswerState(button, button.dataset.correct === "true");
        button.disabled = true; 
    });

    nextButton.classList.remove('hidden');

}

function handleAnswerSelection(button, isCorrect) {
    if (isCorrect) {
        button.classList.add("correct");
        result++; 
    } else {
        button.classList.add("wrong");
    }
}

function setAnswerState(button, isCorrect) {
    if (isCorrect) {
        button.classList.add("correct");
    } else {
        button.classList.add("wrong");
    }
}

nextButton.addEventListener('click', () => {
    if (!answerSelected) {
        alert("Please select an answer before proceeding!");
        return;
    }

    answerSelected = false;
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
});

function showResults() {
    questionText.innerHTML = `You scored ${result} out of ${questions.length}!`;
    answerButtons.innerHTML = ''; 
    questionCounter.innerHTML = "Quiz Complete!";
    motivation.innerHTML = ""; 
    nextButton.classList.add('hidden'); 

    const restartButton = document.createElement('button');
    restartButton.innerHTML = 'Restart Quiz';
    restartButton.classList.add('next-btn');
    restartButton.addEventListener('click', () => {
        resetQuiz();
    });
    answerButtons.appendChild(restartButton);
}

function resetQuiz() {
    currentQuestionIndex = 0;
    result = 0;
    shuffleQuestions(questions); 
    resetState();
    showQuestion();
}