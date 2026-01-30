export class SocketClient {
    constuctor(url) {
        this.url = url;
        this.socket = null;
        this.messageHandler = new MessageHandler();
    }

    connect() {
        this.socket = new WebSocket(SOCKET_URL);

        this.socket.onopen = () => {
            console.log("WebSocket connected");
            socket.send("HELLO");
        };

        this.socket.onclose = () => {
            console.log("WebSocket closed");
        };

        socket.onerror = (err) => {
            console.error("WebSocket error: " + err);
        };

        socket.onmessage = (event) => {
            handleMessage(event.data);
        };
    }

    send(message) {
        if (this.socket.readyState !== WebSocket.OPEN || !this.socket) {
            console.warn("Socket not connected");
            return;
        }

        this.socket.send(message);
    }

    handleMessage(raw) {
        try {
            msg = JSON.parse(raw);
            console.log("Server: " + msg);
            if (this.messageHandler) this.messageHandler.processJson(msg);

        } catch (e) {
            console.log("Server: " + raw);
        }
    }
}