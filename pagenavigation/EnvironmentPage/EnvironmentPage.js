import { Button } from "../Button.js";
import { SettingsList } from "../SettingsList.js";
import { GridEnvironment } from "./GridEnvironment.js";

export class EnvironmentPage {
    constructor() {
        this.textColour = [0];

        // background
        this.backgroundColour = [200, 200];
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
        this.closeButton.setStrokeColour([0]);
        this.closeButton.setTextColour([0]);
        this.closeButton.setOnClickAction(() => {
            window.closePage();
        });

        // TODO: Fix positioning
        // settings list
        const settingsListW = windowWidth * 3/4;
        const settingsListH = windowHeight / 4;
        this.settingsList = new SettingsList(this, windowWidth/2 - settingsListW/2, windowHeight/4 - settingsListH/2, settingsListW, settingsListH);

        // grid environment
        const gridEnvironmentW = windowWidth * 2/3;
        this.gridEnvironment = new GridEnvironment(this, windowWidth/2 - gridEnvironmentW/2, windowHeight * 2/3 - gridEnvironmentW/2, gridEnvironmentW, gridEnvironmentW);
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

        text("ENVIRONMENT PAGE", titleX, titleY);
        
        // close button
        this.closeButton.draw();

        //settings list
        this.settingsList.draw();

        // grid environment
        this.gridEnvironment.draw();
        pop();
    }
}