/* exported Vector */ 
function Vector(x = 0, y = 0) {
    this.x = x;
    this.y = y;
    this.sub = function(b) {
        this.x -= b.x;
        this.y -= b.y;
    };
    this.add = function(b) {
        this.x += b.x;
        this.y += b.y;
    };
    this.mag = function() {
        return Math.sqrt(Math.abs(this.x) ^ 2 + Math.abs(this.y) ^ 2);
    };
    this.magsq = function() {
        return Math.abs(this.x) ^ 2 + Math.abs(this.y) ^ 2;
    };
    this.div = function(value) {
        this.x /= value;
        this.y /= value;
    };
    this.mul = function(value) {
        this.x *= value;
        this.y *= value;
    };
    this.setMag = function(value) {
        var m = this.mag();
        if (m !== 0 && m != 1) {
            this.div(m);
        }
        this.mul(value);
    };
    this.hypot = function(b) {
        return Math.hypot(this.x - b.x, this.y - b.y);
    };
    this.lerp = function(b, step) {
        var a = new Vector(this.x, this.y);
        b.sub(a);
        b.mul(step);
        b.add(a);
        return b;
    };
}