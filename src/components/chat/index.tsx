import { FormEvent, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { BASE_COLORS, pxToRem } from "../../styles";
import * as localforage from "localforage";
import { useWebRTC } from "../../hooks/useWebRTC";

interface Comment {
  author: string;
  content: string;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${BASE_COLORS.BLUE_GREY_920};
  height: ${pxToRem(400)};

  div {
    flex: 1;
    overflow: auto;
    color: ${BASE_COLORS.BLUE_GREY_25};

    &::-webkit-scrollbar {
    }

    &::-webkit-scrollbar-thumb {
    }
    &::-webkit-scrollbar {
      background: none;
      width: ${pxToRem(4)};
    }

    &::-webkit-scrollbar-thumb {
      border-radius: ${pxToRem(4)};
      background: ${BASE_COLORS.BLUE_GREY_700};
    }
  }

  input {
    width: 100%;
    margin-top: auto;
    overflow: auto;
    white-space: pre-wrap;
    word-break: break-all;
    padding: ${pxToRem(8)};
    border-color: ${BASE_COLORS.BLUE_GREY_500};
    color: ${BASE_COLORS.WHITE};
    background-color: ${BASE_COLORS.BLUE_GREY_920};
  }
`;

const CommentWrapper = styled.div`
  white-space: pre-wrap;
  word-break: break-all;
  padding: ${pxToRem(4, 8)};
`;

const Chat = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const commentsRef = useRef<HTMLDivElement>(null);

  useWebRTC();

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
    if (inputRef.current!.value === "/clear") {
      localforage.setItem("chat", []).then((value) => {
        setComments(value);
      });
    } else {
      const newComments = comments.concat({
        author: "127.0.0.1",
        content: inputRef.current!.value,
      });
      localforage.setItem("chat", newComments).then((value) => {
        setComments(value);
      });
    }

    inputRef.current!.value = "";
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
