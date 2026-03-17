import { GridEnvironment } from "../EnvironmentPage/GridEnvironment/GridEnvironment";

export class RunPage {
    constructor() {
        // page control 
        this.textColour = [0];
        let cumulativeHeight = 0;

        // settings attributes - setting state object?
        // instantiate with or load state after?
        this.gridRows = 10;
        this.gridColumns = 10;
        // this.walls;

        // simulation controller
        // TODO create new controller class
        // this.controller = new Controller();

        // toolbar
        let toolbarThickness = windowHeight / 20;
        this.toolbar = new Toolbar(this, 0, cumulativeHeight, windowWidth, toolbarThickness);
        cumulativeHeight += this.toolbar.h;

        // grid environment
        let gridMarginX = windowWidth/8;
        let gridMarginY = windowHeight / 20;
        // TODO re-calculate width
        let gridWidth = windowWidth - 2*gridMarginX;
        this.gridEnvironment = new GridEnvironment(this, this.toolbar, this.gridRows, this.gridColumns, gridMarginX, cumulativeHeight + gridMarginY, gridWidth, gridWidth * this.gridColumns / this.gridRows);
        cumulativeHeight += this.gridEnvironment.h + gridMarginY;

        // this.socket;
        // this.inputHandler ?
    }

    loadSettings(settingState) {

    }

    mousePressed(mX, mY) {

    }

    draw() {
        background(200);
    }
}