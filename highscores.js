var scoreEl = document.querySelector(".scoreList");

var storageItems = JSON.parse(localStorage.getItem("scores")) || {};

var clearScores = document.querySelector(".clearScores");

for (const items in storageItems) {
  var btn = document.createElement("p");
  btn.innerHTML = items + "  :  " + storageItems[items];
  console.log("BTN: ", btn);
  scoreEl.append(btn);
}

clearScores.addEventListener("click", function (event) {
  event.preventDefault;
  localStorage.removeItem("scores");
  scoreEl.innerHTML = "";
});
