import { Button } from "../Button.js";

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
        this.closeButton = new Button("X", windowWidth * 4/5, windowHeight / 30, min(windowWidth, windowHeight) / 15, min(windowWidth, windowHeight) / 15);
        this.closeButton.setR(min(windowWidth, windowHeight) / 40);
        this.closeButton.setOnClickAction(() => {
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
        translate(this.backgroundX, this.backgroundY);

        // title
        fill(...this.textColour);
        textAlign(LEFT, CENTER);
        textSize(min(windowWidth, windowHeight) / 20);
        const titleX = this.backgroundMargin*3;
        const titleY = this.backgroundMargin*3;

        text("CONFIG PAGE", titleX, titleY);
        
        // close button
        this.closeButton.draw();
        pop();
    }
}