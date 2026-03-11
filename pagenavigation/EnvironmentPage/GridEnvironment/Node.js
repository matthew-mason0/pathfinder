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
            WALL: [0, 0, 35],
            START: [0, 255, 0],
            END: [255, 0, 0]
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
        switch (mode) {
            case "WALL":
                if (this.type === "WALL") this.type = "EMPTY";
                else if (this.type === "EMPTY") this.type = "WALL";
                break;
            case "START":
                this.type = "START";
                this.environment.updateStart(this);
                break;
            case "END":
                this.type = "END";
                this.environment.updateEnd(this);
                break;
            case "EMPTY":
                this.type = "EMPTY";
                break;
            default:
                break;
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

    inverseColour(colour) {
        return colour.map(c => 255 - c);
    }
}