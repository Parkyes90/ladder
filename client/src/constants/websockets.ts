export enum EVENT {
  OFFER = "offer",
}

export enum SERVER_EVENT {
  OFFER_SDP = "offerSDP",
  OFFERS = "offers",
  DELETE_OFFER = "deleteOffer",
}

export type OfferSDPResponse = {
  status: number;
};
export type OfferResponse = {
  id: string;
  offer: RTCSessionDescription;
};
