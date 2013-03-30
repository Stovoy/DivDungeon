var c = document.getElementById("myCanvas"); //Canvas
var ctx = c.getContext("2d");              //Context
ctx.fillStyle = "#000000";
var user = new player(100,100,25,25,5);
draw();
setInterval("draw()", 1000/60);
function player(x,y,width,height, dx) {
  this.x = x;
  this.y = y;
  this.height = height;
  this.width = width;
  this.dx = dx;
}

user.moveRight = function() {
  this.x += this.dx;
}

user.moveLeft = function() {
  this.x -= this.dx;
}

function draw() {
  ctx.clearRect(0,0,c.width,c.height);
  ctx.fillRect(user.x,user.y,user.width,user.height);
}

document.addEventListener('keydown', function(event) {
  if (event.keyCode == 37){
    user.moveLeft();
  }
  if (event.keyCode == 39){
    user.moveRight();
  }
});
