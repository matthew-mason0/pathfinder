import { Cell } from "./Cell.js";

export class Grid {
    constructor(rows, columns) {
        this.rows = rows;
        this.columns = columns;
        this.cells = [];
        for (let y = 0; y < this.rows; y++) {
            this.cells[y] = [];
            for (let x = 0; x < this.columns; x++) {
                this.cells[y][x] = new Cell(x, y);
            }
        }
    }

    getCell(x, y) {
        return this.cells[y][x];
    }

    setCellType(x, y, type) {
        const cell = this.getCell(x, y);
        if (!cell) return;
        cell.type = type;
    }
}