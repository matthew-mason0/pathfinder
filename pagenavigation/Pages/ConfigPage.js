import { Button } from "../PageElements/Button.js";
import { SettingsList } from "../PageElements/SettingsList.js";

export class ConfigPage {
    constructor() {
        this.textColour = [255];
        
        // background
        this.backgroundColour = [0, 200];
        this.backgroundMargin = max(windowWidth, windowHeight) / 50;
        this.backgroundX = this.backgroundMargin;
        this.backgroundY = this.backgroundMargin;
        this.backgroundW = windowWidth - 2 * this.backgroundMargin;
        this.backgroundH = windowHeight - 2 * this.backgroundMargin;
        this.backgroundR = this.backgroundMargin * 2;

        // close button
        this.closeButton = new Button("X", windowWidth * 5/6, windowHeight / 30, min(windowWidth, windowHeight) / 15, min(windowWidth, windowHeight) / 15);
        this.closeButton.setR(min(windowWidth, windowHeight) / 40);
        this.closeButton.setFillColour([0, 0]);
        this.closeButton.setStrokeColour([255]);
        this.closeButton.setTextColour([255]);

        // settings list
        const settingsListW = windowWidth * 3/4;
        const settingsListH = windowHeight / 4;
        this.settingsList = new SettingsList(this, windowWidth/2 - settingsListW/2, windowHeight/4 - settingsListH/2, settingsListW, settingsListH);

        // settings
        this.algorithmSetting = this.settingsList.addSetting("Algorithm", "DROPDOWN");
        this.algorithmSetting.addDropdown("BFS");
        this.algorithmSetting.addDropdown("DFS");
        this.algorithmSetting.addDropdown("Dijkstra");
        this.algorithmSetting.addDropdown("A*");

        this.heuristicSetting = this.settingsList.addSetting("Heuristic", "DROPDOWN");
        this.heuristicSetting.addDropdown("Manhattan");
        this.heuristicSetting.addDropdown("Euclidean");

        this.timerSetting = this.settingsList.addSetting("Timer", "CHECK");

        this.stepCount = this.settingsList.addSetting("StepCounter", "CHECK");


        this.closeButton.setOnClickAction(() => {
            this.settingsList.hideDOMs();
            window.closeConfigPage();
        });
    }

    mousePressed(mX, mY) {
        if (this.closeButton.mouseOver(mX, mY)) this.closeButton.onClick();
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

        text("CONFIG PAGE", titleX, titleY);
        
        // close button
        this.closeButton.draw();

        // settings list
        this.settingsList.draw();
        pop();
    }
}