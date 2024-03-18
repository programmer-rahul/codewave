import { useContext, useEffect, useRef, useState } from "react";
import { SocketContext } from "../../context/SocketContext";
import { MessageInterface, useApp } from "../../context/AppContext";

const ChatPanel = () => {
  const { socket } = useContext(SocketContext);
  const {
    chatMessages,
    setChatMessages,
    username,
    unreadMessageCount: unreadCount,
    setUnreadMessageCount: setUnreadCount,
  } = useApp();

  const [message, setMessage] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const sendMessageHandler = () => {
    if (message.trim() === "") return;
    if (!socket) return;

    setChatMessages((prev) => {
      return [...prev, { message: message, username: username, owner: true }];
    });
    socket.emit("new-message", { message });
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });

    if (unreadCount > 0) {
      setUnreadCount(0);
    }
  }, [chatMessages]);

  return (
    <div className="chatpanel relative h-full">
      <h2 className="fixed h-[5%] w-full bg-slate-900 p-2 text-xl font-semibold text-white">
        Room Chat
      </h2>
      {/* messages  */}
      <div className="room-messages no-scrollbar flex max-h-full min-h-full flex-col items-center gap-8 overflow-x-hidden overflow-y-scroll bg-zinc-900  py-20">
        {chatMessages.map((chatMessage, index) => {
          return (
            <ChatMessage
              message={chatMessage.message}
              username={chatMessage.username}
              owner={chatMessage.owner}
              key={index}
            />
          );
        })}
        <div ref={scrollRef} />
      </div>

      {/* message input bar  */}
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

const ChatMessage = ({
  username,
  message,
  owner = false,
}: MessageInterface) => {
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
