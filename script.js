document.addEventListener("DOMContentLoaded", () => {
  const moves = ["rock", "paper", "scissors"];
  const emojis = { rock: "🗿", paper: "📃", scissors: "✂️" };

  const buttons = document.querySelectorAll(".choice-btn[data-move]");
  const playerChoiceEl = document.querySelector("#player-choice span");
  const computerChoiceEl = document.querySelector("#computer-choice span");
  const resultMessageEl = document.getElementById("result-message");
  const statusEl = document.querySelector(".status");
  const roundDisplay = document.getElementById("round-display");
  const playerWinsDisplay = document.getElementById("player-wins");
  const computerWinsDisplay = document.getElementById("computer-wins");
  const lastRoundWinnerEl = document.getElementById("last-round-winner");

  let round = 0;
  let playerWins = 0;
  let computerWins = 0;
  const totalRounds = 5;
  const maxWins = 3;
  let lastRoundWinner = "";

  const playAgainBtn = document.createElement("button");
  playAgainBtn.textContent = "Play Again";
  playAgainBtn.className = "choice-btn play-again-btn";
  playAgainBtn.style.display = "none";
  statusEl.appendChild(playAgainBtn);

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      if (round >= totalRounds || playerWins === maxWins || computerWins === maxWins) return;
      const playerMove = button.getAttribute("data-move");
      playGame(playerMove);
    });
  });

  playAgainBtn.addEventListener("click", () => {
    round = 0;
    playerWins = 0;
    computerWins = 0;
    lastRoundWinner = "";
    playerChoiceEl.textContent = "";
    computerChoiceEl.textContent = "";
    resultMessageEl.textContent = 'Have fun!';
    updateStatus();
    playAgainBtn.style.display = "none";
    buttons.forEach(btn => btn.disabled = false);
  });

  function playGame(playerMove) {
    const computerMove = getRandomMove();
    const roundResult = getResult(playerMove, computerMove);

    playerChoiceEl.textContent = `${capitalize(playerMove)} ${emojis[playerMove]}`;
    computerChoiceEl.textContent = `${capitalize(computerMove)} ${emojis[computerMove]}`;

    if (roundResult === "You win!") {
      playerWins++;
      lastRoundWinner = "Player wins this round";
    } else if (roundResult === "Computer wins!") {
      computerWins++;
      lastRoundWinner = "Computer wins this round";
    } else {
      lastRoundWinner = "This round is a tie";
    }

    resultMessageEl.textContent = `Round ${round + 1}: ${roundResult}`;
    updateStatus();

    round++;

    if (round === totalRounds || playerWins === maxWins || computerWins === maxWins) {
      buttons.forEach(btn => btn.disabled = true);

      if (playerWins > computerWins) {
        resultMessageEl.textContent = "You won the game!";
      } else if (playerWins < computerWins) {
        resultMessageEl.textContent = "Computer won the game!";
      } else {
        resultMessageEl.textContent = "It's a Tie Game!";
      }
      playAgainBtn.style.display = "inline-block";
    }
  }

  function getRandomMove() {
    return moves[Math.floor(Math.random() * moves.length)];
  }

  function getResult(player, computer) {
    if (player === computer) return "It's a Tie.";
    if (
      (player === "rock" && computer === "scissors") ||
      (player === "paper" && computer === "rock") ||
      (player === "scissors" && computer === "paper")
    ) {
      return "You win!";
    }
    return "Computer wins!";
  }

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function updateStatus() {
    roundDisplay.textContent = `${Math.min(round + 1, totalRounds)}/${totalRounds}`;
    playerWinsDisplay.textContent = playerWins;
    computerWinsDisplay.textContent = computerWins;
    lastRoundWinnerEl.textContent = lastRoundWinner;

    document.querySelector("#player-choice span").textContent = playerChoiceEl.textContent;
    document.querySelector("#computer-choice span").textContent = computerChoiceEl.textContent;
  }

  resultMessageEl.textContent = 'Have fun!';
  updateStatus();
});
