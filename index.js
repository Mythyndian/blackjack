let newCard = 0;
let sum = 0;
let hasBlackjack = false;
let isAlive = true;
let message = "";
let messageEl = document.getElementById("message-el");
let startBtn = document.getElementById("start-btn");
let sumEl = document.querySelector("#sum-el");
let cardsEl = document.getElementById("cards-el");
let firstCard = 0;
let secondCard = 0;
let cards = [];
let cards_figures = ["king", "queen", "jack", "10"];
const cards_colors = ["hearts", "diamonds", "clubs", "spades"]
let cards_images = [];
let cards_filenames = [];
let cards_text = "";
let img_tags = '';
let cards_render = document.getElementById("cards-render")

function startGame() {
    resetGame();
    firstCard = Math.floor((Math.random() * 10) + 2);
    secondCard = Math.floor((Math.random() * 10) + 2);
    cards.push(firstCard);
    cards.push(secondCard);
    renderGame()
    // if (!isAlive) {
    //     resetGame()
    // }
}

function renderGame() {
    //TODO: Fix minor bugs correlating starting game using incorrect buttons!
    /* Display cards */
    cards_text = "Cards: ";
    for (let i = 0; i<cards.length; i++) {
        cards_text += cards[i].toString() + " ";
    }
    renderCards()
    cardsEl.textContent = cards_text;
    /* Calculate sum of cards */
    cards_value = 0;
    for (let i = 0; i<cards.length; i++) {
        cards_value += cards[i];
    }
    sum = cards_value;
    sumEl.innerText = "Sum: " + sum;
    if (sum <= 20) {
        message = "Hit or pass?";
    } else if (sum === 21) {
        message = "You win!";
        hasBlackjack = true;
    } else {
        message = "You lose";
        isAlive = false;
        // resetGame();
    }
    startBtn.innerText = "PLAY AGAIN?";
    messageEl.innerText = message;
}

function drawCard() {
    cards.push(Math.floor((Math.random() * 10) + 2));
    let cards_value = 0;
    for (let i = 0; i<cards.length; i++) {
        cards_value += cards[i];
    }
    sum = cards_value;
    renderGame()
}

function resetGame() {
    sum = 0;
    cards = [];
    cards_filenames = [];
    cards_render.innerHTML = "";
}
//TODO:Debug this function (multiple cards are rendered)
function renderCards() {
    //TODO: Implement mechanism for rendering card images
    let temp_arr = [];
    for (let i = 0; i < cards.length; i++) {
        if (cards[i] === 10 || cards[i] === 11) {
            // TODO: Implement picking random 10 value card
            if (cards[i] === 11) {
                const random_color = Math.floor(Math.random() * cards_colors.length);
                let card_color = cards_colors[random_color];
                temp_arr.push("ace_of_" + card_color + ".svg")
            } else {
                const random_color = Math.floor(Math.random() * cards_colors.length);
                let card_color = cards_colors[random_color];
                const random_figure = Math.floor(Math.random() * cards_figures.length);
                let card_figure = cards_figures[random_figure];
                temp_arr.push(card_figure + "_of_" + card_color + ".svg");
            }

        } else {
            // pick random color from array
            const random_color = Math.floor(Math.random() * cards_colors.length);
            let card_color = cards_colors[random_color];
            // push correct filename to array
            temp_arr.push(cards[i] + "_of_" + card_color + ".svg");    
        }
    }
    cards_filenames = temp_arr;
    // Inject html code with svg image of card
    img_tags = '';
    for (let i = 0; i < cards.length; i++) {
        img_tags += '<img src="images/' + cards_filenames[i] + '"' + 'alt="card-svg"' + "/>";
            
    }
    cards_render.innerHTML = img_tags;
}
