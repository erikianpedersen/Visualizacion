let tablero = new Tablero();

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');

let offsets = [];
offsets["x"] = 20;
offsets["y"] = (2/3) * canvas.height;
offsets["x2"] = (5/6) * canvas.width;

let jugador1 = new Jugador(21, 1, "Juan",  offsets, "#00FF55");
let jugador2 = new Jugador(21, 2, "Pedro", offsets, "#0088FF");

ctx.clearRect(0, 0, canvas.width, canvas.height);

if (jugador1.jugar(offsets)){
  tablero.setValor(0,tablero.getValor(0), (jugador1.numero));
};

if (jugador1.jugar(offsets)){
  tablero.setValor(0,tablero.getValor(0), (jugador1.numero));
};

if (jugador1.jugar(offsets)){
  tablero.setValor(0,tablero.getValor(0), (jugador1.numero));
};

if (jugador1.jugar(offsets)){
  tablero.setValor(0,tablero.getValor(0), (jugador1.numero));
};

if (jugador2.jugar(offsets)){
  tablero.setValor(0,tablero.getValor(0), (jugador2.numero))
};

if (jugador2.jugar(offsets)){
  tablero.setValor(1,tablero.getValor(1), (jugador2.numero))
};

if (jugador2.jugar(offsets)){
  tablero.setValor(1,tablero.getValor(1), (jugador2.numero))
};

if (jugador2.jugar(offsets)){
  tablero.setValor(1,tablero.getValor(1), (jugador2.numero))
};

if (jugador2.jugar(offsets)){
  tablero.setValor(1,tablero.getValor(1), (jugador2.numero))
};

if (jugador2.jugar(offsets)){
  tablero.setValor(1,tablero.getValor(1), (jugador2.numero))
};

if (jugador2.jugar(offsets)){
  tablero.setValor(1,tablero.getValor(1), (jugador2.numero))
};

ctx.clearRect(0, 0, canvas.width, canvas.height);
tablero.dibujarGrilla();
jugador1.dibujarFichasJugador(offsets);
jugador2.dibujarFichasJugador(offsets);
if (tablero.verificarVictoria(2)){
  console.log("Ganó " + jugador2.nombre);
};
tablero.dibujarGrilla();
if (tablero.verificarVictoria(1)){
  console.log("Ganó " + jugador1.nombre);
};
