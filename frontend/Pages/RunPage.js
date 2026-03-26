import { GridEnvironment } from "../Environment/GridEnvironment/GridEnvironment.js";
import { Runbar } from "../Control/Runbar.js";
import { Controller } from "../Control/Controller.js";

export class RunPage {
    constructor() {
        // page control 
        this.textColour = [0];
        let cumulativeHeight = 0;

        // controller
        this.controller = new Controller(this);

        // settings attributes - setting state object?
        // instantiate with or load state after?
        this.gridRows = window.settingState.rows;
        this.gridColumns = window.settingState.columns;
        // this.walls;
        
        // runbar
        let runbarThickness = windowHeight / 20;
        this.runbar = new Runbar(this, this.controller, 0, cumulativeHeight, windowWidth, runbarThickness);
        cumulativeHeight += this.runbar.h;

        // grid environment
        let gridMarginX = windowWidth / 8;
        let gridMarginY = windowHeight / 20;
        // TODO re-calculate width
        let gridWidth = windowWidth - 2*gridMarginX;
        this.gridEnvironment = new GridEnvironment(this, this.runbar, this.gridRows, this.gridColumns, gridMarginX, cumulativeHeight + gridMarginY, gridWidth, gridWidth * this.gridColumns / this.gridRows);
        cumulativeHeight += this.gridEnvironment.h + gridMarginY;

    }

    mousePressed(mX, mY) {
        if (this.runbar.mouseOver(mX, mY)) {
            this.runbar.handleClick(mX, mY);
            return;
        }
    }

    draw() {
        background(100);
        this.runbar.draw();
        this.gridEnvironment.draw();
    }

    updateGrid(type, row, column) {
        // take step from controller and update grid environment
        this.gridEnvironment.updateNode(type, row, column);
    }

    clearGrid() {
        let newGrid = this.gridEnvironment.createResize(this.gridRows, this.gridColumns);
        this.gridEnvironment = newGrid;
    }
}