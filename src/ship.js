export default class Ship 
{
  constructor(screenWidth, screenHeight) 
  {
    this.x = screenWidth / 2;
    this.y = screenWidth / 2;
    this.shipHeight = 10;
    this.shipWidth = 25;
  }

  update(input, gameOver, collid) 
  {

    switch(input.direction) 
    {
      case 'right':
        this.x+=7;
        break;
      case 'left':
        this.x-=7;
        break;
      case 'up':
        this.y-=7;
        break;
      case 'down':
        this.y+=7;
        break;
    }

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

    if(collid == true){
      this.x = 20;
      this.y = 320;
    }
  }

  render(ctx) 
  {
    ctx.beginPath();
    ctx.rect(this.x,this.y,this.shipWidth,this.shipHeight);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();  
  }

  getX(){
    return this.x
  }

  getY(){
    return this.y  
  }
}

