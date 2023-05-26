var timerEl = document.querySelector(".timer");
var start = document.querySelector(".startButton");
var submit = document.querySelector(".submit");
var startPage = document.getElementById("start");
var questionPage = document.getElementById("question");
var initialPage = document.getElementById("initialCard");
var questionChoice = document.querySelector("#questionChoice");
var timerInterval;
var scoreList = [];
var questions = [
  {
    question: "Commonly used data-types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts",
  },
  {
    question:
      "The condition in an if / else statement is enclosed with __________.",
    choices: ["quotes", "curly brackets", "parenthesis", "square brackets"],
    answer: "parenthesis",
  },
  {
    question: "Arrays in JavaScript can be used to store __________.",
    choices: [
      "numbers and strings",
      "other arrays",
      "booleans",
      "all of the above",
    ],
    answer: "all of the above",
  },
  {
    question:
      "String values must be enclosed within __________ when being assigned to variables.",
    choices: ["commas", "curly brackets", "quotes", "parenthesis"],
    answer: "quotes",
  },
  {
    question:
      "A very helpful tool used during development and debugging for printing content to the debugger is:",
    choices: ["JavaScript", "terminal/bash", "for loops", "console.log"],
    answer: "console.log",
  },
];
var currentQuestion = 0;
var secondsLeft = 76;
var alert = document.querySelector("#alert");

start.addEventListener("click", function (event) {
  //   console.log("clicked");
  event.preventDefault();
  startPage.dataset.state = "hidden";
  questionPage.dataset.state = "visible";
  renderQuestion();
  setTime();
});

function setTime() {
  timerInterval = setInterval(function () {
    secondsLeft--;
    timerEl.textContent = "Time: " + secondsLeft;

    if (secondsLeft === 0) {
      clearInterval(timerInterval);
      sendMessage();
      questionPage.dataset.state = "hidden";
      initialPage.dataset.state = "visible";
    }
  }, 1000);
}

function sendMessage() {
  timerEl.textContent = "TIMES UP!";
}

function endGame() {
  clearInterval(timerInterval);
  alert.textContent = "GAME OVER!";
  questionPage.dataset.state = "hidden";
  initialPage.dataset.state = "visible";
  document.querySelector(".highScore").textContent =
    "Your final score: " + secondsLeft;
}

function selectAnswer(event) {
  console.log(this.dataset.value);
  if (this.dataset.value === questions[currentQuestion].answer) {
    currentQuestion++;
    alert.textContent = "CORRECT!";
  } else {
    alert.textContent = "WRONG!";
    secondsLeft = secondsLeft - 10;
    if (secondsLeft < 0) {
      secondsLeft = 0;
    }
  }
  if (secondsLeft <= 0 || currentQuestion === questions.length) {
    endGame();
  } else {
    renderQuestion();
  }
}

function renderQuestion() {
  var questionTitle = document.querySelector("#questionTitle");
  questionTitle.textContent = questions[currentQuestion].question;
  questionChoice.textContent = "";
  for (var i = 0; i < questions[currentQuestion].choices.length; i++) {
    var div = document.createElement("div");
    var ul = document.createElement("ul");
    var li = document.createElement("li");
    li.textContent = `${i + 1}. ${questions[currentQuestion].choices[i]}`;
    li.setAttribute("data-value", questions[currentQuestion].choices[i]);
    li.addEventListener("click", selectAnswer);
    ul.appendChild(li);
    div.appendChild(ul);
    questionChoice.appendChild(div);
  }
}

submit.addEventListener("click", function (event) {
  // console.log("clicked");
  event.preventDefault();
  var initials = document.getElementById("initials").value;
  var scores = localStorage.getItem("scores");
  if (scores) {
    scores = JSON.parse(scores);
  } else {
    scores = {};
  }
  scores[initials] = secondsLeft;
  // scoreList.push(scores);
  localStorage.setItem("scores", JSON.stringify(scores));
  location.href = "highscores.html";
});
