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
  OFFER = "offer",
  DELETE_OFFER = "deleteOffer",
}

io.on("connection", (socket: Socket) => {
  io.to(socket.id).emit(EVENT.OFFERS, SDP_OFFER_LIST);

  socket.on(EVENT.OFFER_SDP, (args, callback) => {
    const { offer } = args;
    SDP_OFFER_LIST[socket.id] = offer;
    callback({
      status: 200,
    });
    socket.broadcast.emit(EVENT.OFFER, { id: socket.id, offer });
  });
  socket.on("disconnect", () => {
    delete SDP_OFFER_LIST[socket.id];
    socket.broadcast.emit(EVENT.DELETE_OFFER, socket.id);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Listening PORT:${PORT}`);
});
