import { Server, Socket } from "socket.io";
import { createServer } from "http";

const httpServer = createServer();
const io = new Server(httpServer);

io.on("connection", (socket: Socket) => {
  console.log("connected", socket);
});

httpServer.listen(8000, () => {
  console.log("Listening PORT:8000");
});
