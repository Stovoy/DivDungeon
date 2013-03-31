var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
var user = new player(100, 100, 25, 25, 10);
var enemies = [];
var objects = [];
var attacks = [];

var wall = new object(100, 0, 2, 500);
objects.push(wall);

context.fillStyle = "#000000";
draw();
setInterval("draw()", 1000/60);

function draw() {
	context.clearRect(0, 0, c.width, c.height);
	context.fillRect(user.x, user.y, user.width, user.height);
	for (var i = 0; i < attacks.length; i++) {
		context.fillRect(attacks[i].x, attacks[i].y, attacks[i].width, attacks[i].height);
		attacks[i].frames -= 1;
		if (attacks[i].frames == 0) {attacks.length = 0;}
	}  
	for (var i = 0; i < enemies.length; i++) {
		context.fillRect(enemies[i].x, enemies[i].y, enemies[i].width, enemies[i].height);
	}  
	for (var i = 0; i < objects.length; i++) {
		context.fillRect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
	}
}

function player(x, y,width,height, dx) {
	this.x = x;
	this.y = y;
	this.height = height;
	this.width = width;
	this.dx = dx;
}

function object(x,y,width,height,f) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.frames = f;
}
function enemy() {
    
}

user.moveRight = function() {
	this.x += this.dx;
}

user.moveLeft = function() {
	this.x -= this.dx;
}

user.attack = function(length,frames) { //Attack needs to disappear
	var attack = new object(this.x + this.width, this.y, length, this.height, frames);
	attacks.push(attack);
}

user.collision = function() {

}

document.addEventListener('keydown', function(event) {
	if (event.keyCode == 37) {
		user.moveLeft();
	}
	if (event.keyCode == 39) {
		user.moveRight();
	}
	if (event.keyCode == 32) {
		user.attack(15, 3);	
	}
});
