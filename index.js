const express = require('express');
const http = require('http');
const fs = require('fs');
const app = express();
const path = require("path");
const server = http.createServer(app);

function getDir(path) {
  return __dirname + path
}

app.get("/components/:name/:type", (req, res) => {
  let name = req.params.name
  let type = req.params.type
  console.log(`/components/${name}/${type}`)
  try {
    if (fs.existsSync(__dirname + `/components/${name}/${type}`)) {
      let ext = path.extname(type);
      if (ext == ".js") {
        res.setHeader("content-type", "application/javascript");
      } else if (ext == ".html") {
        res.setHeader("content-type", "text/html");
      } else if (ext == ".css") {
        res.setHeader("content-type", "text/css");
      }
      res.statusCode = 200;
      res.sendFile(__dirname + `/components/${name}/${type}`);
      console.log("sended 1 component")
    }
  } catch (err) {
    console.log("component handle: notfound")
    res.send({ Status: "ERROR-FILE-NOT-FOUND" });
  }
})
app.get('/localbase/file/*', (req, res) => {
  let file = req.params[0]; // use a wildcard route parameter to capture all additional segments
  let filedirect = "/";
  for (let i = 0; i < file.length; i++) {
    if (file[i] == "+") {
      filedirect += "/";
    } else {
      filedirect += file[i];
    }
  }
  console.log("Sending:  " + filedirect);
  try {
    if (fs.existsSync(`./${filedirect}`)) {
      let ext = path.extname(filedirect);
      if (ext == ".js") {
        res.setHeader("content-type", "application/javascript");
      } else if (ext == ".html") {
        res.setHeader("content-type", "text/html");
      } else if (ext == ".css") {
        res.setHeader("content-type", "text/css");
      }
      res.statusCode = 200;
      res.sendFile(__dirname + filedirect);
    }
  } catch (err) {
    res.send({ Status: "ERROR-FILE-NOT-FOUND" });
  }
});

app.get('/', function(req, res) {
  res.send('<script>window.onload=()=>{window.open("/home", "_self")}</script>');
});
app.get('/home', function(req, res) {
  res.sendFile(getDir("/home/index.html"))
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});