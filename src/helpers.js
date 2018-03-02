/*exported h*/
/*global Vector, scr*/
var h = new helpers();

function helpers() {
    this.map = {};
    this.map.width = 2048;
    this.map.height = 2048;
    this.camera = {};
    this.camera.pos = new Vector(0, 0);
    this.camera.vel = new Vector(0, 0);
    this.camera.acc = new Vector(0, 0);
    this.camera.zoom = 1;
    this.camera.update = function() {
        this.vel.mul(0.9);
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.acc.mul(0);
    };
    this.ctx = scr.getContext("2d");
    this.width = scr.width;
    this.height = scr.height;
    this.kb = {
        l: 0,
        r: 0,
        u: 0,
        d: 0,
        s: 0
    };
    this.renderAtStart = [];
    this.renderAtEnd = [];
    this.mX = 0;
    this.mY = 0;
    this.mXg = 0;
    this.mYg = 0;
    this.draw = function() {};
    this.mClick = function() {};
    this.mDblClick = function() {};
    this.ground = document.createElement("canvas");
    this.gtx = this.ground.getContext("2d");
    this.isGroundDirty = 1; // reduce ground redraws
    this.ground.width = this.map.width;
    this.ground.height = this.map.height;
    this.render = function() {
        this.gtx.save();
        this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        this.gtx.scale(this.camera.zoom, this.camera.zoom);
        if (this.kb.u) this.camera.acc.add(new Vector(0, -2));
        if (this.kb.d) this.camera.acc.add(new Vector(0, 2));
        if (this.kb.l) this.camera.acc.add(new Vector(-2, 0));
        if (this.kb.r) this.camera.acc.add(new Vector(2, 0));
        this.camera.update();
        this.draw();
        this.ctx.drawImage(this.ground, -this.camera.pos.x, -this.camera.pos.y);
        var mouseRel = Math.round(this.mXg / 100) + ", " + Math.round(this.mYg / 100);
        this.ctx.font = "24px Arial";
        this.ctx.fillStyle = "rgba(0,0,0,1)";
        this.ctx.strokeStyle = "rgba(255,255,255,1)";
        this.ctx.lineWidth = 3;
        this.ctx.strokeText(mouseRel, 30, this.height-24);
        this.ctx.fillText(mouseRel, 30, this.height-24);
        this.drawAtEnd();
        //this.gtx.fillRect((this.mXg-10) , (this.mYg-10) ,20,20);
        this.gtx.restore();
        window.requestAnimationFrame(this.render.bind(this));
    };
    this.gri = function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    this.drawAtStart = function () {
        var i=0;
        for(i=0;i<this.renderAtStart.length;i++) {
            this.renderAtStart[i]();
        }
    };
    this.drawAtEnd = function () {
        var i=0;
        for(i=0;i<this.renderAtEnd.length;i++) {
            this.renderAtEnd[i]();
        }
    };
    this.addRenderAtStart = function (func) {
        this.renderAtStart.push(func);
    };
    this.addRenderAtEnd = function (func) {
        this.renderAtEnd.push(func);
    };
    this.getPolyVectors = function(x, y, sides, radius, rotation) {
        var points = [];
        for (var i = 0; i < sides; i++) {
            var lx = (radius * Math.cos(rotation + (2 * Math.PI) * i / (sides))) + x;
            var ly = (radius * Math.sin(rotation + (2 * Math.PI) * i / (sides))) + y;
            points.push(new Vector(lx, ly));
        }
        return points;
    };
    window.onkeydown = function(e) {
        switch (e.keyCode) {
        case 38:
            this.kb.u = 1;
            e.preventDefault();
            break;
        case 40:
            this.kb.d = 1;
            e.preventDefault();
            break;
        case 37:
            this.kb.l = 1;
            e.preventDefault();
            break;
        case 39:
            this.kb.r = 1;
            e.preventDefault();
            break;
        case 16:
            this.kb.s = 1;
            e.preventDefault();
            break;
        }
    }.bind(this);
    window.onkeyup = function(e) {
        switch (e.keyCode) {
        case 38:
            this.kb.u = 0;
            e.preventDefault();
            break;
        case 40:
            this.kb.d = 0;
            e.preventDefault();
            break;
        case 37:
            this.kb.l = 0;
            e.preventDefault();
            break;
        case 39:
            this.kb.r = 0;
            e.preventDefault();
            break;
        case 16:
            this.kb.s = 0;
            e.preventDefault();
            break;
        }
    }.bind(this);
    document.getElementById("scr").addEventListener("click", function() {
        this.mClick();
    }.bind(this));
    document.getElementById("scr").addEventListener("dblclick", function() {
        this.mDblClick();
    }.bind(this));
    document.getElementById("scr").addEventListener("mousemove", function(evt) {
        var mousePos = this.getMousePos(scr, evt);
        this.mX = mousePos.x;
        this.mY = mousePos.y;
        this.mXg = Math.round(( this.mX + this.camera.pos.x) / this.camera.zoom);
        this.mYg = Math.round(( this.mY + this.camera.pos.y) / this.camera.zoom);
    }.bind(this), false);
    this.getMousePos = function(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    };
    window.addEventListener("resize", this.resize = function() {
        scr.width = window.innerWidth;
        scr.height = window.innerHeight;
        scr.style.width = window.innerWidth + "px";
        scr.style.height = window.innerHeight + "px";
        this.width = scr.width;
        this.height = scr.height;
    }.bind(this));
    this.resize();
    window.addEventListener("orientationchange", function() {
        this.resize();
    }.bind(this));
    document.ontouchmove = function(event){
        event.preventDefault();
    };
    window.addEventListener("wheel", function (e) {
        if (this.kb.s) {
            this.camera.acc.add(new Vector(e.deltaX*0.3, e.deltaY*0.3));
        } else {
            this.camera.zoom += e.deltaY * 0.01;
            if(this.camera.zoom > 1) this.camera.zoom = 1;
            if(this.camera.zoom < 0.3) this.camera.zoom = 0.3;
            this.ground.width = this.map.width * this.camera.zoom;
            this.ground.height = this.map.height * this.camera.zoom;
            this.isGroundDirty = 1;

        }
        event.preventDefault();
    }.bind(this));

    window.requestAnimationFrame(this.render.bind(this));
}
