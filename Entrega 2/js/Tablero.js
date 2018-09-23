// funciones : - getValor(x,y) return matrix[x][y]
//             - setValor(x,y) cargarLOgicament el valor
//             - mostrar el tablero. dibujar grilla /
               //- matrix en vACIO
let columnas = 7;
let filas = 6;

function Tablero(){
  this.Matrix = new Array(columnas);
  for (let i = 0; i < this.Matrix.length; i++) {
    this.Matrix[i] = new Array(filas);
    for (let j = 0; j < this.Matrix[i].length; j++) {
      this.Matrix[i][j] = 0;
    }
  }
}

Tablero.prototype.setColum =  function (col){
    for (let i = 0; i < this.Matrix[col].length; i++) {
    this.Matrix[col][i] = 1;
  }
}
Tablero.prototype.setFil = function (fil) {
  for (let i = 0; i < this.Matrix.length; i++) {
    this.Matrix[i][fil] = 1;
  }
};
// Tablero.prototype.cargarTablero = function (x, y, ctx, casillero, offsX, offsY){
Tablero.prototype.cargarTablero = function (x, y, ctx, casillero, offsets){
  // let ficha = new Ficha ((x * casillero) + offsX, (y * casillero) + offsY, "#000000", casillero);
  let ficha = new Ficha ((x * casillero) + offsets["x"], (y * casillero) + offsets["y"], "#000000", casillero);
  if (this.Matrix[x][y] == 1) {
    ficha.setColor("#00FF55");
    ficha.circulodib(ctx);
  }
  else if (this.Matrix[x][y] == 2){
    ficha.setColor("#0088FF");
    ficha.circulodib(ctx);
  }
  else {
      ficha.setColor("#FFFFFF")
      ficha.circulodib(ctx);
  }
}
Tablero.prototype.dibujarGrilla = function() {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext('2d');
    let casillero = Math.floor(((1/2) * canvas.height)/7);
    let offsets = [];
    offsets["x"] = (1/4) * canvas.height;
    offsets["y"] = (1/2) * canvas.width;
    // let offsY = (1/2) * canvas.height;
    // let offsX = (1/4) * canvas.width;
    for (x = 0; x <= columnas; x++){
        for (y = 0; y <= filas; y++) {
            // ctx.moveTo((x * casillero) + offsX, offsY);
            ctx.moveTo((x * casillero) + offsets["x"], offsets["y"]);
            // ctx.lineTo((x * casillero) + offsX, (filas * casillero) + offsY);
            ctx.lineTo((x * casillero) + offsets["x"], (filas * casillero) + offsets["y"]);
            ctx.stroke();
            // ctx.moveTo(offsX, (y * casillero) + offsY);
            ctx.moveTo(offsets["x"], (y * casillero) + offsets["y"]);
            // ctx.lineTo((columnas * casillero) + offsX, (y * casillero) + offsY);
            ctx.lineTo((columnas * casillero) + offsets["x"], (y * casillero) + offsets["y"]);
            ctx.stroke();
            if ((x < columnas) && (y < filas)){
              // this.cargarTablero(x, y, ctx, casillero, offsX, offsY);
              this.cargarTablero(x, y, ctx, casillero, offsets);
            }
        }
    }
};

Tablero.prototype.setValor = function (x,y,valor){
if ((x < columnas) && (y < filas)) {
    this.Matrix[x][y] = valor;
  }
  else {
    console.log ("No anda");
  }
};

Tablero.prototype.getValor = function (x){
   for (y = filas-1; y < this.Matrix[x].length; y--) {
    if (this.Matrix[x][y] == 0){
      return y;
      }
    }
  };

Tablero.prototype.verificarVictoria = function(jugador){
  for (x = 0; x < this.Matrix.length; x++) {
    for (i = 0; i < this.Matrix[x].length; i++) {
      if ((this.Matrix[i][x] == jugador) && (i-3 < this.Matrix.length) ){ //
          if ((this.Matrix[i+1][x] == jugador) && (this.Matrix[i+2][x] == jugador) && (this.Matrix[i+3][x] == jugador)) {
            return true;
          }
      }
    }
  }
  for (x = 0; x < this.Matrix.length; x++) {
    for (i = 0; i < this.Matrix[x].length; i++) {
      if ((this.Matrix[x][i] == jugador) && (i+3 < this.Matrix[x].length)){
        if ((this.Matrix[x][i+1] == jugador) && (this.Matrix[x][i+2] == jugador) && (this.Matrix[x][i+3] == jugador)){
          return true;
        }
      }
    }
  }
  return false;
}
