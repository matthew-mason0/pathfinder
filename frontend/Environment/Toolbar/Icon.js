import { Button } from "../../PageElements/Button.js";

export class Icon extends Button {
    constructor(container, operation, x, y, w, h) {
        super(null, x, y, w, h);
        this.container = container;
        this.operation = operation;
        this.setOnClickAction(() => {
            this.container.selectedOperation = this.operation;
        });
        this.label = operation;
        this.labelX = 0;
        this.labelY = 0;
        this.labelSize = 0;

        this.colours = {
            WALL: [0, 0, 35],
            START: [0, 255, 0],
            END: [255, 0, 0]
        };
    }

    setPosition(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    mouseOver(mX, mY) {
        if (mX < this.x) return false;
        if (mX > this.x + this.w) return false;
        if (mY < this.y) return false;
        if (mY > this.y + this.h) return false;
        return true;
    }

    draw() {
        push();
        let colour = this.colours[this.operation];
        fill(...colour);
        stroke(...colour.map(c => 255 - c));
        rect(this.x, this.y, this.w, this.h, this.r/10);

        if (this.labelSize > 0) {
            textAlign(CENTER, TOP);
            textSize(this.labelSize);
            fill(this.container.container.textColour);
            noStroke();
            text(this.label, this.labelX, this.labelY);
        }
        pop();
    }
}