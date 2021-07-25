import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { FEATURE_COLORS } from "../styles/colors/features";
import localforage from "localforage";
import { v4 } from "uuid";
import { KEY } from "../constants/localforages";

const setSocketInstance = (
  setSocket: Dispatch<SetStateAction<Socket | null>>,
  socketInstance: Socket
) => {
  socketInstance.on("connect", () => {
    console.log("%cSocket Connected!", `color: ${FEATURE_COLORS.SUCCESS}`);
  });
  socketInstance.on("disconnect", () => {
    console.log("%cSocket DisConnected!", `color: ${FEATURE_COLORS.SUCCESS}`);
  });
  setSocket(socketInstance);
};

const getSocketInstance = (path: string, clientId: string) => {
  return io({
    path,
    query: {
      clientId: clientId as string,
    },
  });
};

export const useSocket = (path: string) => {
  const [socket, setSocket] = useState<null | Socket>(null);
  useEffect(() => {
    if (!socket) {
      localforage.getItem(KEY.CLIENT_ID).then((clientId) => {
        if (clientId) {
          setSocketInstance(
            setSocket,
            getSocketInstance(path, clientId as string)
          );
        } else {
          localforage.setItem(KEY.CLIENT_ID, v4()).then((clientId) => {
            setSocketInstance(
              setSocket,
              getSocketInstance(path, clientId as string)
            );
          });
        }
      });
    }
  }, [socket, path]);
  return { socket };
};
