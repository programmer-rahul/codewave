const userSockets = {};

const mountSocketIO = (io) => {
  return io.on("connection", (socket) => {
    console.log("A user connected to the server ", socket.id);

    socket.on("room-join", ({ username, roomId }) => {
      console.log(roomId);
      userSockets[socket.id] = { roomId, username };
      socket.join(roomId);
      let allClients = io.sockets.adapter.rooms.get(roomId);
      allClients = Array.from(allClients);
      allClients = allClients.map((socketId) => {
        return {
          socketId,
          username: userSockets[socketId].username,
        };
      });
      console.log(allClients);

      socket.broadcast
        .to(roomId)
        .emit("room-joined", { username, socketId: socket.id });
    });
  });
};

export { mountSocketIO };
