// const platformfile = require('./platform.json');
// console.log(platformfile); 

var fs = require('fs');
var obj = JSON.parse(fs.readFileSync('./platform.json', 'utf8'));
var current_platform=parseInt(obj.Platform_Number);
var logo_links=obj.Platform_logo;
var download_link="";
console.log(current_platform);
console.log(logo_links[0].Link);