import { useEffect, useState } from "react";
import { FEATURE_COLORS } from "../styles/colors/features";

export const useWebRtcAnswer = (offer: RTCSessionDescription | null) => {
  const [answer, setAnswer] = useState<RTCSessionDescription | null>(null);
  useEffect(() => {
    if (offer) {
      const successColor = `color: ${FEATURE_COLORS.SUCCESS}`;
      const remoteConnection = new RTCPeerConnection();
      let dataChannel: RTCDataChannel;
      remoteConnection.onicecandidate = () => {
        setAnswer(remoteConnection.localDescription);
      };
      remoteConnection.ondatachannel = (rtcDataChannelEvent) => {
        dataChannel = rtcDataChannelEvent.channel;
        dataChannel.onmessage = (messageEvent) => {
          console.log(messageEvent.data);
        };
        dataChannel.onopen = () => {
          console.log("%cConnection OPENED!", successColor);
        };
      };
      remoteConnection.setRemoteDescription(offer).then(() => {
        console.log("%cOFFER SET!!", successColor);
      });
      remoteConnection
        .createAnswer()
        .then((a) => remoteConnection.setLocalDescription(a))
        .then(() => {
          console.log("%cANSWER CREATED!", successColor);
        });
    }
  }, [offer]);

  return { answer };
};
