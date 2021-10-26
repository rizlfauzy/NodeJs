const express = require("express");
const app = express();
const port = 5000;

app.get("/", function (req, res) {
    res.sendFile('./view/index.html',{root: __dirname})
});

app.get("/about", function (req, res) {
  res.sendFile("./view/about.html", { root: __dirname });
});

app.get("/contact", function (req, res) {
  res.sendFile("./view/contact.html", { root: __dirname });
});

app.get('/product/:id', function (req, res) {
  res.send(/*html*/ `
    <h3>Product ID : ${req.params.id}</h3>
    <h3>Category : ${req.query.category}</h3>
    `);
 })

app.use('/', function (req, res) {
  res.status(404);
  res.send('<h1>File not found</h1>')
 })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
