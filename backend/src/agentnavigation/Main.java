package agentnavigation;
/**
 * Entry point for backend
 * Responsible for initialising environments and algorithms, and starting the WebSocket server
 */

import java.net.InetSocketAddress;

import org.java_websocket.server.WebSocketServer;

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
}
