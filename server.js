const express = require('express');  
const app = express();  
const http = require('http').createServer(app);  
const io = require('socket.io')(http);
const robot = require("robotjs");
const fs = require('fs');

app.set('views', __dirname + '/resources/views');
app.set('view engine', 'pug');

const keyboardsFolder = './resources/keyboards/';
app.use(express.static(__dirname + '/resources'));


let keyboardFiles = fs.readdirSync(keyboardsFolder);
let keyboardNames = [];


for(var k of keyboardFiles){
    // remove the extension .json
    let keyboard = k.split('.');
    keyboard = keyboard[0];
    keyboardNames.push(keyboard);
    
    // Define routes when a keyboard is passed as a parameter
    app.get('/keyboard/:keyboard', function (req, res) {  
        res.render(
            'keyboard',
            { keyboardName: req.params.keyboard})
    })
}


app.get('/', function (req, res) {  
    res.render(
        'index',
        { title: 'Choose a keyboard', keyboards: keyboardNames})
})




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
            robot.typeString(keyObj.value);
        }
        else if(keyObj.type == "macro")
        {
            robot.keyTap(keyObj.value, keyObj.modifiers);
        }
    });
});

http.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})