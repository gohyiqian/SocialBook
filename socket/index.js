const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

// filter users to add
const addUser = (userId, socketId) => {
  // add user only if is unique user
  // if same user, do not add
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

// filter users to remove
const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

// get a specific user
const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

// connect to socket server
io.on("connection", (socket) => {
  //when connect
  console.log("a user connected.");

  // TAKE EVENT(userId and socketId) FROM CLIENT
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    // SEND EVENT TO EVERY CLIENT
    io.emit("getUsers", users);
  });

  // TAKE EVENT(messages) FROM CLIENT
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    // find the receiver user
    const user = getUser(receiverId);
    // SEND EVENT TO 1 SPECIFIC CLIENT
    io.to(user.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  // when user disconnected
  // take event from client
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
