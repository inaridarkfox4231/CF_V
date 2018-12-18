"use strict";

function make_Continued_Fractions(a, b){
  // a, bは正の整数
  var array = [];
  // concat使えば簡単に書けるよ
  if(a % b == 0){
    array.push(Math.floor(a / b));
    return array;
  }
  if(a < b){
    array.push(0);
    var plus = make_Continued_Fractions(b, a);
    return array.concat(plus);
  }
  array.push(Math.floor(a / b))
  var plus = make_Continued_Fractions(b, a % b);
  return array.concat(plus);
}

function cf_text(cf){
  var l = cf.length;
  if(l == 1){ return cf[0].toString(); }
  // slice使えば簡単に書けるよ
  var str = cf[0] + " + \\cfrac{1}{" + cf_text(cf.slice(1, l)) + "}";
  return str;
}

$('#change').click(function(){
  var a = $('#upper').val();
  var b = $('#lower').val();
  a = Number(a), b = Number(b);
  if(a == NaN || b == NaN){ return; }
  if(a <= 0 || b <= 0){ return; }
  var cf = make_Continued_Fractions(a, b);
  $('#TEXtext').html("\\[ " + cf_text(cf) + " \\]");
  MathJax.Hub.Queue(["Typeset",MathJax.Hub, "TEXtext"]);
})
