export default class Score 
{
  constructor() 
  {
    this.score = 0;
  }

  update() 
  {
    this.score = this.score + 1;
  }

  render(ctx) {

    ctx.font = "25px Arial";
    ctx.fillStyle = "#00FF00";
    ctx.fillText("Score: " + this.score, 20, 30);
  }
}