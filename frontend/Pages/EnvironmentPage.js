import { Button } from "../PageElements/Button.js";
import { SettingsList } from "../PageElements/SettingsList.js";
import { GridEnvironment } from "../Environment/GridEnvironment/GridEnvironment.js";
import { Toolbar } from "../Environment/Toolbar/Toolbar.js";

export class EnvironmentPage {
    constructor() {
        this.textColour = [255];

        // background
        this.backgroundColour = 0;
        this.margin = 0;
        this.backgroundX = 0;
        this.backgroundY = 0;
        this.backgroundW = 0;
        this.backgroundH = 0;
        this.backgroundR = 0;
        this.backgroundImage = window.menuBackgroundImage;

        // title
        this.titleX = 0;
        this.titleY = 0;
        this.titleW = 0;
        this.titleH = 0;

        // close button
        this.closeButtonX = 0;
        this.closeButtonY = 0;
        this.closeButtonW = 0;
        this.closeButtonH = 0;
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
        push();
        tint(255, 220);
        image(this.backgroundImage, this.backgroundX, this.backgroundY, this.backgroundW, this.backgroundH);
        noFill();
        stroke(0);
        strokeWeight(3);
        rect(this.backgroundX, this.backgroundY, this.backgroundW, this.backgroundH, this.backgroundR);
        pop();

        // title
        image(window.environmentHeaderImage, this.titleX, this.titleY, this.titleW, this.titleH);

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

    getRoundedImage(img, w, h, r) {
        let mask = createGraphics(w, h);
        mask.noStroke();
        mask.fill(255);
        mask.rect(0, 0, w, h, r);

        let sourceAspect = img.width / img.height;
        let aspect = w / h;
        let sx, sy, sw, sh;
        if (sourceAspect > aspect) {
            sh = img.height;
            sw = sh * aspect;
            sx = (img.width - sw) / 2;
            sy = 0;
        } else {
            sw = img.width;
            sh = sw / aspect;
            sx = 0;
            sy = (img.height - sh) / 2;
        }

        let buffer = createImage(int(w), int(h));
        buffer.copy(img, sx, sy, sw, sh, 0, 0, w, h);
        buffer.mask(mask);
        return buffer;
    }


    recalculateLayout() {
        // background
        this.backgroundColour = [85, 107, 47, 200];
        this.margin = max(windowWidth, windowHeight) / 50;
        this.backgroundX = this.margin;
        this.backgroundY = this.margin;
        this.backgroundW = windowWidth - 2 * this.margin;
        this.backgroundH = windowHeight - 2 * this.margin;
        this.backgroundR = this.margin / 2;
        this.backgroundImage = this.getRoundedImage(window.menuBackgroundImage, this.backgroundW, this.backgroundH, this.backgroundR);

        // title
        this.titleX = this.backgroundX + this.margin;
        this.titleY = this.backgroundY + this.margin / 2;
        this.titleW = this.backgroundW / 3;
        this.titleH = this.backgroundH / 10;

        // close button
        this.closeButtonW = min(windowWidth, windowHeight) / 10;
        this.closeButtonH = min(windowWidth, windowHeight) / 15;
        this.closeButtonX = this.backgroundX + this.backgroundW - this.closeButtonW - this.margin / 2;
        this.closeButtonY = this.titleY;
        this.closeButton.setPosition(this.closeButtonX, this.closeButtonY, this.closeButtonW, this.closeButtonH);
        this.closeButton.setImage(window.closeButtonImage);

        // settingsList
        this.settingsListW = this.backgroundW * 3/4;
        this.settingsListH = this.backgroundH / 5;
        this.settingsListX = this.backgroundX + (this.backgroundW - this.settingsListW) / 2;
        this.settingsListY = this.titleY + this.titleH + this.margin * 3/2;
        this.settingsList.setPosition(this.settingsListX, this.settingsListY, this.settingsListW, this.settingsListH);

        // grid and toolbar
        this.environmentW = this.backgroundW * 4 / 5;
        this.environmentX = this.backgroundX + (this.backgroundW - this.environmentW) / 2;
        this.environmentY = this.settingsListY + this.settingsListH + this.margin * 3/2;
        this.environmentH = this.backgroundY + this.backgroundH - this.environmentY - this.margin * 2;

        this.toolbarW = this.environmentW / 8;

        let maxGridW = this.environmentW - this.toolbarW - this.margin;
        let maxGridH = this.environmentH;
        this.gridSize = min(maxGridW, maxGridH);
        let totalW = this.toolbarW + this.gridSize;
        this.toolbarX = this.environmentX + (this.environmentW - totalW) / 2;
        this.gridX = this.toolbarX + this.toolbarW + this.margin;
        this.gridY = this.environmentY + (this.environmentH - this.gridSize) / 2;
        this.toolbarH = this.gridSize;
        this.toolbarY = this.gridY;

        // gridEnvironment
        this.gridEnvironment.setPosition(this.gridX, this.gridY, this.gridSize, this.gridSize);

        // toolbar
        this.toolbar.setPosition(this.toolbarX, this.toolbarY, this.toolbarW, this.toolbarH);
    }

    parseSettings(settings) {
        if (settings["Rows"] && settings["Columns"]) {
            let newGrid = this.gridEnvironment.createResize(settings["Rows"], settings["Columns"]);
            this.gridEnvironment = newGrid;
            this.recalculateLayout();
        }
    }
}