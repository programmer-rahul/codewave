useEffect(() => {
  console.log("mounted", socket !== null);
  if (socket === null) connectSocket();

  if (!socket) return;

  socket.on("connect", () => {
    setConnectionStatus(true);
  });

  socket.on("room-joined", ({ username }: { username: string }) =>
    toast.success(username + " joined the room"),
  );

  socket.on("room-left", ({ username }: { username: string }) => {
    toast.error(username + " left the room");
  });

  socket.on("updated-client-list", ({ clients }) => {
    setAllClients(clients);
  });

  // chat
  socket.on("recieved-message", (message: MessageType) => {
    console.log("chatMessages", chatMessages);
    setChatMessages((prev) => {
      message["isSeen"] = false;
      return [...prev, message];
    });
  });

  socket.emit("room-join", { username, roomId });

  return () => {
    console.log("unmounted", typeof socket);
    if (socket === null) return;
    socket.off("room-joined");
    socket.off("room-left");
    socket.off("updated-client-list");
    socket.off("recieved-message");
  };
}, [socket]);