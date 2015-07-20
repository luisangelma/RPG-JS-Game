
// Global game variables

var selectedCharacter = null;
var player = null;
var enemy = null;
var game = null;
var gameStatus = null;

// Element variables

var playerOne = document.getElementById('character-one');
var playerTwo = document.getElementById('character-two');
var playerThree = document.getElementById('character-three');
var characters = [playerOne, playerTwo, playerThree];
var playerName = document.getElementById('player-name');
var startGameBtn = document.getElementById('start-game-button');
var attackBtn = document.getElementById('attack-button');
var battleInfo = document.getElementById('battle-info');
var battleBonus = document.getElementById('battle-bonus');
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

console.log(enemies.sort());

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* Main Objects */

var Character = function(type, hp) {
	var self = this;
	this.name = name;
	this.hp = hp;
	this.hpElement = null;
	this.type = type;
	this.avatar = null;

	this.setIdentity = function() {
		if (type == 'player') {
			for (var i = 0; i < characters.length; i++) {
				if(selectedCharacter === characters[i]) {
					self.hpElement = battlePlayerHp;
					self.type = 'player';
					self.avatar = playerImages[i];
					battlePlayerHp.innerHTML = self.hp;
					battlePlayerAvatar.src = self.avatar;
				}
			}
		} else if (type == 'enemy') {
			var enemyTurn = 0;
			var ramdonInt = getRandomInt(0, enemies.length - 1);
			for (var i = 0; i < enemies.length; i++) {
				if (ramdonInt === i) {
					self.name = enemies[i].name;
					self.hpElement = battleEnemyHp;
					self.type == 'enemy';
					self.avatar = enemies[i].avatar;
					battleEnemyHp.innerHTML = self.hp;
					battleEnemyAvatar.src = self.avatar;
				}
			}
		}
	};

	this.generateAttackPower = function() {
		var ramdonInt = getRandomInt(10, 30);
		return ramdonInt;
	};

	this.displayHealth = function() {
		self.hpElement.innerHTML = self.hp;
	};

	this.setIdentity();

	this.healthBonus = function(hpBonus) {
		var x = getRandomInt(1,2);
		self.hp += hpBonus;
	};
};

/* Main Functions */

var Game = function() {
	var self = this;
	player = new Character('player', 400);
	player.name = playerName.value;
	enemy = new Character('enemy', 100);
	gameStatus = true;

	this.processAttack = function(attacker, victim) {
		var ramdonMissed = getRandomInt(1, 3);

		if (ramdonMissed == 3) {
			battleInfo.innerHTML = attacker.name + ' missed ' + victim.name;
		} else {
			var ramdonAttackPower = attacker.generateAttackPower();
			victim.hp -= ramdonAttackPower;
			battleInfo.innerHTML = attacker.name + ' attacked ' + victim.name + ' for ' + ramdonAttackPower + ' attack power';
			victim.displayHealth();
		}

		self.checkHealth();
	};

	this.checkHealth = function() {
		if (enemy.hp <= 0) {
			battleInfo.innerHTML = player.name + ' killed ' + enemy.name;
			self.ramdonHpBonus();
			enemy = new Character('enemy', 100);
		} else if (player.hp <= 0) {
			battleInfo.innerHTML = enemy.name + ' killed ' + player.name;
			player.hp = 0;
			player.displayHealth();
			attackBtn.disabled = true;
		}
	};

	this.ramdonHpBonus = function() {
		var x = getRandomInt(1, 2);

		if(x === 1) {
			var hpBonus = 100;
			player.healthBonus(hpBonus);
			battleBonus.innerHTML = player.name + ' received an ' + hpBonus + ' hp bonus';
			player.displayHealth();
			setTimeout(function(){
				battleBonus.innerHTML = '';
			}, 3000);
		}

		console.log(x);
	};
};

var initGame = function() {
	game = new Game();
};

/* Event listeners*/

playerOne.addEventListener('click', function(){
	selectedCharacter = playerOne;
	playerOne.className = "col-3 selection-character--character active";
	playerTwo.className = "col-3 selection-character--character";
	playerThree.className = "col-3 selection-character--character";
}, false);

playerTwo.addEventListener('click', function(){
	selectedCharacter = playerTwo;
	playerOne.className = "col-3 selection-character--character";
	playerTwo.className = "col-3 selection-character--character active";
	playerThree.className = "col-3 selection-character--character";
}, false);

playerThree.addEventListener('click', function(){
	selectedCharacter = playerThree;
	playerOne.className = "col-3 selection-character--character";
	playerTwo.className = "col-3 selection-character--character";
	playerThree.className = "col-3 selection-character--character active";
}, false);

startGameBtn.addEventListener('click', function(){
	initGame();
	console.log(typeof player.hp);
});

attackBtn.addEventListener('click', function(){
	game.processAttack(player, enemy);
	attackBtn.disabled = true;
	setTimeout(function(){
		game.processAttack(enemy, player);
		attackBtn.disabled = false;
	}, 1000);
});
