
// Global game variables

var selectedCharacter = null;
var player = null;
var enemy = null;
var gameStatus = false;

// Element variables

var characterOne = document.getElementById('character-one');
var characterTwo = document.getElementById('character-two');
var characterThree = document.getElementById('character-three');
var characters = [characterOne, characterTwo, characterThree];
var playerName = document.getElementById('player-name');
var startGameBtn = document.getElementById('start-game-button');
var battleInfo = document.getElementById('battle-info');
var battlePlayer = document.getElementById('battlePlayer');
var battleEnemy = document.getElementById('battleEnemy');

var playerImages = ['images/char1.png', 'images/char2.png', 'images/char3.png'];
var enemyImages = ['images/enemy1.png', 'images/enemy2.png', 'images/enemy3.png'];


console.log(playerImages[0]);
console.log(characters[0]);
/* Main Objects */

var Player = function(name) {
	var self = this;
	this.name = name;
	this.hp = 100;
	this.type = null;
	this.avatar = null;

	this.setType = function() {
		for (var i = 0; i < characters.length; i++) {
			if(selectedCharacter == characters[i]) {
				this.type = 'player';
			}
		}
	};

	this.setAvatar = function() {
		for (var i = 0; i < characters.length; i++) {
			if (selectedCharacter === characters[i]) {
				self.avatar = playerImages[i];
			}
		}
	};	
};

var Enemy = function() {
	var self = this;
	this.name = '';
	this.hp = 100;
	this.type = 'enemy';
}

var Game = function(player, enemy) {
	var self = this;
	this.player = player;
	this.enemy = enemy;
}

/* Main Function */

var initGame = function() {
	var player = new Player(playerName.value);
	var enemy = new Enemy();
	var game = new Game(player, enemy);

	player.setAvatar();
	console.log(player.avatar);
}

/* Event listeners*/

characterOne.addEventListener('click', function(){
	selectedCharacter = characterOne;
	characterOne.className = "col-3 selection-character--character active";
	characterTwo.className = "col-3 selection-character--character";
	characterThree.className = "col-3 selection-character--character";
	console.log(selectedCharacter);
}, false);

characterTwo.addEventListener('click', function(){
	selectedCharacter = characterTwo;
	characterOne.className = "col-3 selection-character--character";
	characterTwo.className = "col-3 selection-character--character active";
	characterThree.className = "col-3 selection-character--character";
	console.log(selectedCharacter);
}, false);

characterThree.addEventListener('click', function(){
	selectedCharacter = characterThree;
	characterOne.className = "col-3 selection-character--character";
	characterTwo.className = "col-3 selection-character--character";
	characterThree.className = "col-3 selection-character--character active";
	console.log(selectedCharacter);
}, false);

startGameBtn.addEventListener('click', function(){
	gameStatus = true;
	initGame();
});
