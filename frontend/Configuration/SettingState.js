export class SettingState {
    constructor() {
        this.rows = 10;
        this.columns = 10;

        this.gridState = [];
        for (let row = 0; row < this.rows; row++) {
            this.gridState[row] = [];
            for (let column = 0; column < this.columns; column++) {
                this.gridState[row][column] = "EMPTY";
            }
        }
        
        // not to be copied in backend
        this.startNode = {row: 0, column: 0};
        this.endNode = {row: 9, column: 9};

        this.gridState[this.startNode.row][this.startNode.column] = "START";
        this.gridState[this.endNode.row][this.endNode.column] = "END";

        this.updateEnd(8, 8);

        this.algorithm = "BFS";
        this.heuristic = "Manhattan";
        this.timer = false;
        this.stepCounter = false;
    }

    updateStart(row, column) {
        this.gridState[this.startNode.row][this.startNode.column] = "EMPTY";
        this.startNode.row = row;
        this.startNode.column = column;
        this.gridState[this.startNode.row][this.startNode.column] = "START";
    }
    updateEnd(row, column) {
        this.gridState[this.endNode.row][this.endNode.column] = "EMPTY";
        this.endNode.row = row;
        this.endNode.column = column;
        this.gridState[this.endNode.row][this.endNode.column] = "END";
    }
    addWall(row, column) {
        this.gridState[row][column] = "WALL";
    }
    removeWall(row, column) {
        this.gridState[row][column] = "EMPTY";
    }
    updateWall(row, column) {
        if (this.gridState[row][column] === "WALL") this.removeWall(row, column);
        else this.addWall(row, column);
    }
}