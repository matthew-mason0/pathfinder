import { Cell } from "./Cell.js";

export class Grid {
    constructor(rows, columns) {
        this.rows = rows;
        this.columns = columns;
        this.cells = [];
        for (let row = 0; row < this.rows; row++) {
            this.cells[row] = [];
            for (let column = 0; column < this.columns; column++) {
                this.cells[row][column] = new Cell(row, column);
            }
        }
    }

    getCell(row, column) {
        return this.cells[row][column];
    }

    setCellType(row, column, type) {
        const cell = this.getCell(row, column);
        if (!cell) return;
        cell.type = type;
    }
}