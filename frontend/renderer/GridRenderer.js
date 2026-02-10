import { CellType } from "../constants/CellType.js";

export class GridRenderer {
    constructor(grid, x, y, w, h) {
        this.grid = grid;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.cellSize = min(this.w, this.h) / max(this.grid.rows, this.grid.columns);

        this.colours = {
            [CellType.EMPTY]: [255],
            [CellType.WALL]: [40],
            [CellType.START]: [0, 200, 0],
            [CellType.GOAL]: [200, 0, 0],
            [CellType.VISITED]: [150, 150, 255],
            [CellType.FRONTIER]: [0, 150, 255],
            [CellType.PATH]: [255, 255, 0],
            [CellType.AGENT]: [255, 165, 0]
        };
    }

    draw() {
        push();
        for (let row = 0; row < this.grid.rows; row++) {
            for (let column = 0; column < this.grid.columns; column++) {
                this.drawCell(this.grid.getCell(row, column));
            }
        }
        
        noFill();
        stroke(0);
        strokeWeight(2);
        rect(this.x, this.y, this.w, this.h);
        pop();
    }

    drawCell(cell) {
        let size = this.cellSize;
        let colour = this.colours[cell.type] || [255]; // white default
        stroke(200);
        strokeWeight(1);
        fill(...colour);
        rect(this.x + cell.row * size, this.y + cell.column * size, size, size);
    }
}