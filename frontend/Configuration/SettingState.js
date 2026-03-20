import { GridState } from "./GridState.js";

export class SettingState {
    constructor() {
        this.rows = 10;
        this.columns = 10;
        this.gridState = new GridState(10, 10);

        this.algorithm = "BFS";
        this.heuristic = "Manhattan";
        this.timer = false;
        this.stepCounter = false;
    }
}