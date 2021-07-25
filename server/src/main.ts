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
  OFFERS = "offers",
  OFFER_SDP = "offerSDP",
  DELETE_OFFER = "deleteOffer",
  SEND_MESSAGE = "sendMessage",
}

enum CLIENT_EVENT {
  GET_MESSAGE = "getMessage",
  OFFER = "offer",
}

io.on("connection", (socket: Socket) => {
  io.to(socket.id).emit(EVENT.OFFERS, SDP_OFFER_LIST);

  socket.on(EVENT.OFFER_SDP, (args, callback) => {
    const { offer } = args;
    SDP_OFFER_LIST[socket.id] = offer;
    callback({
      status: 200,
    });
    socket.broadcast.emit(CLIENT_EVENT.OFFER, { id: socket.id, offer });
  });
  socket.on(EVENT.SEND_MESSAGE, (args, callback) => {
    const payload = {
      id: socket.handshake.query.clientId,
      content: args,
    };
    socket.broadcast.emit(CLIENT_EVENT.GET_MESSAGE, payload);
    callback(payload);
  });

  socket.on("disconnect", () => {
    delete SDP_OFFER_LIST[socket.id];
    socket.broadcast.emit(EVENT.DELETE_OFFER, socket.id);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Listening PORT:${PORT}`);
});
