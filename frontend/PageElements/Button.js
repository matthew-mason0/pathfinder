export class Button {
    constructor(text, x, y, w, h) {
        this.image = null;
        this.text = text;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        // to be configured
        this.fillColour = [100]; // as array
        this.strokeColour = [0]; // as array
        this.textColour = [0]; // as array
        this.r = min(windowWidth, windowHeight) / 30;
        this.textSize = 0;
        this.onClickAction = null;
    }

    mouseOver(mX, mY) {
        if (mX <= this.x) return false;
        if (mX >= this.x + this.w) return false;
        if (mY <= this.y) return false;
        if (mY >= this.y + this.h) return false;
        return true;
    }

    onClick() {
        if (this.onClick) this.onClickAction();
    }

    setPosition(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.r = min(windowWidth, windowHeight) / 30;
        this.textSize = this.calculateTextSize(this.text, this.w*0.8, this.h*0.8, 100);
    }

    setImage(image) {
        this.image = image;
    }

    draw() {
        push();
        if (this.image != null) {
            image(this.image, this.x, this.y, this.w, this.h);
            return;
        }

        // button
        fill(...this.fillColour);
        stroke(...this.strokeColour);
        strokeWeight(1);
        rect(this.x, this.y, this.w, this.h, this.r);

        //label
        textAlign(CENTER, CENTER);
        textSize(this.textSize);
        noStroke();
        fill(...this.textColour);
        text(this.text, this.x, this.y, this.w, this.h);
        pop();
    }

    setFillColour(fillColour) {
        this.fillColour = fillColour;
    }
    setStrokeColour(strokeColour) {
        this.strokeColour = strokeColour;
    }
    setTextColour(textColour) {
        this.textColour = textColour;
    }
    setR(r) {
        this.r = r;
    }
    setOnClickAction(action) {
        this.onClickAction = action;
    }

    calculateTextSize(str, maxWidth, maxHeight, startSize) {
        // take starting size as upper bound
        let size = startSize;
        textSize(size);
        while (true){
            const bounds = window.mainFont.textBounds(str, 0, 0, size);
            if (bounds.w <= maxWidth && bounds.h <= maxHeight) break;

            size--;
            if (size <= 1) break;
            textSize(size);
        }
        return size;
    }
}