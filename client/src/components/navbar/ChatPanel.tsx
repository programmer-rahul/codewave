import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../context/SocketContext";
import { MessageType, useApp } from "../../context/AppContext";

const ChatPanel = () => {
  const { socket } = useContext(SocketContext);
  const { chatMessages, setChatMessages, username } = useApp();

  const [message, setMessage] = useState("");

  const sendMessageHandler = () => {
    if (message.trim() === "") return;
    if (!socket) return;

    setChatMessages([
      ...chatMessages,
      { message: message, username: username, owner: true },
    ]);
    socket.emit("new-message", { message });
  };

  useEffect(() => {
    if (!socket) return;
    socket.on("recieved-message", (message: MessageType) => {
      console.log("chatMessage", chatMessages);
      setChatMessages((prev) => {
        return [...prev, message];
      });
    });

    return () => {
      socket.off("recieved-message");
    };
  }, [socket]);

  return (
    <div className="chatpanel relative h-full border">
      <h2 className="fixed h-[5%] w-full bg-slate-900 p-2 text-xl font-semibold text-white">
        Room Chat
      </h2>
      {/* messages  */}
      <div className="room-messages no-scrollbar flex min-h-full flex-col items-center gap-8 overflow-x-hidden overflow-y-scroll bg-zinc-900 py-4 pt-20">
        {chatMessages.map((chatMessage, index) => {
          console.log(chatMessage);
          return (
            <ChatMessage
              message={chatMessage.message}
              username={chatMessage.username}
              key={index}
            />
          );
        })}
      </div>

      <div className="absolute bottom-4 w-full px-4">
        <div className="flex items-center gap-2 rounded-md border border-stone-700 bg-stone-900 px-3 py-2">
          <div className="w-full">
            <input
              type="text"
              placeholder="Message..."
              className="w-full border border-none bg-transparent text-white outline-none"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div className="send-message">
            {message.trim() !== "" && (
              <button
                className="rounded-md bg-green-600 px-4 py-1 font-semibold text-white"
                onClick={sendMessageHandler}
              >
                Send
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChatPanel;

const ChatMessage = ({ username, message, owner = false }: MessageType) => {
  return (
    <div
      className={`message min-w-44 space-y-2 rounded-md  bg-slate-700 px-3 py-1 ${owner ? "self-end" : "self-start"}`}
    >
      <div className="message-details flex justify-between text-sm text-neutral-400">
        <p className="username">{username}</p>
        <p className="time">12:40</p>
      </div>
      <div className="message-content">
        <p className="message-text">{message}</p>
      </div>
    </div>
  );
};
