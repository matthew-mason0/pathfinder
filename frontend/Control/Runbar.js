import { RunbarIcon } from "./RunbarIcon.js";

export class Runbar {
    constructor(container, x, y, w, h) {
        this.container = container;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.icons = [];

        let iconMarginX = this.w / 30;
        let iconMarginY = this.h / 10;
        let iconW = min(this.w - 4 * iconMarginX, this.w / 5);
        let iconH = this.h - 2 * iconMarginY;

        this.loadIcon = new RunbarIcon(this, iconMarginX, iconMarginY, iconW, iconH);
        this.loadIcon.setLabel("LOAD");
        this.loadIcon.setOnClick(() => {
            // TODO handle load button press
            return;
        });
        this.icons.push(this.loadIcon);

        this.runIcon = new RunbarIcon(this, 3 * iconMarginX + iconW, iconMarginY, iconW, iconH);
        this.runIcon.setLabel("RUN");
        this.runIcon.setOnClick(() => {
            // TODO handle run button press
            return;
        });
        this.icons.push(this.runIcon);

        this.closeIcon = new RunbarIcon(this, 5 * iconMarginX + 2 * iconW, iconMarginY, iconW, iconH);
        this.closeIcon.setLabel("EXIT");
        this.closeIcon.setOnClick(() => {
            window.closeRunPage();
            return;
        });
        this.icons.push(this.closeIcon);
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