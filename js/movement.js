//Creats canvas and content holder
var canvas;
var context;
//Creates instance of player
var user = new player(200, 200, 25, 25, 10,5,1);
//Arrays that hold objects
var enemies;
var objects;
var attacks;
var defenses;
var direction; // 0 = Left, 1 = Right 2
var moving; //0 = Left, 1 = Right, 2 = Up, 3 = Down
var walkingIndex = 0;

//function init() {
  canvas = document.getElementById("divDungeonCanvas");
  context = canvas.getContext("2d");
  enemies = [];
  objects = [];
  attacks = [];
  defenses = [];
  direction = 0;
  
  gameloop();
  setInterval("gameloop()", 1000/60); 
//}
var enem = new enemy(200,250,25,25,10,5,0);
enemies.push(enem);

//Painter and game loop
function gameloop() {
	drawUser();
  drawAttacks();
  drawEnemies();  
  drawObjects();
  drawShields();
}

//Drawing Methods
function drawUser() {
  context.fillStyle = "#000000";
  context.clearRect(0, 0, canvas.width, canvas.height);
  if (user.health >= 0) {
    collision(user); 
 	  context.fillRect(user.x, user.y, user.width, user.height);
    if (user.health >= 4) {
      context.fillStyle = "#00FF00";
	    context.fillRect(user.x-15, user.y-10, (11*user.health), 5);  
    }
    else if (user.health >= 2) {
      context.fillStyle = "#FFFF00";
	    context.fillRect(user.x-15, user.y-10, (11*user.health), 5);
    }
    else {
      context.fillStyle = "#FF0000";
	    context.fillRect(user.x-15, user.y-10, (11*user.health), 5);
    }
  }
}
function drawEnemies() {
	for (var i = 0; i < enemies.length; i++) {
    if (enemies[i].health >= 0) {
      collision(enemies[i]);
      context.fillStyle = "#00FF00";
		  context.fillRect(enemies[i].x, enemies[i].y, enemies[i].width, enemies[i].height);
      if (enemies[i].health >= 0) { 
        if (enemies[i].health >= 4) {
          context.fillStyle = "#00FF00";
	        context.fillRect(enemies[i].x-15, enemies[i].y-10, (11*enemies[i].health), 5);  
        }
        else if (enemies[i].health >= 2) {
        context.fillStyle = "#FFFF00";
	      context.fillRect(enemies[i].x-15, enemies[i].y-10, (11*enemies[i].health), 5);
        }
        else {
        context.fillStyle = "#FF0000";
	      context.fillRect(enemies[i].x-15, enemies[i].y-10, (11*enemies[i].health), 5);
        }
      }
    }
	}
}
function drawAttacks() {
  context.fillStyle = "#FF0000";
	for (var i = 0; i < attacks.length; i++) {
		context.fillRect(attacks[i].x, attacks[i].y, attacks[i].width, attacks[i].height);
		attacks[i].frames -= 1;
		if (attacks[i].frames == 0) {attacks.length = 0;}
	}
}
function drawObjects() {
  for (var i = 0; i < objects.length; i++) {
		context.fillRect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
	}
}
function drawShields() {
  context.fillStyle = "#0000FF";
	for (var i = 0; i < defenses.length; i++) {
		context.fillRect(defenses[i].x, defenses[i].y, defenses[i].width, defenses[i].height);
		defenses[i].frames -= 1;
		if (defenses[i].frames == 0) {defenses.length = 0;}
	}
}

//Constructors
function player(x, y,width,height, dx, health,side) {
	this.x = x;
	this.y = y;
	this.height = height;
	this.width = width;
	this.dx = dx;
  this.health = health;
  this.side = side;
}
function object(x,y,width,height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
}
function enemy(x,y,width,height,dx,health,side) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.dx = dx;
    this.health = health;
    this.side = side;
}
function attack(x,y,width,height,frame,side) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.frames = frame;
  this.side = side;
}
function defense(x,y,width,height,frame,side,blocking) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.frame = frame;
  this.side = side;
  this.blocking = blocking;
}

//Player methods
user.moveUp = function() {
	this.y -= this.dx;
  moving = 2;
}
user.moveDown = function() {
	this.y += this.dx;
  moving = 3;
}
user.moveRight = function() {
	this.x += this.dx;
  direction = 1;
  //horizontalMove("right");
  moving = 1;
}
user.moveLeft = function() {
	this.x -= this.dx;
  direction = 0;
  //horizontalMove("left");
  moving = 0;
}
user.attack = function(length,frames) { //Attack needs to disappear
  if (direction == 0){
    var slice = new attack(this.x - length, this.y, length, this.height, frames, this.side);
    //attackAnimation();
  }
  else {
	  var slice = new attack(this.x + this.width, this.y, length, this.height, frames, this.side);
    //attackAnimation();
 }
	attacks.push(slice);
  /*var t = setTimeout(function undoAttackAnimation() {
     $("#playerChar")[0].children[0].src="images/standing1.png"; 
     $("#playerChar")[0].children[1].style.left="6%";
     $("#playerChar")[0].children[1].style.top="7%";
     },,500);
     //undoAttackAnimation(); 
   }
  */
}
/*
function horizontalMove(direction) {
    if (walkingIndex%2 == 0) {
      $("#playerChar")[0].children[0].src="images/running1.png";
    }
    else {
      S("#playerChar")[0].children[0].src="images/running2.png";
    }

    walkingIndex = walkingIndex + 1;
    var leftPos = parseInt($("#playerChar")[0].style.left.indexOf("%")));
    console.log(leftPos);

    if (direction == "left") {
      $("#playerChar")[0].style.left = leftPos-1+"%";
      console.log(leftPos-1);
    }
    else if (direction == "right") {
      $("#playerChar")[0].style.left = leftPos-1+"%";
      console.log(leftPos+1);
    }
    $("#playerChar")[0].children[1].style.left="17%";
    $("#playerChar")[0].children[1].style.top="17%;

    //move to left
}
function attackAnimation() {
    if ($("#playerChar")[0].src == "images/standing1.png") {
      $("#playerChar")[0].children[0].src="images/attack1.png"
      //wait
      $("#playerChar")[0].children[0].src="images/attack2.png"
      //wait
`     $("#playerChar")[0].children[0].src="images/attack3.png"
      $("#playerChar")[0].children[1].style.top="6%";
    }
    else {
      $("#playerChar")[0].children[0].src="images/attack1.png"
      //wait
      $("#playerChar")[0].children[0].src="images/attack2.png"
      //wait
`     $("#playerChar")[0].children[0].src="images/attack3.png"
      $("#playerChar")[0].children[1].style.left="5%";
      $("#playerChar")[0].children[1].style.top="6%";   
    }
}
*/

user.defend = function(length, frames) { //Defends
  if (direction == 0){
    var shield = new attack(this.x - length, this.y, length, this.height, frames, this.side);
  }
  else {
	  var shield = new attack(this.x + this.width, this.y, length, this.height, frames, this.side);
 }
	defenses.push(shield);
}

//Collision Detection
function collision(object) {
  var left1 = object.x;
  var right1 = object.x + object.width;
  var top1 = object.y;
  var bottom1 = object.y+object.height;

  checkObjects(object, left1, right1, top1, bottom1);
  attackcollision();
  checkAttacks(object, left1, right1, top1, bottom1);
}

//Collision Checking Methods
function checkObjects(object, left1, right1, top1, bottom1) {
  for (var i = 0; i < objects.length; i++) {
    var left2 = objects[i].x;
    var right2 = objects[i].x + objects[i].width;
    var top2 = objects[i].y;
    var bottom2 = objects[i].y+objects[i].height;

	  if (left1 >= right2) {continue;}
    if (right1 <= left2) {continue;}
      
    if (bottom1 <= top2) {continue;}
    if (top1 >= bottom2) {continue;}

    if (moving == 0) {
      object.x = objects[i].x + objects[i].width;
    }
    else if (moving == 1) {
      object.x = objects[i].x - object.width;
    }
    else if (moving == 2) {
      object.y = objects[i].y + objects[i].height;
    }
    else { 
      object.y = objects[i].y - object.height;
    }
  }
}
function checkAttacks(object, left1, right1, top1, bottom1) {
  for (var i = 0; i < attacks.length; i++) {
    if (object.side == attacks[i].side) {continue;}
    var left2 = attacks[i].x;
    var right2 = attacks[i].x + attacks[i].width;
    var top2 = attacks[i].y;
    var bottom2 = attacks[i].y + attacks[i].height;

	  if (left1 >= right2) {continue;}
    if (right1 <= left2) {continue;}
      
    if (bottom1 <= top2) {continue;}
    if (top1 >= bottom2) {continue;}

    object.health -= 1;
  }
}
function checkDefense(object, left1, right1, top1, bottom1) {
  for (var i = 0; i < defenses.length; i++) {
    if (object.side == defenses[i].side) {continue;}
    var left2 = defenses[i].x;
    var right2 = defenses[i].x + defenses[i].width;
    var top2 = defenses[i].y;
    var bottom2 = defenses[i].y + defenses[i].height;

	  if (left1 >= right2) {continue;}
    if (right1 <= left2) {continue;}
      
    if (bottom1 <= top2) {continue;}
    if (top1 >= bottom2) {continue;}

    if (object.side == 0) {
      object.side = 1;
    }
    else if (object.side == 1) {
      object.side =0;
    }
  }
}
function attackcollision() {
  for (var i = 0; i < attacks.length; i++) {
    var left1 = attacks[i].x;
    var right1 = attacks[i].x + attacks[i].width;
    var top1 = attacks[i].y;
    var bottom1 = attacks[i].y + attacks[i].height;

    checkDefense(attacks[i], left1, right1, top1, bottom1);
  }
}


//Keylistner
document.addEventListener('keydown', function(event) {
	if (event.keyCode == 37) { //Left Arrow
		user.moveLeft();
	}
	if (event.keyCode == 39) { //Right Arrow
		user.moveRight();
	}
  if (event.keyCode == 38) { //Up Arrow
		user.moveUp();
	}
	if (event.keyCode == 40) { //Down Arrow
		user.moveDown();
	}
	if (event.keyCode == 32) { //Spacebar
		user.attack(15, 3);	
	}
  if (event.keyCode == 67) { //C
    user.defend(15,2);
  }   
});
