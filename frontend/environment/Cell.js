import { CellType } from "../constants/CellType.js";

export class Cell {
    constructor(row, column, type = CellType.EMPTY) {
        this.row = row;
        this.column = column;
        //TODO validate type;
        this.type = type;
    }
}