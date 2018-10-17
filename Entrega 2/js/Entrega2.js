

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');

let offsets = [];
offsets["x"] = 20;
offsets["y"] = (2/3) * canvas.height;
offsets["x2"] = (5/6) * canvas.width - 80;

let jugador1 = new Jugador(21, 1, "Jugador 1",  offsets, "#00FF55");
let jugador2 = new Jugador(21, 2, "Jugador 2", offsets, "#0088FF");

let tablero = new Tablero(jugador1, jugador2);

ctx.clearRect(0, 0, canvas.width, canvas.height);
tablero.dibujarTodo();

canvas.addEventListener("mousedown", function(event){
    let x = event.layerX - event.currentTarget.offsetLeft;
    let y = event.layerY - event.currentTarget.offsetTop;
    tablero.dragFicha(x,y);
});
canvas.addEventListener('mousemove',function(event){
  let x = event.layerX - event.currentTarget.offsetLeft;
  let y = event.layerY - event.currentTarget.offsetTop;
  if(tablero.jugadorActivo.fichaEnJuego != false){
    tablero.jugadorActivo.fichaEnJuego.moverCursor(x,y,ctx,tablero);
  }
});
canvas.addEventListener('mouseup', function(event){
  let x = event.layerX - event.currentTarget.offsetLeft;
  let y = event.layerY - event.currentTarget.offsetTop;
  if(tablero.jugadorActivo.fichaEnJuego != false){
    tablero.soltarFicha(x,y,ctx);
  }
});

document.getElementById("reset").addEventListener("click", function(){
	jugador1 = new Jugador(21, 1, "Jugador 1",  offsets, "#00FF55");
	jugador2 = new Jugador(21, 2, "Jugador 2", offsets, "#0088FF");
	tablero = new Tablero(jugador1, jugador2);	
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	tablero.dibujarTodo();
});
