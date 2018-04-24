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
    context.clearRect(0, 0, canvas.width, canvas.height);
    Affichage(nbmir, F, l, d, theta, sun, e, echelle);
  }
  document.getElementById("input_theta").oninput = function(){
    theta = document.getElementById("input_theta").value;
    document.getElementById("val_theta").innerHTML = theta + " &deg;";
    context.clearRect(0, 0, canvas.width, canvas.height);
    Affichage(nbmir, F, l, d, theta, sun, e, echelle);
  }
  document.getElementById("input_F").oninput = function(){
    F = document.getElementById("input_F").value;
    document.getElementById("val_F").innerHTML = F/100 + " m";
    context.clearRect(0, 0, canvas.width, canvas.height);
    Affichage(nbmir, F, l, d, theta, sun, e, echelle);
  }
  document.getElementById("input_l").oninput = function(){
    l = document.getElementById("input_l").value;
    document.getElementById("val_l").innerHTML = l + " cm";
    context.clearRect(0, 0, canvas.width, canvas.height);
    Affichage(nbmir, F, l, d, theta, sun, e, echelle);
  }
  document.getElementById("input_d").oninput = function(){
    d = document.getElementById("input_d").value;
    document.getElementById("val_d").innerHTML = d + " cm";
    context.clearRect(0, 0, canvas.width, canvas.height);
    Affichage(nbmir, F, l, d, theta, sun, e, echelle);
  }



  document.getElementById("input_etal").onchange = function(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    Affichage(nbmir, F, l, d, theta, sun, e, echelle);
  }
  document.getElementById("input_arc").onchange = function(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    Affichage(nbmir, F, l, d, theta, sun, e, echelle);
  }
  document.getElementById("input_ray").onchange = function(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    Affichage(nbmir, F, l, d, theta, sun, e, echelle);
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
  var context1 = canvas.getContext('2d');
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
    context1.beginPath();

    var xi;
    var yi;
    var xa;

    var i = (nbmir - 1) /2;
    for (var pos = -i ; pos <= i ; pos++)
    {
      L = pos * l + pos * d;
      alpha = 0.5 * Math.atan(L/F);
      y2 = Math.abs(l * Math.tan(alpha));

      if (alpha >= 0) {

        /* DESSIN DU MIROIR */
        context.moveTo((jdim/2) + L-(l/2), idim - 30);
        context.lineTo((jdim/2) + L+(l/2), idim - 30);
        context.lineTo((jdim/2) + L+(l/2), idim - 30 - y2 - e);
        context.lineTo((jdim/2) + L-(l/2), idim - 30 - e);
        context.lineTo((jdim/2) + L-(l/2), idim - 30);
        context.stroke();

        /* DESSIN DU RAYON INCIDENT */
        if ((document.getElementById("input_ray")).checked == true)
        {
          xi = L;
          yi = e + (y2/2);
          xa = L + Math.tan(theta) * (sun - yi);

          context1.moveTo((jdim/2) + xa, idim - 30 - sun);
          context1.lineTo((jdim/2) + xi, idim - 30 - yi);
          context1.stroke();
        }

      }
      else {
        context.moveTo((jdim/2) + L-(l/2), idim - 30);//On se déplace au coin inférieur gauche
        context.lineTo((jdim/2) + L+(l/2), idim - 30);
        context.lineTo((jdim/2) + L+(l/2), idim - 30 - e);
        context.lineTo((jdim/2) + L-(l/2), idim - 30 - y2 - e);
        context.lineTo((jdim/2) + L-(l/2), idim - 30);
        context.stroke();

        /* DESSIN DU RAYON INCIDENT */
        if ((document.getElementById("input_ray")).checked == true)
        {
          xi = L;
          yi = e + (y2/2);
          xa = L + Math.tan(theta) * (sun - yi);

          context1.moveTo((jdim/2) + xa, idim - 30 - sun);
          context1.lineTo((jdim/2) + xi, idim - 30 - yi);
          context1.stroke();
        }

      }

    }
    context.closePath();
  }

}
