import { Server, Socket } from "socket.io";
import { createServer } from "http";

const httpServer = createServer();
const io = new Server(httpServer, {
  path: "/signaling",
});
const PORT = 8000;

io.on("connection", (socket: Socket) => {
  console.log("connected", socket.handshake.query);
});

httpServer.listen(PORT, () => {
  console.log(`Listening PORT:${PORT}`);
});
