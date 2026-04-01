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
        this.backgroundImage = window.menuBackgroundImage;

        // title
        this.titleX = 0
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
        push();
        tint(255, 220);
        image(this.backgroundImage, this.backgroundX, this.backgroundY, this.backgroundW, this.backgroundH);
        noFill();
        stroke(0);
        strokeWeight(3);
        rect(this.backgroundX, this.backgroundY, this.backgroundW, this.backgroundH, this.backgroundR);
        pop();

        // title
        image(window.algorithmHeaderImage, this.titleX, this.titleY, this.titleW, this.titleH);
        
        // close button
        this.closeButton.draw();

        // settings list
        this.settingsList.draw();
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

        // settings list
        this.settingsListW = this.backgroundW * 3/4;
        this.settingsListH = this.backgroundH / 2;
        this.settingsListX = this.backgroundX + (this.backgroundW - this.settingsListW) / 2;
        this.settingsListY = this.titleY + this.titleH + this.margin * 3/2;
        this.settingsList.setPosition(this.settingsListX, this.settingsListY, this.settingsListW, this.settingsListH);
    }
}