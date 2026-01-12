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

class GridRenderer {
    constructor(cellSize) {
        this.cellSize = cellSize;

        this.colours = {
            EMPTY: [255],
            WALL: [40],
            START: [0, 200, 0],
            GOAL: [200, 0, 0],
            VISITED: [150, 150, 255],
            FRONTIER: [0, 150, 255],
            PATH: [255, 255, 0],
            AGENT: [255, 165, 0]
        };
    }

    draw(grid) {
        for (let i = 0; i < grid.rows; i++) {
            for (let j = 0; j < grid.columns; j++) {
                this.drawCell(grid.getCell(i, j));
            }
        }
    }

    drawCell(cell) {
        let size = this.cellSize;
        let colour = this.colours[cell.type] || [255]; // white if undefined
        stroke(200);
        strokeWeight(1);
        fill(...colour);
        rect(cell.x * size, cell.y * size, size, size);
    }
}