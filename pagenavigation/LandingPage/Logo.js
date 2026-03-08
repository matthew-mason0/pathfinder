export class Logo {
    constructor(x, y, w) {
        this.x = x;
        this.y = y;
        this.w = w;
    }

    draw() {
        rect(this.x, this.y, this.w);
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                let x = this.x + j * this.w / 3;
                let y = this.y + i * this.w / 3;
                push();
                fill(255);
                if (i === 2 || j === 0) fill(255, 255, 0);
                if (i === 0 && j === 0) fill(0, 200, 0);
                if (i === 2 && j === 2) fill(200, 0, 0);
                if (i === 0 && j === 1) fill(0, 150, 255);
                if (i === 0 && j === 2 || i === 1 && j === 1) fill(40);
                rect(x, y, this.w/3);
                pop();
            }
        }
    }

    // this.colours = {
    //         [CellType.EMPTY]: [255],
    //         [CellType.WALL]: [40],
    //         [CellType.START]: [0, 200, 0],
    //         [CellType.END]: [200, 0, 0],
    //         [CellType.VISITED]: [150, 150, 255],
    //         [CellType.FRONTIER]: [0, 150, 255],
    //         [CellType.PATH]: [255, 255, 0],
    //         [CellType.SELECTING]: [100]
    //     };
}