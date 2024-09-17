import { io } from 'socket.io-client';

import { SOCKET_URL } from '@/lib/constant';

// Connect to the WebSocket server

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
