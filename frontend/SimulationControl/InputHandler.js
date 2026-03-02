export class InputHandler {
    constructor(toolbar, controller) {
        this.toolbar = toolbar;
        this.controller = controller;
    }

    mousePressed(mX, mY) {
        if (this.toolbar.mouseOver(mX, mY)) {
            this.toolbar.mousePressed(mX, mY);
        }
        if (this.controller.mouseOverEnvironment(mX, mY)) {
            this.controller.mousePressedEnvironment(mX, mY);
        }
    }
}