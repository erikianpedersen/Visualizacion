var color = "#000000";
var grosor = 1;
var pintar = false;

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var imageData = ctx.createImageData(1000, 700);

var lastX = -1;
var lastY = -1;

document.getElementById("i_file").addEventListener("click", loadImg);
document.getElementById("grises").addEventListener("click", grises);
document.getElementById("negativo").addEventListener("click", negativo);
document.getElementById("binarizacion").addEventListener("click", binarizacion);
document.getElementById("sepia").addEventListener("click", sepia);
document.getElementById("brillo").addEventListener("click", brillo);
document.getElementById("saturacion").addEventListener("click", saturacion);
document.getElementById("bordes").addEventListener("click", bordes);

canvas.addEventListener("mousedown", function(){
  pintar = true;
});

canvas.addEventListener("mouseup", function(){
  pintar = false;
    lastX = -1;
    lastY = -1;
});

canvas.addEventListener("mousemove", function(event){
  var x = event.layerX - 15;
  var y = event.layerY;
  if (pintar){
    ctx.lineCap = "round";
    ctx.lineWidth = grosor;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(x,y);
    if(lastX != -1 && lastY != -1){
        ctx.moveTo(lastX, lastY);
    }
    ctx.lineTo(x, y);
	ctx.stroke();
    lastX = x;
    lastY = y;
  }
});

var colores = document.getElementsByClassName("color");
for(i = 0; i < colores.length; i++){
  colores[i].addEventListener("click", function(){
    color = this.id;
  });
}

var botonGrosor = document.getElementsByClassName("grosor");
for(i = 0; i < botonGrosor.length; i++){
    botonGrosor[i].addEventListener("click", function(){
        if(this.id == "mas" && grosor < 20){
            grosor = grosor*2;
        }else if(this.id == "menos" && grosor > 1){
            grosor = grosor/2;
        }
    })
}

function myDrawImageMethod(image){
  ctx.drawImage(image, 0, 0, image.width, image.height);
}

var nuevo = document.getElementById("limpiar");
nuevo.addEventListener("click", function(){
    for (x = 0; x < canvas.width; x++){
      for (y = 0; y < canvas.heigth; y++){
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

var guardarImagen = document.getElementById("guardar");
guardarImagen.addEventListener("click", function(){
  var img = canvas.toDataURL("image/png");
  this.href = img;
});

function loadImg(){
  var file = document.getElementById('i_file');
  file.onchange = function(e){
    var img = new Image();
    img.src = URL.createObjectURL(e.target.files[0]);
    img.onload = function(){
        if (img.width>canvas.width){
          var porcentaje = (canvas.width/img.width) * 100;
          img.width = (porcentaje * img.width) / 100;
          img.height = (porcentaje * img.height) / 100;
        }
        if (img.height>canvas.height){
            var porcentaje = (canvas.height/img.height) * 100;
            img.width = (porcentaje * img.width) / 100;
            img.height = (porcentaje * img.height) / 100;
        }
      myDrawImageMethod(this);
      var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      ctx.putImageData(imgData, 0, 0);
    }
  }
}

function grises(){
  var img = ctx.getImageData(0, 0, canvas.width, canvas.height);
  for(i=0; i < img.data.length; i+=4){
    var color = (img.data[i] + img.data[i+1] + img.data[i+2])/3;
      img.data[i] = color;
      img.data[i+1] = color;
      img.data[i+2] = color;
  }
  ctx.putImageData(img, 0, 0);
}
function negativo(){
    var img = ctx.getImageData(0, 0, canvas.width, canvas.height);
    for(i=0; i < img.data.length; i+=4){
    	img.data[i] = 255 - img.data[i];
    	img.data[i+1] = 255 - img.data[i+1];
    	img.data[i+2] = 255 - img.data[i+2];
    }
    ctx.putImageData(img, 0, 0);
}
function binarizacion(){
    var img = ctx.getImageData(0, 0, canvas.width, canvas.height);
    for(i=0; i < img.data.length; i+=4){
        var promedio = (img.data[i] + img.data[i+1] + img.data[i+2]) / 3
        if(promedio < 128){
          img.data[i] = 0;
        	img.data[i+1] = 0;
        	img.data[i+2] = 0;
        }else{
          img.data[i] = 255;
        	img.data[i+1] = 255;
        	img.data[i+2] = 255;
        }

    }
    ctx.putImageData(img, 0, 0);
}
function sepia(){
  var img = ctx.getImageData(0, 0, canvas.width, canvas.height);
  for(i=0; i < img.data.length; i+=4){
      img.data[i] = (img.data[i]* .393) + (img.data[i+1] *.769 ) + (img.data[i+2] * .189 );
      img.data[i+1] = (img.data[i]* .349) + (img.data[i+1] *.686 ) + (img.data[i+2] * .168);
      img.data[i+2] = (img.data[i]* .272) + (img.data[i+1] *.534 ) + (img.data[i+2] * .131);
    }
  ctx.putImageData(img, 0, 0);
}

function brillo(){
    var img = ctx.getImageData(0, 0, canvas.width, canvas.height);
    for(i=0; i < img.data.length; i+=4){
    	img.data[i] = img.data[i]*1.5;
    	img.data[i+1] = img.data[i+1]*1.5;
    	img.data[i+2] = img.data[i+2]*1.5;
    }
    ctx.putImageData(img, 0, 0);
}

function saturacion(){
    var img = ctx.getImageData(0, 0, canvas.width, canvas.height);
    for(i=0; i < img.data.length; i+=4){
      var R = img.data[i] / 255;
      var G = img.data[i+1] / 255;
      var B = img.data[i+2] / 255;
      var H;
      var S;
      var L;

      var minimo = Math.min(R,G,B);
      var maximo = Math.max(R,G,B);

      L = (minimo + maximo) / 2;

      if(minimo == maximo){
          S = 0;
      }else{
          if (L<0.5){
            S = (maximo - minimo)/(maximo + minimo);
          } else {
            S =  (maximo - minimo)/(2.0 - maximo -minimo);
          }
      }

      S = S * 2;

      if (R == maximo){
       H = (G - B)/(maximo-minimo);
      }else if (G == maximo) {
       H = 2.0 + (B - R)/(maximo-minimo);
      }else if (B == maximo){
       H = 4.0 + (R - G)/(maximo-minimo);
      }

      H = H * 60;

      if (H < 0){
        H = H + 360;
      }


      if (S == 0) {
        R = L * 255;
        G = L * 255;
        B = L * 255;
      }else{
        var tmp_1;
        var tmp_2;
        var tmp_R;
        var tmp_G;
        var tmp_B;

        if(L<0.5){
          tmp_1 = L * (1.0 + S);
        } else if (L >= 0.5){
          tmp_1 = (L + S) - (L * S);
        }

        tmp_2 = (2 * L) - tmp_1;

        H = H / 360;

        tmp_R = H + 0.333;
        tmp_G = H;
        tmp_B = H - 0.333;

        if(tmp_R < 0){
            tmp_R = tmp_R + 1;
        }else if(tmp_R > 1){
            tmp_R = tmp_R - 1;
        }
        if(tmp_G < 0){
            tmp_G = tmp_G + 1;
        }else if(tmp_G > 1){
            tmp_G = tmp_G - 1;
        }
        if(tmp_B < 0){
            tmp_B = tmp_B + 1;
        }else if(tmp_B > 1){
            tmp_B = tmp_B - 1;
        }

        if((6*tmp_R) < 1){
          R = tmp_2 + (tmp_1 - tmp_2) * 6 * tmp_2;
        }else{
            if((2*tmp_R) < 1){
              R = tmp_1;
            }else{
              if((3*tmp_R) < 2) {
                  R = tmp_2 + (tmp_1 - tmp_2) * (0.666 - tmp_R) * 6;
                }else {
                  R = tmp_2;
                }
            }
        }

        if((6*tmp_G) < 1){
          R = tmp_2 + (tmp_1 - tmp_2) * 6 * tmp_2;
        }else{
            if((2*tmp_G) < 1){
              R = tmp_1;
            }else{
              if((3*tmp_G) < 2) {
                  R = tmp_2 + (tmp_1 - tmp_2) * (0.666 - tmp_G) * 6;
                }else {
                  R = tmp_2;
                }
            }
        }

        if((6*tmp_B) < 1){
          R = tmp_2 + (tmp_1 - tmp_2) * 6 * tmp_2;
        }else{
            if((2 * tmp_B) < 1){
              R = tmp_1;
            }else{
              if((3 * tmp_B) < 2) {
                  R = tmp_2 + (tmp_1 - tmp_2) * (0.666 - tmp_B) * 6;
                }else {
                  R = tmp_2;
                }
            }
        }

        R = Math.round(R * 255);
        G = Math.round(G * 255);
        B = Math.round(B * 255);
      }

	    img.data[i] = R;
      img.data[i+1] = G;
      img.data[i+2] = B;
    }
    ctx.putImageData(img, 0, 0);
}


function RellenaNegro(img, i){
 img.data[i] = black;
 img.data[i + 1] = black;
 img.data[i + 2] = black;
}

function bordes(){
  grises();
  img = ctx.getImageData(0, 0, canvas.width, canvas.height);
  resultado = ctx.getImageData(0, 0, canvas.width, canvas.height);
  porcentaje = 5;
  bordeGrosor = 255 * porcentaje/ 100;
  for(x=0; x<canvas.width; x++){
    for (y=0; y<canvas.height; y++){
      var i = (x + y * canvas.width) * 4;
      var sig = x + 1;
      var R = img.data[i];
      var G = img.data[i + 1];
      var B = img.data[i + 2];
      grayActual = (R + G + B)/3;
      if (sig < canvas.width){
        var iSig = (sig + y * canvas.width) * 4;
        var R = img.data[iSig];
        var G = img.data[iSig + 1];
        var B = img.data[iSig + 2];
        graySig = (R + G + B)/3;
        var comparacion = grayActual - graySig;
        if (comparacion < 0){
          comparacion = comparacion * -1;
          if(comparacion > bordeGrosor){
            resultado.data[iSig] = "ffffff";
            resultado.data[iSig + 1] = "ffffff";
            resultado.data[iSig + 2] = "ffffff";
          }
        }else{
          if(comparacion > bordeGrosor){
            resultado.data[i] = "ffffff";
            resultado.data[i + 1] = "ffffff";
            resultado.data[i + 2] = "ffffff";
          }
        }
      }
      }
    }
ctx.putImageData(resultado, 0, 0);
}
