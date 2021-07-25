import { FormEvent, useEffect, useRef, useState } from "react";
import * as localforage from "localforage";
import { CommentWrapper, Wrapper } from "./styles";
import { useSocket } from "../../hooks/useSocket";
import { useWebRtcOffer } from "../../hooks/useWebRtcOffer";
import {
  EVENT,
  OfferResponse,
  OfferSDPResponse,
  SERVER_EVENT,
} from "constants/websockets";
import { FEATURE_COLORS } from "../../styles/colors/features";

interface Comment {
  author: string;
  content: string;
}

const Chat = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [offers, setOffers] = useState<Record<string, RTCSessionDescription>>(
    {}
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const commentsRef = useRef<HTMLDivElement>(null);
  const { offer } = useWebRtcOffer();
  const { socket } = useSocket("/signaling");
  useEffect(() => {
    console.log(offers);
  }, [offers]);
  useEffect(() => {
    socket?.on(SERVER_EVENT.OFFERS, (response: OfferResponse[]) => {
      console.log(response, "offers");
    });
    socket?.on(EVENT.OFFER, (response: OfferResponse) => {
      const { id, offer } = response;
      console.log(response);
      setOffers((offers) => Object.assign(offers, { [id]: offer }));
    });
    socket?.on(SERVER_EVENT.DELETE_OFFER, (response: string) => {
      setOffers((offers) => {
        console.log(response, "disconnected", offers);
        delete offers[response];
        return offers;
      });
    });
  }, [socket]);
  useEffect(() => {
    if (offer && socket) {
      socket.emit(
        SERVER_EVENT.OFFER_SDP,
        { offer },
        (response: OfferSDPResponse) => {
          if (response.status === 200) {
            console.log(
              "%cSuccess Offer Signaling",
              `color: ${FEATURE_COLORS.SUCCESS}`
            );
          }
        }
      );
    }
  }, [offer, socket]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    localforage.getItem("chat").then((value) => {
      if (value) {
        setComments(value as Comment[]);
      }
    });
  }, []);

  useEffect(() => {
    commentsRef.current!.scrollTop = commentsRef.current!.scrollHeight;
  }, [commentsRef.current?.scrollHeight]);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const content = inputRef.current!.value;
    inputRef.current!.value = "";
    if (inputRef.current!.value === "/clear") {
      return localforage.setItem("chat", []).then((value) => {
        setComments(value);
      });
    }
    const newComments = comments.concat({
      author: "127.0.0.1",
      content,
    });
    return localforage.setItem("chat", newComments).then((value) => {
      setComments(value);
    });
  };

  return (
    <Wrapper>
      <div ref={commentsRef}>
        {comments.map((comment, index) => {
          return (
            <CommentWrapper
              key={index}
            >{`${comment.author} > ${comment.content}`}</CommentWrapper>
          );
        })}
      </div>
      {Object.keys(offers).map((key) => key)}
      <form onSubmit={handleSubmit}>
        <input type="text" ref={inputRef} />
      </form>
    </Wrapper>
  );
};

export default Chat;
