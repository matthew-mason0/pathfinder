import { Button } from "../PageElements/Button.js";
import { SettingsList } from "../PageElements/SettingsList.js";
import { GridEnvironment } from "../Environment/GridEnvironment/GridEnvironment.js";
import { Toolbar } from "../Environment/Toolbar/Toolbar.js";

export class EnvironmentPage {
    constructor() {
        this.textColour = [0];
        let cumulativeHeight = 0;

        // background
        this.backgroundColour = [200, 200];
        this.backgroundMargin = max(windowWidth, windowHeight) / 50;
        this.backgroundX = this.backgroundMargin;
        this.backgroundY = this.backgroundMargin;
        this.backgroundW = windowWidth - 2 * this.backgroundMargin;
        this.backgroundH = windowHeight - 2 * this.backgroundMargin;
        this.backgroundR = this.backgroundMargin * 2;

        // close button
        this.closeButton = new Button("X", windowWidth * 5/6, windowHeight / 30, cumulativeHeight + min(windowWidth, windowHeight) / 15, min(windowWidth, windowHeight) / 15);
        this.closeButton.setR(min(windowWidth, windowHeight) / 40);
        this.closeButton.setFillColour([0, 0]);
        this.closeButton.setStrokeColour([0]);
        this.closeButton.setTextColour([0]);
        cumulativeHeight += this.closeButton.h;

        // settings list
        const settingsListW = windowWidth * 3/4;
        const settingsListH = windowHeight / 4;
        this.settingsList = new SettingsList(this, windowWidth/2 - settingsListW/2, cumulativeHeight + windowHeight/5 - settingsListH/2, settingsListW, settingsListH);
        cumulativeHeight += this.settingsList.h;

        // settings
        this.rowsSetting = this.settingsList.addSetting("Rows", "NUMBER");
        this.columnsSetting = this.settingsList.addSetting("Columns", "NUMBER");
        this.rowsSetting.input.value(10);
        this.columnsSetting.input.value(10);

        this.submitSetting = this.settingsList.addSetting("Load", "SUBMIT");

        // toolbar
        this.toolbar = new Toolbar(this, windowWidth / 8, cumulativeHeight + windowHeight / 8, windowWidth * 6/8, windowHeight / 20);
        cumulativeHeight += this.toolbar.h;
        this.toolbar.addIcon("WALL");
        this.toolbar.addIcon("START");
        this.toolbar.addIcon("END");

        // grid environment
        const gridEnvironmentW = windowWidth / 3;
        this.gridEnvironment = new GridEnvironment(this, this.toolbar, 10, 10, windowWidth/3, cumulativeHeight + windowHeight/4, windowWidth/3, windowWidth/3);
        cumulativeHeight += this.gridEnvironment.h;

        this.closeButton.setOnClickAction(() => {
            window.closeEnvironmentPage();
        });
    }

    mousePressed(mX, mY) {
        if (this.closeButton.mouseOver(mX, mY)) this.closeButton.onClick();
        else if (this.toolbar.mouseOver(mX, mY)) this.toolbar.handleClick(mX, mY);
        else if (this.gridEnvironment.mouseOver(mX, mY)) this.gridEnvironment.handleClick(mX, mY);
    }

    draw() {
        push();
        // background
        fill(...this.backgroundColour);
        noStroke();

        rect(this.backgroundX, this.backgroundY, this.backgroundW, this.backgroundH, this.backgroundR);

        // title
        fill(...this.textColour);
        textAlign(LEFT, CENTER);
        textSize(min(windowWidth, windowHeight) / 20);
        const titleX = this.backgroundMargin*3;
        const titleY = this.backgroundMargin*3;

        text("ENVIRONMENT PAGE", titleX, titleY);
        
        // close button
        this.closeButton.draw();

        // settings list
        this.settingsList.draw();

        // toolbar
        this.toolbar.draw();

        // grid environment
        this.gridEnvironment.draw();
        pop();
    }

    parseSettings(settings) {
        if (settings["Rows"] && settings["Columns"]) {
            let newGrid = this.gridEnvironment.createResize(settings["Rows"], settings["Columns"]);
            this.gridEnvironment = newGrid;
        }
    }
}