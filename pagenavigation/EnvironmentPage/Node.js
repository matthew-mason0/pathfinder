export class Node {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.selected = true;
    }

    mouseOver(mX, mY) {
        if (mX < this.x) return false;
        if (mX > this.x + this.w) return false;
        if (mY < this.y) return false;
        if (mY > this.y + this.h) return false;
        return true;
    }

    onClick() {
        this.selected = !this.selected;
    }

    draw() {
        push();
        fill((this.selected) ? 255 : 0);
        stroke((this.selected) ? 0 : 255);
        rect(this.x, this.y, this.w, this.h);
        pop();
    }
}