import express from "express";
//klo pke model ESM __dirname harus dideklarasi terlebih dahulu
import path from "path";
const __dirname = path.resolve();
const app = express();
const port = 5000;

app.get("/", (req, res) => {
  res.sendFile("./view/index.html", { root: __dirname });
});
app.get("/about", (req, res) => {
  res.sendFile("./view/about.html", { root: __dirname });
});
app.get("/contact", (req, res) => {
  res.sendFile("./view/contact.html", { root: __dirname });
});
app.get("/json", (req, res) => {
  res.json({
    name: "Rizal Fauzi",
    email: "rizalfauzi774@gmail.com",
    noHp: "085156568650",
  });
});
//:id adalah parameter yg isinya bisa berubah sesuai user
//diambil dengan req.params
//query seperti ?namaquery=hasilquery
//diambil dengan req.query
app.get('/product/:id', (req, res) => {
  res.send(/*html*/ `
    <h3>Product ID : ${req.params.id}</h3>
    <h3>Category : ${req.query.category}</h3>
    `);
});
app.use("/", (req, res) => {
  res.status(404);
  res.send("<h1>File not found</h1>");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
