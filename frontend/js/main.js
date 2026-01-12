let grid;
let renderer;

function setup() {
	createCanvas(windowWidth, windowHeight);
	grid = new Grid(10, 10);
	renderer = new GridRenderer(40);
	testVisuals();
}

function draw() {
  	background(50);
	renderer.draw(grid);
}

function testVisuals() {
	grid.getCell(2, 3).type = "WALL";
	grid.getCell(0, 0).type = "START";
	grid.getCell(9, 9).type = "GOAL";
}