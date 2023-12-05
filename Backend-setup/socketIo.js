const express = require("express");
const http = require("http");
const app = express();
const path = require("path");
const socketIo = require("socket.io");
const server = http.createServer(app);
const io = socketIo(server);
const {SERVER} = require('./config')

const port = SERVER.socket_port || 8080;

/** Route */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "socketIo.html"));
});

/** Create a new connection */
io.on("connection", (socket) => {
  console.log("A user is connected");

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });

  socket.on("posCartAdded", (data) => {
    io.emit("posCartAdded", data);
  });

  socket.on("customersAdded", (data) => {
    io.emit("customersAdded", data);
  });

  /** Listen for the 'supplierNotification' event from the backend */
  socket.on("supplierNotification", (data) => {
    /** Emit the 'supplierNotification' event to the connected frontend */
    io.emit("supplierNotification", data);
  });

  socket.on("message", (msg) => {
    console.log("Client message: " + msg);

    /** Emit a custom event from the server to the client */
    io.emit("new_message", `Server received a new message: ${msg}`);
  });

  // // Emit events
  // socket.emit(
  //   "server",
  //   "Received From Server Hello client Eh, how are you? I'm Shashi, how are you"
  // );
  // socket.emit("server_notification", "Received From Server");
});

server.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

module.exports = {
  io
};
