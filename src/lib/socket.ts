import { io } from 'socket.io-client';

// Connect to the WebSocket server
const SOCKET_URL = 'wss://realtime-chat-api.up.railway.app'; // Replace with your WebSocket server URL
export const socket = io(SOCKET_URL, {
  transports: ['websocket', 'polling'], // Ensures WebSocket connection
  reconnection: true,
  reconnectionAttempts: 10, // Attempts to reconnect
  timeout: 10000 // 10 seconds
});

export const connectSocket = () => {
  socket.connect();
};

export const disconnectSocket = () => {
  socket.disconnect();
};
