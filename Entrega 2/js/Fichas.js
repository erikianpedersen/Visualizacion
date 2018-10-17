function Ficha (paramPosX, paramPosY, paramColor, paramDiametro, numJ, imagenURL){
  this.PosX = paramPosX;
  this.PosY = paramPosY;
  this.color = paramColor;
  this.jugador = numJ;
  this.radio = (paramDiametro / 2);
  this.imagen = new Image();
  this.imagen.src = imagenURL;  
  this.clicked = false;
}
Ficha.prototype.setColor = function(color){
  this.color = color;
}
Ficha.prototype.setImagen = function(img){
	this.imagen.src = img;
}

Ficha.prototype.dibujarCirculo = function (ctx){
  ctx.fillStyle = this.color;
  ctx.beginPath();
  M = Math.floor ((Math.sqrt(((this.radio * 2) * (this.radio * 2)) + ((this.radio * 2) * (this.radio * 2))))/2) - 12;
  ctx.arc(M + this.PosX, M+ this.PosY, (this.radio / 1.2), 0, Math.PI *2);
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
  ctx.drawImage(this.imagen,this.PosX,this.PosY);
}

Ficha.prototype.dibujarCirculo2 = function (ctx,x,y){
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.arc(x,y,this.radio, 0, Math.PI *2);
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
  if(this.imagen.src != ""){
	ctx.drawImage(this.imagen, x-30, y-30);
  }
  
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
Ficha.prototype.moverCursor = function(x,y,ctx,tablero){
  if (this.clicked){
    this.borrar(x,y,ctx);
    tablero.dibujarTodo();
    this.dibujarCirculo2(ctx,x,y);
  }
}

Ficha.prototype.levantarCursor = function(x,y){
    this.PosX=x-this.radio;
    this.PosY=y-this.radio;
    this.clicked = false;
    this.borrar(x,y,ctx);
    return this;
}
