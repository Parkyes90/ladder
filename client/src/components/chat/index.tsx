import { FormEvent, useEffect, useRef, useState } from "react";
import * as localforage from "localforage";
import { CommentWrapper, Wrapper } from "./styles";
import { useSocket } from "../../hooks/useSocket";

interface Comment {
  author: string;
  content: string;
}

const Chat = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [state, setState] = useState<
    Record<string, RTCSessionDescription | null>
  >({
    offer: null,
    answer: null,
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const commentsRef = useRef<HTMLDivElement>(null);
  const { socket } = useSocket("/signaling");
  console.log(socket);
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
      <form onSubmit={handleSubmit}>
        <input type="text" ref={inputRef} />
      </form>
    </Wrapper>
  );
};

export default Chat;
