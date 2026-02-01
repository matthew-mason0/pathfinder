import { MessageHandler } from "./MessageHandler.js";

export class SocketClient {
    constructor(url = "ws://localhost:1234") {
        this.url = url;
        this.socket = null;
        this.messageHandler = null;
    }

    setHandler(handler) {
        this.messageHandler = handler;
    }

    connect() {
        this.socket = new WebSocket(this.url);

        this.socket.onopen = () => {
            console.log("WebSocket connected");
            this.socket.send("HELLO");
        };

        this.socket.onclose = () => {
            console.log("WebSocket closed");
        };

        this.socket.onerror = (err) => {
            console.error("WebSocket error: " + err);
        };

        this.socket.onmessage = (event) => {
            this.handleMessage(event.data);
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