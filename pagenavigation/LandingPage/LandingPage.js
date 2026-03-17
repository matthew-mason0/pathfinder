import { Logo } from "./Logo.js";
import { Button } from "../PageElements/Button.js";

export class LandingPage {
    constructor() {
        this.background = [50];

        this.title = "PATHFINDER";

        // logo
        const logoW = min(windowWidth, windowHeight) / 8;
        const logoX = windowWidth / 2 - logoW / 2;
        const logoY = windowHeight / 3 - logoW / 2;

        this.logo = new Logo(logoX, logoY, logoW);
        
        // instantiate buttons
        this.environmentButton = new Button("ENVIRONMENT", 0, 0, 100, 50);
        this.configButton = new Button("CONFIG", 0, 0, 100, 50);
        this.runButton = new Button("RUN", 0, 0, 100, 50);
        this.buttons = [this.environmentButton, this.configButton, this.runButton];

        // reposition
        this.buttonWidth = windowWidth / 4;
        this.buttonMargin = (windowWidth - this.buttons.length * this.buttonWidth ) / 4;
        for (let i = 0; i < this.buttons.length; i++) {
            let button = this.buttons[i];
            button.x = this.buttonMargin + i * (this.buttonMargin + this.buttonWidth);
            button.y = windowHeight * 4/5;
            button.w = this.buttonWidth;
            button.h = windowHeight / 15;
            button.setR(min(windowWidth, windowHeight)/50);
            button.textSize = button.calculateTextSize(button.text, button.w * 4/5, button.h * 4/5, 100);
        }

        this.configButton.setOnClickAction(() => {
            window.openConfigPage();
        });
        this.environmentButton.setOnClickAction(() => {
            window.openEnvironmentPage();
        });
        this.runButton.setOnClickAction(() => {
            window.openRunPage();
        });
    }

    mousePressed(mX, mY) {
        for (let i = 0; i <  this.buttons.length; i++) {
            if (this.buttons[i].mouseOver(mX, mY)) this.buttons[i].onClick();
        }
    }

    draw() {
        push();
        background(...this.background);

        // title
        textAlign(CENTER, CENTER);
        textSize(min(windowWidth, windowHeight) / 10);

        const titleX = windowWidth/2;
        const titleY = windowHeight/10;

        text(this.title, titleX, titleY);

        // logo
        this.logo.draw();

        // buttons
        for (let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].draw();
        }
        pop();
    }
}