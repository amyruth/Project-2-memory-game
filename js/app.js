const cards = ['fa fa-leaf', 'fa fa-diamond', 'fa fa-bomb', 'fa fa-bicycle', 'fa fa-bolt', 'fa fa-cube', 'fa fa-anchor', 'fa fa-paper-plane-o', 'fa fa-leaf', 'fa fa-diamond', 'fa fa-bomb', 'fa fa-bicycle', 'fa fa-bolt', 'fa fa-cube', 'fa fa-anchor', 'fa fa-paper-plane-o'];
let deck = document.querySelector('.deck');
let resetButton = document.querySelector('.restart');
let openCards = [];
let frag = document.createDocumentFragment();
let moveCounter = 0;
let cardCounter = 0;
let moves = document.getElementsByClassName('moves');
let matches = 0;
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
		icon.className = card;
		li.appendChild(icon);
		frag.appendChild(li);
	});
	return frag;
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

//when page loads for the first time a new board is created
newBoard();

//make a click handler for the reset button
resetButton.addEventListener('click', function () {
	newBoard();
});

function compareCards(cardList) {
	console.log(cardList);
	let search = cardList[0].innerHTML;
	if(cardList[1].innerHTML.indexOf(search) !== -1){
		cardList.forEach(function(card){
			card.classList.add('match');			
			console.log('match');
		});
	}else{
		cardList.forEach(function(card){
			card.classList.remove('show', 'open');		
			console.log('no match');
		});
	}
};


//adds clicked cards to array for comparison
function captureCard(card, cardList) {
	if (cardList.length < 3) {
		card.classList.add('show', 'open');
		cardList.push(card);
		console.log(cardList);
	}
	if(cardList.length === 2){
		setTimeout(function(){
			compareCards(cardList)
		}
		, 1000);
	}
};



deck.querySelectorAll('li').forEach(function (card) {
	card.addEventListener('click', function (e) {
		let clickedCard = this;
		captureCard(clickedCard, openCards);
		
		// NEED TO CLEAR ARRAY
	}); //end event listener
}, false); //end forEach

// if(openCards.length === 2){
// 	console.log('comparing time');
// 	setTimeout(compare(openCards), 1000);
// }



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