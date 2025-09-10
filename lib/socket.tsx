import { io, Socket } from "socket.io-client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./auth";

const API_URL = process.env.EXPO_PUBLIC_API_URL?.replace("/api/v1", "") || "";

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  updateDriverLocation: (latitude: number, longitude: number) => void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAuth();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!token) {
      return;
    }

    const newSocket = io(API_URL, {
      auth: {
        token,
      },
    });

    newSocket.on("connect", () => {
      setIsConnected(true);
      console.log("Socket connected");
    });

    newSocket.on("disconnect", () => {
      setIsConnected(false);
      console.log("Socket disconnected");
    });

    newSocket.on("rideUpdate", (data) => {
      console.log("Ride update:", data);
      // TODO: Handle ride status updates in the app state
    });

    newSocket.on("locationUpdate", (data) => {
      console.log("Location update:", data);
      // TODO: Update driver location on map
    });

    newSocket.on("connect_error", (error) => {
      console.error("Socket connection error:", error.message);
      if (error.message === "Authentication failed") {
        // TODO: Handle authentication error (e.g., sign out user)
      }
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [token]);

  const updateDriverLocation = (latitude: number, longitude: number) => {
    if (socket) {
      socket.emit("updateLocation", {
        latitude,
        longitude,
      });
    }
  };

  return (
    <SocketContext.Provider value={{ socket, isConnected, updateDriverLocation }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
