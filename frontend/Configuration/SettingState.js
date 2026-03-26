import { GridState } from "./GridState.js";

export class SettingState {
    constructor() {
        this.rows = 10;
        this.columns = 10;
        this.startNode = {x: 0, y: 0};
        this.endNode = {x: this.rows-1, y: this.columns-1};
        this.gridState = new GridState(10, 10);

        this.algorithm = "BFS";
        this.heuristic = "Manhattan";
        this.timer = false;
        this.stepCounter = false;
    }
}