var http = require('http');
var port = 8000
var server = http.createServer(function (request, response) {

    response.writeHead(200, { "Content-Type": "text\plain" });
    if (request.method == "GET") {
        if (!request.url.includes("favicon.ico")) {

            console.log(request.url);
            response.end(request.url);
        }
    }
});

server.listen(port);
console.log("Server running on port",port);