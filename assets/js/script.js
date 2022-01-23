var containerQuestionEl = document.getElementById("question-container");
var containerStartEl = document.getElementById("starter-container");
var containerEndEl = document.getElementById("end-container")
var containerScoreEl = document.getElementById("score-banner")
var formname = document.getElementById("name-form")
var containerHighScoresEl = document.getElementById("score-container")
var ViewHighScoreEl = document.getElementById("view-scores")
var listHighScoreEl = document.getElementById("score-list")
var correctEl = document.getElementById("correct")
var wrongEl = document.getElementById("incorrect")
//buttons
var btnStartEl = document.querySelector("#start-game");
var btnGoBackEl = document.querySelector("#go-back")
var btnClearScoresEl = document.querySelector("#clear-scores")
// Q & A
var questionEl = document.getElementById("question")
var answerbuttonsEl = document.getElementById("answer-buttons")
var timerEl = document.querySelector("#timer");
var score = 0;
var timeleft;
var gameover
timerEl.innerText = 0;

//Scores 
var HighScores = [];


var arrayShuffledQuestions
var QuestionIndex = 0



// Questions
var questions = [
  { q: 'Inside which HTML element do we put the JavaScript?', 
    a: '1. <script>', 
    choices: [{choice: '1. <script>'}, {choice: '2. <scripting>'}, {choice: '3. <js>'}, {choice: '4. <javascript>>'}]
  },
  { q: 'Where is the correct place to insert a JavaScript?', 
    a: '1. the <body> section', 
    choices: [{choice: '1. The <body> section'}, {choice: '2. Both the <head> section and the <body> section'}, {choice: '3. The <head> section'}, {choice: '4. the <title> section'}]
  },
  { q: 'Which built-in method adds one or more elements to the end of an array and returns the new length of the array?', 
    a: '3. push()', 
    choices: [{choice: '1. last()'}, {choice: '2. put()'}, {choice: '3. push()'}, {choice: '4. None of the above'}]
  },
  { q: 'Which of the following function of Number object returns the number"s" value?', 
    a: '2. valueOf()', 
    choices: [{choice: '1. toString()'}, {choice: '2. valueOf()'}, {choice: '3. toLocaleString()'}, {choice: '4. tpPrecision()'}]
  },
  { q: 'Which of the following function of Array object adds and/or removes elements from an array?', 
    a: '3. splice()', 
    choices: [{choice: '1. toSource()'}, {choice: '2. sort()'}, {choice: '3. splice()'}, {choice: '4. unshift()'}]
  },
  { q: 'Which built-in method returns the characters in a string beginning at the specified location?', 
    a: '2. substr()', 
    choices: [{choice: '1. substr()'}, {choice: '2. getSubString()'}, {choice: '3. slice()'}, {choice: '4. None of the above'}]
  },
  { q: 'Which of the following function of Array object applies a function simultaneously against two values of the array (from left-to-right) as to reduce it to a single value?', 
    a: '3. reduce()', 
    choices: [{choice: '1. pop()'}, {choice: '2. push()'}, {choice: '3. reduce()'}, {choice: '4.reduceRight()'}]
  },
];


var renderStartPage = function () {
  containerHighScoresEl.classList.add("hide")
  containerHighScoresEl.classList.remove("show")
  containerStartEl.classList.remove("hide")
  containerStartEl.classList.add("show")
  containerScoreEl.removeChild(containerScoreEl.lastChild)
  QuestionIndex = 0
  gameover = ""
  timerEl.textContent = 0 
  score = 0

  if (correctEl.className = "show") {
      correctEl.classList.remove("show");
      correctEl.classList.add("hide")
  }
  if (wrongEl.className = "show") {
      wrongEl.classList.remove("show");
      wrongEl.classList.add("hide");
  }
}


var setTime = function () {
  timeleft = 60;

var timercheck = setInterval(function() {
  timerEl.innerText = timeleft;
  timeleft--

  if (gameover) {
      clearInterval(timercheck)
  }
 
  if (timeleft < 0) {
      showScore()
      timerEl.innerText = 0
      clearInterval(timercheck)
  }

  }, 1000)
}

var startGame = function() {
  // Suffle Q's
  containerStartEl.classList.add('hide');
  containerStartEl.classList.remove('show');
  containerQuestionEl.classList.remove('hide');
  containerQuestionEl.classList.add('show');
  arrayShuffledQuestions = questions.sort(() => Math.random() - 0.5)
  setTime()
  setQuestion()
}

// Next Q
var setQuestion = function() {
  resetAnswers()
  displayQuestion(arrayShuffledQuestions[QuestionIndex])
}

// Rmv bttn while Q
var resetAnswers = function() {
  while (answerbuttonsEl.firstChild) {
      answerbuttonsEl.removeChild(answerbuttonsEl.firstChild)
  };
};

var displayQuestion = function(index) {
  questionEl.innerText = index.q
  for (var i = 0; i < index.choices.length; i++) {
      var answerbutton = document.createElement('button')
      answerbutton.innerText = index.choices[i].choice
      answerbutton.classList.add('btn')
      answerbutton.classList.add('answerbtn')
      answerbutton.addEventListener("click", answerCheck)
      answerbuttonsEl.appendChild(answerbutton)
      }
  };
// Corrects
var answerCorrect = function() {
  if (correctEl.className = "hide") {
      correctEl.classList.remove("hide")
      correctEl.classList.add("banner")
      wrongEl.classList.remove("banner")
      wrongEl.classList.add("hide")
      }
  }  
// Incorrects
var answerIncorrect = function() {
  if (wrongEl.className = "hide") {
      wrongEl.classList.remove("hide")
      wrongEl.classList.add("banner")
      correctEl.classList.remove("banner")
      correctEl.classList.add("hide")
  }
}

// Answer check   
var answerCheck = function(event) {
  var selectedanswer = event.target
      if (arrayShuffledQuestions[QuestionIndex].a === selectedanswer.innerText){
          answerCorrect()
          score = score + 7
      }

      else {
        answerIncorrect()
        score = score - 1;
        timeleft = timeleft - 5;
    };

  // Next Q
    QuestionIndex++
      if  (arrayShuffledQuestions.length > QuestionIndex + 1) {
          setQuestion()
      }   
      else {
         gameover = "true";
         showScore();
          }
}

  // Scores 
var showScore = function () {
  containerQuestionEl.classList.add("hide");
  containerEndEl.classList.remove("hide");
  containerEndEl.classList.add("show");

  var scoreDisplay = document.createElement("p");
  scoreDisplay.innerText = ("Your score is " + score + "!");
  containerScoreEl.appendChild(scoreDisplay);
}       

// Score Value
var createHighScore = function(event) { 
  event.preventDefault() 
  var name = document.querySelector("#name").value;
  if (!name) {
    alert("Enter your Name");
    return;
  }

formname.reset();

var HighScore = {
name: name,
score: score
} 

//push and sort scores
HighScores.push(HighScore);
HighScores.sort((a, b) => {return b.score-a.score});

//clear visibile list to resort
while (listHighScoreEl.firstChild) {
 listHighScoreEl.removeChild(listHighScoreEl.firstChild)
}
//create elements in order of high scores
for (var i = 0; i < HighScores.length; i++) {
var highscoreEl = document.createElement("li");
highscoreEl.ClassName = "high-score";
highscoreEl.innerHTML = HighScores[i].name + " - " + HighScores[i].score;
listHighScoreEl.appendChild(highscoreEl);
}

saveHighScore();
displayHighScores();

}
//save high score
var saveHighScore = function () {
  localStorage.setItem("HighScores", JSON.stringify(HighScores))
      
}

//load values/ called on page load
var loadHighScore = function () {
  var LoadedHighScores = localStorage.getItem("HighScores")
      if (!LoadedHighScores) {
      return false;
  }

  LoadedHighScores = JSON.parse(LoadedHighScores);
  LoadedHighScores.sort((a, b) => {return b.score-a.score})


  for (var i = 0; i < LoadedHighScores.length; i++) {
      var highscoreEl = document.createElement("li");
      highscoreEl.ClassName = "high-score";
      highscoreEl.innerText = LoadedHighScores[i].name + " - " + LoadedHighScores[i].score;
      listHighScoreEl.appendChild(highscoreEl);

      HighScores.push(LoadedHighScores[i]);
      
  }
}  

//display high score screen from link or when name entered
var displayHighScores = function() {

  containerHighScoresEl.classList.remove("hide");
  containerHighScoresEl.classList.add("show");
  gameover = "true"

  if (containerEndEl.className = "show") {
      containerEndEl.classList.remove("show");
      containerEndEl.classList.add("hide");
      }
  if (containerStartEl.className = "show") {
      containerStartEl.classList.remove("show");
      containerStartEl.classList.add("hide");
      }
      
  if (containerQuestionEl.className = "show") {
      containerQuestionEl.classList.remove("show");
      containerQuestionEl.classList.add("hide");
      }

  if (correctEl.className = "show") {
      correctEl.classList.remove("show");
      correctEl.classList.add("hide");
  }

  if (wrongEl.className = "show") {
      wrongEl.classList.remove("show");
      wrongEl.classList.add("hide");
      }
  
}
//clears high scores
var clearScores = function () {
  HighScores = [];

  while (listHighScoreEl.firstChild) {
      listHighScoreEl.removeChild(listHighScoreEl.firstChild);
  }

  localStorage.clear(HighScores);

} 

loadHighScore()
  
//on start click, start game
btnStartEl.addEventListener("click", startGame)
//on submit button -- enter or click
formname.addEventListener("submit", createHighScore)
//when view high-scores is clicked
ViewHighScoreEl.addEventListener("click", displayHighScores)
//Go back button
btnGoBackEl.addEventListener("click", renderStartPage)
//clear scores button
btnClearScoresEl.addEventListener("click", clearScores)