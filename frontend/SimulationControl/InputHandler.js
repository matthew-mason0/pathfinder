export class InputHandler {
    constructor(toolbar) {
        this.toolbar = toolbar;
    }

    mousePressed(mX, mY) {
        if (this.toolbar.mouseOver(mX, mY)) {
            this.toolbar.mousePressed(mX, mY);
        }
    }
}