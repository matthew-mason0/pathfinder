import { Icon } from "./Icon.js";

export class ResetIcon extends Icon {
    constructor(toolbar, position, controller) {
        super(toolbar, position);
        this.text = "↺";
        this.controller = controller;
    }

    onClick() {
        this.controller.reset();
    }
}