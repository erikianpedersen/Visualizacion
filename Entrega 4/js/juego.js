function Juego() {
    this.avatar = new Avatar();
    this.w = 600;
    this.h = 700;
    this.keyCodes = {
        left: 37,
        up: 38,
        right: 39,
        down: 40
    }
    this.keys = [];
    this.start = false;
    this.cant_enemigos = 0;
    this.score = 0;
}

Juego.prototype.start_game = function () {
    document.getElementById("game").classList.add("fondo");
    document.getElementById("score").innerHTML = 0;
    this.start = true;
    this.avatar.crearAvatar(this);
    this.leerMovimientos();
    this.crearEnemigos();
}


Juego.prototype.crearEnemigos = function () {
    setInterval(() => {
        let enemigo = new Enemigo(this.cant_enemigos);
        this.cant_enemigos++;

        let pos = parseInt(Math.random() * (500 - 0) + 0);
        let posX = pos + "px";

        enemigo.crearEnemigo(posX, "700px");
        enemigo.setAnimation();
    }, 1000);
}

Juego.prototype.leerMovimientos = function () {
    setInterval(() => {
        let avatar = document.getElementById("avatar").style;

        let posX = parseInt(avatar.left, 10);
        let posY = parseInt(avatar.bottom, 10);

        if (this.keys[this.keyCodes.left]) {
            this.moveTo("left", avatar, posX);
        } else if (this.keys[this.keyCodes.right]) {
            this.moveTo("right", avatar, posX);
        }

        if (this.keys[this.keyCodes.up]) {
            this.moveTo("up", avatar, posY);
        } else if (this.keys[this.keyCodes.down]) {
            this.moveTo("down", avatar, posY);
        }
    }, 20);
}

Juego.prototype.moveTo = function (direction, avatar, pos) {
    switch (direction) {
        case "left":
            if (pos > 5) {
                pos -= 8;
                avatar.left = pos + "px";
            }
            break;
        case "right":
            if (pos < this.w - this.avatar.w - 8) {
                pos += 8;
                avatar.left = pos + "px";
            }
            break;
        case "up":
            if (pos < this.h - this.avatar.h - 13) {
                pos += 8;
                avatar.bottom = pos + "px";
            }
            break;
        case "down":
            if (pos > 5) {
                pos -= 8;
                avatar.bottom = pos + "px";
            }
            break;
    }
}