//!Get Canvas
let displays = new Array()
let tmp;

//background div
tmp = new Display({
    number : "",
    divId : "background",
    cnvsId : "canvas0",
    backgroundColor: "#70c5ce",
    sprites : [
        bg,
        fg,
        bird,
    ]
})
displays.push(tmp);

//one
tmp = new Display({
    number : "1",
    divId : "one",
    cnvsId : "canvas1",
    menu : new Menu({
        startPosition: 205,
        buttons: [
            {text:"Start", val:null},
            {text:"IA Play", val:null},
            {text:"Options", val:null},
        ],
        actions:[
            () => {
                game.state[0] = game.state[2];
                game.changeScreens(2);
                return false;
            },
            //TODO: IA joga
            () => {
                game.state[0] = game.state[2];
                game.changeScreens(2);
                return false;
            },
            () => {
                game.state[0] = game.state[4];
                game.changeScreens(4);
                return false;
            }
        ],
        gap: 50,
        frame: menuFrame,
        cursor: cursor,
    }),
    sprites : [
        getReady,
    ]
})
displays.push(tmp);

//two
tmp = new Display({
    number : "2",
    divId : "two",
    cnvsId : "canvas2",
    keysResponse : {
        "ArrowUp" : () => {
            //display, sprite, atribute, newValue
            return [0, 2, "flap", 0];
        },
    },
    sprites : [
        pipes
    ]
})
displays.push(tmp);

//three
tmp = new Display({
    number : "3",
    divId : "three",
    cnvsId : "canvas3",
    keysResponse : {
        "ArrowUp" : () => {
            game.state[0] = game.state[1];
            game.changeScreens(1);
        },
    },
    sprites : [
        gameOver,
    ]
})
displays.push(tmp);

//four
speedValue = new Value(
    {
        currentValue: 4,
        toFixed: 1,
        minValue:1,
        maxValue:9,
        modifierValue: 0.1,
        frame: valueFrameSpeed,
    }
)
jumpValue = new Value(
    {
        currentValue: 6.6,
        toFixed: 1,
        minValue:1,
        minValue:1,
        maxValue:9,
        modifierValue: 0.1,
        frame: valueFrameJump,
    }
)

tmp = new Display({
    number : "4",
    divId : "four",
    cnvsId : "canvas4",
    menu : new Menu({
        startPosition: 205,
        buttons:[
            {text:"Back", val:null},
            {text:"Speed", val:speedValue},
            {text:"Jump", val:jumpValue},
        ],
        actions:[
            () => {
                game.state[0] = game.state[1];
                game.changeScreens(1);
                return false;
            },
            (d) => {
                speedValue[d]();
                return [2, 0, "setDX", speedValue.currentValue];
            },
            (d) => {
                jumpValue[d]();
                return [0, 2, "setJump", jumpValue.currentValue];
            }
        ],
       gap: 50,
       cursor: cursor,
       frame: menuFrame,
    }),
    sprites : [
    ]
})
displays.push(tmp);

//set new display to game
game.setDisplays(displays);
//!End Get Canvas