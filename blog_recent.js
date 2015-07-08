/**
 * Created by terry on 7/8/15.
 */
var http = require("http");
var fs = require("fs");
http.createServer(function(req, res) {
    getTitles(res);
}).listen(8000, "127.0.0.1");

function getTitles(res) {
    fs.readFile("./titles.json", function(err, data) {
       handleResult(err, res, JSON.parse(data.toString()), getTemplate);
    });
}
function handleResult(err, res, data, callback) {
    if (err) {
        console.error(err);
        res.end("Server Error");
    } else {
        callback(data, res);
    }
}
function getTemplate(titles, res) {
    fs.readFile("./template.html", function(err, data) {
        var html = data.toString().replace("%", titles.join("</li><li>"));
        handleResult(err, res, html, writeResponse);
    });
}
function writeResponse(data, res) {
    res.writeHead(200, {"Content-Type" : "text/html"});
    res.end(data);
}