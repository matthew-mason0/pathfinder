import { Grid } from "./environment/Grid.js";
import { GridRenderer } from "./renderer/GridRenderer.js";
import { SocketClient } from "./network/SocketClient.js";
import { MessageHandler } from "./network/MessageHandler.js";

let grid;
let renderer;

window.setup = function () {
	createCanvas(windowWidth, windowHeight);
	grid = new Grid(10, 10);
	renderer = new GridRenderer(40);

	window.socket = new SocketClient("ws://localhost:1234");
	window.socket.setHandler(new MessageHandler(grid));
	window.socket.connect();
};

window.draw = function () {
  	background(50);
	renderer.draw(grid);
};