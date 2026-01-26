package agentnavigation.messaging;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Scanner;

import org.java_websocket.client.WebSocketClient;
import org.java_websocket.drafts.Draft;
import org.java_websocket.handshake.ServerHandshake;

public class WSClientTest extends WebSocketClient {
    public WSClientTest(URI serverUri, Draft draft) {
        super(serverUri, draft);
    }
    public WSClientTest(URI serverUri) {
        super(serverUri);
    }

    @Override
    public void onOpen(ServerHandshake handshakedata) {
        System.out.println("Connected to server");
        send("HELLO");
    }

    @Override
    public void onMessage(String message) {
        System.out.println("Server: " + message);
    }

    @Override
    public void onClose(int code, String reason, boolean remote) {
        System.out.println("Closed with exit code" + code + ". " + reason);
    }

    @Override
    public void onError(Exception ex) {
        ex.printStackTrace();
    }
    
    public static void main(String[] args) throws URISyntaxException, InterruptedException {
        WebSocketClient client = new WSClientTest(new URI("ws://localhost:1234"));
        client.connectBlocking();

        Scanner scanner = new Scanner(System.in);
        while (true) {
            String text = scanner.nextLine();
            if (text.equalsIgnoreCase("BYE")) break;
            client.send(text);
        }
        
        scanner.close();
        client.close();
    }
}
