import type { NextApiResponse } from "next";
import type { Server, Socket } from "socket.io";
export interface NextApiResponseServerIO extends NextApiResponse {
  socket:
    | (Socket & {
        server: {
          io: Server;
        };
      })
    | null;
}

/*
export interface NextApiResponseServerIO extends NextApiResponse {
  socket: {
    server: {
      io: Server;
    };
  };
}
*/
