import { useEffect, useState } from "react";
import { FEATURE_COLORS } from "../styles/colors/features";

export const useWebRtcOffer = (answer?: RTCSessionDescription | null) => {
  const [offer, setOffer] = useState<RTCSessionDescription | null>(null);
  const [offerDataChannel, setOfferDataChannel] =
    useState<RTCDataChannel | null>(null);

  useEffect(() => {
    const localConnection = new RTCPeerConnection();
    if (!offerDataChannel) {
      setOfferDataChannel(localConnection.createDataChannel("channel"));
    } else {
      offerDataChannel.onmessage = () => {};
      offerDataChannel.onopen = () => {
        console.log("Connection Opened");
      };
    }
    localConnection.onicecandidate = () => {
      setOffer(localConnection.localDescription);
    };
    localConnection.createOffer().then((o) => {
      localConnection.setLocalDescription(o).then(() => {
        console.log("%cSET SUCCESSFULLY", `color: ${FEATURE_COLORS.SUCCESS}`);
      });
    });
    if (answer) {
      localConnection.setRemoteDescription(answer).then();
    }
  }, [answer, offerDataChannel]);

  return { offer, offerDataChannel };
};
