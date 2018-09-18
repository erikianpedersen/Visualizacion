function Circle (paramPosX, paramPosY, paramRadio, paramColor){
  this.PosX = paramPosX;
  this.PosY = paramPosY;
  this.radio = paramRadio;
  this.color = paramColor;
}

Circle.prototype.dibujar = function (ctx) {
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.arc(this.PosX,this.PosY,this.radio, 0, Math.PI *2);
  ctx.fill();
  ctx.closePath();
}
//----------------------------------------------------------------
var c = document.getElementById("canvas");
c.addEventListener("click",pintar)
var ctx = c.getContext("2d");

function setColor(){
  color = Math.floor(Math.random() * 6);
  if (color == 1){
    return "#000000";
  } if (color == 2) {
    return "#FF0000";
  } if (color == 3) {
    return "#00FF00";
  } if (color == 4) {
    return "#0000FF";
  } if (color == 5) {
    return "#F99B09";
  }
}

function pintar(){
  PosX = Math.floor(Math.random() * 500);
  PosY = Math.floor(Math.random() * 500);
  radio = Math.floor(Math.random() * 50);
  color = setColor();
  var Circle1 = new Circle (PosX, PosY, radio, color);
  Circle1.dibujar(ctx);
}
