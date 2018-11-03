function Avatar() {
    this.tag = '<div id="avatar" class="avatar"></div>';
    this.w = 47;
    this.h = 100;
}

Avatar.prototype.crearAvatar = function(juego){
    document.getElementById("game").innerHTML += this.tag;
    this.setPos("276px","20px");
}

Avatar.prototype.setPos = function (x, y) {
    let estilo = document.getElementById("avatar").style;
    estilo.left = x;
    estilo.bottom = y;
}

Avatar.prototype.getPos = function () {
    let pos = document.getElementById("avatar").getBoundingClientRect();
    let data = {
        top: pos.top,
        bottom: pos.bottom,
        left: pos.left,
        right: pos.right
    }
    return data;
}