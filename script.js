const words = [
    "apple", "banana", "carrot", "date", "elephant",
    "flower", "giraffe", "hat", "ice", "jacket",
    "kite", "lion", "monkey", "notebook", "orange",
    "piano", "queen", "robot", "star", "tiger",
    "umbrella", "violin", "whale", "xylophone", "yarn"
  ];
  
  const roles = ["red", "blue", "neutral", "assassin"];
  const boardSize = 25;
  let board = [];
  let gameStatus = "Game in Progress";
  let redRemaining = 9;
  let blueRemaining = 8;
  
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  function createBoard() {
    let cards = [];
    for (let i = 0; i < redRemaining; i++) {
      cards.push({ word: words[i], role: "red" });
    }
    for (let i = redRemaining; i < redRemaining + blueRemaining; i++) {
      cards.push({ word: words[i], role: "blue" });
    }
    for (let i = redRemaining + blueRemaining; i < boardSize - 1; i++) {
      cards.push({ word: words[i], role: "neutral" });
    }
    cards.push({ word: words[boardSize - 1], role: "assassin" });
    return shuffle(cards);
  }
  
  function displayBoard() {
    const boardDiv = document.getElementById("board");
    boardDiv.innerHTML = "";
    board.forEach(card => {
      const cardDiv = document.createElement("div");
      cardDiv.classList.add("card");
      cardDiv.textContent = card.word;
      cardDiv.addEventListener("click", () => handleCardClick(card, cardDiv));
      boardDiv.appendChild(cardDiv);
    });
  }
  
  function handleCardClick(card, cardDiv) {
    if (gameStatus !== "Game in Progress") return;
    
    cardDiv.classList.add(card.role);
    if (card.role === "red") {
      redRemaining--;
    } else if (card.role === "blue") {
      blueRemaining--;
    } else if (card.role === "assassin") {
      gameStatus = "Assassin found! Game over!";
    }
    
    if (redRemaining === 0) {
      gameStatus = "Red team wins!";
    } else if (blueRemaining === 0) {
      gameStatus = "Blue team wins!";
    }
    
    document.getElementById("status").textContent = gameStatus;
  }
  
  function restartGame() {
    board = createBoard();
    gameStatus = "Game in Progress";
    redRemaining = 9;
    blueRemaining = 8;
    displayBoard();
    document.getElementById("status").textContent = gameStatus;
  }
  
  document.getElementById("restart").addEventListener("click", restartGame);
  
  restartGame();
  
