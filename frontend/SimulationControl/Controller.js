export class Controller {
    constructor(stepQueue, messageHandler) {
        this.state = "IDLE";
        this.stepQueue = stepQueue;
        this.messageHandler = messageHandler;
    }

    load() {
        if (this.state !== "IDLE") {
            console.error("State not IDLE - cannot load");
        }
    }

    run() {
        if (this.state === "RUNNING") return;

        this.state = "RUNNING";
        this.processNext();
        this.intervalID = setInterval(() => this.step, 10);
    }

    step() {
        if (this.stepQueue.isEmpty()) {
            clearInterval(this.intervalID);
            this.state = "IDLE";
            return;
        }

        const msg = this.stepQueue.dequeue();
        this.messageHandler.processJson(msg);
    }
}