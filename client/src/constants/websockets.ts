export enum EVENT {
  OFFER_SDP = "offerSDP",
  OFFER = "offer",
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
