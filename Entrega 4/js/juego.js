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
    this.intervals = [];
}

Juego.prototype.start_game = function () {
    this.reset_game();
    document.getElementById("game").classList.add("fondo");
    document.getElementById("score").innerHTML = 0;
    this.start = true;
    this.avatar.crearAvatar(this);
    this.leerMovimientos();
    this.crearEnemigos();
}

Juego.prototype.reset_game = function () {
    let avatar = document.getElementById("avatar");
    if (avatar) {
        avatar.remove();
    }

    for(let i = 0; i< this.intervals.length; i++){
        clearInterval(this.intervals[i]);
    }

    $(".enemigo").remove();
    document.getElementById("game").classList.remove("fondo");
    this.cant_enemigos = 0;
    this.keys = [];
    this.intervals = [];
    this.score = 0;
}

Juego.prototype.game_over = function () {
    this.avatar.explotar();
    this.start = false;
    setTimeout(() => {
        this.reset_game();
    }, 2000);
}

Juego.prototype.detectar_colision = function (enemigo) {
    if (this.start) {
        let posAvatar = this.avatar.getPos();
        let pos = enemigo.getBoundingClientRect();

        let posEnemigo = {
            top: pos.top,
            bottom: pos.bottom,
            left: pos.left,
            right: pos.right
        }

        let caso1 = posEnemigo.left < posAvatar.left && posAvatar.left < posEnemigo.right;
        let caso2 = posEnemigo.left < posAvatar.right && posAvatar.right < posEnemigo.right;
        let caso3 = posEnemigo.top < posAvatar.top && posAvatar.top < posEnemigo.bottom;
        let caso4 = posEnemigo.top < posAvatar.bottom && posAvatar.bottom < posEnemigo.bottom;

        if ((caso1 || caso2) && (caso3 || caso4)) {
            this.game_over();
        }
    }
}

Juego.prototype.crearEnemigos = function () {
    let interval_id2 = setInterval(() => {
        let enemigo = new Enemigo(this.cant_enemigos);
        this.cant_enemigos++;

        let pos = parseInt(Math.random() * (500 - 0) + 0);
        let posX = pos + "px";

        enemigo.crearEnemigo(posX, "700px");
        enemigo.setAnimation();

        let juego = this;

        document.getElementById(enemigo.id).addEventListener("animationstart", function () {
            let interval_id3 = setInterval(() => {
                if (!juego.start) {
                    this.remove();
                } else {
                    juego.detectar_colision(this);
                }
            }, 20);

            this.intervals.unshift(interval_id3);
        });

        document.getElementById(enemigo.id).addEventListener("animationend", function () {
            this.remove();
            if (juego.start) {
                juego.score += 100;
                document.getElementById("score").innerHTML = juego.score;
            }
        });
    }, 1000);

    this.intervals.unshift(interval_id2);
}

Juego.prototype.leerMovimientos = function () {
    let interval_id1 = setInterval(() => {
        if (this.start) {
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
        }
    }, 20);
    this.intervals.unshift(interval_id1);
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