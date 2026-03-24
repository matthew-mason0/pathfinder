import { SocketClient } from "./SocketClient.js";
import { StepQueue } from "./StepQueue.js";

export class Controller {
    constructor(container) {
        this.container = container;
        this.stepQueue = new StepQueue();
        console.log("The stepQueue is this: " + this.stepQueue);
        this.socket = new SocketClient("ws://localhost:1234", this);
        this.socket.connect();

        this.stepsLoaded = false;
        
        this.runInterval = null;
    }

    sendConfigRules() {
        this.socket.send(JSON.stringify(window.settingState));
    }

    loadSteps() {
        // this.socket.send(JSON.stringify(window.settingState));
        this.socket.send("RUN");
    }

    loadMessage(msg) {
        // TODO validate stepQueue
        this.stepQueue.enqueue(msg);
    }

    finishLoad() {
        // TODO display load finished
        this.stepsLoaded = true;
    }

    runSteps() {
        if (!this.stepsLoaded) {
            // TODO display error
            return;
        }
        // TODO take from stepQueue and pass to page to handle
        
        this.runInterval = setInterval(() => this.runStep(), 10);
        
        // let type;
        // let nodeId;
        // let nodeRow;
        // let nodeColumn;
        // let nodeList;
        // 
        // for (let msg = this.stepQueue.dequeue(); !this.stepQueue.isEmpty(); msg = this.stepQueue.dequeue()) {
        //     switch (msg.type) {
        //         case "ALGORITHM_START":
        //             nodeRow = msg.nodeRow;
        //             nodeColumn = msg.nodeColumn;
        //             // TODO check that start node align to report misconfig error
        //             break;
        //         case "NODE_DISCOVERED":
        //             nodeRow = msg.nodeRow;
        //             nodeColumn = msg.nodeColumn;
        //             console.log("Node discovered: (" + nodeRow + ", " + nodeColumn + ")");
        //             this.container.updateGrid("DISCOVERED", nodeRow, nodeColumn);
        //             break;
        //         case "NODE_EXPLORED":
        //             nodeRow = msg.nodeRow;
        //             nodeColumn = msg.nodeColumn;
        //             this.container.updateGrid("EXPLORED", nodeRow, nodeColumn);
        //             break;
        //         case "FRONTIER_UPDATE":
        //             nodeList = msg.nodeList;
        //             for (let node of nodeList) {
        //                 const [nodeRow, nodeColumn] = node
        //                 .replace(/[()]/g, "")
        //                 .split(",")
        //                 .map(Number);
        //                 console.log("Frontier update element: (" + nodeRow + ", " + nodeColumn + ")");
        //                 this.container.updateGrid("DISCOVERED", nodeRow, nodeColumn);
        //             }
        //             break;
        //         case "PATH_FOUND":
        //             nodeList = msg.nodeList;
        //             for (let node of nodeList) {
        //                 const [nodeRow, nodeColumn] = node
        //                 .replace(/[()]/g, "")
        //                 .split(",")
        //                 .map(Number);
        //                 console.log("Path update element: (" + nodeRow + ", " + nodeColumn + ")");
        //                 this.container.updateGrid("PATH", nodeRow, nodeColumn);
        //             }
        //             break;
        //         case "ALGORITHM_END":
        //             break;
        //         default:
        //             break;
        //     }
        // }
    }

    runStep() {
        if (this.stepQueue.isEmpty()) {
            clearInterval(this.runInterval);
            return;
        }

        let step = this.stepQueue.dequeue();

        let type = step.type;
        let nodeId;
        let nodeRow;
        let nodeColumn;
        let nodeList;
        
        
        switch (step.type) {
            case "ALGORITHM_START":
                nodeRow = step.nodeRow;
                nodeColumn = step.nodeColumn;
                // TODO check that start node align to report misconfig error
                break;
            case "NODE_DISCOVERED":
                nodeRow = step.nodeRow;
                nodeColumn = step.nodeColumn;
                console.log("Node discovered: (" + nodeRow + ", " + nodeColumn + ")");
                this.container.updateGrid("DISCOVERED", nodeRow, nodeColumn);
                break;
            case "NODE_EXPLORED":
                nodeRow = step.nodeRow;
                nodeColumn = step.nodeColumn;
                this.container.updateGrid("EXPLORED", nodeRow, nodeColumn);
                break;
            case "FRONTIER_UPDATE":
                nodeList = step.nodeList;
                for (let node of nodeList) {
                    const [nodeRow, nodeColumn] = node
                    .replace(/[()]/g, "")
                    .split(",")
                    .map(Number);
                    console.log("Frontier update element: (" + nodeRow + ", " + nodeColumn + ")");
                    this.container.updateGrid("DISCOVERED", nodeRow, nodeColumn);
                }
                break;
            case "PATH_FOUND":
                nodeList = step.nodeList;
                for (let node of nodeList) {
                    const [nodeRow, nodeColumn] = node
                    .replace(/[()]/g, "")
                    .split(",")
                    .map(Number);
                    console.log("Path update element: (" + nodeRow + ", " + nodeColumn + ")");
                    this.container.updateGrid("PATH", nodeRow, nodeColumn);
                }
                break;
            case "ALGORITHM_END":
                break;
            default:
                break;
        }
    }

    reset() {
        this.socket.close();

        this.stepQueue = new StepQueue();
        this.stepsLoaded = false;

        this.socket = new SocketClient("ws://localhost:1234", this);
    }
}