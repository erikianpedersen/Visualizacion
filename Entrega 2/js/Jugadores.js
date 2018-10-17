function Jugador(cantF, numJ, nombre, offsets, color){
  this.fichas = new Array(21);
  this.numero = numJ;
  this.nombre = nombre;
  this.color = color;
  this.offsets = offsets;
  this.fichaEnJuego = false;
}

Jugador.prototype.dibujarFichasJugador = function (){
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext('2d');
  let imagenURL = "images/";
  if (this.numero > 1){
    offsetX = this.offsets["x2"];
	imagenURL += "azul.png";
  } else {
    offsetX = this.offsets["x"];
	imagenURL += "verde.png";
  }
  
  for (i = 0; i < this.fichas.length; i++) {
    if (i < 7) {
      this.fichas[i] = new Ficha (offsetX, (this.offsets["y"] + (i -4) * 60), this.color, 60, this.numero, imagenURL);
    }
    else if (i < 14) {
      this.fichas[i] = new Ficha (offsetX + 60, (this.offsets["y"] + (i - 11)*60), this.color, 60, this.numero, imagenURL);
    } else {
      this.fichas[i] = new Ficha (offsetX + 120, (this.offsets["y"] + (i - 18)*60), this.color, 60, this.numero, imagenURL);
    }
    this.fichas[i].dibujarCirculo(ctx);
  }
}

Jugador.prototype.jugar = function (){
  if (this.fichas.length > 0){
  let indice = this.fichas.length;
  this.fichas.splice(this.fichas[indice], 1);
  this.dibujarFichasJugador();
  return true;
  }
  return false;
};
