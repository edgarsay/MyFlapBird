class Piece {
    constructor({
        sprite = new Sprite({}),
        adj = {
            x: 0,
            y: 0
        },
        rect = {
            x: 0,
            y: 0,
            w: 0,
            h: 0
        },
        d = {
            x: 0,
            y: 0,
            w: 0,
            h: 0
        },
        a = {
            x: 0,
            y: 0,
            w: 0,
            h: 0
        },
    }) {
        this.sprite = sprite;
        this.adj = adj;
        this.rect = rect;
        //dislocation
        this.d = d;
        //acceleration
        this.a = a;
    }

    draw(ctxT) {
        this.sprite.draw(ctxT);
    }

    adjustment() {
        this.sprite.setX(this.rect.x + this.adj.x);
        this.sprite.setY(this.rect.y + this.adj.y);
    }

    update() {
        let r = this.rect;
        //change d
        this.d.x += this.a.x;
        this.d.y += this.a.y;
        this.d.w += this.a.w;
        this.d.h += this.a.h;
        //change r
        r.x += d.x;
        r.y += d.y;
        r.w += d.w;
        r.h += d.h;
        //update rect
        this.rect = r;
        //update sprite
        this.adjustment();
    }

    boxCollision(a = new Piece({}), b = new Piece({})) {
        let ar = a.rect,
            br = b.rect;
        if (ar.x < br.x + br.w && br.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h)
            return true;
        return false;
    }
    pointCollision(p = {
        x: 0,
        y: 0
    }, b = new HitBox({})) {
        let br = b.rect;
        if (p.x < br.x + br.w && b.x < p.x && p.y < br.y + br.h && b.y < p.y)
            return true;
        return false;
    }
}