import { CellType } from "../constants/CellType.js";
export class Controller {
    constructor(stepQueue, messageHandler, environment, renderer) {
        this.environment = environment;
        this.renderer = renderer;

        this.state = "IDLE";
        this.stepQueue = stepQueue;
        this.messageHandler = messageHandler;
        this.socket = window.socket;
        this.intervalID = null;
        this.selectingNode = null;
    }

    load() {
        if (this.state !== "IDLE") {
            console.error("State not IDLE - cannot load");
        }
    }

    run() {
        if (this.state === "RUNNING") return;

        this.state = "RUNNING";
        this.socket.send("RUN");
    }
    
    play() {
        console.log(this.stepQueue);
        window.stepping = true;

        // non-async:
        // let msg;
        // while (!this.stepQueue.isEmpty()) {
        //     msg = this.stepQueue.dequeue();
        //     this.messageHandler.processJson(msg);
        // }
    }

    step() {

        console.log("step function running");

        if (this.stepQueue.isEmpty()) {
            this.state = "IDLE";
            window.stepping = false;
            return;
        }

        const msg = this.stepQueue.dequeue();
        this.messageHandler.processJson(msg);
    }

    reset() {
        window.stepping = false;
        this.socket.send("STOP");
        this.state = "IDLE";

        if (this.intervalID) clearInterval(this.intervalID);
        this.stepQueue.clear();

        // TODO handle reset for non-grid graphs
        // TODO handle clear internally
        const msg = {"type":"CLEAR"};
        this.messageHandler.processJson(msg);
    }

    selectStart() {
        this.selectingNode = "START";
        this.promptNodeSelect();
    }
    selectEnd() {
        this.selectingNode = "END";
        this.promptNodeSelect();
    }

    promptNodeSelect() {
        if (this.state != "IDLE") return;
        console.log("Selecting node");
        const nodes = this.environment.getAll();
        for (let row = 0; row < this.environment.rows; row++) {
            for (let column = 0; column < this.environment.columns; column++) {
                this.environment.setCellType(row, column, CellType.SELECTING);
            }
        }
    }

    unpromptNodeSelect(row, column) {
        this.clearGrid();
        if (!this.selectingNode) return;
        // TODO: Fix Start/End
        this.environment.setCellType(row, column, (this.selectingNode === "END") ? CellType.END : CellType.START);
    }

    clearGrid() {
        this.selectingNode = true;
        const nodes = this.environment.getAll();
        for (let row = 0; row < this.environment.rows; row++) {
            for (let column = 0; column < this.environment.columns; column++) {
                this.environment.setCellType(row, column, CellType.EMPTY);
            }
        }
    }

    mouseOverEnvironment(mX, mY) {
        return this.renderer.mouseOver(mX, mY);
    }
    mousePressedEnvironment(mX, my) {
        let selectedNode = this.renderer.getNodeFromMouse(mX, my);
        const row = selectedNode.x
        const column = selectedNode.y;
        console.log(selectedNode);
        this.unpromptNodeSelect(row, column);
    }
}