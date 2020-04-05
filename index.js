/**
 *  configuration
 */
const PORT = process.env.PORT || 3000;

var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", function (socket) {
  socket.on("message", (data) => {
    socket.broadcast.emit("message", {
      name: data.name,
      message: data.message,
    });
  });
});

http.listen(3000, function () {
  console.log("listening on : " + PORT);
});
