(function() {
const cards = ['fa fa-leaf', 'fa fa-diamond', 'fa fa-bomb', 'fa fa-bicycle', 'fa fa-bolt', 'fa fa-cube', 'fa fa-anchor', 'fa fa-paper-plane-o', 'fa fa-leaf', 'fa fa-diamond', 'fa fa-bomb', 'fa fa-bicycle', 'fa fa-bolt', 'fa fa-cube', 'fa fa-anchor', 'fa fa-paper-plane-o'];
const deck = document.querySelector('.deck');
const resetButton = document.querySelector('.restart');
let openCards = [];
const frag = document.createDocumentFragment();
let moveCounter = 0;
const moves = document.querySelector('.moves');
let matches = 0;
let starsRemaining = 3;
const stars = document.querySelector('.stars');
const time = document.querySelector('.time');
let minutes = 0;
let seconds = 1;
let gameInterval;
const modal = document.querySelector('.modal-bg');
const finalTime = document.querySelector('.finalTime');
const totalMoves = document.querySelector('.totalMoves');
const endStars = document.querySelector('.starRating');
const modalButton = document.querySelector('.exit');
const modalContent = document.querySelector('.modal-content');

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
}

function cardListener(deck) {
	deck.querySelectorAll('li').forEach(function (card) {
		card.addEventListener('click', addListener, false);
	});
}

function addListener(cardHand) {
	if (cardHand.length === 2) {
		return;
	} else {
		let clickedCard = this;
		captureCards(clickedCard, openCards);
	}
}

function captureCards(card, cardList) {
	//makes sure flipped card isn't readded and only 2 cards in array
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
}

function compareCards(cardList) {
	let search = cardList[0].innerHTML;
	//compares the i tag of both cards for a match
	//if they match, click listener is removed
	if (cardList[1].innerHTML.indexOf(search) !== -1) {
		cardList.forEach(function (card) {
			card.classList.add('match', 'tada');
			card.removeEventListener('click', addListener, false);
			card.classList.remove('flipInY');
			// console.log('match');
		});
		matches++;
		//empties the array
		cardList.length = 0;
		// console.log(`matches ${matches}`);
	} else {
		cardList.forEach(function (card) {
			card.classList.remove('show', 'open', 'flipInY');
			// console.log('no match');
		});
		cardList.length = 0;
	}

	setTimeout(function () {
		deck.style.pointerEvents = 'auto';
	}, 200);

	//stops timer and launches win modal
	if (matches === 8) {
		stopTime(gameInterval);
		setTimeout(function () {
			finalTime.textContent = `Total Time: ${time.textContent}`;
			totalMoves.textContent = `Moves Made: ${moves.textContent}`;
			finalStars();
			modal.style.display = 'flex';
		}, 1500);

	}
}

// ###### SCORE BOARD FUNCTIONS ######

//2 open cards = 1 move
function displayMoves(cardlist) {
	if (cardlist.length === 2) {
		moveCounter += 1;
		moves.textContent = moveCounter;
	}
	if (moveCounter === 8 || moveCounter === 16) {
		starRating();
	}
}

function finalStars() {
	let starCount = stars.childElementCount;
	for (let i = 1; i <= starCount; i++) {
		let icon = document.createElement('i');
		icon.classList.add('fa', 'fa-star');
		frag.appendChild(icon);
	}
	endStars.appendChild(frag);
}

function starRating() {
	let star = document.querySelector('.stars');
	star.firstElementChild.remove();
	starsRemaining--;
}

// Since there will always be at least one star left on the screen, this loop runs until i = 3 and stops itself, replacing all 3 stars on the screen.
// If there's 1 star, it runs twice = 3 stars
// if there's 2 stars, it runs once then i = 3 it stops, still 3 stars
// It's pretty neat and I'm suprised my dumb self came up with something so clever, so I'm writing my logic down for the future.
function replaceStars() {
	let starCount = stars.querySelectorAll('li').length;
	for (let i = starCount; i <= 2; i++) {
		let li = document.createElement('li');
		let starIcon = document.createElement('i');
		starIcon.classList.add('fa', 'fa-star');
		li.appendChild(starIcon);
		frag.appendChild(li);
	}
	stars.appendChild(frag);
}

function gameTime() {
	time.innerHTML = `${minutes} min ${seconds} sec`;
	seconds++;
	if (seconds === (1000 * 60 / 1000)) {
		minutes++;
		seconds = 1;
	}
}

function stopTime(interval) {
	clearInterval(interval);
}

//removes old cards, resets counters to defaults, recreates decks and lays new board, stops and restarts timer.
function newBoard() {
	while (deck.firstChild) {
		deck.removeChild(deck.firstChild);
	}
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
	// console.log(deck);
	cardListener(deck, openCards);
	stopTime(gameInterval);
	gameInterval = setInterval(gameTime, 1000);
}

//when page loads for the first time a new board is created
window.onload = newBoard();

resetButton.addEventListener('click', function () {
	if (openCards.length !== 0) {
		openCards.length = 0;
	}
	newBoard();
});

modalButton.addEventListener('click', newBoard, false);

modalContent.addEventListener('click', function () {
	modal.style.display = 'none';
});
})();