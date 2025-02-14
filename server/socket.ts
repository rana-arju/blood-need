import { Server } from "socket.io";
import type { Server as HttpServer } from "http";

export function initializeSocket(httpServer: HttpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:3000", // Replace with your client URL
      methods: ["GET", "POST"],
    },
  });

  const userSocketMap = new Map();

  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("join", (userId) => {
      userSocketMap.set(userId, socket.id);
    });

    socket.on("private message", ({ recipientId, message }) => {
      const recipientSocketId = userSocketMap.get(recipientId);
      if (recipientSocketId) {
        io.to(recipientSocketId).emit("private message", message);
      }
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected");
      userSocketMap.forEach((value, key) => {
        if (value === socket.id) {
          userSocketMap.delete(key);
        }
      });
    });
  });
}
