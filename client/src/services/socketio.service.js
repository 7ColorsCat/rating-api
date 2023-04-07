import { io } from "socket.io-client";

let socket;

const SOCKET_ENDPOINT = import.meta.env.VITE_SOCKET_ENDPOINT;
export const initiateSocketConnection = () => {
    socket = io(SOCKET_ENDPOINT);
    console.info("Connecting socket... ");
};

export const disconnectSocket = () => {
    console.info("Disconnecting socket...");
    if (socket) socket.disconnect();
};

export const emit = (event, data) => {
    if (socket) socket.emit(event, data);
};

export const on = (event, callback) => {
    if (socket) socket.on(event, callback);
};
