const app = require('express')();
const expressLayouts = require("express-ejs-layouts");
const http = require("http").createServer(app);
const io = require("socket.io")(http,{});
app.use(expressLayouts);
//gunakan ejs
app.set("view engine", "ejs");
//built-in middleware
app.use(require("express").static("public"));
app.use(require("express").urlencoded({ extended: true }));
const port = 6969;
let countUserOnline = 1;

app.get('/', (req, res) => {
  res.render('index', { title: 'Home', layout: 'layouts/main-layouts' })
});

io.on('connection', socket => {
  console.log('berhasil terkoneksi websocket');
  //saat online
  socket.on("join", (param) => {
    console.log("user join");
    countUserOnline++;
    io.emit("online", countUserOnline);
  });
  //saat mengirim pesan
  socket.on('message', message => {
    console.log('user mengirim pesan : '+message);
    io.emit('message', message);
  });
  //saat disconnect
  socket.on('disconnect', disconnect => {
    console.log('user keluar');
    countUserOnline--;
    io.emit("online", countUserOnline);
  })
})

// app.listen(port, () => console.log("Aplikasi berjalan di http://localhost:" + port));
http.listen(port, () => console.log("Aplikasi berjalan di http://localhost:" + port));