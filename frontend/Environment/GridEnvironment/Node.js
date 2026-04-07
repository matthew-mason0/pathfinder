export class Node {
    constructor(environment, i, j, x, y, w, h) {
        this.environment = environment;
        this.i = i;
        this.j = j;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.type = "EMPTY";
        this.selected = true;

        this.colours = {
            EMPTY: [255],
            DISCOVERED: [173, 216, 230],
            EXPLORED: [0, 0, 128],
            WALL: [0, 0, 35],
            START: [0, 255, 0],
            END: [255, 0, 0],
            PATH: [255, 215, 0]
        };
    }

    mouseOver(mX, mY) {
        if (mX < this.x) return false;
        if (mX > this.x + this.w) return false;
        if (mY < this.y) return false;
        if (mY > this.y + this.h) return false;
        return true;
    }

    setType(mode) {
        if (mode === "WALL") {
            if (this.type === "WALL") this.type = "EMPTY";
            else if (this.type === "EMPTY") this.type = "WALL";
            window.settingState.updateWall(this.i, this.j);
            return;
        }
        this.type = mode;
        if (mode === "START") {
            this.environment.updateStart(this);
            window.settingState.updateStart(this.i, this.j);
        }
        if (mode === "END") {
            this.environment.updateEnd(this);
            window.settingState.updateEnd(this.i, this.j);
        }
    }

    draw() {
        push();
        let colour = this.colours[this.type];
        fill(...colour);
        stroke(...this.inverseColour(colour));
        rect(this.x, this.y, this.w, this.h);
        pop();
    }

    setPosition(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    inverseColour(colour) {
        return colour.map(c => 255 - c);
    }
}