//!sprites

//background
const bg = new Sprite({
    sX: 0,
    sY: 0,
    w: 275,
    h: 226,
    x: 0,
    y: game.height - 226,
    mulplayDraw: true,
})

//foreground
const fg = new Sprite({
    sX: 276,
    sY: -10,
    w: 224,
    h: 122,
    x: 0,
    y: game.height - 122,
    dx: 2,
    mulplayDraw: true,
});

//get ready message
const getReady = new Sprite({
    sX: 0,
    sY: 228,
    w: 173,
    h: 110,
    x: game.width / 2 - 173 / 2,
    y: 80,
})
getReady.draw = function(ctxT){
        if (game.stateIsEqual(1)) {
            ctxT.drawImage(this.img, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        }
}



//Menu Cursor
const cursor = new Sprite({
    sX: 75,
    sY: 352,
    w: 30,
    h: 60,
    x: 90,
    y: 205,
    rotation: 90,
})
cursor.draw = function (ctxT) {
    if (game.stateIsEqual(1) || game.stateIsEqual(4)) {
        ctxT.save(); //saves the current state of the canvas
        ctxT.translate(this.x, this.y); //change the bird to the origen of the canvas (0,0)
        ctxT.rotate(this.rotation * this.DEGREE); //rotate the canvas 'this.rotation' this.DEGREEs
        ctxT.drawImage(this.img, this.sX, this.sY, this.w, this.h, -this.w / 2, -this.h / 2, this.w, this.h);
        ctxT.restore(); //reset canvas state to the last save
    }
}

//game over
const gameOver = new Sprite({
    sX: 175,
    sY: 228,
    w: 225,
    h: 202,
    x: game.width / 2 - 225 / 2,
    y: 90,
})
gameOver.draw = function(ctxT){
        if (game.stateIsEqual(3))
            ctxT.drawImage(this.img, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
}

//pipes
const pipes = new Sprite({
    top: {
        sX: 553,
        sY: 0,
    },
    bottom: {
        sX: 502,
        sY: 0
    },
    w: 53,
    h: 400,
    gap: 85,
    maxYPos: -150,
    dx: 2,
    position: [],
});

pipes.setDX = function(n = new Number()){
    this.dx = n;
}

pipes.draw = function (ctxT) {
    for (let i = 0; i < this.position.length; i++) {
        let p = this.position[i];

        let topYPos = p.y;
        let bottomYPos = p.y + this.h + this.gap;

        // top pipe
        ctxT.drawImage(this.img, this.top.sX, this.top.sY, this.w, this.h, p.x, topYPos, this.w, this.h);

        // bottom pipe
        ctxT.drawImage(this.img, this.bottom.sX, this.bottom.sY, this.w, this.h, p.x, bottomYPos, this.w, this.h);
    }
}
pipes.update = function () {
    if (!game.stateIsEqual(2)) return;
    if (game.getFrames() % 100 == 0) {
        this.position.push({
            x: game.width,
            y: this.maxYPos * (Math.random() + 1)
        })
    }
    for (let i = 0; i < this.position.length; ++i) {
        let p = this.position[i]

        p.x = p.x - this.dx;
        if (p.x + this.w <= 0) {
            this.position.shift();
        }
    }
}


//getReady Menu
const menuFrame = new Sprite({
    sX: 405,
    sY: 275,
    w: 95,
    h: 35,
    x: game.width / 2 - 95 / 2,
    y: 185,
});

//valuer of Speed
const valueFrameSpeed = new Sprite({
    sX: 410,
    sY: 393,
    w: 48,
    h: 30,
    x: (game.width / 2 - 24 / 2) + menuFrame.w / 2 + 15,
    y: 186 + 51,
});

//valuer of Jump
const valueFrameJump = new Sprite({
    sX: 410,
    sY: 393,
    w: 48,
    h: 30,
    x: (game.width / 2 - 24 / 2) + menuFrame.w / 2 + 15,
    y: 186 + 101,
});


//bird
const bird = new Sprite({
    animation: [{
            sX: 276,
            sY: 112
        },
        {
            sX: 276,
            sY: 139
        },
        {
            sX: 276,
            sY: 164
        },
        {
            sX: 276,
            sY: 139
        }
    ],
    x: 50,
    y: 150,
    w: 34,
    h: 26,

    rotation: 0,
    frame: 0,

    speed: 0,
    gravity: 0.25,
    jump: 4.6,
});

bird.setJump = function(n = new Number()){
    this.jump = n;
}

bird.update = function () {
    // make the animation slowly on Get Ready state
    this.period = (game.stateIsEqual(1) || game.stateIsEqual(4)) ? 10 : 5;
    // increase frame for each period
    this.frame += game.getFrames() % this.period === 0 ? 1 : 0;
    // reset frame for 0 when it goes beyond animation length(loop of animation)
    this.frame = this.frame % this.animation.length;

    //moviment
    if (game.stateIsEqual(1) || game.stateIsEqual(4)) {
        this.y = 150; // reset bird position after game over
        this.speed = 0; // reset speed after game over
        pipes.position = []; // reset pipes
        this.rotation = 0 * this.DEGREE; //reset rotation
    } else {
        this.speed += this.gravity;
        this.y += this.speed;
        //collision floor
        if (this.y + this.h / 2 >= game.height - fg.h) {
            this.y = game.height - fg.h - this.h / 2;
            //GAME OVER
            if (game.stateIsEqual(2)) {
                game.setState(3);
                //fade in/out
                game.changeScreens(3);
            }
        }
        //collision sky
        if(this.y + this.h /2 <= 0){
            this.y = this.y + this.h /2;
        }
        //collision pipe
        let currentPipe = pipes.position[0];
        if( currentPipe && this.x >= currentPipe.x && this.x < currentPipe.x + pipes.w){
            if(this.y < currentPipe.y + pipes.h || this.y > currentPipe.y + pipes.h + pipes.gap){
                if (game.stateIsEqual(2)) {
                    game.setState(3);
                    //fade in/out
                    game.changeScreens(3);
                }
            }

        }

        if (this.speed >= this.jump) {
            this.rotation = 90 * this.DEGREE;
            this.frame = 1;
        } else {
            this.rotation = -25 * this.DEGREE;
        }

    }
}

bird.draw = function (ctxT) {
    let bird = this.animation[this.frame];
    ctxT.save(); //saves the current state of the canvas
    ctxT.translate(this.x, this.y); //change the bird to the origen of the canvas (0,0)
    ctxT.rotate(this.rotation); //rotate the canvas 'this.rotation' this.DEGREEs
    ctxT.drawImage(this.img, bird.sX, bird.sY, this.w, this.h, -this.w / 2, -this.h / 2, this.w, this.h);
    ctxT.restore(); //reset canvas state to the last save
}

bird.flap = function(){
    this.speed = -this.jump;
    flapSound.play();
}

//!End sprites