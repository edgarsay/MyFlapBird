class Game {
    constructor({
        //frame counter
        frames = new Number(0),
        //states of the game
        state = new Array(),
        //sprites source
        imagePath = new String("/img/sprite.png"),
        //valid key input in the game
        controlls = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"],
        //last button pressed
        b = null,
        displays = Array(),
        transition = ["slidedown", "slideup"],
        width = "320",
        height = "480",
    }) {
        this.frames = frames;
        this.state = state;
        let tmp = new Image();
        tmp.src = imagePath;
        this.img = tmp;
        this.controlls = controlls;
        this.b = b;
        this.waitB = false;
        this.displays = displays;
        this.transition = transition;
        this.width = width;
        this.height = height;
        this.gamepad = null;
        this.mouse = {px:0, py:0, x:0, y:0};
    }

    setB(n = null) {
        this.b = n;
    }
    getFrames() {
        return this.frames;
    }
    setFrames(n = new Number()) {
        this.frames = n;
    }
    incFrames() {
        this.waitB = false;
        this.frames += 1;
    }

    draw() {
        for (let d of this.displays)
            d.draw();
    }

    //TODO: make Elements classe that take care of 'não sprite information'
    //should update all the "animeted" elements of the game
    update() {
        bird.update();
        fg.update();
        pipes.update();
    }

    loop() {
        if (game.gamepad)
            game.gamepadUpdateHandler();
        if (game.b && !game.waitB) {
            game.eventInput(game.b);
            game.setB(null);
        }
        game.update();
        game.draw();
        game.incFrames(); //frames++;

        requestAnimationFrame(game.loop);
    }

    stateIsEqual(n = new Number()) {
        return this.state[0] === this.state[n];
    }

    setState(n = new Number) {
        this.state[0] = this.state[n];
    }

    setDisplays(n = new Array()) {
        this.displays = n;
        displays.forEach((e) => {
            for (let c of this.controlls)
                if (e.keysResponse[c] == undefined)
                    e.keysResponse[c] = () => {};
        });
    }

    changeScreens(n = Number()) {
        let trans = this.transition;
        for (let i = 1; i < this.displays.length; ++i) {
            if (i === n) {
                this.displays[i].setDivClass(trans[0]);
            } else {
                this.displays[i].setDivClass(trans[1]);
            }
        }
    }


    eventInput(input = new String()) {
        if (!this.controlls.some(e => e == input))
            return;
        let output = this.displays[this.state[0]].eventInput(input);
        if (output) {
            this.displays[output[0]].sprites[output[1]][output[2]](output[3]);
        }
    }

    //gamepad handler
    gamepadUpdateHandler() {
        let controller = this.gamepad;
        if (controller.buttons) {
            for (let b = 0; b < controller.buttons.length; b++) {
                if (controller.buttons[b].pressed) {
                    let i = null;
                    switch (b) {
                        case 2:
                            i = "ArrowUp"
                            break;
                        case 12:
                            i = "ArrowUp"
                            break;
                        case 13:
                            i = "ArrowRight"
                            break;
                        case 14:
                            i = "ArrowDown"
                            break;
                        case 15:
                            i = "ArrowLeft"
                            break;
                    }
                    this.setB(i)
                    this.waitB = true;
                }
            }
        }
    }
}