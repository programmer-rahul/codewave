import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import socketIO from "socket.io-client";
import { useApp } from "../context/AppContext";

const useSocket = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { roomId } = useParams();

  const { username, setRoomId, setUsername, socket, setSocket } = useApp();

  const [connectionStatus, setConnectionStatus] = useState(false);

  useEffect(() => {
    console.log(location);
    console.log(roomId);

    if (!location.state?.username) {
      // toast.error("username required");
      navigate("/", { state: { roomId } });
    } else {
      setUsername(location.state.username);
      roomId && setRoomId(roomId);
    }
  }, []);

  useEffect(() => {
    connectSocket();

    return () => {
      if (socket === null) return;
      socket.off("connect");
      socket.off("room-join");
    };
  }, [socket]);

  const connectSocket = () => {
    if (socket === null) {
      const socket = socketIO("http://localhost:8000");
      setSocket(socket);
    }
    if (socket === null) return;

    socket?.on("connect", () => setConnectionStatus(true));

    socket?.emit("room-join", { username, roomId });
  };

  return { connectionStatus };
};
export default useSocke;
