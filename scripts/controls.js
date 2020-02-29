//!Game Controls
//* keyboard start
document.addEventListener("keydown", (e) => {
    game.setB(e.key);
});
//* keyboard end

//* mouse start
let  qs = "#foreground"
//document.querySelector(qs).addEventListener("mousedown", (e) => {
    //document.querySelector(qs).addEventListener("mousemove", onMouseMove);
    //document.querySelector(qs).addEventListener("mouseup", onMouseUp);
//});

document.addEventListener("mousedown", (e) => {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
});

function onMouseMove() {
    let {px, py, x, y} = game.mouse;
    px = x, py = y;
    x = event.clientX;
    y = event.clientY;
    if(px < x){
        game.setB("ArrowRight");
    }else if(px > x){
        game.setB("ArrowLeft");
    }else if(py < y){
        game.setB("ArrowDown");
    }else if(py > y){
        game.setB("ArrowUp");
    }else{
        game.setB("");
    }
    game.mouse = {px, py, x, y};
}

function onMouseUp() {
    //document.querySelector(qs).removeEventListener("mousemove", onMouseMove);
    //document.querySelector(qs).removeEventListener("mouseup", onMouseUp);
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
}
//* mouse end

//* gamepad start
window.addEventListener("gamepadconnected", function(e) {
    console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
      e.gamepad.index, e.gamepad.id,
      e.gamepad.buttons.length, e.gamepad.axes.length);
      game.gamepad = e.gamepad;
});

window.addEventListener("gamepaddisconnected", function(e) {
    console.log("Gamepad disconnected at index %d: %s. %d buttons, %d axes.",
      e.gamepad.index, e.gamepad.id,
      e.gamepad.buttons.length, e.gamepad.axes.length);
});
//* gamepad end

//!end Game Controls