import { Server, Socket } from "socket.io";
import { createServer } from "http";

const httpServer = createServer();
const io = new Server(httpServer, {
  path: "/signaling",
});
const PORT = 8000;

type RTCSessionDescription = {
  type: string;
  sdp: string;
};
const SDP_OFFER_LIST: Record<string, RTCSessionDescription> = {};

enum EVENT {
  OFFER_SDP = "offerSDP",
  SEND_MESSAGE = "sendMessage",
}

enum CLIENT_EVENT {
  OFFERS = "offers",
  GET_MESSAGE = "getMessage",
  OFFER = "offer",
  DELETE_OFFER = "deleteOffer",
  COUNT = "count",
}

io.on("connection", (socket: Socket) => {
  io.to(socket.id).emit(CLIENT_EVENT.COUNT, io.engine.clientsCount);
  socket.broadcast.emit(CLIENT_EVENT.COUNT, io.engine.clientsCount);
  socket.on(EVENT.OFFER_SDP, (args, callback) => {
    const { offer } = args;
    SDP_OFFER_LIST[socket.id] = offer;
    callback({
      status: 200,
    });
    socket.broadcast.emit(CLIENT_EVENT.OFFER, { id: socket.id, offer });
  });
  socket.on(EVENT.SEND_MESSAGE, (args, callback) => {
    socket.broadcast.emit(CLIENT_EVENT.GET_MESSAGE, args);
    callback(args);
  });

  socket.on("disconnect", () => {
    delete SDP_OFFER_LIST[socket.id];
    socket.broadcast.emit(CLIENT_EVENT.DELETE_OFFER, socket.id);
    socket.broadcast.emit(CLIENT_EVENT.COUNT, io.engine.clientsCount);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Listening PORT:${PORT}`);
});
