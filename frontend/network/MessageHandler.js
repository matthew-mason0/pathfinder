import { CellType } from "../constants/CellType.js";

export class MessageHandler {
    constructor(environment) {
        this.environment = environment;
    }

    processJson(msg) {
        switch(msg.type) {
            case "NODE_DISCOVERED":
                this.environment.setCellType(Number(msg.nodeRow), Number(msg.nodeColumn), CellType.FRONTIER);
                break;

            case "NODE_EXPLORED":
                this.environment.setCellType(Number(msg.nodeRow), Number(msg.nodeColumn), CellType.VISITED);
                break;

            case "FRONTIER_UPDATE":
                for (const node of msg.nodeList) {
                    const coordinates = this.parseNodeFromString(node);
                    this.environment.setCellType(coordinates.x, coordinates.y, CellType.FRONTIER);
                }
                break;

            case "PATH_FOUND":
                for (const node of msg.nodeList) {
                    const coordinates = this.parseNodeFromString(node);
                    this.environment.setCellType(coordinates.x, coordinates.y, CellType.PATH);
                }
                break;
            
            default:
                break;
        }
    }

    parseNodeFromString(node) {
        const str = node;
        const cleaned = str.replace(/[()]/g, '');
        const coordinates = cleaned.split(", ");
        return { x : Number(coordinates[0]), y : Number(coordinates[1]) };
    }
}