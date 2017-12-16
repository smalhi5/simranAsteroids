export default class Asteroid{

  constructor(screenWidth, screenHeight,radius,speedX, speedY){

    this.x = screenWidth;
    this.y = screenHeight;
    this.radius = radius;
    this.speedX = speedX;
    this.speedY = speedY;
  }

  update(){

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

  getArea(){
    return Math.pow(this.radius,2)*Math.PI;
  }

  setPos(x,y){
    this.x = x;
    this.y = y;
  }
  
  render(ctx) {
    ctx.strokeStyle = "#0f0";
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.radius,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();  
  }
}