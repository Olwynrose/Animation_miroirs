window.onload = function()
{

  var jdim = 1080;
  var idim = 720;

  var echelle = 2.5;

  document.getElementById('canvas').width = jdim;
  document.getElementById('canvas').height = idim;

  var nbmir = document.getElementById("input_nbmir").value;
  var F = document.getElementById("input_F").value;
  var l = document.getElementById("input_l").value;
  var d = document.getElementById("input_d").value;
  var theta = document.getElementById("input_theta").value;

  var sun = 800;
  var e = 1;

  //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  //                  RECUPERATION DES VALEURS
  //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  document.getElementById("input_nbmir").oninput = function(){
    nbmir = document.getElementById("input_nbmir").value;
    document.getElementById("val_nbmir").innerHTML = nbmir;
  }
  document.getElementById("input_nbmir").onchange = function(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    Affichage(nbmir, F, l, d, theta, sun, e, echelle);
  }
  document.getElementById("input_theta").oninput = function(){
    theta = document.getElementById("input_theta").value;
    document.getElementById("val_theta").innerHTML = theta + " &deg;";
  }
  document.getElementById("input_F").oninput = function(){
    F = document.getElementById("input_F").value;
    document.getElementById("val_F").innerHTML = F/100 + " m";
  }
  document.getElementById("input_l").oninput = function(){
    l = document.getElementById("input_l").value;
    document.getElementById("val_l").innerHTML = l + " cm";
  }
  document.getElementById("input_d").oninput = function(){
    d = document.getElementById("input_d").value;
    document.getElementById("val_d").innerHTML = d + " cm";
  }

  //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  //                             CANVAS
  //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

  // INITIALISATION
  var canvas = document.getElementById('canvas');
  if(!canvas)
  {
    alert("Impossible de récupérer le canvas");
    return;
  }

  var context = canvas.getContext('2d');
  if(!context)
  {
    alert("Impossible de récupérer le context du canvas");
    return;
  }


  //DESSIN
  Affichage(nbmir, F, l, d, theta, sun, e, echelle);



  function Affichage(nbmir, F, l, d, theta, sun, e, echelle) {

    var L;
    var alpha;
    var y2;

    F = F * echelle;
    l = l * echelle;
    d = d * echelle;
    sun = sun * echelle;
    e = e * echelle;


    context.beginPath();//On démarre un nouveau tracé

    var i = (nbmir - 1) /2;
    for (var pos = -i ; pos <= i ; pos++)
    {
      L = pos * l + pos * d;
      alpha = 0.5 * Math.atan(L/F);
      y2 = Math.abs(l * Math.tan(alpha));

      if (alpha >= 0) {
        context.moveTo((jdim/2) + L-(l/2), idim - 30);//On se déplace au coin inférieur gauche
        context.lineTo((jdim/2) + L+(l/2), idim - 30);
        context.lineTo((jdim/2) + L+(l/2), idim - 30 - y2 - e);
        context.lineTo((jdim/2) + L-(l/2), idim - 30 - e);
        context.lineTo((jdim/2) + L-(l/2), idim - 30);
        context.stroke();//On trace seulement les lignes.
      }
      else {
        context.moveTo((jdim/2) + L-(l/2), idim - 30);//On se déplace au coin inférieur gauche
        context.lineTo((jdim/2) + L+(l/2), idim - 30);
        context.lineTo((jdim/2) + L+(l/2), idim - 30 - e);
        context.lineTo((jdim/2) + L-(l/2), idim - 30 - y2 - e);
        context.lineTo((jdim/2) + L-(l/2), idim - 30);
        context.stroke();//On trace seulement les lignes.
      }

    }
    context.closePath();
  }

}
