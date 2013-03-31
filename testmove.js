var c = document.getElementById("myCanvas"); //Canvas
var ctx = c.getContext("2d");              //Context
var user = new player(100,100,25,25,10);
var enemies = [];
var objects = [];
var attacks = [];

var wall = new object(100,0,2,500);
objects.push(wall);

ctx.fillStyle = "#000000";
draw();
setInterval("draw()", 1000/60);
function draw() {
  ctx.clearRect(0,0,c.width,c.height);
  ctx.fillRect(user.x,user.y,user.width,user.height);
  for (var x = 0; x < attacks.length;x++) {
      //alert(attacks[.frames]);
      ctx.fillRect(attacks[x].x,attacks[x].y,attacks[x].width,attacks[x].height);
      attacks[x].frames -= 1;
      if (attacks[x].frames == 0) {attacks.length = 0;}
  }  
  for (var y = 0; y < enemies.length;y++) {
      ctx.fillRect(enemies[y].x,enemies[y].y,enemies[y].width,enemies[y].height);
  }  
  for (var z = 0; z < objects.length;z++) {
      ctx.fillRect(objects[z].x,objects[z].y,objects[z].width,objects[z].height);
  }
}

function player(x,y,width,height, dx) {
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
  var attack = new object(this.x+this.width,this.y,length,this.height,frames);
  attacks.push(attack);
}
user.collision = function() {

}

document.addEventListener('keydown', function(event) {
  if (event.keyCode == 37){
    user.moveLeft();
  }
  if (event.keyCode == 39){
    user.moveRight();
  }
  if (event.keyCode == 32){
    user.attack(15,3);
  }
});
