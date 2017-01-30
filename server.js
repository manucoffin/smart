var express = require('express');  
var app = express();  
var http = require('http').createServer(app);  
var io = require('socket.io')(http);
var robot = require("robotjs");

app.use(express.static(__dirname + '/resources')); 

app.get('/', function (req, res) {
    res.sendFile(__dirname+'/index.html');
});


app.get('/keyboards/1.html', function (req, res) {
    res.sendFile(__dirname+'/resources/views/keyboards/1/1.html');
});



io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });

    socket.on('keyPress', function (keyObj) {
        if(keyObj.type == "key")
        {
            robot.keyTap(keyObj.value);
        }
        else if(keyObj.type == "string")
        {

        }
        else if(keyObj.type == "macro")
        {

        }
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

http.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})