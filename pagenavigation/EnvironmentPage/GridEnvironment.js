import { Node } from "./Node.js";

export class GridEnvironment {
    constructor(container, x, y, w, h) {
        this.container = container;
        this.x = x;            
        this.y = y;
        this.w = w;
        this.h = h;

        this.rows = 10;
        this.columns = 10;

        this.nodes = [];
        let nodeW = this.w / this.columns;
        let nodeH = this.h / this.rows;

        for (let i = 0; i < this.rows; i++) {
            this.nodes[i] = [];
            for (let j = 0; j < this.columns; j++) {
                this.nodes[i][j] = new Node(this.x + j * nodeW, this.y + i * nodeH, nodeW, nodeH);
            }
        }
    }

    mouseOver(mX, mY) {
        if (mX < this.x) return false;
        if (mX > this.x + this.w) return false;
        if (mY < this.y) return false;
        if (mY > this.y + this.h) return false;
        return true;
    }

    handleClick(mX, mY) {
        console.log("gridEnvironment clicked");
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                if (this.nodes[i][j].mouseOver(mX, mY)) {
                    this.nodes[i][j].onClick();
                    break;
                }
            }
        }
    }

    draw() {
        push();
        noFill();
        stroke(...this.container.textColour);
        rect(this.x, this.y, this.w, this.h);

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                this.nodes[i][j].draw();
            }
        }
        pop();
    }
}