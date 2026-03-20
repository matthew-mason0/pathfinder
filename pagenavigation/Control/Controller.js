export class Controller {
    constructor(container) {
        this.container = container;
        this.stepQueue = new StepQueue();
        this.socketClient = new SocketClient();
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