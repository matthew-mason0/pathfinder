import { SocketClient } from "./SocketClient.js";
import { StepQueue } from "./StepQueue.js";

export class Controller {
    constructor(container) {
        this.container = container;
        this.stepQueue = new StepQueue();
        this.socketClient = new SocketClient("ws://localhost:1234", this.stepQueue);
        this.socketClient.connect();
    }

    connectSocketClient() {

    }

    sendConfigRule(rule) {
        // pass rule to socket to send to backend 
    }

    loadSteps() {
        // take from socket and add to stepQueue
    }

    runSteps() {
        // take from stepQueue and pass to page to handle
    }
}