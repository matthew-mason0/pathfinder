import { Grid } from "./environment/Grid.js";
import { GridRenderer } from "./renderer/GridRenderer.js";
import { SocketClient } from "./network/SocketClient.js";
import { MessageHandler } from "./network/MessageHandler.js";
import { StepQueue } from "./network/StepQueue.js";
import { Toolbar } from "./SimulationControl/Toolbar.js";
import { InputHandler } from "./SimulationControl/InputHandler.js";
import { Controller } from "./SimulationControl/Controller.js";

let grid;
let renderer;
let toolbar;
let inputHandler;
let controller;

window.setup = function () {
	createCanvas(windowWidth, windowHeight);

	window.stepQueue = new StepQueue();

	grid = new Grid(10, 10);
	
	renderer = new GridRenderer(grid, 100, 100, 400, 400);
	
	controller = new Controller(window.stepQueue, new MessageHandler(grid));
	window.socket = new SocketClient("ws://localhost:1234", window.stepQueue, controller);
	window.socket.connect();
	controller.socket = window.socket;

	toolbar = new Toolbar(controller);
	
	inputHandler = new InputHandler(toolbar);
};

window.draw = function () {
  	background(50);
	renderer.draw();
	toolbar.draw();
};

window.mousePressed = function () {
	inputHandler.mousePressed(mouseX, mouseY);
}