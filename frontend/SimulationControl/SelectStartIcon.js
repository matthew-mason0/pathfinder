import { Icon } from "./Icon.js";

export class SelectStartIcon extends Icon {
    constructor(toolbar, position, controller) {
        super(toolbar, position);
        this.text = "S";
        this.controller = controller;
    }

    onClick() {
        this.controller.selectStart();
    }
}