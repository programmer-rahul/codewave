const mountSocketIO = (io) => {
  return io.on("connection", (socket) => {
    console.log("A user connected to the server ", socket.id);
  });
};

export { mountSocketIO };
