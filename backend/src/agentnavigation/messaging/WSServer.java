package agentnavigation.messaging;

import org.java_websocket.server.WebSocketServer;
import org.java_websocket.WebSocket;
import org.java_websocket.handshake.ClientHandshake;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.util.Collections;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

public class WSServer extends WebSocketServer {

    private enum ServerState {
        IDLE,
        CONFIGURING,
        RUNNING
    }
    
    private final Set<WebSocket> clients = Collections.newSetFromMap(new ConcurrentHashMap<>());
    private ServerState state = ServerState.IDLE;

    public WSServer(InetSocketAddress address) {
        super(address);
    }

    @Override
    public void onOpen(WebSocket conn, ClientHandshake handshake) {
        clients.add(conn);
        System.out.println("New connection to " + conn.getRemoteSocketAddress());

        conn.send("HELLO");
        state = ServerState.CONFIGURING;
    }

    @Override
    public void onClose(WebSocket conn, int code, String reason, boolean remote) {
        clients.remove(conn);
        System.out.println("Closed " + conn.getRemoteSocketAddress() + " with exit code " + code + ". " + reason);
    }

    @Override
    public void onMessage(WebSocket conn, String message) {
        handleMessage(conn, message);
    }
    private void handleMessage(WebSocket conn, String message) {
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
            state = ServerState.RUNNING;
            conn.send("RUN_ACK");

            simulateRun(conn);

            return;
        }

        conn.send("CONFIG_OK");
    }
    private void handleRunMessage(WebSocket conn, String message) {
        if (message.equalsIgnoreCase("STOP")) {
            state = ServerState.CONFIGURING;
            conn.send("STOP_ACK");
            return;
        }
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

    public static void main(String[] args) throws IOException, InterruptedException {
        String host = "localhost";
        int port = 1234;
        WebSocketServer server = new WSServer(new InetSocketAddress(host, port));
        server.start();

        System.out.println("WebSocket server started on ws://" + host + ":" + port);

        try {
            Thread.sleep(Long.MAX_VALUE);
        } catch (InterruptedException e) {
            server.stop();
        }
    }

    private void simulateRun(WebSocket conn) {
        Thread thread = new Thread(() -> {
            try {
                for (int i = 1; i < 5; i++) {
                    conn.send("STEP " + i);
                    Thread.sleep(500);
                }
            } catch (InterruptedException e) {
                this.state = ServerState.CONFIGURING;
            }
        });
        thread.start();
    }
}