let juego = new Juego();

document.getElementById("start").addEventListener("click", function(){
    juego.start_game();
});

document.addEventListener("keydown", function (e) {
    if (juego.start) {
        juego.keys[e.keyCode] = true;
    }
});

document.addEventListener("keyup", function (e) {
    if (juego.start) {
        juego.keys[e.keyCode] = false;
    }
});