var startQuizBtn = document.querySelector("#start-quiz-btn");
var possibleAnswersEl = document.querySelector("#possible-answers");
var quizQuestionEl = document.querySelector("#quiz-question");
var highScoresEl = document.querySelector("#high-scores-section");
var timerEl = document.querySelector("#timer");
var rightOrWrongEl = document.querySelector("#right-or-wrong");
var scoreSubmitBtn = document.querySelector("#score-submit-btn");
var highScoresListEl = document.querySelector("#high-scores-list");
var initialsInputEl = document.querySelector("#initials-input");
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

startQuizBtn.addEventListener("click", startQuiz);

function startQuiz() {
    initTimer();
    moveToQuestion(0);
    
    highScoresEl.setAttribute("style", "display: none;");
    startQuizBtn.setAttribute("style", "display: none;");
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
    // check if we've reached the end of the quiz
    if (nextQuestionIndex >= questions.length) {
        handleEndOfQuiz();
        return;
    }

    // get the next question from the questions array
    var currentQuestion = questions[nextQuestionIndex];
    // delete any answers displayed from the last question
    possibleAnswersEl.innerHTML = "";
    // render the question
    quizQuestionEl.textContent = currentQuestion.question;
    // render the possible answers
    for (var i = 0; i < currentQuestion.possibleAnswers.length; i++) {
        var li = document.createElement("li");
        li.textContent = currentQuestion.possibleAnswers[i];

        li.addEventListener("click", function(event) {
            if (event.target.textContent === currentQuestion.correctAnswer) {
                timer += 5; // timer = timer + 5
                timerEl.textContent = timer;
                rightOrWrongEl.textContent = "Correct!";
            } else {
                timer -= 5; // timer = timer - 5
                timerEl.textContent = timer;
                rightOrWrongEl.textContent = "Wrong!";
            }

            moveToQuestion(nextQuestionIndex + 1);
        });

        possibleAnswersEl.appendChild(li);
    }
}

function handleEndOfQuiz() {
    // this is the end of the quiz;
    quizQuestionEl.textContent = "";
    possibleAnswersEl.innerHTML = "";
    highScoresEl.setAttribute("style", "display: block;");
    startQuizBtn.setAttribute("style", "display: block;");
    startQuizBtn.textContent = "Try Again";
    clearInterval(timerIntervalId);
    highScoresListEl.setAttribute("style", "display: none;");
    document.querySelector("#initials-input-section").setAttribute("style", "display: block;")
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
    document.querySelector("#initials-input-section").setAttribute("style", "display: none;")
}

function displayHighScores(highScores) {
    highScoresListEl.innerHTML = "";
    for (var i = 0; i < highScores.length; i++) {
        var currentScore = highScores[i];

        var li = document.createElement("li");
        li.textContent = `${currentScore.initials}: ${currentScore.score}`;

        highScoresListEl.appendChild(li);
    }
    highScoresListEl.setAttribute("style", "display: block;");

}

scoreSubmitBtn.addEventListener("click", submitScore);