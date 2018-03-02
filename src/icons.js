/*global h*/
/*eslint no-console: ["error", { allow: ["warn", "error"] }] */

var btnPanel = document.getElementById("buttons");        
var btnIconWidth = 50;
var btnIconHeight = 50;
var btnIconRender = {};
var btnIcon = {};
btnIcon.power       = h.getPolyVectors(btnIconWidth/2,btnIconHeight/2 - 5,6,14,0);
btnIcon.house       = h.getPolyVectors(btnIconWidth/2,btnIconHeight/2 - 5,5,14,0);
btnIcon.barracks    = h.getPolyVectors(btnIconWidth/2,btnIconHeight/2 - 5,4,14,0);
btnIcon.wall        = h.getPolyVectors(btnIconWidth/2,btnIconHeight/2 - 5,20,14,0);
btnIcon.armory      = h.getPolyVectors(btnIconWidth/2,btnIconHeight/2 - 5,3,14,0);

Object.keys(btnIcon).forEach(function(key) {       
    btnIconRender[key]  = document.createElement("canvas");
    btnIconRender[key].width = btnIconWidth;
    btnIconRender[key].height = btnIconHeight;
    btnIconRender[key].getContext("2d").beginPath();
    btnIconRender[key].getContext("2d").lineWidth = 3;
    btnIconRender[key].getContext("2d").strokeStyle = "#fff";
    btnIconRender[key].getContext("2d").moveTo(
        btnIcon[key][btnIcon[key].length-1].x,
        btnIcon[key][btnIcon[key].length-1].y
    );
    var i;
    for(i=0;i<btnIcon[key].length;i++) {
        btnIconRender[key].getContext("2d").lineTo(btnIcon[key][i].x,btnIcon[key][i].y);
    }
    btnIconRender[key].getContext("2d").stroke();
    btnIconRender[key].getContext("2d").closePath();
    btnIconRender[key].getContext("2d").font = "10px Arial";
    btnIconRender[key].getContext("2d").fillStyle = "rgba(255,255,255,1)";
    btnIconRender[key].getContext("2d").strokeStyle = "rgba(0,0,0,1)";
    btnIconRender[key].getContext("2d").lineWidth = 1;
    btnIconRender[key].getContext("2d").miterLimit = 2;
    var w = btnIconRender[key].getContext("2d").measureText(key);
    btnIconRender[key].getContext("2d").strokeText (key, btnIconWidth/2 - w.width/2,43);
    btnIconRender[key].getContext("2d").fillText (key, btnIconWidth/2 - w.width/2,43);
    btnIconRender[key].className = "btnIconRender";
    btnPanel.appendChild(btnIconRender[key]);
});
