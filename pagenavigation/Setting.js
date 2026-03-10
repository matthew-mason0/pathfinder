export class Setting {
    constructor(container, position, type = "SELECT") {
        this.container = container;
        this.position = position;

        this.type = type;
        this.attribute = null;
        this.options = [];
        this.selection = null;
    }

    draw() {
        
    }
}