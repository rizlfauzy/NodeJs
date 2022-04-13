const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const { loadContact, findContact, addContact, checkDuplicate, deleteContact,updateContact } = require("./utils/contacts");
const { body, validationResult, check } = require("express-validator");
const port = 5000;

app.use(expressLayouts);
//gunakan ejs
app.set("view engine", "ejs");
//built-in middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
//konfigurasi flash
app.use(cookieParser("secret"));
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

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
    title: "Contact",
    layout: "layouts/main-layouts",
    contacts,
    msg: req.flash("msg"),
  });
});

//add item
app.get("/contact/add", function (req, res) {
  res.render("add_contact", {
    title: "Add Item",
    layout: "layouts/main-layouts",
  });
});

//prosess data contact
app.post(
  "/contact",
  [
    body("nama").custom((value) => {
      const duplicate = checkDuplicate(value);
      if (duplicate) {
        throw new Error("Nama sudah ada!");
      }
      return true;
    }),
    check("email", "Email Anda Salah Input").isEmail(),
    check("noHp", "No Hp anda Salah").isMobilePhone("id-ID"),
  ],
  function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("add_contact", {
        title: "Add Item",
        layout: "layouts/main-layouts",
        errors: errors.array(),
      });
    } else {
      //kirimkan flash message
      req.flash("msg", "Data Contact Berhasil Ditambahkan");
      addContact(req.body);
      res.redirect("/contact");
    }
  }
);

//delete Contact
app.get("/contact/delete/:nama", function (req, res) {
  const contact = findContact(req.params.nama);

  //jika tidak ada maka
  if (!contact) {
    res.status(404).send("<h1>File not found</h1>");
  } else {
    req.flash("msg", "Data Contact Berhasil Dihapuskan");
    deleteContact(req.params.nama);
    res.redirect("/contact");
  }
});

//edit item
app.get("/contact/edit/:nama", function (req, res) {
  const contact = findContact(req.params.nama);
  res.render("edit_contact", {
    title: "Edit Item",
    layout: "layouts/main-layouts",
    contact,
  });
});

//update item
app.post(
  "/contact/update",
  [
    body("nama").custom((value,{req}) => {
      const duplicate = checkDuplicate(value);
      if (value !== req.body.oldNama && duplicate) {
        throw new Error("Nama sudah ada!");
      }
      return true;
    }),
    check("email", "Email Anda Salah Input").isEmail(),
    check("noHp", "No Hp anda Salah").isMobilePhone("id-ID"),
  ],
  function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("edit_contact", {
        title: "Edit Item",
        layout: "layouts/main-layouts",
        errors: errors.array(),
        contact: req.body
      });
    } else {
      //kirimkan flash message
      req.flash("msg", "Data Contact Berhasil Diubah");
      updateContact(req.body);
      res.redirect("/contact");
    }
  }
);

//detail contact
app.get("/contact/:nama", function (req, res) {
  const contact = findContact(req.params.nama);
  res.render("detail", {
    title: "Detail Contact",
    layout: "layouts/main-layouts",
    contact,
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
