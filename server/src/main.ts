import { Server, Socket } from "socket.io";
import { createServer } from "http";

const httpServer = createServer();
const io = new Server(httpServer);
const PORT = 8000;

io.on("connection", (socket: Socket) => {
  console.log("connected", socket);
});

httpServer.listen(PORT, () => {
  console.log(`Listening PORT:${PORT}`);
});
