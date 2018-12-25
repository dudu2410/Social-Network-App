var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var req = new XMLHttpRequest();
req.open("POST", "http://localhost:3002", false);
req.setRequestHeader("Content-Type", "application/text; charset=UTF-8");

var jsonBody = {
  "name" : "Lam Pham",
  "url" : "completejavascript.com"
};
req.send("5");


console.log(req.status);
console.log(req.responseText);