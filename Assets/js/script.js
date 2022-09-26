var finalScore = document.querySelector(".finalScore");
var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");
var questions = document.querySelector("#question");
var options = document.querySelector("#options");
var result = document.querySelector("#result");
var quizStart = document.querySelector("#start");
var initialsInput = document.querySelector("#initials");
var highScoreList = document.querySelector('#highScoreList');
var op1 = document.getElementById('op1');
var op2 = document.getElementById('op2');
var op3 = document.getElementById('op3');
var op4 = document.getElementById('op4');
const submitButton = document.getElementById('submitButton');
//INITIALIZE PLAYER HIGH SCORES LIST
var player = {
  Initials: this.Initials,
  Score: this.Score
};
var highScores = [];

// LIST OF FULLSTACK KNOWLEDGE QUESTIONS
var quizQuestions = [
  {
    question: "What does DOM stand for?",
    a: "Dominion of Montenegro",
    b: "Don't over muscle",
    c: "Document Object Model",
    d: "Data Object Model",
    correctAnswer: "c"
  },
  {
    question: "What does HTML stand for?",
    a: "Hypertext Madeup Language",
    b: "Hypertext Markup Language",
    c: "How To Make Lemonade",
    d: "Hypertext Model Language",
    correctAnswer: "b"
  },
  {
    question: "What is used to add styling to a webpage?",
    a: "HTML",
    b: "CSS",
    c: "Javascript",
    d: "MS Paint",
    correctAnswer: 'b'
  },
  {
    question: "What does JSON stand for?",
    a: "Javascript Object Node",
    b: "Just Stay Over Night",
    c: "Javascript Object NULL",
    d: "Javascript Object Notation",
    correctAnswer: 'd'
  },
  {
    question: "What HTML element tags are used to reference a Javascript file?",
    a: "div",
    b: "link",
    c: "script",
    d: "head",
    correctAnswer: 'c'
  },
  {
    question: "String values must be enclosed within ____ when being assigned to variables?",
    a: "Curly Brackets",
    b: "Commas",
    c: "Quotes",
    d: "Parentheses",
    correctAnswer: 'a'
  },
  {
    question: "Arrays in JavaScript can be used to store ____?",
    a: "Numbers and Strings",
    b: "Numbers",
    c: "Other Arrays",
    d: "All of the Above",
    correctAnswer: 'd'
  },
];
//GLOBAL VARIABLES 
var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var score = 0;
var correct;
var isResult = true;
var isOver = false;
var timer;
var timeLeft = 30;

//THIS FUNCTION STARTS THE QUIZ BY CALLING displayQuestion() AND STARTING GAME TIMER
function startQuiz() {

  document.getElementById("startQuiz").style.visibility = "hidden";
  document.getElementById("start").style.visibility = "hidden";

  displayQuestion();

  //Timer
  timerInterval = setInterval(function () {
    timeLeft--;
    timerElement.textContent = "Time left: " + timeLeft;

    if (timeLeft === 0) {
      clearInterval(timerInterval);
      showScore();
    }
  }, 1000);

}
//THIS FUNCTION DISPLAYS THE ARRAY OF QUESTIONS (ONE AT A TIME) WITH POSSIBLE OPTIONS/CHOICES
function displayQuestion() {


  document.getElementById("startQuiz").style.visibility = "hidden";
  document.getElementById("start").style.visibility = "hidden";
  document.getElementById("question").style.visibility = "visible";
  document.getElementById("options").style.visibility = "visible";
  document.getElementById("result").style.visibility = "visible";
//CHECK TO SEE IF LIST OF QUESTIONS IS OVER OR TIME HAS RUN OUT
  if (currentQuestionIndex === finalQuestionIndex || timeLeft <= 0) {
    return showScore();
  }
  var currentQuestion = quizQuestions[currentQuestionIndex];
  question.innerHTML = "<p>" + currentQuestion.question + "</p>";
  op1.innerHTML = currentQuestion.a;
  op2.innerHTML = currentQuestion.b;
  op3.innerHTML = currentQuestion.c;
  op4.innerHTML = currentQuestion.d;
}

//THIS FUNCTION CHECKS THE RESPONSE TO EACH ANSWER 
function checkAnswer(answer) {
  correct = quizQuestions[currentQuestionIndex].correctAnswer;
  //IF ANSWER CORRECT THEN TALLY SCORE
  if (answer === correct && currentQuestionIndex !== finalQuestionIndex) {
    score++;
    isResult = true;
    currentQuestionIndex++;
    displayResult();
    displayQuestion();
    //IF ANSWER WRONG THEN DEDUCT 10 SEC FROM TIME LEFT
  } else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex) {
    currentQuestionIndex++;
    isResult = false;
    timeLeft -= 10;
    displayResult();
    displayQuestion();
  } else {
    displayResult();
  }
}
//THIS FUNCTION IS CALLED ONCE GAME IS OVER AND SHOWS PLAYER THEIR SCORE 
function showScore() {
  document.getElementById("allDone").style.visibility = "visible";
  document.getElementById("question").style.visibility = "hidden";
  document.getElementById("options").style.visibility = "hidden";
  document.getElementById("result").style.visibility = "hidden";

  clearInterval(timerInterval);
  finalScore.innerHTML = " " + score;
}
//WAIT FOR USER TO ENTER INITIALS THEN SHOW HIGH SCORES
//STORE HIGH SCORE AND INITIALS IN LOCALSTORAGE AND INCREASE SIZE OF LIST
submitButton.addEventListener("click", function highScore() {

  localStorage.setItem("initials", initialsInput.value);
  player.Initials = initialsInput.value;
  player.Score = score;
  highScores.push(player)
  localStorage.setItem("player", JSON.stringify(highScores));
  highScores = JSON.parse(localStorage.getItem("player") || "[]");
  renderHighScores();

});

// THIS FUNCTION DISPLAYS THE HIGH SCORES PAGE WHEN 'VIEW HIGH SCORES' IS CLICKED IN HEADER WHILE HIDING THE OTHER PAGES 
function showHighscore() {
  document.getElementById("startQuiz").style.visibility = "hidden";
  document.getElementById("start").style.visibility = "hidden";
  document.getElementById("question").style.visibility = "hidden";
  document.getElementById("options").style.visibility = "hidden";
  document.getElementById("result").style.visibility = "hidden";
  document.getElementById("allDone").style.visibility = "hidden";
  document.getElementById("highScores").style.visibility = "visible";
}
//THIS FUNCTION RENDERS HIGH SCORE LIST TO THE SCREEN, RETRIEVING DATA FROM LOCALSTORAGE 
function renderHighScores() {

  document.getElementById("allDone").style.visibility = "hidden";
  document.getElementById("highScores").style.visibility = "visible";

  highScoreList.innerHTML = "";

  for (var i = 0; i < highScores.length; i++) {
    var player = highScores[i].Initials;
    var score = highScores[i].Score;

    var li = document.createElement("li");
    li.textContent = i + 1 + ". " + player + " - " + score;
    li.setAttribute("data-index", i);

    highScoreList.appendChild(li);
  }
}

//CREATED A TIMER FOR "CORRECT! OR WRONG!" TEXT SO THAT IT IS NOT PERSISTENT AND ONLY SHOWS UP FOR A FEW SECONDS
function countdown() {
  var timeLeft = 1;

  var timeInterval = setInterval(function () {
    if (timeLeft === 1) {
      timeLeft--;
    }
    clearInterval(timeInterval);
    displayResult();

  }, 1000);
}
//THIS FUNCTION DISPLAYS "CORRECT! OR WRONG!" TEXT AS PLAYER PROCEEDS THROUGH THE QUIZ 
function displayResult() {
  var wordCount = 0;

  var msgInterval = setInterval(function () {
    if (wordCount === 1) {
      clearInterval(msgInterval);
      result.textContent = "";

    } else if (isResult) {
      result.textContent = "Correct!";
      wordCount++;
    } else {
      result.textContent = "Wrong!";
      wordCount++;
    }
  }, 1000);
}
//THIS FUNCTION IS CALLED WHEN USER CLICKS ON 'GO BACK' BUTTON AND RESETS ALL GLOBAL COUNTS/VARIABLES
function replayQuiz() {
  document.getElementById("highScores").style.visibility = "hidden";
  document.getElementById("startQuiz").style.visibility = "visible";
  document.getElementById("start").style.visibility = "visible";

  initialsInput.value = "";
  timeLeft = 30;
  score = 0;
  currentQuestionIndex = 0;
}

function clearScore() {
  window.localStorage.clear();

  for (var i = 0; i < highScores.length; i++) {
    highScoreList.innerHTML = "";
  }
}
//START OF QUIZ
quizStart.addEventListener("click", startQuiz);


