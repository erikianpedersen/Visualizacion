var color = "#000000";
var grosor = 10;
var pintar = false;

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var imageData = ctx.createImageData(500, 500);

document.getElementById("loadImg").addEventListener("click", loadImg);
document.getElementById("grises").addEventListener("click", grises);
document.getElementById("negativo").addEventListener("click", negativo);
document.getElementById("binarizacion").addEventListener("click", binarizacion);
document.getElementById("sepia").addEventListener("click", sepia);
document.getElementById("brillo").addEventListener("click", brillo);

canvas.addEventListener("mousedown", function(){
  pintar = true;
});

canvas.addEventListener("mouseup", function(){
  pintar = false;
});

canvas.addEventListener("mousemove", function(event){
  var x = event.clientX-5;
  var y = event.clientY-40;
  if (pintar){
    ctx.fillStyle = color;
    ctx.fillRect (x,y,grosor,grosor);
  }
});

var colores = document.getElementsByClassName("color");
for(i = 0; i < colores.length; i++){
  colores[i].addEventListener("click", function(){
    color = this.id;
  });
}

// function GetInputValue () {
//     var input = document.getElementById ("i_file");
//     var image = new Image ();
//     image.src = input.src;
//     console.log(input);
//     console.log(image.src);
//
//
//
//     image.onload = function(){
//       myDrawImageMethod(this);
//       var imageData = ctx.getImageData (0,0,image.width,image.height);
//       ctx.putImageData(imageData,0,0);
//       };
//
// }

function myDrawImageMethod(image){
  ctx.drawImage(image,0,0);
}

var nuevo = document.getElementById("limpiar");
nuevo.addEventListener("click", function(){
  var ctx = document.getElementById("canvas").getContext("2d");
  var imageData = ctx.createImageData(500, 500);
    for (x = 0; x < 500; x++){
      for (y = 0; y < 500; y++){
        setPixel(imageData, x, y, 255, 255, 255, 255);
      }
    }
  ctx.putImageData(imageData, 0, 0);
});

function setPixel(imageData, x, y, r, g, b, a){
  index = (x + y * imageData.width) * 4;
  imageData.data[index+0] = r;
  imageData.data[index+1] = g;
  imageData.data[index+2] = b;
  imageData.data[index+3] = a;
}

var guardarImagen = document.getElementById("guardar")
guardarImagen.addEventListener("click", function(){
  let canvas = document.getElementById("canvas").getContext("2d");
  let imagen = canvas.toDataURL("image/png");
  this.href = imagen;
});

function loadImg(){
        console.log(1);
        var image1 = new Image();
        image1.src = "6.jpg";
        image1.onload = function(){
          myDrawImageMethod(this);
          var imgData = ctx.getImageData(0, 0, this.width, this.height);
          ctx.putImageData(imgData, 0, 0);
        }
      }

function grises(){
  var img = ctx.getImageData(0, 0, 500, 500);
  for(i=0; i < img.data.length; i+=4){
    var color = (img.data[i] + img.data[i+1] + img.data[i+2])/3;
      img.data[i] = color;
      img.data[i+1] = color;
      img.data[i+2] = color;
  }
  ctx.putImageData(img, 0, 0);
}
function negativo(){
  var img = ctx.getImageData(0, 0, 500, 500);
  	for(i=0; i < img.data.length; i+=4){
  			img.data[i] = 255 - img.data[i];
  			img.data[i+1] = 255 - img.data[i+1];
  			img.data[i+2] = 255 - img.data[i+2];
  	}
  	ctx.putImageData(img, 0, 0);
}
function binarizacion(){

}
function sepia(){
  var img = ctx.getImageData(0, 0, 500, 500);
  for(i=0; i < img.data.length; i+=4){
      img.data[i] = (img.data[i]* .393) + (img.data[i+1] *.769 ) + (img.data[i+2] * .189 );
      img.data[i+1] = (img.data[i]* .349) + (img.data[i+1] *.686 ) + (img.data[i+2] * .168);
      img.data[i+2] = (img.data[i]* .272) + (img.data[i+1] *.534 ) + (img.data[i+2] * .131);
    }
    ctx.putImageData(img, 0, 0);
}

function brillo(){

}
