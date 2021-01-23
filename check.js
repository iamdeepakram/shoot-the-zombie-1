'use strict';
var fs = require('fs');
var obj = JSON.parse(fs.readFileSync('./platform.json', 'utf8'));
var Perform_Action = obj.Platform_Details.Icon_Set;

console.log(obj.Platform_Details.Icon_Set);
console.log(obj.Platform_Details.Current_Platform);


if (Perform_Action === "false") {
    const https = require('https');
    var current_platform = parseInt(obj.Platform_Details.Current_Platform) - 1;
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
