var express = require('express')();
var http = require('http').Server(express);
var io = require('socket.io')(http);
var robot = require("robotjs");


express.get('/', function (req, res) {
    res.sendFile(__dirname+'/index.html');
});


express.get('/keyboards/1.html', function (req, res) {
    res.sendFile(__dirname+'/keyboards/1.html');
});



io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });

    socket.on('key', function (msg) {
        robot.keyTap(msg);
    });
    
    socket.on('macro', function (msg) {
        var keys = msg.split('_');
//        keys.forEach(function (key) {
//           robot.keyToggle(key, 'down');
//        });
//        robot.keyTap(keys[1], keys[0]);
        robot.keyTap(msg);
    });
    
    socket.on('mouse', function (msg){      
//        robot.mouseClick(left, true)
    });
});

http.listen(3000);