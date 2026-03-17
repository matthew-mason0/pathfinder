import { Grid } from "./environment/Grid.js";
import { GridRenderer } from "./renderer/GridRenderer.js";
import { SocketClient } from "./network/SocketClient.js";
import { MessageHandler } from "./network/MessageHandler.js";
import { StepQueue } from "./network/StepQueue.js";
import { Toolbar } from "./SimulationControl/Toolbar.js";
import { InputHandler } from "./SimulationControl/InputHandler.js";
import { Controller } from "./SimulationControl/Controller.js";

export class RunPage {
    constructor() {
        this.grid = new Grid(10, 10);
        this.renderer = new GridRenderer(this.grid, 100, 100, 400, 400);
        this.controller = new Controller(window.StepQueue, new MessageHandler(grid), this.grid, this.renderer);
        window.socket = new SocketClient("ws://localhost:1234", window.stepQueue, this.controller);
        window.socket.connect();

        this.toolbar = new Toolbar(this.controller);
        this.inputHandler = new InputHandler(this.toolbar, this.controller);
    }

    draw() {
        background(50);
        this.renderer.draw();
        this.toolbar.draw();

        if (window.stepping) {
            this.controller.step();
        }
    }

    mousePressed(mX, mY) {
        this.inputHandler.mousePressed(mX, mY);
    }
}