function Enemigo(count) {
    this.tag = '<div id="enemigo' + count + '" class="enemigo"></div>';
    this.w = 100;
    this.h = 94;
    this.id = "enemigo" + count;
}

Enemigo.prototype.crearEnemigo = function (x, y) {
    document.getElementById("game").innerHTML += this.tag;
    this.setPos(x, y);
}

Enemigo.prototype.setPos = function (x, y) {
    let estilo = document.getElementById(this.id).style;
    estilo.left = x;
    estilo.bottom = y;
}

Enemigo.prototype.setAnimation = function () {
    let obj = document.getElementById(this.id);
    obj.classList.add("animacion-enemigo");
}