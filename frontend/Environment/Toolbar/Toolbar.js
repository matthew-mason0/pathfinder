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

        const slotH = this.h / this.icons.length;
        const iconH = slotH / 2;
        const iconW = iconH;

        const labelSpace = slotH / 6;
        for (let i = 0; i < this.icons.length; i++) {
            const icon = this.icons[i];
            const slotY = this.y + i * slotH;
            const iconY = slotY + (slotH - (iconH + labelSpace)) / 2;
            const iconX = this.x + (this.w - iconW) / 2;
            icon.setPosition(iconX, iconY, iconW, iconH);

            icon.labelX = this.x + this.w / 2;
            icon.labelY = iconY + iconH + labelSpace;
            icon.labelSize = labelSpace * 3 / 5;
        }
    }

    draw() {
        push();
        fill(100, 100);
        stroke(0);
        rect(this.x, this.y, this.w, this.h, this.w / 10);
        
        for (let i = 0; i < this.icons.length; i++) {
            this.icons[i].draw();
        }
        pop();
    }
}