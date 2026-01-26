import { connect } from "./websocket/socket.js";
import { Grid, GridRenderer } from "./rendering/gridRenderer.js"
let grid;
let renderer;

window.setup = function () {
	createCanvas(windowWidth, windowHeight);
	grid = new Grid(10, 10);
	renderer = new GridRenderer(40);
	testVisuals();
	connect();
};

window.draw = function () {
  	background(50);
	renderer.draw(grid);
};

function testVisuals() {
	grid.getCell(2, 3).type = "WALL";
	grid.getCell(0, 0).type = "START";
	grid.getCell(9, 9).type = "GOAL";
}