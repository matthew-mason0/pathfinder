class Cell {
    constructor(x, y, type = "EMPTY") {
        this.x = x;
        this.y = y;
        this.type = type; // EMPTY,WALL,START,END
    }
}

class Grid {
    constructor(rows, columns) {
        this.rows = rows;
        this.columns = columns;
        this.cells = [];
        for (let i = 0; i < this.rows; i++) {
            this.cells[i] = [];
            for (let j = 0; j < this.columns; j++) {
                this.cells[i][j] = new Cell(i, j);
            }
        }
    }

    getCell(x, y) {
        return this.cells[y][x];
    }
}