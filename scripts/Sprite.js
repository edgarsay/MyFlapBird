class Sprite {

    constructor({
        imagePath = new String("img/sprite.png"),
        animation = new Array(),
        //TODO remove this var
        top = {
            sX: 0,
            sY: 0,
        },
        //TODO remove this var
        bottom = {
            sX: 0,
            sY: 0,
        },
        sX = 0,
        sY = 0,
        w = 0,
        h = 0,
        x = 0,
        y = 0,
        dx = 0,
        rotation = 0,
        frame = 0,
        //TODO remove this var
        speed = 0,
        //TODO remove this var
        jump = 0,
        //TODO remove this var
        gravity = 0,
        //TODO remove this var
        gap = 0,
        //TODO remove this var
        maxYPos = -150,
        position = new Array(),
        mulplayDraw = false,
    }) {
        this.DEGREE = Math.PI / 180;
        let tmp = new Image();
        tmp.src = imagePath;
        this.img = tmp;
        this.animation = animation;
        this.top = top;
        this.bottom = bottom;
        this.sX = sX;
        this.sY = sY;
        this.w = w;
        this.h = h;
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.rotation = rotation;
        this.frame = frame;
        this.speed = speed;
        this.jump = jump;
        this.gravity = gravity;
        this.position = position;
        this.gap = gap;
        this.maxYPos = maxYPos;
        this.mulplayDraw = mulplayDraw;
    }

    getX(){
        return this.x;
    }
    setX(n = new Number){
        this.x = n;
    }
    getY(){
        return this.y;
    }
    setY(n = new Number){
        this.y = n;
    }
    
    draw (ctxT) {
        ctxT.drawImage(this.img, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        if(this.mulplayDraw)
            ctxT.drawImage(this.img, this.sX, this.sY, this.w, this.h, this.x + this.w, this.y, this.w, this.h);
    }
    
    update () {
        if (game.stateIsEqual(2)) {
            this.x = (this.x - this.dx) % (this.w / 2);
        }
    }
    //TODO remove this var
    flap () {}
}