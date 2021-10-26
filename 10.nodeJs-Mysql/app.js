const express = require("express");
const app = express();
const { Op } = require('sequelize');
const Contact = require("./model/table");
const { dino, PORT, HOST, HOST_URL } = require('./utils/db');
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const { body, validationResult, check } = require("express-validator");
const methodOverride = require("method-override");

//konfigurasi ejs
app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

//konfigurasi method override
app.use(methodOverride("_method"));

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

//untuk memastikan terhubung dengan database
// dino
//   .authenticate()
//   .then(() => console.log("Koneksi berhasil"))
//   .catch((err) => console.log("Koneksi gagal", err));

//halaman home
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
    layout: "layouts/main-layout",
  });
});

//halaman about
app.get("/about", function (req, res) {
  res.render("about", { title: "about", layout: "layouts/main-layout" });
});

//halaman contact
app.get("/contact", async function (req, res) {
  const contacts = await Contact.findAll({});
  res.render("contact", {
    title: "Contact",
    layout: "layouts/main-layout",
    contacts,
    msg: req.flash("msg"),
  });
});

// halaman detail contact
app.get("/contact/:id", async function (req, res) {
  const contact = await Contact.findOne({ where:{id:req.params.id} });
  // res.send(contact)
  res.render("detail", {
    title: "Detail Contact",
    layout: "layouts/main-layout",
    contact,
  });
});

//add contact
app.get("/add-contact", function (req, res) {
  res.render("add-contact", {
    title: "Add Item",
    layout: "layouts/main-layout",
  });
});

//proses add contact
app.post(
  "/contact",
  [
    body("nama").custom(async (value) => {
      const duplicate = await Contact.findOne({ where: { nama: value } });
      if (duplicate) {
        throw new Error("Nama sudah ada!");
      }
      return true;
    }),
    check("email", "Email Anda Salah Input").isEmail(),
    check("noHp", "No Hp anda Salah").isMobilePhone("id-ID"),
  ],
  async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("add-contact", {
        title: "Add Item",
        layout: "layouts/main-layout",
        errors: errors.array(),
      });
    } else {
      //kirimkan flash message
      const insertData = await Contact.create(req.body);
      req.flash("msg", "Data Contact Berhasil Ditambahkan");
      res.redirect("/contact");
    }
  }
);

//halaman edit data
app.get("/edit-contact/:id",async (req, res) => {
  const contact = await Contact.findOne({ where: { id: req.params.id } });
  if (!contact) {
    res.status(404).send("<h1>File not found</h1>");
  } else {
    res.render("edit-contact", {
      title: "Edit Contact",
      layout: "layouts/main-layout",
      contact,
    });
  }
});

//proses edit data
app.put(
  "/contact",
  [
    body("nama").custom(async (value, { req }) => {
      const duplicate = await Contact.findOne({
        where:
        {
          nama:
            {[Op.eq]: value }
        }
      });
      if (value !== req.body.oldNama && duplicate) {
        throw new Error("Nama sudah ada!");
      }
      return true;
    }),
    check("email", "Email Anda Salah Input").isEmail(),
    check("noHp", "No Hp anda Salah").isMobilePhone("id-ID"),
  ],
  async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("edit-contact", {
        title: "Edit Contact",
        layout: "layouts/main-layout",
        errors: errors.array(),
        contact: req.body,
      });
    } else {
      //kirimkan flash message
      await Contact.update(
        req.body,
        {
          where: { id: req.body.id },
        }
      );
      req.flash("msg", "Data Contact Berhasil Diubah");
      res.redirect("/contact");
    }
  }
);

//delete Contact
app.delete("/contact", async (req, res) => {
  const deleteContact = await Contact.destroy({ where:{id:req.body.id} });
  req.flash("msg", "Data Contact Berhasil Dihapuskan");
  res.redirect("/contact");
  // res.send(req.body)
});

app.listen(PORT, () => console.log(`Aplikasi berjalan di http://${HOST}:${PORT}`));
