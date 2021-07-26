import { FormEvent, useEffect, useRef, useState } from "react";
import * as localforage from "localforage";
import { ChatWrapper, CommentWrapper, Title, Wrapper } from "./styles";
import { useSocket } from "../../hooks/useSocket";
import { EVENT, SERVER_EVENT } from "constants/websockets";
import { KEY } from "../../constants/localforages";

interface Comment {
  clientId: string;
  content: string;
}

const Chat = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const commentsRef = useRef<HTMLDivElement>(null);
  const { socket } = useSocket("/signaling");
  const [sessionCount, setSessionCount] = useState(0);

  useEffect(() => {
    socket?.on(EVENT.COUNT, (response: number) => {
      setSessionCount(response);
    });
    socket?.on(EVENT.GET_MESSAGE, (response: Comment) => {
      setComments((prevComments) => {
        const newComments = prevComments.concat(response);
        localforage.setItem("chat", newComments).then();
        return newComments;
      });
    });
  }, [socket]);

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
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const content = inputRef.current!.value;
    inputRef.current!.value = "";
    if (content === "/clear") {
      return localforage.setItem("chat", []).then((value) => {
        setComments(value);
      });
    }
    const clientId = await localforage.getItem<string>(KEY.CLIENT_ID);
    socket?.emit(
      SERVER_EVENT.SEND_MESSAGE,
      { content, clientId },
      (response: Comment) => {
        const newComments = comments.concat(response);
        return localforage.setItem("chat", newComments).then((value) => {
          setComments(value);
        });
      }
    );
  };

  return (
    <Wrapper>
      <Title>ChatRoom ({sessionCount})</Title>
      <ChatWrapper>
        <div ref={commentsRef}>
          {comments.map((comment, index) => {
            return (
              <CommentWrapper key={index}>{`${
                comment.clientId.split("-")[0]
              } > ${comment.content}`}</CommentWrapper>
            );
          })}
        </div>
        <form onSubmit={handleSubmit}>
          <input type="text" ref={inputRef} />
        </form>
      </ChatWrapper>
    </Wrapper>
  );
};

export default Chat;
