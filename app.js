const gameContainer = document.getElementById("game-container");

const symbols = ["🍎", "🍊", "🍇", "🍉", "🍌", "🍒", "🥝", "🍓"];
const cards = [].concat(symbols, symbols);


function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    
    const random = (new Date().getTime() % (i + 1)) / (i + 1); 
    const randomIndex = parseInt(random * (i + 1), 10); 
    
    const temp = array[i];
    array[i] = array[randomIndex];
    array[randomIndex] = temp;
  }
}

shuffle(cards);


cards.forEach(function (symbol) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.symbol = symbol;
  card.textContent = symbol; 
  card.style.color = "transparent"; 
  gameContainer.appendChild(card);
});

let flippedCards = [];
let matchedCount = 0;


function flipCard(card) {
  if (card.classList.contains("flipped") || card.classList.contains("matched")) {
    return; 
  }

  card.classList.add("flipped");
  card.style.color = ""; 
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    checkMatch();
  }
}


function checkMatch() {
  const card1 = flippedCards[0];
  const card2 = flippedCards[1];

  if (card1.dataset.symbol === card2.dataset.symbol) {
   
    card1.classList.add("matched");
    card2.classList.add("matched");
    matchedCount += 2;

    if (matchedCount === cards.length) {
      setTimeout(function () {
        alert("Congratulations! You matched all the cards!");
        resetGame();
      }, 500);
    }
  } else {
    
    setTimeout(function () {
      card1.classList.remove("flipped");
      card1.style.color = "transparent";
      card2.classList.remove("flipped");
      card2.style.color = "transparent";
    }, 1000);
  }

  flippedCards = [];
}


gameContainer.addEventListener("click", function (e) {
  const clickedCard = e.target;
  if (clickedCard.classList.contains("card")) {
    flipCard(clickedCard);
  }
});


function resetGame() {
  matchedCount = 0;
  flippedCards = [];
  gameContainer.innerHTML = "";
  shuffle(cards);
  cards.forEach(function (symbol) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.symbol = symbol;
    card.textContent = symbol;
    card.style.color = "transparent";
    gameContainer.appendChild(card);
  });
}
