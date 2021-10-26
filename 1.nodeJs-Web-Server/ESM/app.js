import * as http from "http";
import * as fs from "fs";
const port = 3000;

const render = (path, res) => {
  fs.readFile(`./view/${path}.html`, "utf-8", (e, data) => {
    if (e) {
      res.writeHead(404);
      res.write("Error: file not found");
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
    if (url === "/about") {
      render('about',res)
    } else if (url === "/contact") {
      render('contact',res)
    } else {
      render(`index`,res)
    }
  })
  .listen(port, () => {
    console.log(`Server is listening on port ${port}... `);
  });
