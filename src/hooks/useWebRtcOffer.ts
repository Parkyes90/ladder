import { useEffect, useState } from "react";
import { FEATURE_COLORS } from "../styles/colors/features";

export const useWebRtcOffer = () => {
  const [offer, setOffer] = useState<RTCSessionDescription | null>(null);

  useEffect(() => {
    const localConnection = new RTCPeerConnection();
    const dataChannel = localConnection.createDataChannel("channel");
    dataChannel.onmessage = () => {};
    dataChannel.onopen = () => {
      console.log("Connection Opened");
    };
    localConnection.onicecandidate = () => {
      setOffer(localConnection.localDescription);
    };
    localConnection.createOffer().then((o) => {
      localConnection.setLocalDescription(o).then(() => {
        console.log("%cSET SUCCESSFULLY", `color: ${FEATURE_COLORS.SUCCESS}`);
      });
    });
  }, []);

  return { offer };
};
