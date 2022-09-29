var startQuizBtn = document.querySelector("#start-quiz-btn");
var possibleAnswersEl = document.querySelector("#possible-answers");
var quizQuestionEl = document.querySelector("#quiz-question");
var highScoresEl = document.querySelector("#high-scores-section");

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
    moveToQuestion(0);
    highScoresEl.setAttribute("style", "display: none;");
    startQuizBtn.setAttribute("style", "display: none;");
    
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
                console.log("Correct Answer");
            } else {
                console.log("Wrong Answer");
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
}