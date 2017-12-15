export default class Bullet 
{
  constructor(locationx, locationy) 
  {
    this.x = locationx;
    this.y = locationy;
    this.radius = 5;
    this.speed = 10;
  }

  update() 
  {
    this.x+=this.speed
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

  render(ctx) {

    ctx.beginPath();
    ctx.arc(this.x+25,this.y+5,this.radius,0,2*Math.PI);
    ctx.fillStyle = "#FF0000";
    ctx.fillStroke = "#FFFFFF";
    ctx.Stroke = "10"
    ctx.fill();
    ctx.closePath();
  }
}