var Ws = require("ws").Server,
    http = require("http"),
    fs = require("fs");

var server = http.createServer(function(req, res) {
    res.writeHead(200, { "Content-Type" : "text/html"});
    fs.readFile("./index.html", function(err, data) {
        if (err) return res.end(err);
        res.end(data);
    });
}).listen(3000);

var wss = new Ws({ server : server });

wss.on('connection', function(ws) {
    ws.on('message', function(message) {
        console.log(message);
        ws.send(JSON.stringify({
            client : message,
            server : "Hello!"
        }));
    });
    ws.on('close', function() {
        console.log("Connection closed");
    });
});

