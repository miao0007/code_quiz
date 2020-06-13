var currentQuestion = 0;
var score = 0;
var currentIndex = 0;
var startQuizEl = document.getElementById("start-quiz");
var options = document.querySelectorAll(".options");

// define variables and create a function that can load questions to the quiz container
var container = document.getElementById("quizContainer");
var questionEl = document.getElementById("question");
var opt1 = document.getElementById("opt1");
var opt2 = document.getElementById("opt2");
var opt3 = document.getElementById("opt3");
var opt4 = document.getElementById("opt4");
var resultCont = document.getElementById("result");

// function to load questions

startQuizEl.addEventListener("click", function (event) {
  var startPage = document.getElementById("start-container");
  var quizPage = document.getElementById("quiz-container");

  event.stopPropagation();
  startTimer();

  // close start page  and display question page
  startPage.style.display = "none";
  quizPage.style.display = "block";

  // Load the quiz questions
  loadQuestion(currentQuestion);
});

// After start button be clicked, questions be loaded then
function loadQuestion() {
  var q = questions[currentIndex];
  questionEl.textContent = currentIndex + 1 + ". " + q.question;
  opt1.textContent = q.option1;
  opt2.textContent = q.option2;
  opt3.textContent = q.option3;
  opt4.textContent = q.option4;
}

for (var i = 0; i < options.length; i++) {
  // click anyone option can generate answer for wrong or correct
  options[i].addEventListener("click", function userAnswer(event) {
    event.stopPropagation();

    //Option is correct, score increased
    if (event.currentTarget.innerText === questions[currentIndex].answer) {
      score++;
      // console.log(score);

      document.querySelector("#result").textContent = "Correct";
    } else {
      // if choose wrong answer, time is deducted by 10 seconds
      document.querySelector("#result").textContent = "Wrong";
      secondsLeft = secondsLeft - 10;
    }

    // move to next question
    currentIndex++;

    // after last question, finish
    if (currentIndex < 6) {
      //go back to the questions
      loadQuestion();
    }
  });
}

// set timer for this exam for 90 seconds in total
var userName = document.querySelector("#userName");
var message = document.querySelector("#message");
var yourScore = document.querySelector("#yourScore");

var high_scores = JSON.parse(localStorage.getItem("high_scores")) || [];
var submitBtn = document.querySelector("#submitScore");

var secondsLeft = 91;

function startTimer() {
  var interval = setInterval(function () {
    secondsLeft--;
    document.querySelector("#time-counter-down").innerHTML = secondsLeft;
    console.log(secondsLeft);

    //If time running out
    if (secondsLeft === 0) {
      clearInterval(interval);

      //close question page
      document
        .querySelector("#quiz-container")
        .setAttribute("style", "display: none");

      // Timeout Information displayed
      document
        .querySelector("#finish-container")
        .setAttribute("style", "display: block");

      // If all six questions be finished
    } else if (currentIndex === 6) {
      // Repeat steps above,close question page, go to score page
      clearInterval(interval);

      //   question page closed
      document
        .querySelector("#quiz-container")
        .setAttribute("style", "display: none");

      // Final score page displayed
      document
        .querySelector("#result-page")
        .setAttribute("style", "display: block");

      //final score equals number of correct answers time total seconds left
      score = score * secondsLeft;

      if (isNaN(score)) {
        yourScore.innerHTML = "Mmmm, your score is: 0";
      } else {
        message.innerHTML = "You complete all questions.";
        yourScore.innerHTML = "Your score is: " + score;
      }
    }
  }, 1000);
}

// update the high score board

submitBtn.addEventListener("click", function (event) {
  event.stopPropagation();

  //fetch initial name that just input
  var initials = userName.value;
  console.log("initials" + initials);

  var finalScore = {
    initials,
    score,
  };
  console.log("finalScore" + finalScore);

  // push final score into local storage
  high_scores.push(finalScore);
  localStorage.setItem("high_scores", JSON.stringify(high_scores));
  console.log(initials, score);
});
