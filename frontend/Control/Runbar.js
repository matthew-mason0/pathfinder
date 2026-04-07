import { RunbarIcon } from "./RunbarIcon.js";

export class Runbar {
    constructor(container, controller, x, y, w, h) {
        this.container = container;
        this.controller = controller;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.icons = [];

        this.loadIcon = new RunbarIcon(this, 0, 0, 0, 0);
        this.icons.push(this.loadIcon);
        this.runIcon = new RunbarIcon(this, 0, 0, 0, 0);
        this.icons.push(this.runIcon);
        this.stepIcon = new RunbarIcon(this, 0, 0, 0, 0);
        this.icons.push(this.stepIcon);
        this.pauseIcon = new RunbarIcon(this, 0, 0, 0, 0);
        this.icons.push(this.pauseIcon);
        this.resetIcon = new RunbarIcon(this, 0, 0, 0, 0);
        this.icons.push(this.resetIcon);
        this.closeIcon = new RunbarIcon(this, 0, 0, 0, 0);
        this.icons.push(this.closeIcon);

        this.initialiseIcons();
    }

    initialiseIcons() {
        this.loadIcon.setLabel("LOAD");
        this.loadIcon.setOnClick(() => {
            this.controller.reset();
            this.controller.loadSteps();
            return;
        });

        this.runIcon.setLabel("RUN");
        this.runIcon.setOnClick(() => {
            this.controller.runAllSteps();
            this.container.displayTextbox();
            return;
        });

        this.stepIcon.setLabel("STEP");
        this.stepIcon.setOnClick(() => {
            this.controller.runStep();
            return;
        });

        this.pauseIcon.setLabel("PAUSE");
        this.pauseIcon.setOnClick(() => {
            this.controller.pauseRun();
            return;
        });

        this.resetIcon.setLabel("RESET");
        this.resetIcon.setOnClick(() => {
            this.controller.reset();
            return;
        });
        
        this.closeIcon.setLabel("EXIT");
        this.closeIcon.setOnClick(() => {
            window.closeRunPage();
            return;
        });
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

        const marginH = this.h / 10;
        const iconH = this.h - 2 * marginH;
        const iconW = iconH * 6 / 5;
        const marginW = iconW * 2 / 5;

        let cursor = this.x + marginW;
        for (let i = 0; i < this.icons.length; i++) {
            this.icons[i].setPosition(cursor, this.y + marginH, iconW, iconH);
            cursor += iconW + marginW;
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