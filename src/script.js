"use strict";

var canvas = $('#field')[0];
var i, j, k;
var upper = -1; // canvas上をカーソルが移動するときの分子
var lower = -1; // canvas上をカーソルが移動するときの分母

function getctx(){
  var ctx = canvas.getContext("2d");
  return ctx;
}

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

function draw_Continued_Fractions(a, b){
  var cf = make_Continued_Fractions(a, b);
  $('#TEXtext').html("\\[ \\frac{" + a + "}{" + b + "} = " + cf_text(cf) + " \\]");
  MathJax.Hub.Queue(["Typeset",MathJax.Hub, "TEXtext"]);
}

function cf_text(cf){
  var l = cf.length;
  if(l == 1){ return cf[0].toString(); }
  // slice使えば簡単に書けるよ
  var str = cf[0] + " + \\cfrac{1}{" + cf_text(cf.slice(1, l)) + "}";
  return str;
}

function init(){
  var ctx = getctx();
  ctx.beginPath();
  ctx.strokeStyle = "#999";
  for(i = 1; i < 50; i++){
    ctx.moveTo(i * 10, 0);
    ctx.lineTo(i * 10, 500);
    ctx.stroke();
    ctx.moveTo(0, i * 10);
    ctx.lineTo(500, i * 10);
    ctx.stroke();
  }
}

// カーソル位置(a, b)に対して固定された数を返す感じ
function update_num(a, b){
  if(a < 5 || a >= 495 || b < 5 || b >= 495){
    upper = -1, lower = -1;
    return false;
  }
  var new_u = Math.floor((a + 5) / 10);
  var new_l = 50 - Math.floor((b + 5) / 10);
  if(upper != new_u || lower != new_l){
    upper = new_u, lower = new_l;
    $('#upper').val(upper);
    $('#lower').val(lower);
  }else{
    return false;
  }
  console.log("upper = %d, lower = %d", upper, lower);
  return true;
}

$('#field').mousemove(function(e){
  var a = e.clientX - $(this).offset().left;
  var b = e.clientY - $(this).offset().top;
  if(update_num(a, b)){
    draw_Continued_Fractions(upper, lower);
  }
})

$('input').focus(function(){
  $(this).val("");
  $('#TEXtext').text("ここに表示");
})

$('#change').click(function(){
  var a = $('#upper').val();
  var b = $('#lower').val();
  a = Number(a), b = Number(b);
  if(a == NaN || b == NaN){ return; }
  if(a <= 0 || b <= 0){ return; }
  draw_Continued_Fractions(a, b);
})
