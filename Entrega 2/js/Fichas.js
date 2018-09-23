function Ficha (paramPosX, paramPosY, paramColor, paramDiametro){
  this.PosX = paramPosX;
  this.PosY = paramPosY;
  this.color = paramColor;
  this.radio = (paramDiametro / 2);
}
Ficha.prototype.setColor = function(color){
  this.color = color;
}
Ficha.prototype.circulodib = function (ctx){
  ctx.fillStyle = this.color;
  ctx.beginPath();
  M = Math.floor ((Math.sqrt(((this.radio * 2) * (this.radio * 2)) + ((this.radio * 2) * (this.radio * 2))))/2) - 12;
  ctx.arc(M + this.PosX, M+ this.PosY, (this.radio / 1.25), 0, Math.PI *2);
  ctx.fill();
  ctx.closePath();
  ctx.stroke();
}

// isClicked(mouseX,mouseY){
//         let x = mouseX - this.posX;
//         let y = mouseY - this.posY;
//         return Math.sqrt(x*x + y*y) < this.radio ? true : false;
//     }
