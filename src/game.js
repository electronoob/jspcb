/*global Vector, h*/

/*
    h.ctx == rendering context
    h.gtx == ground context
*/

var images = [];
images.push(new Image());
images[images.length - 1].src = "./img/dark.png";
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
    }
};

h.mDblClick = function() {
    //h.isGroundDirty = 1;
}.bind(h);
