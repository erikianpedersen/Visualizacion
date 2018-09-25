

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
// if (tablero.verificarVictoria(2)){
//   // console.log("Ganó " + jugador2.nombre);
// };
// tablero.dibujarGrilla();
// if (tablero.verificarVictoria(1)){
//   // console.log("Ganó " + jugador1.nombre);
// };

canvas.addEventListener("mousedown", function(event){
    let x = event.layerX - event.currentTarget.offsetLeft;
    let y = event.layerY - event.currentTarget.offsetTop;
    tablero.dragFicha(x,y);
});
canvas.addEventListener('mousemove',function(event){
  let x = event.layerX - event.currentTarget.offsetLeft;
  let y = event.layerY - event.currentTarget.offsetTop;
  if(tablero.jugadorActivo.fichaEnJuego != false){
    tablero.jugadorActivo.fichaEnJuego.mueveRaton(x,y,ctx,tablero);
  }
});
canvas.addEventListener('mouseup', function(event){
  let x = event.layerX - event.currentTarget.offsetLeft;
  let y = event.layerY - event.currentTarget.offsetTop;
  if(tablero.jugadorActivo.fichaEnJuego != false){
    tablero.soltarFicha(x,y,ctx);
  }
});












//--------------- TEST -------------------
//-------------- CROSS ------------------
// canvas.addEventListener("mouseup", mouseup, false);
//
// function drawX(x, y) {
//     ctx.beginPath();
//     ctx.moveTo(x, y - 60);
//     ctx.lineTo(x, y + 60);
//     ctx.stroke();
//
//     ctx.moveTo(x + 60, y);
//     ctx.lineTo(x - 60, y);
//     ctx.stroke();
//     ctx.closePath();
// }
//
// function mouseup(e){
//     let mouseX = e.layerX - canvas.offsetLeft;
//     let mouseY = e.layerY - canvas.offsetTop;
//     drawX(mouseX, mouseY);
//     console.log(mouseX, mouseY)
// }
