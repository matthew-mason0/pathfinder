import { Icon } from "./Icon.js";

export class Toolbar {
    constructor(container, x, y, w, h) {
        this.container = container;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.icons = [];
        let iconMargin = this.h / 10;
        let iconW = this.h - iconMargin * 2;
        let position = 0;
        // TODO: fix positioning
        const wallIcon = new Icon(this, "WALL", this.x + iconMargin/2, this.y + iconMargin/2, iconW, iconW);
        this.icons.push(wallIcon);

        this.selectedOperation = "START";
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