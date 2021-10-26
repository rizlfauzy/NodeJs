import express from "express";
import expressLayouts from "express-ejs-layouts";
const app = express();
const port = 5000;

//akan menggunakan ejs
app.set("view engine", "ejs");

//menggunakan middleware expressejslayouts
app.use(expressLayouts);
app.get("/", (req, res) => {
  const mahasiswa = [
    {
      nama: "Rizal Fauzi",
      email: "rizalfauzi774@gmail.com",
    },
    {
      nama: "Husein Azka",
      email: "huseinazka43@gmail.com",
    },
    {
      nama: "Raden Muhammad Rivansyach",
      email: "rivansyach12@gmail.com",
    },
  ];
  res.render("index", {
    nama: "Rizal Fauzi",
    title: "Home",
    mahasiswa,
    layout: "layouts/main-layout"
  });
});
app.get("/about", (req, res) => {
  res.render("about", { title: "About", layout: "layouts/main-layout" });
});
app.get("/contact", (req, res) => {
  res.render("contact", { title: "Contact", layout: "layouts/main-layout" });
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
app.get("/product/:id", (req, res) => {
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
