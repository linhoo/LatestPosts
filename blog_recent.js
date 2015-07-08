/**
 * Created by terry on 7/8/15.
 */
var http = require("http");
var fs = require("fs");

http.createServer(function(req, res) {
   if (req.url == "/") {
       fs.readFile("./titles.json", function(err, data) {
          if (err) {
              console.error(err);
              res.end("Server Error");
          }  else {
              var titles = JSON.parse(data.toString());

              fs.readFile("./template.html", function(err, data) {
                  if (err) {
                      console.error(err);
                      res.end("Server Error");
                  } else {
                      var templ = data.toString();

                      var html = templ.replace("%", titles.join("</li><li>"));
                      res.writeHead(200, {"Content-Type": "text/html"});
                      res.end(html);
                  }
              });
          }
       });
   }
}).listen(8000, "127.0.0.1");