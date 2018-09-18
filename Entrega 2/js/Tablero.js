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
    for (let z = 0; z < this.Matrix[i].length; z++) {
      this.Matrix[i][z] = 0;
    }
  }
}

Tablero.prototype.setColum =  function (col){
    for (let i = 0; i < this.Matrix[col].length; i++) {
    //pinto una columna
    this.Matrix[col][i] = 1;
  }
}
Tablero.prototype.setFil = function (fil) {
  for (let i = 0; i < this.Matrix.length; i++) {
    //pinto una fila
    this.Matrix[i][fil] = 1;
  }
};
Tablero.prototype.cargarTablero = function (x,y,ctx){
  let ficha = new Ficha (x,y,"#000000");
  if (this.Matrix[x/100][y/100] == 1) {
    ficha.setColor("#FF0000");
    ficha.circulodib(ctx);
  }
  else if (this.Matrix[x/100][y/100] == 2){
    ficha.setColor("#FFFF00");
    ficha.circulodib(ctx);
  }
  else {
      ficha.setColor("#FFFFFF")
      ficha.circulodib(ctx);
  }
}
Tablero.prototype.dibujarGrilla = function(w, h, id) {
    let canvas = document.getElementById(id);
    let ctx = canvas.getContext('2d');
    ctx.canvas.width  = w;
    ctx.canvas.height = h;
    for (x=0;x<w;x+=100) {
        for (y=0;y<h;y+=100) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, h);
            ctx.stroke();
            ctx.moveTo(0, y);
            ctx.lineTo(w, y);
            ctx.stroke();
            this.cargarTablero(x,y,ctx);
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

Tablero.prototype.verificarVictoria = function(jugador){ //El valor del jugador 1, 2
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
