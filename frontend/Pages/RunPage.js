import { GridEnvironment } from "../Environment/GridEnvironment/GridEnvironment.js";
import { Runbar } from "../Control/Runbar.js";
import { Controller } from "../Control/Controller.js";
import { Textbox } from "../PageElements/Textbox.js";

export class RunPage {
    constructor() {
        // page control 
        this.textColour = [0];

        // controller
        this.controller = new Controller(this);

        // gridState
        this.gridState = window.settingState.gridState;
        
        // runbar
        this.runbar = new Runbar(this, this.controller, 0, 0, 0, 0);
        
        // grid environment
        this.gridRows = window.settingState.rows;
        this.gridColumns = window.settingState.columns;
        this.gridEnvironment = new GridEnvironment(this, this.runbar, this.gridRows, this.gridColumns, 0, 0, 0, 0);

        // textbox
        this.textbox = new Textbox(this, 0, 0, 0, 0);

        this.recalculateLayout();
    }
    
    updateGrid(type, row, column) {
        // take step from controller and update grid environment
        this.gridEnvironment.updateNode(type, row, column);
    }

    clearGrid() {
        let newGrid = this.gridEnvironment.createResize(this.gridRows, this.gridColumns);
        this.gridEnvironment = newGrid;
    }

    loadConfig() {
        this.gridRows = window.settingState.rows;
        this.gridColumns = window.settingState.columns;
        this.gridState = window.settingState.gridState;

        let newGrid = this.gridEnvironment.createResize(this.gridRows, this.gridColumns);
        for (let row = 0; row < this.gridRows; row++) {
            for (let column = 0; column < this.gridColumns; column++) {
                newGrid.nodes[row][column].type = this.gridState[row][column];
            }
        }

        this.gridEnvironment = newGrid;
    }

    mousePressed(mX, mY) {
        if (this.runbar.mouseOver(mX, mY)) {
            this.runbar.handleClick(mX, mY);
            return;
        }
    }

    draw() {
        background(100);
        image(window.runPageImage, 0, 0, windowWidth, windowHeight);
        this.runbar.draw();
        this.gridEnvironment.draw();
        this.textbox.draw();
    }

    recalculateLayout() {

        // runbar
        const runbarH = windowHeight / 20;
        this.runbar.setPosition(0, 0, windowWidth, runbarH);

        // textbox
        const contentY = runbarH;
        const contentH = windowHeight - runbarH;
        const textboxW = windowWidth / 4;
        const textboxMargin = textboxW / 25; // both inner and outer margin
        this.textbox.setMargin(textboxMargin);
        this.textbox.setPosition(windowWidth - textboxW + textboxMargin, contentY + textboxMargin, textboxW - 2 * textboxMargin, contentH - 2 * textboxMargin);


        // gridEnvironment
        const gridRegionW = windowWidth * 3 / 4;
        const gridRegionX = 0;
        const gridMargin = gridRegionW / 20;

        const usableW = gridRegionW - 2 * gridMargin;
        const usableH = contentH - 2 * gridMargin;
        const aspect = this.gridColumns / this.gridRows;
        let gridW = usableW;
        let gridH = gridW / aspect;
        if (gridH > usableH) {
            gridH = usableH;
            gridW = gridH * aspect;
        }

        const gridX = gridRegionX + (gridRegionW - gridW) / 2;
        const gridY = contentY + (contentH - gridH) / 2;

        this.gridEnvironment.setPosition(gridX, gridY, gridW, gridH);
    }
}