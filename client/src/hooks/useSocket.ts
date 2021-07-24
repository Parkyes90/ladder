import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { FEATURE_COLORS } from "../styles/colors/features";

export const useSocket = (path: string) => {
  const [socket, setSocket] = useState<null | Socket>(null);
  useEffect(() => {
    if (!socket) {
      const socketInstance = io({
        path,
      });
      socketInstance.on("connect", () => {
        console.log("%cSocket Connected!", `color: ${FEATURE_COLORS.SUCCESS}`);
      });
      socketInstance.on("disconnect", () => {
        console.log(
          "%cSocket DisConnected!",
          `color: ${FEATURE_COLORS.SUCCESS}`
        );
      });
      setSocket(socketInstance);
    }
  }, [socket, path]);
  return { socket };
};
