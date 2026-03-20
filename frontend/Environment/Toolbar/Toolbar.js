import { Icon } from "./Icon.js";

export class Toolbar {
    constructor(container, x, y, w, h) {
        this.container = container;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.icons = [];
        this.iconMargin = this.h/4;
        this.iconW = this.h - this.iconMargin;
        this.iconPosition = 0;
        // TODO: fix positioning

        this.selectedOperation = "START";
    }

    addIcon(operation) {
        const x = this.x + (this.iconPosition+1) * this.iconMargin/2 + this.iconPosition * this.iconW;
        const y = this.y + this.iconMargin/2;
        const newIcon = new Icon(this, operation, x, y, this.iconW, this.iconW);
        this.icons.push(newIcon);
        this.iconPosition++;
    }

    mouseOver(mX, mY) {
        if (mX < this.x) return false;
        if (mX > this.x + this.w) return false;
        if (mY < this.y) return false;
        if (mY > this.y + this.h) return false;
        return true;
    }

    handleClick(mX, mY) {
        for (let icon of this.icons) {
            if (icon.mouseOver(mX, mY)) {
                icon.onClick();
                break;
            }
        }
    }

    draw() {
        push();
        fill(100);
        stroke(0);
        rect(this.x, this.y, this.w, this.h);
        
        for (let i = 0; i < this.icons.length; i++) {
            this.icons[i].draw();
        }
        pop();
    }
}