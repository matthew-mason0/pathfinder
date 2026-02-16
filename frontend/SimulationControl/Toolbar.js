import { RunIcon } from "./RunIcon.js";
import { ResetIcon } from "./ResetIcon.js";

export class Toolbar {
    constructor(controller) {
        this.controller = controller;

        this.thickness = windowHeight/20;
        this.iconSize = this.thickness * 4/5;
        this.padding = this.iconSize / 4;

        this.colour = [140];
        
        let position = 0;
        this.runIcon = new RunIcon(this, position++, this.controller);
        this.resetIcon = new ResetIcon(this, position++, this.controller);
        this.icons = [this.runIcon, this.resetIcon];
    }

    draw() {
        push();
        strokeWeight(1);
        stroke(0);
        fill(...this.colour);
        rect(0, 0, windowWidth, this.thickness);

        for (const icon of this.icons) {
            icon.draw();
        }
        pop();
    }

    mouseOver(mX, mY) {
        return mY < this.thickness;
    }

    mousePressed(mX, mY) {
        if (this.runIcon.mouseOver) {
            this.runIcon.onClick();
        }
        if (this.resetIcon.mouseOver) {
            this.resetIcon.onClick();
        }
    }
}