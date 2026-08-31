const tableSelect = document.querySelector("#table-select");
const questionEl = document.querySelector("#question");
const answerForm = document.querySelector("#answer-form");
const answerInput = document.querySelector("#answer");
const feedbackEl = document.querySelector("#feedback");
const rewardEl = document.querySelector("#reward");
const scoreEl = document.querySelector("#score");
const streakEl = document.querySelector("#streak");
const newQuestionButton = document.querySelector("#new-question");

let currentQuestion = { left: 1, right: 1 };
let score = 0;
let streak = 0;

for (let table = 1; table <= 10; table += 1) {
  const option = document.createElement("option");
  option.value = String(table);
  option.textContent = `Table de ${table}`;
  tableSelect.append(option);
}

function randomNumber(max = 10) {
  return Math.floor(Math.random() * max) + 1;
}

function createQuestion() {
  const selectedTable = tableSelect.value;
  currentQuestion = {
    left: selectedTable === "all" ? randomNumber() : Number(selectedTable),
    right: randomNumber(),
  };

  questionEl.textContent = `${currentQuestion.left} × ${currentQuestion.right} ?`;
  answerInput.value = "";
  answerInput.focus();
  rewardEl.textContent = "";
  feedbackEl.className = "feedback neutral";
  feedbackEl.textContent = "À toi de jouer, champion !";
}

function updateScore(isCorrect) {
  if (isCorrect) {
    score += 1;
    streak += 1;
  } else {
    streak = 0;
  }

  scoreEl.textContent = score;
  streakEl.textContent = streak;
}

answerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const expected = currentQuestion.left * currentQuestion.right;
  const answer = Number(answerInput.value);

  if (answerInput.value.trim() === "") {
    feedbackEl.className = "feedback try";
    feedbackEl.textContent = "Écris une réponse avant de valider.";
    return;
  }

  if (answer === expected) {
    updateScore(true);
    feedbackEl.className = "feedback good";
    feedbackEl.textContent = `Bravo ! ${currentQuestion.left} × ${currentQuestion.right} = ${expected}.`;
    rewardEl.textContent = "🌟 🎉 🌟";
    window.setTimeout(createQuestion, 900);
  } else {
    updateScore(false);
    feedbackEl.className = "feedback try";
    feedbackEl.textContent = `Presque ! Essaie encore : ${currentQuestion.left} × ${currentQuestion.right}.`;
    rewardEl.textContent = "💪";
    answerInput.select();
  }
});

newQuestionButton.addEventListener("click", createQuestion);
tableSelect.addEventListener("change", createQuestion);
createQuestion();
