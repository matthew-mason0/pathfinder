package agentnavigation.simulation;

import org.java_websocket.WebSocket;

public class SimulationController {
    private SimulationState state = SimulationState.IDLE;

    public SimulationState getState() {
        return this.state;
    }

    public void onClientConnected(WebSocket conn) {
        System.out.println("Controller: new client connected: " + conn.getRemoteSocketAddress());
        conn.send("HELLO_ACK");
        if (this.state == SimulationState.IDLE) this.state = SimulationState.CONFIGURING;
    }

    public void handleClientMessage(WebSocket conn, String message) {
        System.out.println("Client " + conn.getRemoteSocketAddress() + ": " + message);

        switch (this.state) {
            case CONFIGURING:
                handleConfigMessage(conn, message);
                break;
            case RUNNING:
                handleRunMessage(conn, message);
                break;
            default:
                break;
        }
    }
    private void handleConfigMessage(WebSocket conn, String message) {
        if (message.equalsIgnoreCase("RUN")) {
            this.state = SimulationState.RUNNING;
            conn.send("RUN_ACK");
            
            return;
        }

        conn.send("CONFIG_OK");
    }
    private void handleRunMessage(WebSocket conn, String message) {
        if (message.equalsIgnoreCase("STOP")) {
            this.state = SimulationState.CONFIGURING;
            conn.send("STOP_ACK");
            return;
        }
    }
}
