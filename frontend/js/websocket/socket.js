const SOCKET_URL = "ws://localhost:1234";
let socket = null;

export function connect() {
    socket = new WebSocket(SOCKET_URL);
    socket.onopen = () => {
        console.log("WebSocket connected");
        socket.send("HELLO");
    };

    socket.onclose = () => {
        console.log("WebSocket closed");
    };

    socket.onerror = (err) => {
        console.error("WebSocket error: " + err);
    };

    socket.onmessage = (event) => {
        handleMessage(event.data);
    };
}

function handleMessage(raw) {
    console.log("Server: " + raw);
}