export class Setting {
    constructor(container, label, type = "SELECT", x, y, w, h) {
        this.container = container;
        this.label = label;

        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.type = type;
        this.attribute = null;
        this.options = [];
        this.selection = null;

        this.input = null;
        if (this.type === "NUMBER") {
            this.input = createInput();
            this.input.attribute("type", "number");
            this.input.style("box-sizing", "border-box");
            this.input.style("text-align", "center");
            this.input.style("appearance", "textfield");
        }
    }

    draw() {
        push();
        // label
        fill(...this.container.container.textColour);
        noStroke();
        textAlign(LEFT, CENTER);
        text(this.label, this.x, this.y, this.w, this.h);

        // input box
        this.updatePosition();
        
        // boundary
        stroke(255, 0, 0);
        noFill();
        rect(this.x, this.y, this.w, this.h);
        pop();
    }

    updatePosition() {
        const inputW = this.w / 5;
        const inputH = this.h / 3;

        const inputX = this.x + this.w - inputW;
        const inputY = this.y + (this.h - inputH) / 2;

        if (this.input) {
            this.input.position(inputX, inputY);
            this.input.size(inputW, inputH);
        }
    }
}