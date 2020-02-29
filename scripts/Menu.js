class Menu {
    constructor({
        startPosition = new Number(0),
        buttons = new Array(),
        actions = new Array(0),
        gap = new Number(0),
        frame = new Sprite({}),
        cursor = new Sprite({}),
    }) {
        this.selected = new Number(0);
        this.buttons = buttons
        this.len = buttons.length - 1;
        this.actions = actions;
        this.gap = gap;
        this.frame = frame;
        this.cursor = cursor;
        this.startPosition = startPosition;
        this.cursor.setY(startPosition + (cursor.w/2));
    }

    draw(ctxT) {
        let f = this.frame;
        let b = this.buttons;
        for(let i = 0;i < b.length;++i){
            let y = i * this.gap + this.startPosition;
            f.setY(y);
            f.draw(ctxT);

            ctxT.save();
            ctxT.fillStyle = "white"
            ctxT.font = "19px undertale";
            ctxT.fillText( b[i].text, f.x + 15, f.y + 20, f.w);
            ctxT.restore();

            if(b[i].val){
                b[i].val.frame.setY(y);
                b[i].val.draw(ctxT);
            }
        }
        this.cursor.draw(ctxT);
    }

    reset() {
        this.setSelected(0);
        this.cursor.setY(this.startPosition + this.cursor.w/2);
    }

    setSelected(n = new Number()) {
        this.selected = Math.min(Math.max(n, 0), this.len);
    }

    updateCursorY(){
        let n = (this.startPosition + (this.gap * this.selected)) + this.cursor.w/2 ;
        this.cursor.setY(n);
    }

    ArrowUp() {
        this.setSelected(this.selected - 1);
        this.updateCursorY();
    }

    ArrowDown() {
        this.setSelected(this.selected + 1);
        this.updateCursorY();
    }

    ArrowLeft() {
        let r = this.actions[this.selected]("ArrowLeft");
        if(!r)
            this.reset();
        return r;
    }
    ArrowRight() {
        let r = this.actions[this.selected]("ArrowRight");
        if(!r)
            this.reset();
        return r;
    }
}