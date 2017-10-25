var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height/2;
var shipHeight = 10;
var shipWidth = 25;
var shipX = (canvas.width-shipWidth)/2;
var shipY = (canvas.height-shipHeight)/2;
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var spacekey = false;
var lives = 3;
var score = 0;
var bullet = 5;
var lazx = 0;
var lazy = 0;
var dx = 5;

//all the controlls
document.addEventListener("keydown",keyDownHandler,false);
document.addEventListener("keyup",keyUpHandler,false);

function keyDownHandler(e)
{
	if(e.keyCode == 39)
    {	
		rightPressed = true;	
	}
	else if(e.keyCode == 37)
    {	
		leftPressed = true;
	}
    if(e.keyCode == 38)
    {
        upPressed = true;
    }
    else if(e.keyCode == 40)
    {
        downPressed = true;
    }

    if(e.keyCode == 32)
    {
        spacekey = true;
    }		
}//end of keypressdown
	
function keyUpHandler(e)
{	
	if(e.keyCode == 39)
    {
		rightPressed = false;
	}
	else if(e.keyCode == 37)
    {	 
		leftPressed = false;	
	}
    if(e.keyCode == 38)
    {
        upPressed = false;
    }
    else if(e.keyCode == 40)
    {
        downPressed = false;
    }

    if(e.keyCode == 32)
    {
        spacekey = false;
    }
}//end of keypressup

function makeShip()
{
	ctx.beginPath();
	ctx.rect(shipX,shipY,shipWidth,shipHeight);
	ctx.fillstyle = "#FFFFFF";
	ctx.fill();
	ctx.closePath();
}

function makeLazer(lazerX, lazerY)
{
    ctx.beginPath();
    ctx.arc(lazerX+25,lazerY+5,bullet,0,2*Math.PI);
    ctx.fillstyle = "#000000";
    ctx.fillStroke = "#FFFFFF";
    ctx.Stroke = "10"
    ctx.fill();
    ctx.closePath();
}

function liveLabel() 
{
    ctx.font = "16px Arial";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}

function gameOverLabel() 
{
    ctx.font = "64px Arial";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("Game Over", 300, 320);
}

function enterLabel()
{
    ctx.font = "24px Arial";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("Press Enter to Restart", 350, 350);

}

function scoreLabel() 
{
    ctx.font = "16px Arial";
    ctx.fillStyle = "#FF0000";
    ctx.fillText("Score: "+score, 8, 20);
}

function runGame()
{
	ctx.clearRect(0,0,canvas.width,canvas.height);
	makeShip();
	liveLabel();
	scoreLabel();
	if(rightPressed && shipX < canvas.width-shipWidth)
    {	
		shipX+=7;
	}
	else if(leftPressed && shipX > 0 )
    {
		shipX-=7;	 
	}
    if(upPressed && shipY > 0)
    {   
        shipY-=7;
    } 
    else if(downPressed == true && shipY < canvas.height-shipHeight )
    {
        shipY+=7;  
    }

    if(spacekey == true)
    {
        lazy = shipY;
        lazx = shipX;
        makeLazer(lazx, lazy);
    }

    lazx = lazx + dx;

	requestAnimationFrame(runGame);
}

runGame();