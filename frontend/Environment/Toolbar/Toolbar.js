import { Icon } from "./Icon.js";

export class Toolbar {
    constructor(container, x, y, w, h) {
        this.container = container;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.icons = [];

        this.selectedOperation = "START";
    }

    addIcon(operation) {
        const newIcon = new Icon(this, operation, 0, 0, 0, 0);
        this.icons.push(newIcon);
        this.updateIconPostions();
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

    setPosition(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.updateIconPostions();
    }

    updateIconPostions() {
        let iconMargin = this.w / 4;
        let iconW = this.w - iconMargin;
        let icon;
        let x,y;
        for (let iconNumber = 0; iconNumber < this.icons.length; iconNumber++) {
            icon = this.icons[iconNumber];
            x = this.x + (this.w - iconW) / 2;
            y = this.y + iconMargin / 2 + iconNumber * (iconW + iconMargin / 2);
            icon.setPosition(x, y, iconW, iconW);
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