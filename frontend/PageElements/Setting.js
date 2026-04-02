export class Setting {
    constructor(container, label, attribute, type = "SELECT", x, y, w, h) {
        this.container = container;
        this.label = label;
        this.textSize = 0;

        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.type = type;
        this.options = [];
        this.selection = null;

        this.attribute = attribute;

        this.disabled = false;

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
        this.positionInput();
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
            let value;
            switch (this.type) {
                case "NUMBER":
                    value = this.input.value();
                    break;
                case "DROPDOWN":
                    value = this.input.value();
                    break;
                case "CHECK":
                    value = this.input.checked();
                    break;
                case "SUBMIT":
                    return;
                default:
                    return;
            }

            window.settingState[this.attribute] = value;

            // give to page
            if (this.container.container.handleSettingChanged) {
                this.container.container.handleSettingChanged(this.attribute, value);
            }
        });
    }

    setPosition(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.positionInput();
    }

    draw() {
        push();
        // label
        fill(...this.container.container.textColour);
        noStroke();
        textSize(this.textSize);
        textAlign(LEFT, CENTER);
        text(this.label + ": ", this.x, this.y, this.w, this.h);

        if (this.disabled) {
            // strike through
            stroke(255);
            strokeWeight(3);
            line(this.x, this.y + this.h/2, this.x + this.w, this.y + this.h/2);
        }
        pop();
    }

    hide() {
        this.disabled = true;
        this.input.hide();
    }
    show() {
        this.disabled = false;
        this.input.show();
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
        let scaleFactor = inputH / 13; 
        this.input.style('transform', `scale(${scaleFactor})`);
        this.input.style('transform-origin', 'left center');
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

    positionInput() {
        this.textSize = this.calculateTextSize(this.label, this.w, this.h, 100);
        if (this.disabled) return;
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

    calculateTextSize(str, maxWidth, maxHeight, startSize) {
        // take starting size as upper bound
        let size = startSize;
        textSize(size);

        while (textWidth(str) > maxWidth || textAscent()+textDescent() > maxHeight) {
            size--;
            textSize(size);
            if (size <= 1) break;
        }
        return size;
    }
}