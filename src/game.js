import ship from './ship';
import asteroid from './asteroid';
import bullet from './bullet';
import score from './score';
import lives from './lives';

HTMLMediaElement.prototype.stop = function() {
  this.pause();
  this.currentTime = 0;
}

export default class Game {

  constructor() {

    //Initizing the shipp and bullet
    this.ship = new ship(470, 640);
    this.lives = new lives();
    this.score = new score();
    this.over = false;
    this.count = 10;
    this.asteroids = new Array();
    this.bullets = new Array();

    //initizing the asteroid
    for(this.j = 0; this.j < this.count; this.j++){
      this.heightAst = getRandomPosition(640,0);
      this.widthAst = getRandomPosition(940, 600);
      this.asteroid = new asteroid(this.widthAst,this.heightAst,20,5,0);
      this.asteroids.push(this.asteroid);

    }


    this.input = {
      direction: 'right'
    }

    // Create the back buffer canvas
    this.backBufferCanvas = document.createElement('canvas');
    this.backBufferCanvas.width = 960;
    this.backBufferCanvas.height = 640;
    this.backBufferContext = this.backBufferCanvas.getContext('2d');

    // Create the screen buffer canvas
    this.screenBufferCanvas = document.createElement('canvas');
    this.screenBufferCanvas.width = 960;
    this.screenBufferCanvas.height = 640;
    document.body.appendChild(this.screenBufferCanvas);
    this.screenBufferContext = this.screenBufferCanvas.getContext('2d');

    // Create HTML UI Elements
    var message = document.createElement('div');
    message.id = "message";
    message.textContent = "";
    document.body.appendChild(message);

    // Bind class functions
    this.gameOver = this.gameOver.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.update = this.update.bind(this);
    this.render = this.render.bind(this);
    this.loop = this.loop.bind(this);

    // Set up event handlers
    window.onkeydown = this.handleKeyDown;

    // Start the game loop
    this.interval = setInterval(this.loop, 25);

  }

  gameOver() {
    var message = document.getElementById("message");
    message.innerText = "Game Over";
    this.over = true;
  }

  handleKeyDown(event) {
    event.preventDefault();
    switch(event.key){
      case 'ArrowUp':
        this.input.direction = 'up';
        break;
      case 'ArrowLeft':
        this.input.direction = 'left';
        break;
      case 'ArrowDown':
        this.input.direction = 'down';
        break;      
      case 'ArrowRight':
        this.input.direction = 'right';
        break;
      case ' ':
        this.bullet = new bullet(this.ship.getX(), this.ship.getY());
        this.bullets.push(this.bullet);
        break;
    }
  }

  update() {

    this.ship.update(this.input, false);

    if(this.asteroids.length > 0){
      for(var l = 0; l < this.asteroids.length; l++){
        this.asteroids[l].update();
      }
    }

    if(this.bullets.length > 0){
      for(var k = 0; k < this.bullets.length; k++){
        this.bullets[k].update();
      }
    }

    if(this.bullets.length > 0){
      for(var d = 0; d < this.bullets.length; d++){
        if(this.bullets[d].getX() > 970){
          this.bullets.splice(d,1);
        }
      }
    }

    //checking bullet to asteroid collision
    if(this.bullets.length > 0 && this.asteroids.length > 0){
      for( var i = 0; i < this.asteroids.length; i++){
        for(var s = 0; s < this.bullets.length; s++){
          this.distanceSquared =
                    Math.pow(this.asteroids[i].getX() - this.bullets[s].getX(), 2) +
                    Math.pow(this.asteroids[i].getY() - this.bullets[s].getY(), 2);
          if(this.distanceSquared < Math.pow(this.asteroids[i].getRadius() + this.bullets[s].getRadius(), 2)){
            if(this.asteroids[i].getArea() >= 100){
              this.score.update();
              this.x = this.asteroids[i].getX();
              this.y = this.asteroids[i].getY();
              this.asteroids.push(new asteroid(this.x*75,this.y*75,asteroids[i].getRadius()*75,asteroids[i].getSpeedX()*2,asteroids[i].getSpeedY()/2));
              this.asteroids.push(new asteroid(this.x*25,this.y*25,asteroids[i].getRadius()*75,asteroids[i].getSpeedX()/2,asteroids[i].getSpeedY()*2));
              this.asteroids.splice(i, 1);
              this.bullets.splice(s, 1);
            }
            else{
              this.score.update();
              this.asteroids.splice(i, 1);
              this.bullets.splice(s, 1);
            }
          }
        }
      }
    }//end of bullet to asteroid collision

    //asteroid to ship collision 
    for(var h = 0; h < this.asteroids.length; h++){
      this.ast = this.asteroids[h];
      this.distSquared =
                    Math.pow(this.ast.getX() - this.ship.getX(), 2) +
                    Math.pow(this.ast.getY() - this.ship.getY(), 2);
      if(this.distSquared < Math.pow(this.ast.getRadius()))
      {
        this.lives.update();
        this.ship.collid();
      }
    }

    //asteroid to asteroid collision
    if(asteroids.length > 0){
      for(var m = 0; m < this.asteroids.length-1; m++){
        for(var n = this.m+1; n < this.asteroids.length; n++){
          this.a1 = this.asteroids[m];
          this.a2 = this.asteroids[n];
          this.distanceSqu =
                    Math.pow(this.asteroids[m].getX() - this.asteroids[n].getX(), 2) +
                    Math.pow(this.asteroids[m].getY() - this.asteroids[n].getY(), 2);
          if(this.distanceSqu < Math.pow(this.asteroids[m].getRadius() + this.asteroids[n].getRadius(), 2))
          {
            var v1 = Math.sqrt(Math.pow(asteroids[m].getSpeedX(), 2)+Math.pow(asteroids[m].getSpeedY(), 2));
            var v2 = Math.sqrt(Math.pow(asteroids[n].getSpeedX(), 2)+Math.pow(asteroids[n].getSpeedY(), 2));

            var theta1 = Math.acos(asteroids[m].getSpeedX()/v1);
            var theta2 = Math.acos(asteroids[n].getSpeedX()/v2);

            var phi = Math.atan(Math.abs(asteroids[n].getY() - asteroids[m].getX()) / Math.abs(asteroids[n].getX() - asteroids[m].getX()));
    
            var x1 = (((v1 * Math.cos(theta1 - phi) * (asteroid1.mass - asteroid2.mass))+(2 * asteroid2.mass * v2 * Math.cos(theta2 - phi)))/(asteroid1.mass + asteroid2.mass)) * Math.cos(phi) + v1 * Math.sin(theta1 - phi) * Math.cos(phi + (Math.PI/2));
            var y1 = (((v1 * Math.cos(theta1 - phi) * (asteroid1.mass - asteroid2.mass))+(2 * asteroid2.mass * v2 * Math.cos(theta2 - phi)))/(asteroid1.mass + asteroid2.mass)) * Math.sin(phi) + v1 * Math.sin(theta1 - phi) * Math.sin(phi + (Math.PI/2));
    
            var x2 = (((v2 * Math.cos(theta2 - phi) * (asteroid2.mass - asteroid1.mass))+(2 * asteroid1.mass * v1 * Math.cos(theta1 - phi)))/(asteroid2.mass + asteroid1.mass)) * Math.cos(phi) + v2 * Math.sin(theta2 - phi) * Math.cos(phi + (Math.PI/2));
            var y2 = (((v2 * Math.cos(theta2 - phi) * (asteroid2.mass - asteroid1.mass))+(2 * asteroid1.mass * v1 * Math.cos(theta1 - phi)))/(asteroid2.mass + asteroid1.mass)) * Math.sin(phi) + v2 * Math.sin(theta2 - phi) * Math.sin(phi + (Math.PI/2));
        
            asteroids[m].setPos(x1,y1);
            asteroids[n].setPos(x2,y2);
          }
        }
      }
    }
  }

  render() {
    this.backBufferContext.fillStyle = '#000';
    this.backBufferContext.fillRect(0, 0, 960, 640);
    this.score.render(this.backBufferContext);
    this.lives.render(this.backBufferContext);
    this.ship.render(this.backBufferContext);
    if(this.bullets.length > 0){
      for(this.k = 0; this.k < this.bullets.length; this.k++){
        this.bullets[this.k].render(this.backBufferContext);
      }
    }
    if(this.asteroids.length > 0){
      for(this.i = 0; this.i < this.asteroids.length; this.i++){
        this.asteroids[this.i].render(this.backBufferContext);
      }
    }
    this.screenBufferContext.drawImage(this.backBufferCanvas,0,0);
  }

  loop() {
    this.update();
    this.render();
  }
}

function getRandomPosition(max, min){
  return Math.floor(Math.random() * (max - min + 1) + min);
}