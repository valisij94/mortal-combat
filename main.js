function createPlayerInstance(name = 'Dummy name', hp = 100, img = '', weapon = []) {
	return {
		name, hp, img, weapon: [...weapon],
		attack: function() {
			console.log(this.name + " fight");
		}
	}
}

let player1 = createPlayerInstance('Scorpion', 90, 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif', ['sword']);
let player2 = createPlayerInstance('Spider', 95, 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif', ['knives']);

function createPlayer(playerClass, playerObject) {
	/*Container div*/
	const $playerDiv = document.createElement('div');
	$playerDiv.classList.add(playerClass);
	/*ProgressBar div*/
	const $playerProgressBar = document.createElement('div');
	$playerProgressBar.classList.add('progressbar');
	const $playerLife = document.createElement('div');
	$playerLife.classList.add('life');
	$playerLife.style.width = playerObject.hp+'%';	
	const $playerName = document.createElement('div');
	$playerName.classList.add('name');
	$playerName.innerText = playerObject.name;
	/*Character div*/
	const $playerCharacter = document.createElement('div');
	$playerCharacter.classList.add('character');
	const $playerImg = document.createElement('img');
	$playerImg.src = playerObject.img;
	
	$playerProgressBar.appendChild($playerLife);
	$playerProgressBar.appendChild($playerName);
	$playerCharacter.appendChild($playerImg);
	$playerDiv.appendChild($playerProgressBar);
	$playerDiv.appendChild($playerCharacter);
	
	document.querySelector('div.arenas').appendChild($playerDiv);
}

createPlayer('player1', player1);
createPlayer('player2', player2);