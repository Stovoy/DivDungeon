//Creates canvas and content holder
var canvas;
var context;
//Creates instance of player
var user = new player(200, 200, 50, 50, 10, 5, 1);
//Arrays that hold objects
var enemies;
var hiddenDiv;
var visibleDiv;
var attacks;
var defenses;
var direction; // 0 = Left, 1 = Right 2
var moving; //0 = Left, 1 = Right, 2 = Up, 3 = Down
var walkingIndex = 0;
var userImage;
var loop;
var spawn;

function init(image) {
    userImage = new Image();
    $("#image").attr("src", image);
    canvas = document.getElementById("divDungeonCanvas");
    context = canvas.getContext("2d");
    enemies = [];
    hiddenDiv = [];
    visibleDiv = [];
    attacks = [];
    defenses = [];
    direction = 0;

    var result = getAllObjects();
    for (var i = 0; i < result.length; i++) {
        var element = result[i];
        var newObject = new object(element.x, element.y, element.width, element.height, 0, 0);
        hiddenDiv.push(newObject);
    }

    gameloop();
    loop = setInterval("gameloop()", 1000 / 60);
    spawn = setInterval("enemyspawner()", 2500);

    setInitialPlayerPos();
}

function setInitialPlayerPos() {
    $("#playerChar")[0].style.top = user.y - 10 + "px";
    $("#playerChar")[0].style.left = user.x + "px";
}

function setPlayerPos(direction) {
    if (direction == "up" || direction == "down") {
        $("#playerChar")[0].style.top = user.y - 30 + "px";
    } else {
        $("#playerChar")[0].style.left = user.x + "px";
        $("#playerChar")[0].style.top = user.y - 30 + "px";
    }
}

//Painter and game loop

function gameloop() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawUser();
    drawAttacks();
    drawEnemies();
    drawObjects();
    drawShields();
    enemymover();
}

//Drawing Methods

function drawUser() {
    if (user.health >= 0) {
        collision(user);
        if (user.health >= 4) {
            context.fillStyle = "#00FF00";
        } else if (user.health >= 2) {
            context.fillStyle = "#FFFF00";
        } else {
            context.fillStyle = "#FF0000";
        }
        context.fillRect(user.x, user.y - 10, (10 * user.health), 5);
    } else {
		gameOver();
	}
}

function drawEnemies() {
    for (var i = 0; i < enemies.length; i++) {
        if (enemies[i].health >= 0) {
            context.fillStyle = "#00FF00";
            checkAttacks(enemies[i], enemies[i].x, enemies[i].x + enemies[i].width, enemies[i].y, enemies[i].y + enemies[i].height);
            context.fillRect(enemies[i].x, enemies[i].y, enemies[i].width, enemies[i].height);
            if (enemies[i].health >= 4) {
                context.fillStyle = "#00FF00";
            } else if (enemies[i].health >= 2) {
                context.fillStyle = "#FFFF00";
            } else {
                context.fillStyle = "#FF0000";
            }
            context.fillRect(enemies[i].x, enemies[i].y - 10, (10 * enemies[i].health), 5);
        }
    }
}

function drawAttacks() {
    context.fillStyle = "#FF0000";
    for (var i = 0; i < attacks.length; i++) {
        attacks[i].frames -= 1;
        if (attacks[i].frames == 0) {
            attacks.length = 0;
        }
    }
}

function drawObjects() {
    context.fillStyle = "#000000";
    for (var i = 0; i < visibleDiv.length; i++) {
        context.fillRect(visibleDiv[i].x, visibleDiv[i].y, visibleDiv[i].width, visibleDiv[i].height);
    }
}

function drawShields() {
    context.fillStyle = "#0000FF";
    for (var i = 0; i < defenses.length; i++) {
        context.fillRect(defenses[i].x, defenses[i].y, defenses[i].width, defenses[i].height);
        defenses[i].frames -= 1;
        if (defenses[i].frames == 0) {
            defenses.length = 0;
        }
    }
}

//Enemy methods

function enemyspawner() {
  var randx = Math.floor((Math.random()*450)+1);    
  var randy = Math.floor((Math.random()*450)+1);
  var enem = new enemy(randx,randy,50,50,0,0,5,0);
  enemytracker(enem);
  enemies.push(enem);
}

function enemytracker(enemy) {
  var angle = Math.atan2((user.y-enemy.y),(user.x-enemy.x));
  enemy.dx = Math.cos(angle)/2;
  enemy.dy = Math.sin(angle)/2;
}

function enemymover(enemy) {
  for (var i = 0; i < enemies.length; i++) {
    if ( ( (enemies[i].x >= user.x+user.width && enemies[i].x <= user.x+user.width+15) ||
         (enemies[i].x + enemies[i].width >= user.x - 15 && enemies[i].x + enemies[i].width <= user.x) ) && 
       ( !(enemies[i].y + enemies[i].height <= user. y) || !(enemies[i].y >= user.y + user.height) ) ){
        
        setInterval(function () {enemyattack(enemies[i],7,1);}, 5000);
    }
    else {   
      enemies[i].x += enemies[i].dx;
      enemies[i].y += enemies[i].dy; 
    }
  } 
}


function enemyattack(enemy, length, frames) {
  if (enemy.health >= 0){  
    if (user.x <= enemy.x){
      var slice = new attack(enemy.x - length, enemy.y, length, enemy.height, frames, enemy.side);
     attacks.push(slice);
     }
    else {
	    var slice = new attack(enemy.x + enemy.width, enemy.y, length, enemy.height, frames, enemy.side);
      attacks.push(slice);
    }
  }
}

//Constructors

function player(x, y, width, height, dx, health, side) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.dx = dx;
    this.health = health;
    this.side = side;
}

function object(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}

function enemy(x, y, width, height, dx, dy, health, side) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.dx = dx;
    this.dy = dy
    this.health = health;
    this.side = side;
}

function attack(x, y, width, height, frame, side) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.frames = frame;
    this.side = side;
}

function defense(x, y, width, height, frame, side, blocking) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.frame = frame;
    this.side = side;
    this.blocking = blocking;
}

//Player methods
user.moveUp = function () {
    this.y -= this.dx;
    moving = 2;
    for (var i = 0; i < enemies.length; i++) {
        enemytracker(enemies[i]);
    }
    verticalMove("up");
}
user.moveDown = function () {
    this.y += this.dx;
    moving = 3;
    for (var i = 0; i < enemies.length; i++) {
        enemytracker(enemies[i]);
    }
    verticalMove("down");
}
user.moveRight = function () {
    this.x += this.dx;
    direction = 1;
    horizontalMove("right");
    moving = 1;
    for (var i = 0; i < enemies.length; i++) {
        enemytracker(enemies[i]);
    }
}
user.moveLeft = function () {
    this.x -= this.dx;
    direction = 0;
    horizontalMove("left");
    moving = 0;
    for (var i = 0; i < enemies.length; i++) {
        enemytracker(enemies[i]);
    }
}
user.attack = function (length, frames) { //Attack needs to disappear
    if (direction == 0) {
        var slice = new attack(this.x - length, this.y, length, this.height, frames, this.side);
        attackAnimation();
    } else {
        var slice = new attack(this.x + this.width, this.y, length, this.height, frames, this.side);
        attackAnimation();
    }
    attacks.push(slice);

    var t = setTimeout(function undoAttackAnimation() {
        if (standRev % 2 == 0) {
            $("#playerChar")[0].children[0].src = "images/standing1.png";
            $("#playerChar")[0].children[1].style.left = "8%";
            $("#playerChar")[0].children[1].style.top = "13%";
        } else {
            $("#playerChar")[0].children[0].src = "images/standing1R.png";
            $("#playerChar")[0].children[1].style.left = "41%";
            $("#playerChar")[0].children[1].style.top = "13%";
        }
    }, 500);
}

function verticalMove(direction) {
    if (direction == "up") {
        setPlayerPos("up");
    } else {
        setPlayerPos("down");
    }
}

function horizontalMove(direction) {
    var reversed = 0;

    if (walkingIndex % 2 == 0) {
        if (direction == "right")
            $("#playerChar")[0].children[0].src = "images/running1.png";
        else {
            $("#playerChar")[0].children[0].src = "images/running1R.png";
            reversed = 1;
        }
    } else {
        if (direction == "right")
            $("#playerChar")[0].children[0].src = "images/running2.png";
        else {
            $("#playerChar")[0].children[0].src = "images/running2R.png";
            reversed = 1;
        }
    }

    walkingIndex = walkingIndex + 1;
    //var leftPos=parseInt($("#playerChar")[0].style.left.substring(0,$("#playerChar")[0].style.left.indexOf("px")));
    var leftPos = user.x;

    if (direction == "left") {
        //$("#playerChar")[0].style.left=leftPos-5+"px";
        setPlayerPos("left");
    } else if (direction == "right") {
        //$("#playerChar")[0].style.left=leftPos+5+"px";
        setPlayerPos("right");
    }

    //moving right
    if (reversed == 0) {
        $("#playerChar")[0].children[1].style.left = "30%";
        $("#playerChar")[0].children[1].style.top = "30%";
    } else {
        $("#playerChar")[0].children[1].style.left = "25%";
        $("#playerChar")[0].children[1].style.top = "30%";
    }
    //move to left
}

user.defend = function (length, frames) { //Defends
    if (direction == 0) {
        var shield = new attack(this.x - length, this.y, length, this.height, frames, this.side);
    } else {
        var shield = new attack(this.x + this.width, this.y, length, this.height, frames, this.side);
    }
    defenses.push(shield);
}

function attackAnimation() {
    if ($("#playerChar")[0].children[0].src.indexOf("running1R") > -1 || $("#playerChar")[0].children[0].src.indexOf("running2R") > -1) {
        $("#playerChar")[0].children[0].src = "images/attack1R.png";
        //wait
        $("#playerChar")[0].children[0].src = "images/attack2R.png";
        //wait
        $("#playerChar")[0].children[0].src = "images/attack3R.png";
        $("#playerChar")[0].children[1].style.top = "12%";
        $("#playerChar")[0].children[1].style.left = "35%";
        standRev = 1;
    }

    if ($("#playerChar")[0].children[0].src.indexOf("standing1R") > -1) {
        $("#playerChar")[0].children[0].src = "images/attack1R.png";
        //wait
        $("#playerChar")[0].children[0].src = "images/attack2R.png";
        //wait
        $("#playerChar")[0].children[0].src = "images/attack3R.png";
        $("#playerChar")[0].children[1].style.top = "12%";
        standRev = 1;
    }

    if ($("#playerChar")[0].children[0].src.indexOf("standing1") > -1) {
        $("#playerChar")[0].children[0].src = "images/attack1.png";
        //wait
        $("#playerChar")[0].children[0].src = "images/attack2.png";
        //wait
        $("#playerChar")[0].children[0].src = "images/attack3.png";
        $("#playerChar")[0].children[1].style.top = "12%";
        standRev = 0;
    }

    if ($("#playerChar")[0].children[0].src.indexOf("running1") > -1 || $("#playerChar")[0].children[0].src.indexOf("running2") > -1) {
        $("#playerChar")[0].children[0].src = "images/attack1.png";
        //wait
        $("#playerChar")[0].children[0].src = "images/attack2.png";
        //wait
        $("#playerChar")[0].children[0].src = "images/attack3.png";
        $("#playerChar")[0].children[1].style.left = "12%";
        $("#playerChar")[0].children[1].style.top = "12%";
        standRev = 0;

    }
}

//Collision Detection

function collision(object) {
    var left1 = object.x;
    var right1 = object.x + object.width;
    var top1 = object.y;
    var bottom1 = object.y + object.height;

    checkObjects(object, left1, right1, top1, bottom1);
    attackcollision();
    checkAttacks(object, left1, right1, top1, bottom1);
}

//Collision Checking Methods

function checkObjects(object, left1, right1, top1, bottom1) {
    for (var i = 0; i < visibleDiv.length; i++) {
        var left2 = visibleDiv[i].x;
        var right2 = visibleDiv[i].x + visibleDiv[i].width;
        var top2 = visibleDiv[i].y;
        var bottom2 = visibleDiv[i].y + visibleDiv[i].height;

        if (left1 >= right2) {
            continue;
        }
        if (right1 <= left2) {
            continue;
        }

        if (bottom1 <= top2) {
            continue;
        }
        if (top1 >= bottom2) {
            continue;
        }

        if (moving == 0) {
            object.x = visibleDiv[i].x + visibleDiv[i].width;
        } else if (moving == 1) {
            object.x = visibleDiv[i].x - object.width;
        } else if (moving == 2) {
            object.y = visibleDiv[i].y + visibleDiv[i].height;
        } else {
            object.y = visibleDiv[i].y - object.height;
        }
    }
}

function checkAttacks(object, left1, right1, top1, bottom1) {
    for (var i = 0; i < attacks.length; i++) {
        if (object.side == attacks[i].side) {
            continue;
        }
        var left2 = attacks[i].x;
        var right2 = attacks[i].x + attacks[i].width;
        var top2 = attacks[i].y;
        var bottom2 = attacks[i].y + attacks[i].height;

        if (left1 >= right2) {
            continue;
        }
        if (right1 <= left2) {
            continue;
        }

        if (bottom1 <= top2) {
            continue;
        }
        if (top1 >= bottom2) {
            continue;
        }

        object.health -= 1;
        if (object.health == 0) {
            showDiv();
        }
    }
}

function checkDefense(object, left1, right1, top1, bottom1) {
    for (var i = 0; i < defenses.length; i++) {
        if (object.side == defenses[i].side) {
            continue;
        }
        var left2 = defenses[i].x;
        var right2 = defenses[i].x + defenses[i].width;
        var top2 = defenses[i].y;
        var bottom2 = defenses[i].y + defenses[i].height;

        if (left1 >= right2) {
            continue;
        }
        if (right1 <= left2) {
            continue;
        }

        if (bottom1 <= top2) {
            continue;
        }
        if (top1 >= bottom2) {
            continue;
        }

        if (object.side == 0) {
            object.side = 1;
        } else if (object.side == 1) {
            object.side = 0;
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

function showDiv() {
    if (hiddenDiv.length > 0) {
        var divIndex = Math.floor((Math.random() * hiddenDiv.length));
        var div = hiddenDiv.splice(divIndex, 1);
        visibleDiv.push(div[0]);
    }
}

function gameOver() {
	$("body").prepend("<div>Game Over</div>");
	clearInterval(loop);
	clearInterval(spawn);
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
		user.attack(17, 3);	
	}
  if (event.keyCode == 67) { //C
    user.defend(17,2);
  }   
});