export class RunbarIcon {
    constructor(container, x, y, w, h) {
        this.container = container;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.onClickAction = null;
        this.label = "LOAD";
        this.textSize = 0;
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

    setPosition(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.textSize = this.calculateTextSize(this.label, this.w, this.h, 100);
    }

    draw() {
        push();
        rect(this.x, this.y, this.w, this.h);
        if (!this.label){
            pop();
            return;
        }
        textAlign(CENTER, CENTER);
        textSize(this.textSize);
        fill(0);
        noStroke();
        text(this.label, this.x, this.y, this.w, this.h);
        pop();
    }

    calculateTextSize(str, maxWidth, maxHeight, startSize) {
        // take starting size as upper bound
        let size = startSize;
        textSize(size);

        while (textWidth(str) > maxWidth || textAscent() + textDescent() > maxHeight) {
            size--;
            textSize(size);
            if (size <= 1) break;
        }
        return size;
    }
}