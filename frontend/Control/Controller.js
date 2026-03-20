import { SocketClient } from "./SocketClient.js";
import { StepQueue } from "./StepQueue.js";

export class Controller {
    constructor(container) {
        this.container = container;
        this.stepQueue = new StepQueue();
        this.socket = new SocketClient("ws://localhost:1234", this.stepQueue);
        this.socket.connect();
    }

    sendConfigRules() {
        this.socket.send(JSON.stringify(window.settingState));
    }

    loadSteps() {
        this.sendConfigRules();
        // take from socket and add to stepQueue
    }

    runSteps() {
        // take from stepQueue and pass to page to handle
    }
}