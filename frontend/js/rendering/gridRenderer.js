const CellType = {
    EMPTY: "EMPTY",
    WALL: "WALL",
    START: "START",
    GOAL: "GOAL",
    VISITED: "VISITED",
    FRONTIER: "FRONTIER",
    PATH: "PATH"
};

class Cell {
    constructor(x, y, type = CellType.EMPTY) {
        this.x = x;
        this.y = y;
        this.type = type; // EMPTY,WALL,START,END
    }
}

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
}

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
                this.drawCell(grid.getCell(column, row));
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