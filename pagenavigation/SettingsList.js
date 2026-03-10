export class SettingsList {
    constructor(container, x, y, w, h) {
        this.container = container;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.list = [];
    }

    draw() {
        push();
        noFill();
        stroke(...this.container.textColour);
        rect(this.x, this.y, this.w, this.h);

        
        pop();
    }
}