//   Handle high scores in this section
var scoreDisplayList = document.getElementById("scoreDisplayList");
var clearScore = document.getElementById("clear");
var high_scores = JSON.parse(localStorage.getItem("high_scores")) || [];
displayHighScore();

//  store and display high score
function displayHighScore() {
  high_scores = sortScores(high_scores, "score");

  // create high score display list
  for (var i = 0; i < high_scores.length; i++) {
    console.log(high_scores[i].score);
    var li = document.createElement("li");
    var initScore = document.createTextNode(
      high_scores[i].initials + ": " + high_scores[i].score
    );
    li.appendChild(initScore);
    scoreDisplayList.appendChild(li);
  }
}

//sort scores from high to low
function sortScores(array, key) {
  return array.sort(function (a, b) {
    if (a.score < b.score) {
      return 1;
    }
    return -1;
  });
}

// create clear button can empty score board
clearScore.addEventListener("click", function () {
  localStorage.removeItem("high_scores");
  window.location.reload();
});
