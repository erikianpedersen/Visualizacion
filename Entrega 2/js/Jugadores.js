function Jugador(CantF, NumJ, Name){
  this.fichas = CantF;
  this.numero = NumJ;
  this.nombre = Name;
}

Jugador.prototype.jugar = function (){
  if (this.fichas > 0){
    this.fichas -= 1;
    return true;
  }
  return false;
};
