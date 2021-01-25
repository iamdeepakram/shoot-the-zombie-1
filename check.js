'use strict';
var fs = require('fs');
var obj = JSON.parse(fs.readFileSync('./platform.json', 'utf8'));
var Perform_Action = obj.Platform_Details.Icon_Set;
var https = require('https');
var http = require('http');
var port =4000
console.log("Icon Set:", obj.Platform_Details.Icon_Set);

function SetIcon(platform_pass) {
    if (Perform_Action === "false") {
        if (platform_pass === null) {
            var current_platform = parseInt(obj.Platform_Details.Current_Platform) - 1;
        }
        if (platform_pass!==null){
            platform_pass=platform_pass.substring(1);
            var current_platform = parseInt(platform_pass)-1;
            console.log(parseInt(platform_pass))
        }
        var logo_links = obj.Platform_logo;
        var download_link = logo_links[current_platform].Link;
        console.log("The current Platform is", current_platform + 1);
        console.log("The Logo will be downloaded from", logo_links[current_platform].Link);

        try {

            const file = fs.createWriteStream("images/gameicon-sheet0.png");
            const request = https.get(download_link, function (response) {
                response.pipe(file);
            });

        } catch (err) {
            console.log(err)
        }

    } else if (Perform_Action === "true") {

        console.log("Icon Already set");

    } else {
        console.log("Unknown entry in Icon_Set parameter, ensure the value is either 'true' or 'false' ")
    }
}

var server = http.createServer(function (request, response) {

    response.writeHead(200, { "Content-Type": "text\plain" });
    if (request.method == "GET") {
        if (!request.url.includes("favicon.ico")) {

            console.log(request.url);
            response.end(request.url);
            SetIcon(request.url);
        }
    }
});

server.listen(port);
console.log("Server running on port",port);