import { Icon } from "./Icon.js";

export class RunIcon extends Icon {
    constructor(toolbar, position, controller) {
        super(toolbar, position);
        this.text = "▶";
        this.controller = controller;
    }

    onClick() {
        this.controller.run();
    }
}