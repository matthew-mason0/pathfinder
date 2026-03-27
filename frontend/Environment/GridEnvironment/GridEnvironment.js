import { Node } from "./Node.js";

export class GridEnvironment {
    constructor(container, toolbar, rows, columns, x, y, w, h) {
        this.container = container;
        this.toolbar = toolbar;
        this.x = x;            
        this.y = y;
        this.w = w;
        this.h = h;

        this.rows = rows;
        this.columns = columns;

        this.nodes = [];
        let nodeW = this.w / this.columns;
        let nodeH = this.h / this.rows;

        for (let row = 0; row < this.rows; row++) {
            this.nodes[row] = [];
            for (let column = 0; column < this.columns; column++) {
                this.nodes[row][column] = new Node(this, row, column, this.x + column * nodeW, this.y + row * nodeH, nodeW, nodeH);
            }
        }

        this.startNode = this.nodes[0][0];
        this.endNode = this.nodes[this.rows - 1][this.columns - 1];
    }

    mouseOver(mX, mY) {
        if (mX < this.x) return false;
        if (mX > this.x + this.w) return false;
        if (mY < this.y) return false;
        if (mY > this.y + this.h) return false;
        return true;
    }

    handleClick(mX, mY) {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                if (this.nodes[i][j].mouseOver(mX, mY)) {
                    this.nodes[i][j].setType(this.toolbar.selectedOperation);

                    // update settingState
                    switch (this.toolbar.selectedOperation) {
                        case "START":
                            window.settingState.updateStart(i, j);
                            break;
                        case "END":
                            window.settingState.updateEnd(i, j);
                            break;
                        case "WALL":
                            window.settingState.updateWall(i, j);
                        default:
                            break;
                    }
                    break;
                }
            }
        }
    }

    updateStart(newStart) {
        if (this.startNode === newStart) return;
        this.startNode.setType("EMPTY");
        this.startNode = newStart;
    }
    updateEnd(newEnd) {
        if (this.endNode === newEnd) return;
        this.endNode.setType("EMPTY");
        this.endNode = newEnd;
    }
    updateNode(type, row, column) {
        console.log(this.nodes[row][column]);
        try {
            this.nodes[row][column].setType(type);
        } catch (e) {
            console.warn("Invalid index for node update");
        }
    }

    createResize(rows, columns) {
        return new GridEnvironment(this.container, this.toolbar, rows, columns, this.x, this.y, this.w, this.h);
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