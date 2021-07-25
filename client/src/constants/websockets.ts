export enum EVENT {
  OFFER = "offer",
  GET_MESSAGE = "getMessage",
  DELETE_OFFER = "deleteOffer",
  COUNT = "count",
}

export enum SERVER_EVENT {
  OFFER_SDP = "offerSDP",
  OFFERS = "offers",
  SEND_MESSAGE = "sendMessage",
}

export type OfferSDPResponse = {
  status: number;
};
export type OfferResponse = {
  id: string;
  offer: RTCSessionDescription;
};
