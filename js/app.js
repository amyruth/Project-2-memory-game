/*
 * Create a list that holds all of your cards
 */
const cards = ['leaf', 'diamond', 'bomb', 'bicycle', 'bolt', 'cube', 'anchor', 'paper-plane-o', 'leaf', 'diamond', 'bomb', 'bicycle', 'bolt', 'cube', 'anchor', 'paper-plane-o'];
let deck = document.querySelector('.deck');
let frag = document.createDocumentFragment();

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

//clears current board, shuffles card types and creates new cards for board
function makeNewCards(cardDeck) {
  cardDeck.forEach(function (card) {
    let li = document.createElement('li');
    li.className = 'card';
    let icon = document.createElement('i');
    icon.className = 'fa fa-' + card;
    li.appendChild(icon);
    frag.appendChild(li);
  });
};

function newBoard() {
  while (deck.firstChild) {
    deck.removeChild(deck.firstChild);
  };

  shuffle(cards);
  makeNewCards(cards);
  deck.appendChild(frag);
  console.log(deck);
};

newBoard();


//event handler for board
deck.addEventListener('click', function(e){
 console.log('click');
 if(e.target && e.target.nodeName === 'LI'){
   e.target.classList.add('open', 'show');
 }

}, false);





/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */