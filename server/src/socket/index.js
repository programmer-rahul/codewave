const userSockets = {};

const mountSocketIO = (io) => {
  const getAllClients = (roomId) => {
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
      (socketId) => {
        return {
          socketId,
          username: userSockets[socketId].username,
        };
      }
    );
  };

  return io.on("connection", (socket) => {
    console.log("A user connected to the server ", socket.id);

    socket.on("room-join", ({ username, roomId }) => {
      userSockets[socket.id] = { roomId, username };
      socket.join(roomId);

      socket.broadcast
        .to(roomId)
        .emit("room-joined", { username, socketId: socket.id });

      const allClients = getAllClients(roomId);
      // console.log("allClients", allClients);

      io.to(roomId).emit("updated-client-list", { clients: allClients });
    });

    // for code
    socket.on("code-change", ({ code }) => {
      const roomId = userSockets[socket.id]?.roomId;
      socket.broadcast.to(roomId).emit("updated-code", { updatedCode: code });
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected ", userSockets[socket.id]);
      const username = userSockets[socket.id]?.username;
      const roomId = userSockets[socket.id]?.roomId;

      socket.broadcast
        .to(roomId)
        .emit("room-left", { username, socketId: socket.id });

      const allClients = getAllClients(roomId);
      io.to(roomId).emit("updated-client-list", { clients: allClients });

      socket.leave();
      delete userSockets[socket.id];
    });

    // chat
    socket.on("new-message", ({ message }) => {
      const roomId = userSockets[socket.id]?.roomId;
      const username = userSockets[socket.id]?.username;
      console.log(message);
      console.log(roomId);
      console.log(userSockets);

      socket.broadcast
        .to(roomId)
        .emit("recieved-message", { message, username });
    });
  });
};

export { mountSocketIO };
