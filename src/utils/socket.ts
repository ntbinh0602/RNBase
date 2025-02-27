// src/shared/utils/socket.ts
import { io, Socket } from 'socket.io-client';
import { getAccessTokenFromLS } from 'src/shared/utils/auth';

let socket: Socket | null = null;

export const initializeSocket = (): Socket => {
  if (!socket) {
    socket = io(import.meta.env.VITE_APP_SOCKET_URL, {
      extraHeaders: {
        Authorization: `${getAccessTokenFromLS()}`,
      }
    });

    socket.on('connect', () => {
      console.log('✅ Socket connected');
    });

    socket.on('disconnect', () => {
      console.log('❌ Socket disconnected');
    });

    socket.on('connect_error', (error) => {
      console.error('❗ Socket connection error:', error);
    });
  }
  return socket;
};

export const getSocket = (): Socket => {
  if (!socket) {
    console.warn('⚠️ Socket not initialized. Initializing...');
    return initializeSocket();
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null; // Clear the socket reference
    console.log('Socket disconnected');
  }
};
