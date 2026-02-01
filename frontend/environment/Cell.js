import { CellType } from "../constants/CellType.js";

export class Cell {
    constructor(x, y, type = CellType.EMPTY) {
        this.x = x;
        this.y = y;
        //TODO validate type;
        this.type = type;
    }
}