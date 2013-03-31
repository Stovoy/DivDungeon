//Creats canvas and content holder
var canvas;
var context;
//Creates instance of player
var user = new player(200, 200, 25, 25, 10,5,1);
//Arrays that hold objects
var enemies;
var objects;
var attacks;
var direction; // 0 = Left, 1 = Right 2
var moving; //0 = Left, 1 = Right, 2 = Up, 3 = Down

//function init() {
  canvas = document.getElementById("myCanvas");
  context = canvas.getContext("2d");
  enemies = [];
  objects = [];
  attacks = [];
  direction = 0;
  
  draw();
  setInterval("draw()", 1000/60); 
//}
var enemy = new enemy(200,250,25,25,10,5,0);
enemies.push(enemy);

//Painter and game loop
function draw() {
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
  context.fillStyle = "#000000";
	for (var i = 0; i < attacks.length; i++) {
		context.fillRect(attacks[i].x, attacks[i].y, attacks[i].width, attacks[i].height);
		attacks[i].frames -= 1;
		if (attacks[i].frames == 0) {attacks.length = 0;}
	}  
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
	for (var i = 0; i < objects.length; i++) {
		context.fillRect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
	}
}

//Constructors
function player(x, y,width,height, dx, health,s) {
	this.x = x;
	this.y = y;
	this.height = height;
	this.width = width;
	this.dx = dx;
  this.health = health;
  this.side = s;
}
function object(x,y,width,height,f,s) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.frames = f;
  this.side = s;
}
function enemy(x,y,width,height,dx,health,s) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.dx = dx;
    this.health = health;
    this.side = s;
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
  moving = 1;
}
user.moveLeft = function() {
	this.x -= this.dx;
  direction = 0;
  moving = 0;
}
user.attack = function(length,frames) { //Attack needs to disappear
  if(direction == 0){
    var attack = new object(this.x - length, this.y, length, this.height, frames); 
  }
  else {
	  var attack = new object(this.x + this.width, this.y, length, this.height, frames);
 }
	attacks.push(attack);
}

function collision(object) {
  var left1 = object.x;
  var right1 = object.x + object.width;
  var top1 = object.y;
  var bottom1 = object.y+object.height;

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


//Keylistner
document.addEventListener('keydown', function(event) {
	if (event.keyCode == 37) {
		user.moveLeft();
	}
	if (event.keyCode == 39) {
		user.moveRight();
	}
  if (event.keyCode == 38) {
		user.moveUp();
	}
	if (event.keyCode == 40) {
		user.moveDown();
	}
	if (event.keyCode == 32) {
		user.attack(15, 3);	
	}
});
