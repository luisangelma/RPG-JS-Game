
// Global game variables

var selectedCharacter = null;
var player = null;
var enemy = null;
var game = null;
var gameStatus = null;

// Element variables

var characterOne = document.getElementById('character-one');
var characterTwo = document.getElementById('character-two');
var characterThree = document.getElementById('character-three');
var characters = [characterOne, characterTwo, characterThree];
var playerName = document.getElementById('player-name');
var startGameBtn = document.getElementById('start-game-button');
var attackBtn = document.getElementById('attack-button');
var battleInfo = document.getElementById('battle-info');
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
	this.hp = 500;
	this.hpElement = battlePlayerHp;
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
		console.log(this.hp);

};

var Enemy = function() {
	var self = this;
	this.name = '';
	this.hp = 100;
	this.hpElement = battleEnemyHp;
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
};

var Attack = function() {
	var self = this;

	this.generateAttackPower = function() {
		var ramdonInt = getRandomInt(10, 30);
		return ramdonInt;
	};

	this.processAtack = function(attacker, victim) {
		var ramdonHit = getRandomInt(1, 3);
		if (ramdonHit === 3) {
			battleInfo.innerHTML = attacker.name + ' attempted an attack against ' + victim.name + ' but missed';
		} else {
			victim.hp -= self.generateAttackPower();
			battleInfo.innerHTML = attacker.name + ' attacked ' + victim.name + ' for ' + self.generateAttackPower() + ' attack power';
			victim.hpElement.innerHTML = victim.hp;
		}
	};
}

/* Main Functions */

var Game = function(player, enemy) {
	var self = this;
	this.player = player;
	this.enemy = enemy;

	this.generatePlayer= function() {
		battlePlayerAvatar.src = player.avatar;
		battlePlayerHp.innerHTML = player.hp;
	};

	this.generateEnemy= function() {
		battleEnemyAvatar.src = enemy.avatar;
		battleEnemyHp.innerHTML = enemy.hp;
	};

	this.generatePlayer();
	this.generateEnemy();
};

var initGame = function() {
	player = new Player(playerName.value);
	enemy = new Enemy();
	game = new Game(player, enemy);
	game.prototype = new Attack();
	gameStatus = true;

	this.checkGameStatus = function() {
		if (player.hp <= 0) {
			battleInfo.innerHTML = enemy.name + ' killed ' + player.name;
			gameStatus = false;
		} else if (enemy.hp <= 0) {
			battleInfo.innerHTML = player.name + ' killed ' + enemy.name;
			gameStatus = true;
			enemy = new Enemy();
			console.log(game.generateEnemy());
		}
	};
	
	this.checkGameStatus();
}



/* Event listeners*/

characterOne.addEventListener('click', function(){
	selectedCharacter = characterOne;
	characterOne.className = "col-3 selection-character--character active";
	characterTwo.className = "col-3 selection-character--character";
	characterThree.className = "col-3 selection-character--character";
}, false);

characterTwo.addEventListener('click', function(){
	selectedCharacter = characterTwo;
	characterOne.className = "col-3 selection-character--character";
	characterTwo.className = "col-3 selection-character--character active";
	characterThree.className = "col-3 selection-character--character";
}, false);

characterThree.addEventListener('click', function(){
	selectedCharacter = characterThree;
	characterOne.className = "col-3 selection-character--character";
	characterTwo.className = "col-3 selection-character--character";
	characterThree.className = "col-3 selection-character--character active";
}, false);

startGameBtn.addEventListener('click', function(){
	initGame();
});

attackBtn.addEventListener('click', function(){
	if(gameStatus) {
		game.prototype.processAtack(player, enemy);
		checkGameStatus();
		setTimeout(function(){
			game.prototype.processAtack(enemy, player);
			checkGameStatus();
		}, 1000);
	}
});
