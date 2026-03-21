import { SocketClient } from "./SocketClient.js";
import { StepQueue } from "./StepQueue.js";

export class Controller {
    constructor(container) {
        this.container = container;
        this.stepQueue = new StepQueue();
        this.socket = new SocketClient("ws://localhost:1234", this);
        this.socket.connect();

        this.stepsLoaded = false;
    }

    sendConfigRules() {
        this.socket.send(JSON.stringify(window.settingState));
    }

    loadSteps() {
        // this.socket.send(JSON.stringify(window.settingState));
        this.socket.send("RUN");
    }

    handleMessage(msg) {
        // TODO validate and add to stepQueue
    }

    finishLoad() {
        // TODO display load finished
    }

    runSteps() {
        if (!this.stepsLoaded) {
            // TODO display error
            return;
        }
        // TODO take from stepQueue and pass to page to handle
    }

    reset() {
        this.socket.close();

        this.stepQueue = new StepQueue();
        this.stepsLoaded = false;

        this.socket = new SocketClient("ws://localhost:1234", this);
    }
}