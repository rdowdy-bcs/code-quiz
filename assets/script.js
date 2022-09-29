var startQuizBtn = document.querySelector("#start-quiz-btn");
var possibleAnswersEl = document.querySelector("#possible-answers");
var quizQuestionEl = document.querySelector("#quiz-question");

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
    startQuizBtn.setAttribute("style", "display: none;");
}

function moveToQuestion(nextQuestionIndex) {
    // get the next question from the questions array
    var currentQuestion = questions[nextQuestionIndex];
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