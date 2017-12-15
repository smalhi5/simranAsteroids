export default class Asteroid{

  constructor(screenWidth, screenHeight,radius,speedX, speedY){

    this.x = screenWidth;
    this.y = screenHeight;
    this.radius = radius;
    this.speedX = speedX;
    this.speedY = speedY;

    /*
    var dist = Math.random() * 10;
    this.path = [{x: x, y: y}];

    function clampHeight(y) {
      do {
        var newHeight = y;
        // Calculate a random height
        var probability = Math.random();
        if(probability < 0.30) { // 30% chance
          newHeight -= Math.random() * 50;
        }
        else if (probability < 0.60) { // 30% chance
          newHeight += Math.random() * 50;
        }
      } while(newHeight < screenHeight/2 || newHeight > screenHeight-10);
      return newHeight;
    }

    while (x < screenWidth) {
      // Move x by a random distance
      x = x + Math.random() * 15;
      // Set y to a new randomized clamped value
      y = clampHeight(y);
      // Push endpoint to our array
      this.path.push({x: x, y: y});
    }
    */

  }

  update(collid){

    this.x-=this.speedX;
    this.y-=this.speedY;

    if(this.x < 0){
      this.x = 960;
    }
    if(this.x > 960){
      this.x = 0;
    }
    if(this.y < 0){
      this.y = 640;
    }
    if(this.y > 640){
      this.y = 0;
    }

    if(collid = true){
      if(this.radius == 20){
        if(this.speedY > 0){
          this.speedY = -4;
        }
        if(this.speedY < 0){
          this.speedY = 4;
        }
        if(this.speedY == 0){
          this.speedY = 4;
        }
      }
      if(this.radius == 15){
        if(this.speedY > 0){
          this.speedY = -7;
        }
        if(this.speedY < 0){
          this.speedY = 7;
        }
      }
      if(this.radius == 10){
        if(this.speedY > 0){
          this.speedY = -10;
        }
        if(this.speedY < 0){
          this.speedY = 10;
        }
      }
    }
  }

  getX(){
    return this.x
  }

  getY(){
    return this.y  
  }

  getRadius(){
    return this.radius;
  }

  getSpeedX(){
    return this.speedX;
  }

  getSpeedY(){
    return this.speedY;
  }

  render(ctx) {
    /*
    ctx.save();
    ctx.strokeStyle = "#fff";
    ctx.beginPath();
    ctx.moveTo(this.path[0].x, this.path[0].y);
    for(var i = 1; i < this.path.length; i++) {
      ctx.lineTo(this.path[i].x, this.path[i].y);
    }
    ctx.stroke();
    ctx.restore();
    */
    ctx.strokeStyle = "#0f0";
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.radius,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();  
  }
}