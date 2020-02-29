class Display{
    constructor({
        number = '1',
        divId = "one",
        cnvsId = "canvas1",
        width = "320",
        height = "480",
        style = "slideup",
        backgroundColor = "",
        menu = null,
        sprites = new Array(),
        pieces = new Array(),
        keysResponse = {},
    }){
        //tmp
        this.number = number;
        //tmp

        this.divId = divId;
        this.div = document.getElementById(divId);
        this.ctx = document.getElementById(cnvsId).getContext("2d");
        this.width = width;
        this.height = height;
        this.style = style;
        this.backgroundColor = backgroundColor
        this.menu = menu;
        this.pieces = pieces;
        this.sprites = sprites;
        this.keysResponse = keysResponse;
    }

    eventInput(input = new String()){
        if(this.menu){
            return this.menu[input]();
        }
        return this.keysResponse[input]();
    }

    setDivClass(n = new String()){
        document.getElementById(this.divId).className = n;
        if(this.menu){
            this.menu.reset()
        }
    }

    draw(){
        //clear
        clearContext(this.ctx); 
        if(this.backgroundColor != ""){
            this.ctx.fillStyle = this.backgroundColor;
            this.ctx.fillRect(0, 0, game.width, game.height);
        }

        //draw sprites
        for(let sprite of this.sprites){
            sprite.draw(this.ctx);
        }

        //draw pieces
        for(let piece of this.pieces){
            piece.draw(this.ctx);
        }

        //draw menu
        if (this.menu)
            this.menu.draw(this.ctx);
        
        //draw displays number !tmp!
        this.ctx.fillStyle = "red";
        this.ctx.fillText(this.number, game.width/2, game.height/2, 40);
    }
}