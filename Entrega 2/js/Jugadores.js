function Jugador(cantF, numJ, nombre, offsets, color){
  this.fichas = new Array(21);
  this.numero = numJ;
  this.nombre = nombre;
  this.color = color;
  this.dibujarFichasJugador(offsets);
}

Jugador.prototype.dibujarFichasJugador = function (){
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext('2d');
  if (this.numero > 1){
    offsetX = offsets["x2"];
  } else {
    offsetX = offsets["x"];
  }
  for (i = 0; i < this.fichas.length; i++) {
    if (i < 7) {
      this.fichas[i] = new Ficha (offsetX, (offsets["y"] + i * 30), this.color, 30);
      this.fichas[i].circulodib(ctx);
    }
    else if (i < 14) {
      this.fichas[i] = new Ficha (offsetX + 35, (offsets["y"] + (i - 7)*30), this.color, 30);
      this.fichas[i].circulodib(ctx);
    } else {
      this.fichas[i] = new Ficha (offsetX + 70, (offsets["y"] + (i - 14)*30), this.color, 30);
      this.fichas[i].circulodib(ctx);
    }
  }
}

Jugador.prototype.jugar = function (){
  if (this.fichas.length > 0){
  let indice = this.fichas.length;
  this.fichas.splice(this.fichas[indice], 1);
  this.dibujarFichasJugador(offsets);
  return true;
  }
  return false;
};
