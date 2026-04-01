import { Setting } from "./Setting.js";

export class SettingsList {
    constructor(container, x, y, w, h) {
        this.container = container;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.settingsList = [];
    }

    addSetting(label, type, attribute) {
        const setting = new Setting(this, label, attribute, type, this.x, this.y, this.w, this.h);
        this.settingsList.push(setting);
        return setting;
    }

    setPosition(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.updatePositions();
    }

    draw() {
        push();
        noFill();
        stroke(...this.container.textColour);
        rect(this.x, this.y, this.w, this.h);

        // list management
        this.updatePositions();


        for (let i = 0; i < this.settingsList.length; i++) {
            this.settingsList[i].draw();
        }
        pop();
    }

    updatePositions() {
        let segments = this.settingsList.length;

        let marginW = this.w / 10;
        let segmentLength = this.h / segments;
        let marginH = segmentLength / 10;

        for (let i = 0; i < this.settingsList.length; i++) {
            let setting = this.settingsList[i];
            setting.w = this.w - 2 * marginW;
            setting.x = this.x + marginW;

            setting.h = segmentLength - 2 * marginH;
            setting.y = this.y + segmentLength * i + marginH;
        }
    }

    hideDOMs() {
        for (let i = 0; i < this.settingsList.length; i++) {
            let setting = this.settingsList[i];
            if (!setting.input) return;
            setting.input.hide();
        }
    }
    showDOMs() {
        for (let i = 0; i < this.settingsList.length; i++) {
            let setting = this.settingsList[i];
            if (!setting.input) return;
            setting.input.show();
        }
    }
    handleSubmit() {
        let values = {};
        for (let i = 0; i < this.settingsList.length; i++) {
            let setting = this.settingsList[i];
            if (!setting.input) return;
            if (setting.type === "SUMBIT") continue;
            let label = setting.label;
            let value = setting.input.value();

            values[label] = value;
        }
        this.container.parseSettings(values);
    }
}