export class MessageHandler {
    constructor(environment) {
        this.environment = environment;
    }

    processJson(msg) {
        switch(msg.type) {
            case "NODE_DISCOVERED":
                this.environment.setCellType(Number(msg.nodeRow), Number(msg.nodeColumn), CellType.FRONTIER);
                break;

            case "NODE_DISCOVERED":
                break;

            case "NODE_DISCOVERED":
                break;

            case "NODE_DISCOVERED":
                break;
            
            default:
                break;
        }
    }
}