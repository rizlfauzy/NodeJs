const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const {loadContact,findContact}=require('./utils/contacts')
const port = 5000;

app.use(expressLayouts);
//gunakan ejs
app.set("view engine", "ejs");

//built-in middleware
app.use(express.static('public'))

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
  const contacts = loadContact();
  res.render("contact", {
    title: "contact",
    layout: "layouts/main-layouts",
    contacts
  });
});

app.get("/contact/:nama", function (req, res) {
  const contact = findContact(req.params.nama);
  console.log(contact);
  res.render("detail", {
    title: "Detail Contact",
    layout: "layouts/main-layouts",
    contact
  });
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
