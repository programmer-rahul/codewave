import { useEffect, useState } from "react";
import CodePage from "../pages/CodePage";
import { useSocket } from "../context/SocketContext";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useApp } from "../context/AppContext";
import toast from "react-hot-toast";

const CodePageLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { roomId } = useParams();

  const { socket, setSocket, initSocket } = useSocket();
  const { username, setUsername, setRoomId, setAllClients } = useApp();

  const [status, setStatus] = useState(false);

  useEffect(() => {
    if (!location.state?.username) {
      return navigate("/", { state: { roomId: roomId } });
    } else {
      setUsername(location.state.username);
      roomId && setRoomId(roomId);
    }
  }, []);

  useEffect(() => {
    if (socket === null) initSocket();

    if (!socket) return;
    console.log("socket");

    socket.on("connect", () => setStatus(true));

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
      setSocket(null);
    };
  }, [socket]);

  return !status ? <div>Loading...</div> : <CodePage />;
};
export default CodePageLayout;
