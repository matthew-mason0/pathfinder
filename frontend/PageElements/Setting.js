export class Setting {
    constructor(container, label, attribute, type = "SELECT", x, y, w, h) {
        this.container = container;
        this.label = label;

        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.type = type;
        this.options = [];
        this.selection = null;

        this.attribute = attribute;

        this.input = null;
        switch (this.type) {
            case "NUMBER":
                this.input = createInput();
                this.input.attribute("type", "number");
                this.input.style("position", "absolute");
                this.input.style("box-sizing", "border-box");
                this.input.style("text-align", "center");
                this.input.style("appearance", "textfield");
                break;
            case "DROPDOWN":
                this.input = createSelect();
                break;
            case "CHECK":
                this.input = createCheckbox();
                break;
            case "SUBMIT":
                this.input = createButton("Resize");
                this.input.mousePressed(() => {
                    this.container.handleSubmit();
                });
                break;
            default:
                break;
        }

        this.bindSettingState();
    }

    addDropdown(option) {
        if (this.type !== "DROPDOWN") return;
        this.input.option(option);
    }

    bindSettingState() {
        this.input.changed(() => {
            if (!this.attribute) {
                console.log("No Attribute");
                return;
            }
            switch (this.type) {
                case "NUMBER":
                    window.settingState[this.attribute] = this.input.value();
                    break;
                case "DROPDOWN":
                    window.settingState[this.attribute] = this.input.value();
                    break;
                case "CHECK":
                    window.settingState[this.attribute] = this.input.checked();
                    break;
                case "SUBMIT":
                    break;
                default:
                    break;
            }
        });
    }

    draw() {
        push();
        // label
        fill(...this.container.container.textColour);
        noStroke();
        textAlign(LEFT, CENTER);
        text(this.label + ": ", this.x, this.y, this.w, this.h);

        // input boxes
        this.positionInputs();
        pop();
    }

    positionNumberSetting() {
        const inputW = this.w / 5;
        const inputH = this.h / 2;
        const inputX = this.x + this.w - inputW;
        const inputY = this.y + (this.h - inputH) / 2;
        if (!this.input) return;
        this.input.position(inputX, inputY);
        this.input.size(inputW, inputH);
    }
    positionDropdownSetting() {
        const inputW = this.w / 3;
        const inputH = this.h / 2;
        const inputX = this.x + this.w - inputW;
        const inputY = this.y + (this.h - inputH) / 2;
        if (!this.input) return;
        this.input.position(inputX, inputY);
        this.input.size(inputW, inputH);
    }
    positionCheckSetting() {
        const inputW = this.w / 3;
        const inputH = this.h / 2;
        const inputX = this.x + this.w - inputW;
        const inputY = this.y + (this.h - inputH) / 2;
        if (!this.input) return;
        this.input.position(inputX, inputY);
        this.input.size(inputW, inputH);
    }
    positionSubmitSetting() {
        const inputW = this.w / 3;
        const inputH = this.h / 2;
        const inputX = this.x + this.w - inputW;
        const inputY = this.y + (this.h - inputH) / 2;
        if (!this.input) return;
        this.input.position(inputX, inputY);
        this.input.size(inputW, inputH);
    }

    positionInputs() {
        switch (this.type) {
            case "NUMBER":
                this.positionNumberSetting();
                break;
            case "DROPDOWN":
                this.positionDropdownSetting();
                break;
            case "CHECK":
                this.positionCheckSetting();
                break;
            case "SUBMIT":
                this.positionSubmitSetting();
                break;
            default:
                this.positionNumberSetting();
                break;
        }
    }
}