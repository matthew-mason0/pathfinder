export class Controller {
    constructor(stepQueue, messageHandler) {
        this.state = "IDLE";
        this.stepQueue = stepQueue;
        this.messageHandler = messageHandler;
        this.socket = window.socket;
        this.intervalID = null;
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
        this.intervalID = setInterval(() => this.step(), 5);

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
            clearInterval(this.intervalID);
            return;
        }

        const msg = this.stepQueue.dequeue();
        this.messageHandler.processJson(msg);
    }

    reset() {
        this.socket.send("STOP");
        this.state = "IDLE";
        if (this.intervalID) clearInterval(this.intervalID);
        this.stepQueue.clear();
        // TODO handle reset for non-grid graphs
        const msg = {"type":"CLEAR"};
        this.messageHandler.processJson(msg);
    }
}