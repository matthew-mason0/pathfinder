import { Button } from "../PageElements/Button.js";
import { SettingsList } from "../PageElements/SettingsList.js";

export class ConfigPage {
    constructor() {
        this.textColour = [0];
        
        // background
        this.backgroundColour = [0, 200];
        this.margin = 0;
        this.backgroundX = 0;
        this.backgroundY = 0;
        this.backgroundW = 0;
        this.backgroundH = 0;
        this.backgroundR = 0;

        // title
        this.titleX = 0
        this.titleY = 0;
        this.titleSize = 0;

        // close button
        this.closeButtonX = 0;
        this.closeButtonY = 0;
        this.closeButtonSize = 0;
        this.closeButton = new Button("X", 0, 0, 0, 0);
        this.closeButton.setOnClickAction(() => {
            this.settingsList.hideDOMs();
            window.closeConfigPage();
        });

        // settings list
        this.settingsListX = 0;
        this.settingsListY = 0;
        this.settingsListW = 0;
        this.settingsListH = 0;
        this.settingsList = new SettingsList(this, 0, 0, 0, 0);

        // settings
        this.algorithmSetting = this.settingsList.addSetting("Algorithm", "DROPDOWN", "algorithm");
        this.algorithmSetting.addDropdown("BFS");
        this.algorithmSetting.addDropdown("DFS");
        this.algorithmSetting.addDropdown("Dijkstra");
        this.algorithmSetting.addDropdown("AStar");

        this.heuristicSetting = this.settingsList.addSetting("Heuristic", "DROPDOWN", "heuristic");
        this.heuristicSetting.addDropdown("Manhattan");
        this.heuristicSetting.addDropdown("Euclidean");
        this.heuristicSetting.addDropdown("Chebyshev");
        this.heuristicSetting.addDropdown("Zero");

        this.timerSetting = this.settingsList.addSetting("Timer", "CHECK", "timer");
        this.stepCount = this.settingsList.addSetting("StepCounter", "CHECK", "stepCounter");

        this.recalculateLayout()
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
        textSize(this.titleSize);
        text("CONFIG PAGE", this.titleX, this.titleY);
        
        // close button
        this.closeButton.draw();

        // settings list
        this.settingsList.draw();
        pop();
    }

    recalculateLayout() {
        // background
        this.backgroundColour = [200, 200];
        this.margin = max(windowWidth, windowHeight) / 50;
        this.backgroundX = this.margin;
        this.backgroundY = this.margin;
        this.backgroundW = windowWidth - 2 * this.margin;
        this.backgroundH = windowHeight - 2 * this.margin;
        this.backgroundR = this.margin / 2;

        // title
        this.titleSize = min(windowWidth, windowHeight) / 20;
        this.titleX = this.backgroundX + this.margin;
        this.titleY = this.backgroundY + this.margin * 3/2;

        // close button
        this.closeButtonSize = min(windowWidth, windowHeight) / 15;
        this.closeButtonX = this.backgroundX + this.backgroundW - this.closeButtonSize - this.margin / 2;
        this.closeButtonY = this.titleY - this.closeButtonSize / 2;
        this.closeButton.setPosition(this.closeButtonX, this.closeButtonY, this.closeButtonSize, this.closeButtonSize);

        this.closeButton.setStrokeColour([0, 0]);
        this.closeButton.setFillColour([0, 0]);
        this.closeButton.setTextColour(this.textColour);

        // settings list
        this.settingsListW = this.backgroundW * 3/4;
        this.settingsListH = this.backgroundH / 2;
        this.settingsListX = this.backgroundX + (this.backgroundW - this.settingsListW) / 2;
        this.settingsListY = this.titleY + this.margin * 3/2;
        this.settingsList.setPosition(this.settingsListX, this.settingsListY, this.settingsListW, this.settingsListH);
    }
}