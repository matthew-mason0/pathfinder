import { RunIcon } from "./RunIcon.js";
import { ResetIcon } from "./ResetIcon.js";
import { SelectStartIcon } from "./SelectStartIcon.js";
import { SelectEndIcon } from "./SelectEndIcon.js";

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
        this.selectStartIcon = new SelectStartIcon(this, position++, this.controller);
        this.selectEndIcon = new SelectEndIcon(this, position++, this.controller);
        this.icons = [this.runIcon, this.resetIcon, this.selectStartIcon, this.selectEndIcon];
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
        if (this.runIcon.mouseOver(mX, mY)) {
            this.runIcon.onClick();
        }
        if (this.resetIcon.mouseOver(mX, mY)) {
            this.resetIcon.onClick();
        }
        if (this.selectStartIcon.mouseOver(mX, mY)) {
            this.selectStartIcon.onClick();
        }
        if (this.selectEndIcon.mouseOver(mX, mY)) {
            this.selectEndIcon.onClick();
        }
    }
}