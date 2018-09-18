function Ficha (paramPosX, paramPosY, paramColor){
  this.PosX = paramPosX;
  this.PosY = paramPosY;
  this.color = paramColor;
}
Ficha.prototype.setColor = function(color){
  this.color=color;
}
Ficha.prototype.circulodib = function (ctx){
  ctx.fillStyle = this.color;
  ctx.beginPath();
  M = Math.floor ((Math.sqrt(((70)*(70)) + ((70)*(70))))/2);
  ctx.arc(M+this.PosX,M+this.PosY,40, 0, Math.PI *2);
  ctx.fill();
  ctx.closePath();
  ctx.stroke();
}

isClicked(mouseX,mouseY){ para clickear las fichas y saber de quien son
        let x = mouseX - this.posX;
        let y = mouseY - this.posY;
        return Math.sqrt(x*x + y*y) < this.radio ? true : false;
    }
