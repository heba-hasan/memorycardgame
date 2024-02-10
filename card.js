var cards = [
    "images/1.png", "images/2.png", "images/3.jpg", "images/4.jpg", "images/5.jpg", "images/7.jpg",
    "images/1.png", "images/2.png", "images/3.jpg", "images/4.jpg", "images/5.jpg", "images/7.jpg"
];

var flippedCards = [];
var matchedCards = [];

document.addEventListener("DOMContentLoaded", function() {
    startGame();
    document.getElementById("resetBtn").addEventListener("click", resetGame);
});

function startGame() {
    shuffleCards();
    populateGrid();
}

function shuffleCards() {
    cards.sort(() => Math.random() - 0.5);
}

function populateGrid() {
    var gameContainer = document.getElementById("game");
    cards.forEach(function(card, index) {
        var cardElement = document.createElement("div");
        cardElement.classList.add("item");
        var imageElement = document.createElement("img");
        imageElement.src = card;
        imageElement.dataset.id = index;
        cardElement.appendChild(imageElement);
        gameContainer.appendChild(cardElement);
        cardElement.addEventListener("click", flipCard);
    });
}

function flipCard() {
    if (flippedCards.length < 2 && !flippedCards.includes(this)) {
        this.children[0].style.transform = "scale(1)";
        flippedCards.push(this);
        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }
}

function checkMatch() {
    var firstCard = flippedCards[0].children[0];
    var secondCard = flippedCards[1].children[0];
    if (firstCard.src === secondCard.src) {
        matchedCards.push(flippedCards[0], flippedCards[1]);
        if (matchedCards.length === cards.length) {
            alert("Congratulations! You've matched all pairs!");
        }
    } else {
        flippedCards.forEach(function(card) {
            card.children[0].style.transform = "scale(0)";
        });
    }
    flippedCards = [];
}

function resetGame() {
    var gameContainer = document.getElementById("game");
    gameContainer.innerHTML = "";
    flippedCards = [];
    matchedCards = [];
    startGame();
}
