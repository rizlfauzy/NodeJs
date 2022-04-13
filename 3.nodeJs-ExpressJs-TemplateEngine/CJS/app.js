const express = require("express");
const app = express();
var expressLayouts = require("express-ejs-layouts");
const port = 5000;

app.use(expressLayouts);
//gunakan ejs
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  const mahasiswa = [
    {
      nama: "Rizal Fauzi",
      email: "rizalfauzi774@gmail.com",
    },
    {
      nama: "Husein Azka",
      email: "huseinazka43@gmail.com",
    },
  ];
  res.render("index", {
    nama: "Rizal Fauzi",
    title: "Home",
    mahasiswa,
    layout: "layouts/main-layouts",
  });
});

app.get("/about", function (req, res) {
  res.render("about", { title: "about", layout: "layouts/main-layouts" });
});

app.get("/contact", function (req, res) {
  res.render("contact", { title: "contact", layout: "layouts/main-layouts" });
});

app.get("/product/:id", function (req, res) {
  res.send(/*html*/ `
    <h3>Product ID : ${req.params.id}</h3>
    <h3>Category : ${req.query.category}</h3>
    `);
});

app.use("/", function (req, res) {
  res.status(404);
  res.send("<h1>File not found</h1>");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
