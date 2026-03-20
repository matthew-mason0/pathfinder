export class RunbarIcon {
    constructor(container, x, y, w, h) {
        this.container = container;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.onClickAction = null;
        this.label = "LOAD";
    }


    mouseOver(mX, mY) {
        if (mX < this.x) return false;
        if (mX > this.x + this.w) return false;
        if (mY < this.y) return false;
        if (mY > this.y + this.h) return false;
        return true;
    }

    setLabel(label) {
        this.label = label;
    }

    setOnClick(operation) {
        this.onClickAction = operation;
    }

    onClick() {
        if (!this.onClickAction) return;
        this.onClickAction();
    }

    draw() {
        push();
        rect(this.x, this.y, this.w, this.h);
        if (!this.label){
            pop();
            return;
        }
        textAlign(CENTER, CENTER);
        fill(0);
        noStroke();
        text(this.label, this.x, this.y, this.w, this.h);
        pop();
    }
}