import express from "express";
import expressLayouts from "express-ejs-layouts";
import { loadContact, findContact, addContact,checkDuplicate,deleteContact,updateContact } from "./utils/contacts.js";
import { body, validationResult, check } from "express-validator";
import session from "express-session";
import cookieParser from "cookie-parser";
import flash from "connect-flash";
const app = express();
const port = 5000;

//akan menggunakan ejs
app.set("view engine", "ejs");

//middleware adalah prosess yang dilakukan setelah user mengirim request
// dan sebelum user menerima response
//middleware berjalan dari atas kebawah

//third-party middleware
//menggunakan middleware expressejslayouts
app.use(expressLayouts);//untuk view engine
//third-party middleware
//konfigurasi middleware flash massage hrs dengan session
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

//built-in middleware
app.use(express.static('public'));
//berguna untuk menangani file statik web seperti img,css,dll

//built-in middleware
app.use(express.urlencoded({ extended: true }));
//berguna agar bisa menerima data yg diinput dari form body

//application-level middleware
app.use(function (req, res, next) {
  console.log("Time:", Date.now());
  next();
});//middleware buatan sendiri
//harus terdapat next agar middleware selanjutnya dapat berjalan
app.use(function (req, res, next) {
  console.log("Request Type:", req.method);
  next()
});
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
  const contacts = loadContact();
  res.render("contact", {
    title: "Contact",
    layout: "layouts/main-layout",
    contacts,
    msg: req.flash('msg')
  });
});
//harus sebelum /contact/:nama agar bisa dipanggil
app.get("/contact/add", (req, res) => {
  res.render("add-contact", {
    title: "Add Contact",
    layout: "layouts/main-layout",
  });
})
//post data dari form body
app.post('/contact', [
  body("nama").custom(value => {
    const dupli = checkDuplicate(value);
    if (dupli) {
      throw new Error("Maaf nama sudah ada!");
    }
    return true;
  }),
  check("email", "Email Anda salah input").isEmail(),
  check("noHp", "No Hp Anda salah").isMobilePhone("id-ID")
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.render("add-contact", {
      title: "Add Contact",
      layout: "layouts/main-layout",
      errors: errors.array(),
    })
  } else {
    console.log(typeof errors);
    addContact(req.body);
    req.flash('msg',"Data berhasil ditambahkan")
    res.redirect("/contact")
  }
})
app.get("/contact/delete/:nama", (req, res) => {
  const contact = findContact(req.params.nama);
  if (!contact) {
    res.status(404).send("<h1>File not found</h1>")
  } else {
    deleteContact(req.params.nama)
    req.flash("msg", "Data Contact Berhasil Dihapuskan");
    res.redirect("/contact")
  }
})
app.get("/contact/edit/:nama", (req, res) => {
  const contact = findContact(req.params.nama);
  if (!contact) {
    res.status(404).send("<h1>File not found</h1>");
  } else {
    res.render('edit-contact', {
      title: "Edit Contact",
      layout: "layouts/main-layout",
      contact
    })
  }
});
app.post(
  "/contact/update",
  [
    body("nama").custom((value, { req }) => {
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
      res.render("edit-contact", {
        title: "Edit Contact",
        layout: "layouts/main-layout",
        errors: errors.array(),
        contact: req.body,
      });
    } else {
      //kirimkan flash message
      req.flash("msg", "Data Contact Berhasil Diubah");
      updateContact(req.body);
      res.redirect("/contact");
    }
  }
);

app.get("/contact/:nama", (req, res) => {
  const contact = findContact(req.params.nama);
  res.render("detail", {
    title: "Detail",
    layout: "layouts/main-layout",
    contact,
  });
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
