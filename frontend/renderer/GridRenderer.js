import { CellType } from "../constants/CellType.js";

export class GridRenderer {
    constructor(cellSize) {
        this.cellSize = cellSize;

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

    draw(grid) {
        for (let row = 0; row < grid.rows; row++) {
            for (let column = 0; column < grid.columns; column++) {
                this.drawCell(grid.getCell(row, column));
            }
        }
    }

    drawCell(cell) {
        let size = this.cellSize;
        let colour = this.colours[cell.type] || [255]; // white default
        stroke(200);
        strokeWeight(1);
        fill(...colour);
        rect(cell.x * size, cell.y * size, size, size);
    }
}