import { SocketClient } from "./websocket/socket.js";
import { Grid, GridRenderer } from "./rendering/gridRenderer.js"
let grid;
let renderer;

window.setup = function () {
	createCanvas(windowWidth, windowHeight);
	grid = new Grid(10, 10);
	renderer = new GridRenderer(40);

	socket = new SocketClient("ws://localhost:1234");
	socket.connect();
};

window.draw = function () {
  	background(50);
	renderer.draw(grid);
};