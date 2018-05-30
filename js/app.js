const cards = ['fa fa-leaf', 'fa fa-diamond', 'fa fa-bomb', 'fa fa-bicycle', 'fa fa-bolt', 'fa fa-cube', 'fa fa-anchor', 'fa fa-paper-plane-o', 'fa fa-leaf', 'fa fa-diamond', 'fa fa-bomb', 'fa fa-bicycle', 'fa fa-bolt', 'fa fa-cube', 'fa fa-anchor', 'fa fa-paper-plane-o'];
let deck = document.querySelector('.deck');
let resetButton = document.querySelector('.restart');
let openCards = [];
let frag = document.createDocumentFragment();
let moveCounter = 0;
let cardCounter = 0;
let moves = document.querySelector('.moves');
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

function compareCards(cardList) {
	console.log(cardList);
	let search = cardList[0].innerHTML;
	if(cardList[1].innerHTML.indexOf(search) !== -1){
		cardList.forEach(function(card){
			card.classList.add('match');		
			console.log('match');
		});
		cardList.length = 0;
	}else{
		cardList.forEach(function(card){
			card.classList.remove('show', 'open');
			console.log('no match');
		});
		cardList.length = 0;
	}
};

function displayMoves(cardlist){
	if(cardlist.length === 2){
		moveCounter += 1;
		moves.textContent = moveCounter;
	}
};

function captureCards(card, cardList) {
	if (cardList.length < 3) {
		card.classList.add('show', 'open');
		cardList.push(card);
		console.log(cardList);
	}

	if(cardList.length === 2){
		displayMoves(cardList);
		// moveCounter += 1;
		// moves.textContent = moveCounter;
		console.log(`moves: ${moveCounter}`);
		setTimeout(function(){
			compareCards(cardList);			
		}
		, 1000);
	}
};

function cardListener(deck,cardHand){
	deck.querySelectorAll('li').forEach(function (card) {
		console.log('assigning listeners');
		card.addEventListener('click', function () {
			if(openCards.length === 2){
				return;
			}else{
				let clickedCard = this;
				captureCards(clickedCard, openCards);
			}
		});
	}, false);	
};

function newBoard() {
	while (deck.firstChild) {
		deck.removeChild(deck.firstChild);
	};
	moveCounter = 0;
	moves.textContent = 0;
	shuffle(cards);
	makeNewCards(cards);
	deck.appendChild(frag);
	console.log(deck);
	cardListener(deck, openCards);	
};

//make a click handler for the reset button
resetButton.addEventListener('click', function () {
	if(openCards.length !== 0){
		openCards.length = 0;
	}
	newBoard();
});

//when page loads for the first time a new board is created
newBoard();



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