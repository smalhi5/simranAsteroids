// game.js

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

  /** @function gameOver
    * Displays a game over message using the DOM
  */

  gameOver() {
    var message = document.getElementById("message");
    message.innerText = "Game Over";
    this.over = true;
  }

  /** @method handleKeyDown
    * register when a key is pressed and change
    * our input object.
    */
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
  /** @method update
    * Updates the game world.
    */
  update() {

    this.ship.update(this.input, false, false);

    if(this.asteroids.length > 0){
      for(this.l = 0; this.l < this.asteroids.length; this.l++){
        this.asteroids[this.l].update(false);
      }
    }

    if(this.bullets.length > 0){
      for(this.k = 0; this.k < this.bullets.length; this.k++){
        this.bullets[this.k].update();
      }
    }

    if(this.bullets.length > 0){
      for(this.d = 0; this.d < this.bullets.length; this.d++){
        if(this.bullets[this.d].getX() > 970){
          this.bullets.splice(this.d,1);
        }
      }
    }

    //checking bullet to asteroid collision
    for( this.i = 0; this.i < this.asteroids.length; this.i++){
      if(this.bullets.length > 0){
        for(this.s = 0; this.s < this.bullets.length; this.s++){
          this.distanceSquared =
                    Math.pow(this.asteroids[this.i].getX() - this.bullets[this.s].getX(), 2) +
                    Math.pow(this.asteroids[this.i].getY() - this.bullets[this.s].getY(), 2);
          if(this.distanceSquared < Math.pow(this.asteroids[this.i].getRadius() + this.bullets[this.s].getRadius(), 2)){
            if(this.asteroids[this.i].getRadius() == 20){
              this.score.update();
              this.x = this.asteroids[this.i].getX();
              this.y = this.asteroids[this.i].getY();
              this.asteroids.push(new asteroid(this.x,this.y,15,7,7));
              this.asteroids.push(new asteroid(this.x,this.y,15,7,-7));
              this.asteroids.splice(this.i, 1);
              this.bullets.splice(this.s, 1);
            }
            if(this.asteroids[this.i].getRadius() == 15){
              this.score.update();
              this.x = this.asteroids[this.i].getX();
              this.y = this.asteroids[this.i].getY();
              this.asteroids.push(new asteroid(this.x,this.y,10,10,10));
              this.asteroids.push(new asteroid(this.x,this.y,10,10,-10));
              this.asteroids.splice(this.i, 1);
              this.bullets.splice(this.s, 1);
            }
            if(this.asteroids[this.i].getRadius() == 10){
              this.score.update();
              this.asteroids.splice(this.i, 1);
              this.bullets.splice(this.s, 1);
            }
          }
        }
      }
    }//end of bullet to asteroid collision

    //asteroid to ship collision 
    for(this.h = 0; this.h < this.asteroids.length; this.h++){
      this.ast = this.asteroids[this.h];
      /*
      this.rx = Math.clamp(this.ast.getX(), this.ship.getX(), this.ship.getX() + 25);
      this.ry = Math.clamp(this.ast.getY(), this.ship.getY(), this.ship.getY() + 10);
      this.distSquared =
          Math.pow(this.rx - this.ast.getX(), 2) +
          Math.pow(this.ry - this.ast.getY(), 2);
      if(this.distSquared < Math.pow(this.ast.getRadius(), 2))
      */
      this.distSquared =
                    Math.pow(this.ast.getX() - this.ship.getX(), 2) +
                    Math.pow(this.ast.getY() - this.ship.getY(), 2);
      if(this.distSquared < Math.pow(this.ast.getRadius()))
      {
        this.lives.update();
        this.ship.update(this.input, false, true);
      }
    }

    //asteroid to asteroid collision
    for(this.m = 0; this.m < this.asteroids.length-1; this.m++){
      for(this.n = this.m+1; this.n < this.asteroids.length; this.n++){
        this.a1 = this.asteroids[this.m];
        this.a2 = this.asteroids[this.n];
        this.distanceSqu =
                    Math.pow(this.asteroids[this.m].getX() - this.asteroids[this.n].getX(), 2) +
                    Math.pow(this.asteroids[this.m].getY() - this.asteroids[this.n].getY(), 2);
        if(this.distanceSqu < Math.pow(this.asteroids[this.m].getRadius() + this.asteroids[this.n].getRadius(), 2)){
          this.asteroids[this.m].update(true);
          this.asteroids[this.n].update(true);
        }
      }
    }
    
  }

  /** @method render
    * Renders the game world
    */

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