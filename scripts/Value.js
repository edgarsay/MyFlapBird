class Value {
    constructor({
        currentValue = new Number(0),
        toFixed = new Number(0),
        maxValue = new Number(0),
        minValue = new Number(0),
        modifierValue = new Number(0),
        options = new Array(),
        frame = new Sprite(),
    }){
        this.currentValue = currentValue;
        this.toFixed = toFixed;
        this.minValue = minValue;
        this.maxValue = maxValue;
        this.options = options;
        this.modifierValue = modifierValue;
        this.frame = frame;
        if(options.length !== 0){
            this.modifierValue = 1;
            min = 0;
            man = options.length;
        }
    }

    setCurrentValue(n = new Number){
        this.currentValue = Math.min(this.maxValue, Math.max(this.minValue, n));
    }

    ArrowRight(){
        let n = this.currentValue + this.modifierValue;
        this.setCurrentValue(n);
    }

    ArrowLeft(){
        let n = this.currentValue - this.modifierValue;
        this.setCurrentValue(n);
    }

    draw(ctxT){
        this.frame.draw(ctxT);
        ctxT.save();
        ctxT.fillStyle = "white"
        ctxT.font = "19px undertale";
        let v = this.options.length === 0 ? this.currentValue : this.options[this.currentValue];
        v = typeof v === 'number' ? v.toFixed(this.toFixed) : v;
        ctxT.fillText( v, this.frame.x + 10, this.frame.y + 20, this.frame.w);
        ctxT.restore();
    }
}