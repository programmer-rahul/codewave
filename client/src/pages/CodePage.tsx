import SideNavBar from "../components/navbar/NavBar";
import EditorPanel from "../components/editor/EditorPanel";
import { useContext, useEffect } from "react";
import { SocketContext } from "../context/SocketContext";
import toast from "react-hot-toast";
import { MessageType, useApp } from "../context/AppContext";

const CodePage = () => {
  const { socket } = useContext(SocketContext);

  const {
    setAllClients,
    chatMessages,
    setChatMessages,
    selectedTab,
    setUnreadMessageCount,
  } = useApp();

  useEffect(() => {
    console.log("mounted ", socket);

    if (!socket) return;
    socket?.on("room-joined", ({ username }: { username: string }) => {
      toast.success(username + " joined the room");
      console.log(username + " joined the room");
    });

    socket?.on("room-left", ({ username }: { username: string }) => {
      toast.error(username + " left the room");
      console.error(username + " left the room");
    });

    socket?.on("updated-client-list", ({ clients }) => {
      setAllClients(clients);
    });

    // chat
    socket?.on("recieved-message", (message: MessageType) => {
      console.log("chatMessages", chatMessages);

      setChatMessages((prev) => {
        return [...prev, message];
      });
      selectedTab !== "chat" && setUnreadMessageCount((prev) => ++prev)
    });

    return () => {
      socket?.off("room-joined");
      socket?.off("room-left");
      socket?.off("updated-client-list");
      socket?.off("recieved-message");
    };
  }, [socket]);

  return (
    <main className="h-screen bg-slate-900">
      <div className="flex h-full">
        <SideNavBar />
        <EditorPanel />
      </div>
    </main>
  );
};
export default CodePage;
