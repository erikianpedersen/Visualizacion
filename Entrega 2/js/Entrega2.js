let tablero = new Tablero();
let jugador1 = new Jugador(21,1,"Juan");
let jugador2 = new Jugador(21,2,"Pedro");

if (jugador1.jugar()){
  tablero.setValor(0,tablero.getValor(0), (jugador1.numero));
  tablero.setValor(0,tablero.getValor(0), (jugador1.numero));
  tablero.setValor(0,tablero.getValor(0), (jugador1.numero));
  tablero.setValor(0,tablero.getValor(0), (jugador1.numero));
  console.log (jugador1.nombre);
};

if (jugador2.jugar()){
  tablero.setValor(0,tablero.getValor(0), (jugador2.numero))
  console.log (jugador2.nombre);
};

if (tablero.verificarVictoria(2)){
  console.log("Ganó " + jugador2.nombre);
};
if (tablero.verificarVictoria(1)){
  console.log("Ganó " + jugador1.nombre);
};
tablero.dibujarGrilla(700, 600, "canvas");
