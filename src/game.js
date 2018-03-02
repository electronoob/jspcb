/*global Vector, h*/
var bases = [];
bases[0] = {
    type: "tower",
    pos: new Vector(500, 500),
    radius: 200,
    username: "electronoob",
    color: "205,255,205",
    selected: 0
};
/*
bases[1] = {
    type: "tower",
    pos: new Vector(600, 600),
    radius: 200,
    username: "electronoob",
    color: "205,255,205"
};
*/
/*
    h.ctx == rendering context
    h.gtx == ground context
*/

var images = [];
images.push(new Image());
images[images.length - 1].src = "./img/green.png";
images[images.length - 1].onload = function() {
    h.isGroundDirty = 1;
};

h.draw = function() {
    if (h.isGroundDirty) {
        h.isGroundDirty = 0;
        h.gtx.clearRect(0, 0, h.ground.width, h.ground.height);
        var i,k;
        for (i = 0; i < (h.ground.width / h.camera.zoom); i += 500) {
            for (k = 0; k < (h.ground.height / h.camera.zoom); k += 500) {
                h.gtx.drawImage(images[0], i, k);
            }
        }
        for (i = 0; i < bases.length; i++) {
            if (bases[i].selected) {
                h.gtx.fillStyle = "rgba(255,255,100,0.5)";
            } else {
                h.gtx.fillStyle = "rgba(255,255,255,0.5)";
            }
            h.gtx.strokeStyle = "rgba(" + bases[i].color + ",1)";
            h.gtx.lineWidth = 10;
            h.gtx.beginPath();
            h.gtx.arc(bases[i].pos.x, bases[i].pos.y, bases[i].radius, 0, 2 * Math.PI);
            h.gtx.fill();
            h.gtx.stroke();
            h.gtx.closePath();
            h.gtx.font = Math.round(bases[i].radius / 4) + "px Arial";
            var uOffsetX = h.gtx.measureText(bases[i].username).width / 2;
            var uOffsetY = h.gtx.measureText("M").width / 2;
            h.gtx.fillStyle = "rgba(255,255,255,0.7)";
            h.gtx.strokeStyle = "rgba(0,100,0,0.5)";
            h.gtx.lineWidth = 3;
            h.gtx.fillText(bases[i].username, bases[i].pos.x - uOffsetX,
                bases[i].pos.y + uOffsetY);
            /*
            h.gtx.strokeText (bases[i].username,bases[i].pos.x - uOffsetX, bases[i].pos.y + uOffsetY);
            */
        }
    }
};

h.mDblClick = function() {
    var i;
    for (i = 0; i < bases.length; i++) {
        var c = bases[i].pos.hypot(new Vector(this.mXg, this.mYg));
        if (c < bases[i].radius) {
            bases[i].selected = 1;
        } else {
            bases[i].selected = 0;
        }
    }
    h.isGroundDirty = 1;
}.bind(h);
