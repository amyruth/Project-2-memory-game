const cards = ['fa fa-leaf', 'fa fa-diamond', 'fa fa-bomb', 'fa fa-bicycle', 'fa fa-bolt', 'fa fa-cube', 'fa fa-anchor', 'fa fa-paper-plane-o', 'fa fa-leaf', 'fa fa-diamond', 'fa fa-bomb', 'fa fa-bicycle', 'fa fa-bolt', 'fa fa-cube', 'fa fa-anchor', 'fa fa-paper-plane-o'];
let deck = document.querySelector('.deck');
let resetButton = document.querySelector('.restart');
let openCards = [];
let frag = document.createDocumentFragment();
let moveCounter = 0;
let moves = document.querySelector('.moves');
let matches = 0; //use for the win condition?
let starsRemaining = 3;
let stars = document.querySelector('.stars');
let time = document.querySelector('.time');
let minutes = 0;
let seconds = 1;
let gameInterval;
let modal = document.querySelector('.modal-bg');
let finalTime = document.querySelector('.finalTime');
let totalMoves = document.querySelector('.totalMoves');
let endStars = document.querySelector('.starRating');
let modalButton = document.querySelector('.exit');

// ###### CARD FUNCTIONS ######
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

function makeNewCards(cardDeck) {
	cardDeck.forEach(function (card) {
		let li = document.createElement('li');
		li.classList.add('card', 'animated');
		let icon = document.createElement('i');
		icon.className = card;
		li.appendChild(icon);
		frag.appendChild(li);
	});
	return frag;
};

function captureCards(card, cardList) {
	if (cardList.length <= 2 && !card.classList.contains('show')) {
		card.classList.add('show', 'open', 'flipInY');
		cardList.push(card);
	}

	if (cardList.length === 2) {
		//disables mouse clicks on board while matching
		deck.style.pointerEvents = 'none';
		displayMoves(cardList);
		setTimeout(function () {
			compareCards(cardList);
		}, 1000);
	}
};

function compareCards(cardList) {
	let search = cardList[0].innerHTML;
	if (cardList[1].innerHTML.indexOf(search) !== -1) {
		cardList.forEach(function (card) {
			card.classList.add('match', 'tada');
			card.removeEventListener('click', addListener, false);
			card.classList.remove('flipInY');
			console.log('match'); //remove before submitting
		});
		matches++;
		cardList.length = 0;
		console.log(`matches ${matches}`);//remove before submitting
	} else {
		cardList.forEach(function (card) {
			card.classList.remove('show', 'open', 'flipInY');
			console.log('no match');//remove before submitting
		});
		cardList.length = 0;
	}

	setTimeout(function () {
		deck.style.pointerEvents = 'auto';;
	}, 200);

	//stops timer and launches win modal
	if (matches === 8) {
		stopTime(gameInterval);
		setTimeout(function () {
			finalTime.textContent = `Total Time: ${time.textContent}`;
			totalMoves.textContent = `Moves Made: ${moves.textContent}`;
			finalStars();
			modal.style.display = 'flex';
			modal.classList.add('fadeInDown');
		}, 1500);

	}
};

function addListener(cardHand) {
	if (cardHand.length === 2) {
		return;
	} else {
		let clickedCard = this;
		captureCards(clickedCard, openCards);
	}
};

function cardListener(deck, cardHand) {
	deck.querySelectorAll('li').forEach(function (card) {
		card.addEventListener('click', addListener, false);
	});
};

// ###### SCORE BOARD FUNCTIONS ######

function starRating(moveCount) {
	let star = document.querySelector('.stars');
	star.firstElementChild.remove();
	starsRemaining--;
};

function replaceStars() {
	let starCount = stars.querySelectorAll('li').length;
	for (let i = starCount; i <= 2; i++) {
		let li = document.createElement('li');
		let starIcon = document.createElement('i');
		starIcon.classList.add('fa', 'fa-star');
		li.appendChild(starIcon);
		frag.appendChild(li);
	};
	stars.appendChild(frag);
}

//2 open cards = 1 move
function displayMoves(cardlist) {
	if (cardlist.length === 2) {
		moveCounter += 1;
		moves.textContent = moveCounter;
	}
	if (moveCounter === 8 || moveCounter === 16) {
		starRating(moveCounter);
	}
};

function gameTime() {
	time.innerHTML = `${minutes} min ${seconds} sec`;
	seconds++;
	if (seconds === (1000 * 60 / 1000)) {
		minutes++;
		seconds = 1;
	}
};

function stopTime(interval) {
	clearInterval(interval);
};

function finalStars() {
	let starCount = stars.childElementCount;
	for (let i = 1; i <= starCount; i++) {
		let icon = document.createElement('i');
		icon.classList.add('fa', 'fa-star');
		frag.appendChild(icon);
	}
	endStars.appendChild(frag);
};

//removes old cards, resets counters to defaults, recreates decks and lays new board, stops and restarts timer.
function newBoard() {
	while (deck.firstChild) {
		deck.removeChild(deck.firstChild);
	};
	moveCounter = 0;
	moves.textContent = 0;
	matches = 0;
	minutes = 0;
	seconds = 1;
	finalTime.textContent = '';
	totalMoves.textContent = '';
	endStars.textContent = '';
	modal.style.display = 'none';
	shuffle(cards);
	makeNewCards(cards);
	deck.appendChild(frag);
	replaceStars();
	console.log(deck); //remove before submitting
	cardListener(deck, openCards);
	stopTime(gameInterval);
	gameInterval = setInterval(gameTime, 1000);
};


//click handler for the reset button
resetButton.addEventListener('click', function () {
	if (openCards.length !== 0) {
		openCards.length = 0;
	}
	newBoard();
});

modalButton.addEventListener('click', newBoard, false);

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