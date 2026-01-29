package agentnavigation.messaging;

import org.java_websocket.server.WebSocketServer;

import agentnavigation.simulation.SimulationController;

import org.java_websocket.WebSocket;
import org.java_websocket.handshake.ClientHandshake;

import java.net.InetSocketAddress;
import java.util.Collections;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

public class WSServer extends WebSocketServer {

    private final SimulationController controller;
    private final Set<WebSocket> clients = Collections.newSetFromMap(new ConcurrentHashMap<>());

    public WSServer(InetSocketAddress address, SimulationController controller) {
        super(address);
        this.controller = controller;
    }

    @Override
    public void onOpen(WebSocket conn, ClientHandshake handshake) {
        clients.add(conn);
        controller.onClientConnected(conn);
    }

    @Override
    public void onClose(WebSocket conn, int code, String reason, boolean remote) {
        clients.remove(conn);
        controller.onClientDisconnected(conn, code, reason);
    }

    @Override
    public void onMessage(WebSocket conn, String message) {
        controller.handleClientMessage(conn, message);
    }

    @Override
    public void onError(WebSocket conn, Exception ex) {
        System.out.println("Error on " + conn.getRemoteSocketAddress());
        ex.printStackTrace();
    }

    @Override
    public void onStart() {
        System.out.println("Server started");
    }

    public void broadcast(String message) {
        for (WebSocket client : clients) {
            client.send(message);
        }
    }
}