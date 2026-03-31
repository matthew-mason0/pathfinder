package agentnavigation.simulation;


import org.java_websocket.WebSocket;

import agentnavigation.algorithms.AlgorithmFactory;
import agentnavigation.algorithms.SearchAlgorithm;
import agentnavigation.environment.Environment;
import agentnavigation.environment.EnvironmentLoader;
import agentnavigation.listeners.*;
import agentnavigation.messaging.MessageSerialiser;
import agentnavigation.messaging.MessageDeserialiser;

public class SimulationController {
    private SimulationState state = SimulationState.IDLE;
    private SimulationConfig config = new SimulationConfig();

    public SimulationState getState() {
        return this.state;
    }

    public void onClientConnected(WebSocket conn) {
        System.out.println("Controller: new client connected: " + conn.getRemoteSocketAddress());
    }
    public void onClientDisconnected(WebSocket conn, int code, String reason) {
        System.out.println("Closed " + conn.getRemoteSocketAddress() + " with exit code " + code + ". " + reason);
        this.state = SimulationState.IDLE;
    }

    public void handleClientMessage(WebSocket conn, String message) {
        System.out.println("Client " + conn.getRemoteSocketAddress() + ": " + message);

        switch (this.state) {
            case IDLE:
                handleHelloMessage(conn, message);
                break;
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
    private void handleHelloMessage(WebSocket conn, String message) {
        if (message.equalsIgnoreCase("HELLO")) {
            this.state = SimulationState.CONFIGURING;
            conn.send("HELLO_ACK");
            return;
        }
        conn.send("SYSTEM IDLE");
    }
    private void handleConfigMessage(WebSocket conn, String message) {
        if (message.equalsIgnoreCase("RUN")) {
            this.state = SimulationState.RUNNING;
            conn.send("RUN_ACK");

            runAlgorithm(conn);
            return;
        }

        // update this.config
        this.config = MessageDeserialiser.fromJson(message, SimulationConfig.class);
        System.out.println("Config Message: " + message);
        this.config.printGridState();
        conn.send("CONFIG_OK");
    }
    private void handleRunMessage(WebSocket conn, String message) {
        if (message.equalsIgnoreCase("STOP")) {
            this.state = SimulationState.CONFIGURING;
            conn.send("STOP_ACK");
            return;
        }
    }

    private void runAlgorithm(WebSocket conn) {
        SocketStepListener listener = new SocketStepListener(msg -> conn.send(MessageSerialiser.toJson(msg)));
        Environment environment = EnvironmentLoader.createGridEnvironment(this.config.getGridState());
        SearchAlgorithm algorithm;
        if (this.config.getAlgorithm().equalsIgnoreCase("AStar")) algorithm = AlgorithmFactory.createAStar(this.config.getHeuristic(), listener);
        else algorithm = AlgorithmFactory.createAlgorithm(this.config.getAlgorithm(), listener);
        algorithm.search(environment.getGraph(), environment.getStart(), environment.getEnd());
    }
}
