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

  const { socket, initSocket } = useSocket();
  const { username, setUsername, setRoomId } = useApp();

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
    if (socket === null) return initSocket();

    if (!socket) return;

    socket.on("connect", () => setStatus(true));

    socket.emit("room-join", { username, roomId });
    socket.on("room-joined", ({ username }: { username: string }) =>
      toast.success(username + " joined the room")
    );

    socket.on("user-disconnected", () => {});
  }, [socket]);

  return !status ? <div>Loading...</div> : <CodePage />;
};
export default CodePageLayout;
