var startQuizBtn = document.querySelector("#start-quiz-btn");
var possibleAnswersEl = document.querySelector("#possible-answers");
var quizQuestionEl = document.querySelector("#quiz-question");
var highScoresEl = document.querySelector("#high-scores-section");
var timerEl = document.querySelector("#timer");
var rightOrWrongEl = document.querySelector("#right-or-wrong");
var scoreSubmitBtn = document.querySelector("#score-submit-btn");
var highScoresListEl = document.querySelector("#high-scores-list");
var initialsInputEl = document.querySelector("#initials-input");
var initialsInputSectionEl = document.querySelector("#initials-input-section");
var highScoresMessageEl = document.querySelector("#high-scores-message");

var TIMER_START_SECONDS = 60;

var timer;
var timerIntervalId;

var questions = [
    {
        question: "What does DOM stand for?",
        possibleAnswers: [
            "Document Object Model",
            "Domain Oriented Model",
            "Delightful Object Mountain",
            "Dancing Orangutans Movie"
        ],
        correctAnswer: "Document Object Model"
    },
    {
        question: "What does CSS stand for?",
        possibleAnswers: [
            "Cool Skateboarding Salamanders",
            "Cascading Style Sheets",
            "Culinary Salmon State",
            "Coding Standards & Solidness"
        ],
        correctAnswer: "Cascading Style Sheets"
    }
];

function startQuiz() {
    initTimer();
    moveToQuestion(0);
    
    hideElement(highScoresEl);
    hideElement(startQuizBtn);
}

function initTimer() {
    timer = TIMER_START_SECONDS;
    timerEl.textContent = timer;

    timerIntervalId = setInterval(function() {
        if (timer > 0) {
            timer--;
            timerEl.textContent = timer;
        } else {
            handleEndOfQuiz();
        }
    }, 1000);
}

function moveToQuestion(nextQuestionIndex) {
    if (nextQuestionIndex >= questions.length) {
        handleEndOfQuiz();
        return;
    }

    var currentQuestion = questions[nextQuestionIndex];
    possibleAnswersEl.innerHTML = "";
    quizQuestionEl.textContent = currentQuestion.question;

    for (var i = 0; i < currentQuestion.possibleAnswers.length; i++) {
        var li = document.createElement("li");
        li.textContent = currentQuestion.possibleAnswers[i];

        li.addEventListener("click", function(event) {
            if (event.target.textContent === currentQuestion.correctAnswer) {
                timer += 5;
                timerEl.textContent = timer;
                rightOrWrongEl.textContent = "Correct!";
            } else {
                timer -= 5;
                timerEl.textContent = timer;
                rightOrWrongEl.textContent = "Wrong!";
            }

            moveToQuestion(nextQuestionIndex + 1);
        });

        possibleAnswersEl.appendChild(li);
    }
}

function handleEndOfQuiz() {
    clearInterval(timerIntervalId);
    
    quizQuestionEl.textContent = "";
    possibleAnswersEl.innerHTML = "";
    startQuizBtn.textContent = "Try Again";
    
    showElement(highScoresEl);
    showElement(startQuizBtn);
    showElement(initialsInputSectionEl);
    hideElement(highScoresListEl);
}

function submitScore() {
    var userInitials = initialsInputEl.value;

    if (userInitials.length !== 2) {
        highScoresEl.textContent = "You must input 2 letters for your initials!"
        return;
    }

    var highScores = localStorage.getItem("highScores");

    if (highScores === null) {
        highScores = [];
    } else {
        highScores = JSON.parse(highScores);
    }

    highScores.push({
        initials: userInitials,
        score: timer
    });

    // sort the high scores
    highScores = highScores.sort(function(a, b) {
        return b.score - a.score;
    });

    localStorage.setItem("highScores", JSON.stringify(highScores));

    displayHighScores(highScores);

    initialsInputEl.value = "";
    hideElement(initialsInputSectionEl);
}

function displayHighScores(highScores) {
    highScoresListEl.innerHTML = "";
    for (var i = 0; i < highScores.length; i++) {
        var currentScore = highScores[i];

        var li = document.createElement("li");
        li.textContent = `${currentScore.initials}: ${currentScore.score}`;

        highScoresListEl.appendChild(li);
    }

    showElement(highScoresListEl);
}

function showElement(element) {
    element.setAttribute("style", "display: block;");
}

function hideElement(element) {
    element.setAttribute("style", "display: none;");
}

scoreSubmitBtn.addEventListener("click", submitScore);
startQuizBtn.addEventListener("click", startQuiz);
