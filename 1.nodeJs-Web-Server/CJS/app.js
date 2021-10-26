const http = require("http");
const fs = require("fs");
const port = 3000;
const renderHtml = (path, res) => {
  //readfile async bisa langsung menampilkan data
  //tanpa memasukan ke dalam sebuah variabel
  fs.readFile(path, "utf-8", (err, data) => {
    if (err) {
      res.writeHead(404);
      res.write("file not found");
    } else {
      res.write(data);
    }
    res.end();
  });
};

http
  .createServer((req, res) => {
    res.writeHead(200, {
      "Content-Type": "text/html",
    });
    const url = req.url;
    //untuk menangani routing manual
    if (url === "/about") {
      try {
        //jika memakai readFile sync hrs memakain try catch untuk menangkap errornya
        const aboutHtml = fs.readFileSync("./view/about.html", "utf-8");
        res.write(aboutHtml);
      } catch (err) {
        res.writeHead(404);
        res.write("file not found" + err);
      }
      res.end();
    } else if (url === "/contact") {
      renderHtml('./view/contact.html',res)
    } else {
      renderHtml('./view/index.html',res)
    }
  })
  .listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
