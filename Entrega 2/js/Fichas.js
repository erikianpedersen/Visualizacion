function Ficha (paramPosX, paramPosY, paramColor, paramDiametro, numJ){
  this.PosX = paramPosX;
  this.PosY = paramPosY;
  this.color = paramColor;
  this.jugador = numJ;
  this.radio = (paramDiametro / 2);
  this.clicked = false;
}
Ficha.prototype.setColor = function(color){
  this.color = color;
}
Ficha.prototype.circulodib = function (ctx){
  ctx.fillStyle = this.color;
  ctx.beginPath();
  M = Math.floor ((Math.sqrt(((this.radio * 2) * (this.radio * 2)) + ((this.radio * 2) * (this.radio * 2))))/2) - 12;
  ctx.arc(M + this.PosX, M+ this.PosY, (this.radio / 1.2), 0, Math.PI *2);
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
}

Ficha.prototype.circulodib2 = function (ctx,x,y){
    ctx.fillStyle = this.color;
  ctx.beginPath();
//  M = Math.floor ((Math.sqrt(((70)*(70)) + ((70)*(70))))/2);
  ctx.arc(x,y,this.radio, 0, Math.PI *2);
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
}

Ficha.prototype.isClicked = function(x,y){
  let hipotenusa = Math.floor(Math.sqrt(((x - (this.PosX+this.radio)) * (x - (this.PosX+this.radio))) + ((y - (this.PosY+this.radio)) * (y - (this.PosY+this.radio)))));
  if ((hipotenusa) <= (this.radio)){
    this.clicked = true;
  } else {
    this.clicked = false;
  }
  return this.clicked;
}
Ficha.prototype.borrar = function(x,y,ctx){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
Ficha.prototype.mueveRaton = function(x,y,ctx,tablero){
  if (this.clicked){
    this.borrar(x,y,ctx);
    tablero.dibujarTodo();
    this.circulodib2(ctx,x,y);
  }
}

Ficha.prototype.levantaRaton = function(x,y){
    this.PosX=x-this.radio;
    this.PosY=y-this.radio;
    this.clicked = false;
    this.borrar(x,y,ctx);
    return this;
}
