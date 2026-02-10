export class Icon {
    constructor(toolbar, position) {
        this.iconSize = toolbar.iconSize;
        this.padding = toolbar.padding;
        this.position = position;

        this.x = this.position * (this.iconSize + this.padding) + this.padding;
        this.y = this.padding / 2;
        this.w = this.iconSize;
        this.h = this.iconSize;
        this.text = "▶";

        this.colour = [200];
    }

    draw() {
        push();
        fill(...this.colour);
        rect(this.x, this.y, this.w, this.h, 5);

        textAlign(CENTER, CENTER);
        fill(0);
        strokeWeight(1);
        text(this.text, this.x, this.y, this.w, this.h);
        pop();
    }

    mouseOver(mX, mY) {
        if (mX < this.x) return false;
        if (mX > this.x + this.w) return false;
        if (mY < this.y) return false;
        if (mY > this.y + this.h) return false;
        return true;
    }

    onClick() {
        console.error("onClick must be run by a subclass");
    }
}