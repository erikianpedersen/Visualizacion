function Tablero(jugador1, jugador2){
  this.columnas = 7;
  this.filas = 6;
  this.offsetX = (1/4) * canvas.width;
  this.offsetY = (1/2) * canvas.height;
  this.jugadorActivo = jugador1;
  this.jugador1 = jugador1;
  this.jugador2 = jugador2;
  this.Matrix = new Array(this.columnas);
  for (let i = 0; i < this.Matrix.length; i++) {
    this.Matrix[i] = new Array(this.filas);
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

Tablero.prototype.cargarTablero = function (x, y, ctx, casillero, offsets){
  let ficha = new Ficha ((x * casillero) + this.offsetX, (y * casillero) + this.offsetY, "#000000", casillero);
  if (this.Matrix[x][y] == 1) {
    ficha.setColor("#00FF55");
    ficha.dibujarCirculo(ctx);
  }
  else if (this.Matrix[x][y] == 2){
    ficha.setColor("#0088FF");
    ficha.dibujarCirculo(ctx);
  }
  else {
      ficha.setColor("#FFFFFF")
      ficha.dibujarCirculo(ctx);
  }
}
Tablero.prototype.dibujarGrilla = function() {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext('2d');
    let casillero = Math.floor(((1/2) * canvas.height)/7);

    for (x = 0; x <= this.columnas; x++){
        for (y = 0; y <= this.filas; y++) {
            ctx.moveTo((x * casillero) + this.offsetX, this.offsetY);
            ctx.lineTo((x * casillero) + this.offsetX, (this.filas * casillero) + this.offsetY);
            ctx.stroke();
            ctx.moveTo(this.offsetX, (y * casillero) + this.offsetY);
            ctx.lineTo((this.columnas * casillero) + this.offsetX, (y * casillero) + this.offsetY);
            ctx.stroke();
            if ((x < this.columnas) && (y < this.filas)){
              this.cargarTablero(x, y, ctx, casillero, offsets);
            }
        }
    }
};

Tablero.prototype.dragFicha = function(x,y){
  let arregloFichas = this.jugadorActivo.fichas;
  for (let i = 0; i < arregloFichas.length; i++) {
    let clicked = arregloFichas[i].isClicked(x,y);
    if(clicked){
      arregloFichas[i].clicked = true;
      this.jugadorActivo.fichaEnJuego = arregloFichas[i];
    }
  }
}

Tablero.prototype.soltarFicha = function(x,y,ctx){
  let ficha = this.jugadorActivo.fichaEnJuego.levantarCursor(x,y);
  this.obtenerColumna(ficha);
  this.jugadorActivo.fichaEnJuego = false;
}

Tablero.prototype.obtenerColumna = function(ficha){
  let columna = -1;
  let x = ficha.PosX+ficha.radio;
  let offsetMin = this.offsetX;
  let offsetMax = (this.offsetX+ficha.radio*2)+4;

  if(offsetMin < x && x < offsetMax){
    columna = 0;
  }else{
    offsetMin = offsetMax;
    offsetMax += (ficha.radio*2)+4;

    if (offsetMin < x && x < offsetMax) {
      columna = 1;
    }else{
      offsetMin = offsetMax;
      offsetMax += (ficha.radio*2)+4;
      if (offsetMin < x && x < offsetMax) {
        columna = 2;
      }else{
        offsetMin = offsetMax;
        offsetMax += (ficha.radio*2)+4;

        if (offsetMin < x && x < offsetMax) {
          columna = 3;
        }else{
          offsetMin = offsetMax;
          offsetMax += (ficha.radio*2)+4;

          if (offsetMin < x && x < offsetMax) {
            columna = 4;
          }else {
            offsetMin = offsetMax;
            offsetMax += (ficha.radio*2)+4;

            if (offsetMin < x && x < offsetMax) {
              columna = 5;
            }else {
              offsetMin = offsetMax;
              offsetMax += (ficha.radio*2)+4;

              if (offsetMin < x && x < offsetMax) {
                columna = 6;
              }
            }
          }
        }
      }
    }
  }

  let fila = this.getValor(columna);
  if(fila != -1){
    this.setValor(columna,fila, ficha.jugador);
  }else{
    this.dibujarTodo();
  }
}

Tablero.prototype.setValor = function (x, y, valor){
  if ((x != -1) && (x < this.columnas) && (y != -1) && (y < this.filas)) {
    this.Matrix[x][y] = valor;

    let hayGanador = this.verificarVictoria();
    if(hayGanador){
      document.getElementById('ganador').innerHTML = "El ganador es: "+this.jugadorActivo.nombre;
      this.resetearMatrix();
    }
    this.cambiarTurno();
  }else{
    this.jugadorActivo.fichaEnJuego = false;
  }
  this.dibujarTodo();
};

Tablero.prototype.getValor = function (x){
  if(x != -1){
    for (let y = this.filas-1; y >= 0; y--) {
      if (this.Matrix[x][y] == 0){
        return y;
      }
    }
  }
  return -1;
};

Tablero.prototype.cambiarTurno = function(){
  if(this.jugadorActivo.numero == 1){
    this.jugadorActivo = this.jugador2;
  }else{
    this.jugadorActivo = this.jugador1;
  }
}

Tablero.prototype.verificarVictoria = function(){
  for (x = 0; x < this.Matrix.length; x++) {
    for (i = 0; i < this.Matrix[x].length-2; i++) {
      if ((this.Matrix[i][x] == this.jugadorActivo.numero) && (i-3 < this.Matrix.length) ){ //
          if ((this.Matrix[i+1][x] == this.jugadorActivo.numero) && (this.Matrix[i+2][x] == this.jugadorActivo.numero) && (this.Matrix[i+3][x] == this.jugadorActivo.numero)) {
            return true;
          }
      }
    }
  }
  for (x = 0; x < this.Matrix.length; x++) {
    for (i = 0; i < this.Matrix[x].length-2; i++) {
      if ((this.Matrix[x][i] == this.jugadorActivo.numero) && (i+3 < this.Matrix[x].length)){
        if ((this.Matrix[x][i+1] == this.jugadorActivo.numero) && (this.Matrix[x][i+2] == this.jugadorActivo.numero) && (this.Matrix[x][i+3] == this.jugadorActivo.numero)){
          return true;
        }
      }
    }
  }
  for (x = 0; x < this.Matrix.length; x++) {
    for (i = 0; i < this.Matrix[x].length-2; i++) {
      if ((this.Matrix[x][i] == this.jugadorActivo.numero) && (i+3 < this.Matrix[x].length) && (x+3 < this.Matrix.length)){
        if ((this.Matrix[x+1][i+1] == this.jugadorActivo.numero) && (this.Matrix[x+2][i+2] == this.jugadorActivo.numero) && (this.Matrix[x+3][i+3] == this.jugadorActivo.numero)){
          return true;
        }
      }
    }
  }
  for (x = this.Matrix.length-1; x >=0; x--) {
    for (i = 0; i < this.Matrix[x].length-2; i++) {
      if ((this.Matrix[x][i] == this.jugadorActivo.numero) && (i+3 < this.Matrix[x].length) && (x-3 >= 0)){
        if ((this.Matrix[x-1][i+1] == this.jugadorActivo.numero) && (this.Matrix[x-2][i+2] == this.jugadorActivo.numero) && (this.Matrix[x-3][i+3] == this.jugadorActivo.numero)){
          return true;
        }
      }
    }
  }
  return false;
}

Tablero.prototype.resetearMatrix = function(){
  for (let i = 0; i < this.columnas; i++) {
    for (let j = 0; j < this.filas; j++) {
      this.Matrix[i][j] = 0;
    }
  }
}

Tablero.prototype.dibujarTodo = function(){
  this.dibujarGrilla();
  this.jugador1.dibujarFichasJugador();
  this.jugador2.dibujarFichasJugador();
}
