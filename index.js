var http = require("http");
var url = require("url");
var fs = require("fs");

http
  .createServer(function (req, res) {
    const q = url.parse(req.url, true);
    let filename = "";
    if (q.pathname === "/") {
      filename = "." + "/index.html";
    } else {
      filename = "." + q.pathname;
    }

    fs.readFile(filename, function (err, data) {
      if (err) {
        fs.readFile("404.html", "utf-8", (err404, page404) => {
          if (err404) {
            res.writeHead(500, { "Content-Type": "text/html" });
            res.write("<h1>500 Internal Server Error</h1>");
            return res.end();
          }
          res.writeHead(404, { "Content-Type": "text/html" });
          res.write(page404);
          return res.end();
        });
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        return res.end();
      }
    });
  })
  .listen(8080);

console.log("Server running at http://localhost:8080/");
