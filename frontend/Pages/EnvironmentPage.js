import { Button } from "../PageElements/Button.js";
import { SettingsList } from "../PageElements/SettingsList.js";
import { GridEnvironment } from "../Environment/GridEnvironment/GridEnvironment.js";
import { Toolbar } from "../Environment/Toolbar/Toolbar.js";

export class EnvironmentPage {
    constructor() {
        this.textColour = [0];

        // close button
        this.closeButton = new Button("X", 0, 0, 0, 0);
        this.closeButton.setOnClickAction(() => {
            window.closeEnvironmentPage();
        });

        // settings list
        this.settingsList = new SettingsList(this, 0, 0, 0, 0);

        // settings
        this.rowsSetting = this.settingsList.addSetting("Rows", "NUMBER", "rows");
        this.columnsSetting = this.settingsList.addSetting("Columns", "NUMBER", "columns");
        this.rowsSetting.input.value(10);
        this.columnsSetting.input.value(10);

        this.submitSetting = this.settingsList.addSetting("Load", "SUBMIT");

        // toolbar
        this.toolbar = new Toolbar(this, 0, 0, 0, 0);
        this.toolbar.addIcon("WALL");
        this.toolbar.addIcon("START");
        this.toolbar.addIcon("END");

        // grid environment
        this.gridEnvironment = new GridEnvironment(this, this.toolbar, 10, 10, 0, 0, 0, 0);

        this.recalculateLayout();
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
        textSize(this.titleSize);
        text("ENVIRONMENT PAGE", this.titleX, this.titleY);

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

    recalculateLayout() {
        this.backgroundColour = [200, 200];
        this.margin = max(windowWidth, windowHeight) / 50;
        this.backgroundX = this.margin;
        this.backgroundY = this.margin;
        this.backgroundW = windowWidth - 2 * this.margin;
        this.backgroundH = windowHeight - 2 * this.margin;
        this.backgroundR = this.margin / 2;

        this.titleSize = min(windowWidth, windowHeight) / 20;
        this.titleX = this.backgroundX + this.margin;
        this.titleY = this.backgroundY + this.margin * 3/2;

        this.closeButtonSize = min(windowWidth, windowHeight) / 15;
        this.closeButtonX = this.backgroundX + this.backgroundW - this.closeButtonSize - this.margin / 2;
        this.closeButtonY = this.titleY - this.closeButtonSize / 2;
        this.closeButton.setPosition(this.closeButtonX, this.closeButtonY, this.closeButtonSize, this.closeButtonSize);
        this.closeButton.setStrokeColour([0, 0]);
        this.closeButton.setFillColour([0, 0]);
        this.closeButton.setTextColour(this.textColour);

        this.settingsListW = this.backgroundW * 3/4;
        this.settingsListH = this.backgroundH / 5;
        this.settingsListX = this.backgroundX + (this.backgroundW - this.settingsListW) / 2;
        this.settingsListY = this.titleY + this.margin * 3/2;
        this.settingsList.setPosition(this.settingsListX, this.settingsListY, this.settingsListW, this.settingsListH);

        this.toolbarW = this.backgroundW * 4/5;
        this.toolbarH = this.backgroundH * 2/25;
        this.toolbarX = this.backgroundX + (this.backgroundW - this.toolbarW) / 2;
        this.toolbarY = this.settingsListY + this.settingsListH + this.margin * 3/2;
        this.toolbar.setPosition(this.toolbarX, this.toolbarY, this.toolbarW, this.toolbarH);

        this.gridSize = this.backgroundH * 0.45;
        this.gridSize = min(this.gridSize, this.backgroundW * 0.6);
        this.gridX = this.backgroundX + (this.backgroundW - this.gridSize) / 2;
        this.gridY = this.toolbarY + this.toolbarH + this.margin * 3/2;
        this.gridEnvironment.setPosition(this.gridX, this.gridY, this.gridSize, this.gridSize);
    }

    parseSettings(settings) {
        if (settings["Rows"] && settings["Columns"]) {
            let newGrid = this.gridEnvironment.createResize(settings["Rows"], settings["Columns"]);
            this.gridEnvironment = newGrid;
            this.recalculateLayout();
        }
    }
}