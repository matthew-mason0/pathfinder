package agentnavigation;
/**
 * Entry point for backend
 * Responsible for initialising environments and algorithms, and starting the WebSocket server
 */

import java.net.InetSocketAddress;
import java.util.List;

import org.java_websocket.server.WebSocketServer;

import agentnavigation.algorithms.AlgorithmFactory;
import agentnavigation.algorithms.SearchAlgorithm;
import agentnavigation.environment.Environment;
import agentnavigation.environment.EnvironmentLoader;
import agentnavigation.environment.Node;
import agentnavigation.listeners.ConsoleStepListener;
import agentnavigation.messaging.WSServer;
import agentnavigation.simulation.SimulationController;

public class Main {

    public static void main(String[] args) throws InterruptedException {
        
        String host = "localhost";
        int port = 1234;
        SimulationController controller = new SimulationController();
        
        WebSocketServer server = new WSServer(new InetSocketAddress(host, port), controller);

        server.start();
        System.out.println("WebSocket server started on ws://" + host + ":" + port);

        try {
            Thread.sleep(Long.MAX_VALUE);
        } catch (InterruptedException e) {
            server.stop();
        }
    }


    public static void runAlgorithm() {
        Environment environment = EnvironmentLoader.createGridEnvironment(10, 10);
        SearchAlgorithm algorithm = AlgorithmFactory.createBFS(ConsoleStepListener.INSTANCE);

        List<Node> traversalList = algorithm.search(environment.getGraph(), environment.getStart(), environment.getEnd());
        // System.out.println(traversalList);
    }
}
