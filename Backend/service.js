var express = require ("express");
var app = express();
var server = require("http").createServer(app);
server.listen(3001);

app.get("/", function(req,res){
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ a: 1 }));
});

app.get("/vidu", function(req,res){
    res.setHeader('Content-Type', 'application/json');
    res.send("Day la send chuoi");
});