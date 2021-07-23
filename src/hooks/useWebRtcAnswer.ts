import { useEffect, useState } from "react";
import { FEATURE_COLORS } from "../styles/colors/features";

export const useWebRtcAnswer = (offer: RTCSessionDescription | null) => {
  const [answer, setAnswer] = useState<RTCSessionDescription | null>(null);
  const [answerDataChannel, setAnswerDataChannel] =
    useState<RTCDataChannel | null>(null);
  useEffect(() => {
    if (offer) {
      const successColor = `color: ${FEATURE_COLORS.SUCCESS}`;
      const remoteConnection = new RTCPeerConnection();
      remoteConnection.onicecandidate = () => {
        setAnswer(remoteConnection.localDescription);
      };
      remoteConnection.ondatachannel = (rtcDataChannelEvent) => {
        rtcDataChannelEvent.channel.onmessage = (messageEvent) => {
          console.log(messageEvent.data);
        };
        rtcDataChannelEvent.channel.onopen = () => {
          console.log("%cConnection OPENED!", successColor);
        };
        setAnswerDataChannel(rtcDataChannelEvent.channel);
      };
      remoteConnection.setRemoteDescription(offer).then(() => {
        console.log("%cOFFER SET!", successColor);
      });
      remoteConnection
        .createAnswer()
        .then((a) => remoteConnection.setLocalDescription(a))
        .then(() => {
          console.log("%cANSWER CREATED!", successColor);
        });
    }
  }, [offer]);

  return { answer, answerDataChannel };
};
