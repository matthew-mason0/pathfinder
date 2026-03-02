import { Icon } from "./Icon.js";

export class SelectEndIcon extends Icon {
    constructor(toolbar, position, controller) {
        super(toolbar, position);
        this.text = "E";
        this.controller = controller;
    }

    onClick() {
        this.controller.selectEnd();
    }
}