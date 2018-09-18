function Circulo (paramPosX, paramPosY, paramColor){
  this.PosX = paramPosX;
  this.PosY = paramPosY;
  this.color = paramColor;
  this.radio = 40;
}
Circulo.prototype.setColor = function(color){
  this.color=color;
}
Circulo.prototype.circulodib = function (ctx){
  ctx.fillStyle = this.color;
  ctx.beginPath();
//  M = Math.floor ((Math.sqrt(((70)*(70)) + ((70)*(70))))/2);
  ctx.arc(this.PosX,this.PosY,this.radio, 0, Math.PI *2);
  ctx.fill();
  ctx.closePath();
  ctx.stroke();
}

function isClicked(x,y){
  let hipotenusa = Math.floor(Math.sqrt(((x - circle.PosX) * (x - circle.PosX)) + ((y - circle.PosY) * (y - circle.PosY))));
  console.log (x,y);
  if ((hipotenusa) <= (circle.radio)){
    console.log ("No le erraste");
  } else {
    console.log("Le erraste");
  }
}

circle = new Circulo(100, 100, "#FF0000");

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.addEventListener("mousedown", function(event){
    let x = event.layerX - event.currentTarget.offsetLeft;
    let y = event.layerY - event.currentTarget.offsetTop;
    isClicked(x,y);
});

circle.circulodib(ctx);
