function createPlayerInstance(player = 1, name = 'Dummy name', hp = 100, img = '', weapon = []) {
	return {
		player, name, hp, img, weapon: [...weapon],
		attack: function() {
			console.log(this.name + " fight");
		}
	}
}

const $randomBtn = document.querySelector('.button');

let player1 = createPlayerInstance(1, 'Scorpion', 100, 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif', ['sword']);
let player2 = createPlayerInstance(2, 'Spider', 100, 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif', ['knives']);

const arenasContainer = document.querySelector('div.arenas');

function createElement(tag, className) {
	const $tag = document.createElement(tag);
	if (className) {
		$tag.classList.add(className);
	}
	return $tag;
}

function createPlayer(playerObject) {
	/*Container div*/
	const $playerDiv = createElement('div', 'player'+playerObject.player);
	/*ProgressBar div*/
	const $playerProgressBar = createElement('div', 'progressbar');
	const $playerLife = createElement('div', 'life');
	$playerLife.style.width = playerObject.hp+'%';	
	const $playerName = createElement('div', 'name');
	$playerName.innerText = playerObject.name;
	/*Character div*/
	const $playerCharacter = createElement('div', 'character');
	const $playerImg = createElement('img');
	$playerImg.src = playerObject.img;
	
	$playerProgressBar.appendChild($playerLife);
	$playerProgressBar.appendChild($playerName);
	$playerCharacter.appendChild($playerImg);
	$playerDiv.appendChild($playerProgressBar);
	$playerDiv.appendChild($playerCharacter);
	
	return $playerDiv;
}

const playerLose = (name) => {
	const $loseTitle = createElement('div', 'loseTitle');
	$loseTitle.innerText = name + ' lose';
	return $loseTitle;
}

const getWinner = (player1, player2) => {
	let result = {
		isFinish: false,
		winnerText: '',
	}
	const $title = createElement('div', 'loseTitle');
	if (player1.hp <= 0) {
		if (player2.hp <= 0) {
			result.isFinish = true;
			result.winnerText = 'The war is over!';
		}
		else {
			result.isFinish = true;
			result.winnerText = player2.name + ' wins!';
		}
	}
	else {
		if (player2.hp <= 0) {
			result.isFinish = true;
			result.winnerText = player1.name + ' wins!';
		}
	}
	console.log(player1.hp, player2.hp)
	return result;
}

const randomizer = () => {
	return Math.ceil(Math.random() * 20);
}

const changeHP = (player) => {
	const damage = randomizer();
	const $playerLife = document.querySelector('.player'+player.player + ' .life');
	player.hp = player.hp > damage ? player.hp - damage : 0;
	$playerLife.style.width = player.hp + '%';
}

$randomBtn.addEventListener('click', () => {
	changeHP(player1);
	changeHP(player2);
	const hasWinner = getWinner(player1, player2);
	if (hasWinner.isFinish) {
		$randomBtn.disabled = true;
		const $title = createElement('div', 'loseTitle');
		$title.innerText = hasWinner.winnerText;
		arenasContainer.appendChild($title);
	}
});

arenasContainer.appendChild(createPlayer(player1));
arenasContainer.appendChild(createPlayer(player2));