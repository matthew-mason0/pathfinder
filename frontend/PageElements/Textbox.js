export class Textbox {
    constructor(container, x, y, w, h) {
        this.container = container;
        this.x = x;
        this.y = y;
        this.w = w;        
        this.h = h;

        this.margin = 0;
        this.text = null;

        this.textSize = 0;
        this.font = window.mainFont
    }

    draw() {
        push();
        if (!this.text) return;
        fill(255, 240);
        rect(this.x, this.y, this.w, this.h, 10);

        fill(255, 0, 0);
        textSize(this.textSize);
        textAlign(LEFT, TOP);
        text(this.text, this.x + this.margin, this.y + this.margin, this.w - this.margin, this.h - this.margin);
        pop();
    }

    setText(text) {
        this.text = text;
        this.textSize = this.calculateTextSize(this.text, this.w, this.h, 100);
    }

    setMargin(margin) {
        this.margin = margin;
    }
    setPosition(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;        
        this.h = h;
        if (this.text) this.textSize = this.calculateTextSize(this.text, this.w, this.h, 100);
    }

    calculateTextSize(str, maxWidth, maxHeight, startSize) {
        // take starting size as upper bound
        let size = startSize;
        textFont(this.font);
        textSize(size);
        while (true){
            const bounds = this.font.textBounds(str, 0, 0, size);
            if (bounds.w <= maxWidth && bounds.h <= maxHeight) break;

            size--;
            if (size <= 1) break;
            textSize(size);
        }
        return 16; // hard code
    }

}