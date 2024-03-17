import { useContext, useEffect } from "react";
import CodePage from "../pages/CodePage";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { SocketContext } from "../context/SocketContext";

const CodePageLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { roomId } = useParams();

  const {
    username,
    setUsername,
    setRoomId,
    connectionStatus,
    setConnectionStatus,
  } = useApp();
  const { socket, connectSocket, disconnectSocket } = useContext(SocketContext);

  useEffect(() => {
    if (!location.state?.username) {
      return navigate("/", { state: { roomId: roomId } });
    } else {
      setUsername(location.state.username);
      roomId && setRoomId(roomId);
    }
  }, []);

  useEffect(() => {
    console.log("mounted");

    if (socket === null) connectSocket();
    if (!socket) return;

    socket.on("connect", () => {
      console.log("Conntected to the server🎈");
      setConnectionStatus(true);
      socket.emit("room-join", { username, roomId });
    });

    return () => {
      console.log("unmounted");
      if (!socket) return;
      socket.off("connect");
      socket.disconnect();
      disconnectSocket();
    };
  }, [socket]);

  return !connectionStatus ? <div>Loading...</div> : <CodePage />;
};
export default CodePageLayout;
