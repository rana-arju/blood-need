import type { NextApiResponse } from "next"
import type { Server } from "socket.io"

export interface NextApiResponseServerIO extends NextApiResponse {
  socket: {
    server: {
      io: Server
    }
  }
}

