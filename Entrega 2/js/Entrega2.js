let tablero = new Tablero();

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');
// var offsX = 20;
// let offsY = (2/3)*canvas.height;
let offsets = [];
offsets["x"] = 20;
offsets["y"] = (2/3) * canvas.width;

// let jugador1 = new Jugador(21, 1, "Juan", offsY, offsX);
let jugador1 = new Jugador(21, 1, "Juan",  offsets["y"], offsets["x"]);
// let jugador2 = new Jugador(21, 2, "Pedro", offsY, (5/6)*canvas.width);
let jugador2 = new Jugador(21, 2, "Pedro", offsets["y"], (5/6)*canvas.width);

if (jugador1.jugar()){
  tablero.setValor(0,tablero.getValor(0), (jugador1.numero));
  tablero.setValor(0,tablero.getValor(0), (jugador1.numero));
  tablero.setValor(0,tablero.getValor(0), (jugador1.numero));
  tablero.setValor(0,tablero.getValor(0), (jugador1.numero));
};

if (jugador2.jugar()){
  tablero.setValor(0,tablero.getValor(0), (jugador2.numero))
};

if (tablero.verificarVictoria(2)){
  console.log("Ganó " + jugador2.nombre);
};
if (tablero.verificarVictoria(1)){
  console.log("Ganó " + jugador1.nombre);
};
tablero.dibujarGrilla();
