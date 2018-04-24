window.onload = function()
{

  var jdim = 1080;
  var idim = 920;

  var echelle = 1.5;

  document.getElementById('canvas').width = jdim;
  document.getElementById('canvas').height = idim;

  var nbmir = document.getElementById("input_nbmir").value;
  var F = document.getElementById("input_F").value;
  var l = document.getElementById("input_l").value;
  var d = document.getElementById("input_d").value + 1;
  var theta = parseFloat(document.getElementById("input_theta").value)* Math.PI / 180;

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
    theta = parseFloat(theta)* Math.PI / 180;
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


    context.beginPath();
    context1.beginPath();

    var xi;
    var yi;
    var xa;

    var dray;
    var xb;
    var yb;

    var i = (nbmir - 1) /2;
    for (var pos = -i ; pos <= i ; pos++)
    {
      L = pos * l + pos * (d+1);
      alpha = 0.5 * Math.atan(L/F);
      y2 = Math.abs(l * Math.tan(alpha));

      if (alpha >= 0) {

        /* DESSIN DU MIROIR */
        context.moveTo((jdim/2) + L-(l/2), idim - 30);
        context.lineTo((jdim/2) + L+(l/2), idim - 30);
        context.lineTo((jdim/2) + L+(l/2), idim - 30 - y2 - e);
        context.lineTo((jdim/2) + L-(l/2), idim - 30 - e);
        context.lineTo((jdim/2) + L-(l/2), idim - 30);

        xi = L;
        yi = e + (y2/2);
        xa = L + Math.tan(theta) * (sun - yi);

        /* DESSIN DU RAYON REFLECHI */
        dray = Math.sqrt(Math.pow(sun - yi, 2) + Math.pow(L - xa, 2));
        var angle = theta + 2 * alpha;
        xb = L - dray * Math.sin(angle);
        yb = yi + dray * Math.cos(theta + 2 * alpha);

        context1.moveTo((jdim/2) + xi, idim - 30 - yi);
        context1.lineTo((jdim/2) + xb, idim - 30 - yb);



        /* DESSIN DU RAYON INCIDENT */
        if ((document.getElementById("input_ray")).checked == true)
        {
          context.moveTo((jdim/2) + xa, idim - 30 - sun);
          context.lineTo((jdim/2) + xi, idim - 30 - yi);
        }
        else {}

      }
      else {
        context.moveTo((jdim/2) + L-(l/2), idim - 30);//On se déplace au coin inférieur gauche
        context.lineTo((jdim/2) + L+(l/2), idim - 30);
        context.lineTo((jdim/2) + L+(l/2), idim - 30 - e);
        context.lineTo((jdim/2) + L-(l/2), idim - 30 - y2 - e);
        context.lineTo((jdim/2) + L-(l/2), idim - 30);

        theta = parseFloat(theta);

        xi = L;
        yi = e + (y2/2);
        xa = L + Math.tan(theta) * (sun - yi);

        /* DESSIN DU RAYON REFLECHI */
        dray = Math.sqrt(Math.pow(sun - yi, 2) + Math.pow(L - xa, 2));
        xb = L - dray * Math.sin(theta + 2 * alpha);
        yb = yi + dray * Math.cos(theta + 2 * alpha);

        context1.moveTo((jdim/2) + xi, idim - 30 - yi);
        context1.lineTo((jdim/2) + xb, idim - 30 - yb);


        /* DESSIN DU RAYON INCIDENT */
        if ((document.getElementById("input_ray")).checked == true)
        {
          context.moveTo((jdim/2) + xa, idim - 30 - sun);
          context.lineTo((jdim/2) + xi, idim - 30 - yi);
        }
        else {}


      }

    }
    context.stroke();
    context.closePath();

    context1.stroke();
    context1.closePath();



    Etalement(nbmir, F, l, d, theta, sun, e)
  }





  function Etalement(nbmir, F, l, d, theta, sun, e) {

    var pos = 1;

    var L = pos * l + pos * d;
    var alpha = 0.5*Math.atan(L/F);
    var y2 = Math.abs(l * Math.tan(alpha));

    var Xa = L;
    var Ya = e + y2/2;

    var xa = L + Math.tan(theta) * (sun - Ya);

    var dray = Math.sqrt(Math.pow(sun-Ya, 2) + Math.pow(L-xa, 2));
    var Xb = L - dray*Math.sin(theta + 2*alpha);
    var Yb = Ya + dray * Math.cos(theta + 2*alpha);




    pos = -1;

    L = pos * l + pos * d;
    alpha = 0.5*Math.atan(L/F);
    y2 = Math.abs(l * Math.tan(alpha));

    var Xc = L;
    var Yc = e + y2/2;

    xa = L + Math.tan(theta) * (sun - Ya);

    dray = Math.sqrt(Math.pow(sun-Yc, 2) + Math.pow(L-xa, 2));
    var Xd = L - dray*Math.sin(theta + 2*alpha);
    var Yd = Yc + dray * Math.cos(theta + 2*alpha);


    X1 = (((Yb-Ya)/(Xb-Xa))*Xa+Ya-((Yd-Yc)/(Xd-Xc))*Xc-Yc) / (((Yb-Ya)/(Xb-Xa))-((Yd-Yc)/(Xd-Xc)));
    Y1 = ((Yb-Ya)/(Xb-Xa))*((((Yb-Ya)/(Xb-Xa))*Xa+Ya-((Yd-Yc)/(Xd-Xc))*Xc-Yc) / (((Yb-Ya)/(Xb-Xa))-((Yd-Yc)/(Xd-Xc)))-Xa)+Ya;




    pos = (nbmir-1) / 2;

    L = pos * l + pos * d;
    alpha = 0.5*Math.atan(L/F);
    y2 = Math.abs(l * Math.tan(alpha));

    Xa = L;
    Ya = e + y2/2;

    xa = L + Math.tan(theta) * (sun - Ya);

    dray = Math.sqrt(Math.pow(sun-Ya, 2) + Math.pow(L-xa, 2));
    Xb = L - dray*Math.sin(theta + 2*alpha);
    Yb = Ya + dray * Math.cos(theta + 2*alpha);



    pos = -(nbmir-1) / 2;

    L = pos * l + pos * d;
    alpha = 0.5*Math.atan(L/F);
    y2 = Math.abs(l * Math.tan(alpha));

    Xc = L;
    Yc = e + y2/2;

    xa = L + Math.tan(theta) * (sun - Yc);

    dray = Math.sqrt(Math.pow(sun-Yc, 2) + Math.pow(L-xa, 2));
    Xd = L - dray*Math.sin(theta + 2*alpha);
    Yd = Yc + dray * Math.cos(theta + 2*alpha);


    X2 = (((Yb-Ya)/(Xb-Xa))*Xa+Ya-((Yd-Yc)/(Xd-Xc))*Xc-Yc) / (((Yb-Ya)/(Xb-Xa))-((Yd-Yc)/(Xd-Xc)));
    Y2 = ((Yb-Ya)/(Xb-Xa))*((((Yb-Ya)/(Xb-Xa))*Xa+Ya-((Yd-Yc)/(Xd-Xc))*Xc-Yc) / (((Yb-Ya)/(Xb-Xa))-((Yd-Yc)/(Xd-Xc)))-Xa)+Ya;


    var etal = Math.sqrt(Math.pow(X1-X2, 2) + Math.pow(Y1-Y2, 2));

    document.getElementById("val_etal").innerHTML = (etal).toFixed(2) + " cm";
  }
}
