export default class Lives 
{
  constructor() 
  {
    this.lives = 3;
  }

  update() 
  {
    this.lives = this.lives - 1;
  }

  render(ctx) {

    ctx.font = "25px Arial";
    ctx.fillStyle = "#00FF00";
    ctx.fillText("Lives: " + this.lives, 865, 30);
  }
}