// function Jugador(cantF, numJ, nombre, offsY, offsX){
function Jugador(cantF, numJ, nombre, offsets){
  this.fichas = new Array(21);
  this.numero = numJ;
  this.nombre = nombre;
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext('2d');
  for (i = 0; i < this.fichas.length; i++) {
    if (i < 10) {
      // this.fichas[i] = new Ficha(offsX, (offsY + i * 30), "#00FF55", 30);
      this.fichas[i] = new Ficha (offsets["x"], (offsets["y"] + i * 30), "#00FF55", 30);
      this.fichas[i].circulodib(ctx);
    }
    else {
      // this.fichas[i] = new Ficha(offsX + 60, (offsY + (i - 11)*30), "#00FF55", 30);
      this.fichas[i] = new Ficha(offsets["x"] + 60, (offsets["y"] + (i - 11)*30), "#00FF55", 30);
      this.fichas[i].circulodib(ctx);
    }
  }
}

Jugador.prototype.jugar = function (){
  if (this.fichas.length > 0){
  let indice = this.fichas.length;
  this.fichas.splice(this.fichas[indice], 1);
    return true;
  }
  return false;
};
