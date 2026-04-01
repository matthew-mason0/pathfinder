import { Logo } from "../PageElements/Logo.js";
import { Button } from "../PageElements/Button.js";

export class LandingPage {
    constructor() {
        // instantiate buttons
        this.environmentButton = new Button("ENVIRONMENT", 0, 0, 0, 0);
        this.environmentButton.setOnClickAction(() => {
            window.openEnvironmentPage();
        });

        this.configButton = new Button("CONFIG", 0, 0, 0, 0);
        this.configButton.setOnClickAction(() => {
            window.openConfigPage();
        });

        this.runButton = new Button("RUN", 0, 0, 0, 0);
        this.runButton.setOnClickAction(() => {
            window.openRunPage();
        });
        
        this.buttons = [this.environmentButton, this.configButton, this.runButton];

        this.recalculateLayout();
    }

    mousePressed(mX, mY) {
        for (let i = 0; i <  this.buttons.length; i++) {
            if (this.buttons[i].mouseOver(mX, mY)) this.buttons[i].onClick();
        }
    }

    draw() {
        push();

        image(window.landingPageImage, 0, 0, windowWidth, windowHeight);

        // buttons
        for (let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].draw();
        }
        pop();
    }

    recalculateLayout() {
        // buttons
        this.buttonWidth = windowWidth / 4;
        this.buttonMargin = (windowWidth - this.buttons.length * this.buttonWidth ) / 4;
        let x, y, w, h;
        for (let i = 0; i < this.buttons.length; i++) {
            let button = this.buttons[i];
            x = this.buttonMargin + i * (this.buttonMargin + this.buttonWidth);
            y = windowHeight / 2;
            w = this.buttonWidth;
            h = windowHeight / 15;
            button.setPosition(x, y, w, h);
            button.setR(min(windowWidth, windowHeight)/50);
            button.textSize = button.calculateTextSize(button.text, button.w * 4/5, button.h * 4/5, 100);
        }
    }
}