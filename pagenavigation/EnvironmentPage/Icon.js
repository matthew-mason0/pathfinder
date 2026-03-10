import { Button } from "../Button.js";

export class Icon extends Button {
    constructor(container, operation, x, y, w, h) {
        super(null, x, y, w, h);
        this.container = container;
        this.operation = operation;
        this.setOnClickAction(() => {
            this.container.selectedOperation = this.operation;
        });
    }

    draw() {
        push();
        rect(this.x, this.y, this.w, this.h);
        pop();
    }
}