import { GridEnvironment } from "../Environment/GridEnvironment/GridEnvironment.js";
import { Runbar } from "../Control/Runbar.js";

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

        // toolbar
        let toolbarThickness = windowHeight / 20;
        this.runbar = new Runbar(this, 0, cumulativeHeight, windowWidth, toolbarThickness);
        cumulativeHeight += this.runbar.h;

        // grid environment
        let gridMarginX = windowWidth / 8;
        let gridMarginY = windowHeight / 20;
        // TODO re-calculate width
        let gridWidth = windowWidth - 2*gridMarginX;
        this.gridEnvironment = new GridEnvironment(this, this.toolbar, this.gridRows, this.gridColumns, gridMarginX, cumulativeHeight + gridMarginY, gridWidth, gridWidth * this.gridColumns / this.gridRows);
        cumulativeHeight += this.gridEnvironment.h + gridMarginY;
    }

    loadSettings(settingState) {

    }

    mousePressed(mX, mY) {
        if (this.toolbar.mouseOver(mX, mY)) {
            this.toolbar.handleClick(mX, mY);
            return;
        }
    }

    draw() {
        background(100);
        this.runbar.draw();
        this.gridEnvironment.draw();
    }

    handleUpdate() {
        // take step from controller and update grid environment
    }
}