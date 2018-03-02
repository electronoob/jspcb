/*exported c*/
/*global h*/
var c = new chat();
c.init();

function chat() {
    this.isTextInputAlwaysOpen = 0;
    this.chatcanvas = document.createElement("CANVAS");
    this.chatctx = this.chatcanvas.getContext("2d");
    this.chatcanvas.width = 400;
    this.chatcanvas.height = 500;
    this.chatctx.fillStyle = "rgba(0, 0, 0, 1)";
    this.font = "16px Arial";
    this.chatctx.font = this.font;
    this.chatlineHeight = this.chatctx.measureText("M").width + 2;
    this.messages = Array();
    /*
        this.messages.push({ username: "electronoob", type: "part", message: "" });
        this.messages.push({ username: "electronoob", type: "join", message: "" });
        this.messages.push({ username: "electronoob", type: "privmsg", message: ";/" });
    */
    this.isTextInputOpen = 0;
    this.textInput = document.getElementById("textInput");
    this.init = function() {
        if (this.isTextInputAlwaysOpen) {
            this.textInput.style.visibility = "visible";
            this.isTextInputOpen = 1;
        } else {
            this.isTextInputOpen = 0;
        }
        var func = function(e) {
            switch (e.keyCode) {
            case 84:
                if (!this.isTextInputOpen) {
                    e.preventDefault();
                    this.textInput.style.visibility = "visible";
                    this.textInput.focus();
                    this.textInput.value = "";
                    this.isTextInputOpen = 1;
                } else {
                    this.textInput.focus();
                }
                break;
            case 13:
                if (this.isTextInputOpen) {
                    e.preventDefault();
                    if (!this.isTextInputAlwaysOpen) {
                        this.textInput.style.visibility = "hidden";
                        this.isTextInputOpen = !1;
                    }
                    this.textInput.value = "";
                    
                }
                break;
            default:
                if (this.isTextInputOpen) {
                    this.textInput.focus();
                }
            }
            this.draw();
        }.bind(this);
        document.addEventListener("keydown", func, true);
        this.textInput.addEventListener("keydown", func, true);
        h.addRenderAtEnd(function() {
            h.ctx.drawImage(this.chatcanvas, 10, 34);
        }.bind(this));
        this.draw();
    };
    this.draw = function() {
        this.chatctx.clearRect(0,0,this.chatcanvas.width,this.chatcanvas.height);
        var offset = 10;
        if (!this.isTextInputAlwaysOpen) {
            this.chatctx.font = "12px Arial";
            this.chatctx.fillText("press T to begin talking to other people", 0, 12);
            offset = 20;
        }
        this.chatctx.font = this.font;
        for (var i = 0; i < this.messages.length; i++) {
            switch (this.messages[i].type) {
            case "privmsg":
                this.chatctx.fillText("<" + this.messages[i].username + "> " + this.messages[i].message, 4, this.chatlineHeight * i + this.chatlineHeight + offset);
                break;
            case "join":
                this.chatctx.fillText("*** " + this.messages[i].username + " has joined the lobby", 4, this.chatlineHeight * i + this.chatlineHeight + offset);
                break;
            case "part":
                this.chatctx.fillText("*** " + this.messages[i].username + " has left the lobby", 4, this.chatlineHeight * i + this.chatlineHeight + offset);
                break;
            default:
            }
        }
    };
}