
// Global game variables

var selectedCharacter = null;
var player = null;
var enemy = null;
var game = null;
var gameStatus = false;

// Element variables

var characterOne = document.getElementById('character-one');
var characterTwo = document.getElementById('character-two');
var characterThree = document.getElementById('character-three');
var characters = [characterOne, characterTwo, characterThree];
var playerName = document.getElementById('player-name');
var startGameBtn = document.getElementById('start-game-button');
var attackBtn = document.getElementById('attack-button');
var battleInfo = document.getElementById('battle-arena');
var battlePlayer = document.getElementById('battle-player');
var battlePlayerHp = document.getElementById('player-hp');
var battlePlayerAvatar = document.getElementById('player-avatar');
var battleEnemy = document.getElementById('battle-enemy');
var battleEnemyHp = document.getElementById('enemy-hp');
var battleEnemyAvatar = document.getElementById('enemy-avatar');

var playerImages = ['images/char1.png', 'images/char2.png', 'images/char3.png'];

var enemies = [
	{name: 'Ancient Dragon', avatar: 'images/enemy1.png'}, 
	{name: 'Robotron', avatar: 'images/enemy2.png'}, 
	{name: 'Mighty Centipede', avatar: 'images/enemy3.png'}
];

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* Main Objects */

var Player = function(name) {
	var self = this;
	this.name = name;
	this.hp = 100;
	this.type = null;
	this.avatar = null;

	this.setIdentity = function() {
		for (var i = 0; i < characters.length; i++) {
			if(selectedCharacter === characters[i]) {
				self.type = 'player';
				self.avatar = playerImages[i];
			}
		}
	};

	this.setIdentity();
};

var Enemy = function() {
	var self = this;
	this.name = '';
	this.hp = 100;
	this.type = 'enemy';
	this.avatar = null;

	this.setIdentity = function() {
		var ramdonInt = getRandomInt(0, enemies.length - 1);
		for (var i = 0; i < enemies.length; i++) {
			if (ramdonInt === i) {
				self.name = enemies[i].name;
				self.avatar = enemies[i].avatar;
			}
		}
	};

	this.setIdentity();

	console.log(this.name);
	console.log(this.avatar);
};

var Attack = function() {
	var self = this;

	this.generateAttackPower = function() {
		var ramdonInt = getRandomInt(10, 30);
		return ramdonInt;
	};

	this.processAtack = function(attacker, victim) {
		victim.hp -= self.generateAttackPower();
		console.log(attacker.name + ' attacked ' + victim.name);
		console.log(victim.hp);
	};
}

/* Main Functions */

var Game = function(player, enemy) {
	var self = this;
	this.player = player;
	this.enemy = enemy;

	this.generateCharacters= function() {
		battlePlayerAvatar.src = player.avatar;
		battlePlayerHp.innerHTML = player.hp;
		battleEnemyAvatar.src = enemy.avatar;
		battleEnemyHp.innerHTML = enemy.hp;
	};

	this.generateCharacters();
};

var initGame = function() {
	player = new Player(playerName.value);
	enemy = new Enemy();
	game = new Game(player, enemy);
	game.prototype = new Attack();
};

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
	console.log(player);
});

attackBtn.addEventListener('click', function(){
	gameStatus = true;
	game.prototype.processAtack(enemy, player);
	console.log(player);
});
