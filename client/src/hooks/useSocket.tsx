import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { useContext, useEffect, useState } from "react";

import toast from "react-hot-toast";
import { SocketContext } from "../context/SocketContext";

const useSocket = () => {
  const { socket, connectSocket, disconnectSocket } = useContext(SocketContext);
  const { username, setUsername, setRoomId, setAllClients } = useApp();

  const navigate = useNavigate();
  const location = useLocation();
  const { roomId } = useParams();

  const [connectionStatus, setConnectionStatus] = useState(false);

  useEffect(() => {
    if (!location.state?.username) {
      return navigate("/", { state: { roomId: roomId } });
    } else {
      setUsername(location.state.username);
      roomId && setRoomId(roomId);
    }
  }, []);

  useEffect(() => {
    if (socket === null) connectSocket();

    if (!socket) return;

    socket.on("connect", () => setConnectionStatus(true));

    socket.on("room-joined", ({ username }: { username: string }) =>
      toast.success(username + " joined the room")
    );

    socket.on("room-left", ({ username }: { username: string }) => {
      toast.error(username + " left the room");
    });

    socket.on("updated-client-list", ({ clients }) => {
      console.log(clients);
      setAllClients(clients);
    });

    socket.emit("room-join", { username, roomId });

    return () => {
      if (socket === null) return;
      socket.off("connect");
      socket.off("room-joined");
      socket.off("room-left");
      socket.off("updated-client-list");
      socket.disconnect();
      disconnectSocket();
    };
  }, [socket]);

  return { connectionStatus };
};
export default useSocket;
