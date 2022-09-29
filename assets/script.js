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
    }
];

startQuizBtn.addEventListener("click", startQuiz);

function startQuiz() {
    var currentQuestion = questions[0];
    quizQuestionEl.textContent = currentQuestion.question;

    for (var i = 0; i < currentQuestion.possibleAnswers.length; i++) {
        var li = document.createElement("li");
        li.textContent = currentQuestion.possibleAnswers[i];
        possibleAnswersEl.appendChild(li);
    }

    startQuizBtn.setAttribute("style", "display: none;");
}