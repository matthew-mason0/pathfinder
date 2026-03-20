export class GridState {
    constructor(rows, columns) {
        this.rows = rows;
        this.columns = columns;
        this.grid = [];
        for (let row = 0; row < this.rows; row++) {
            this.grid[row] = [];
            for (let column = 0; column < this.columns; column++) {
                this.grid[row][column] = "EMPTY";
            }
        }
    }

    setByIndex(row, column, value) {
        this.grid[row][column] = value;
    }

    getListOfType(type) {
        const list = [];
        for (let row = 0; row < this.rows; row++) {
            for (let column = 0; column < this.columns; column++) {
                if (this.grid[row][column] === type) list.push({row: row, column:column});
            }
        }
        return list;
    }
}