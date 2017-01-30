window.addEventListener('load', init, false);


function init(){
    
    let url = '../views/keyboards/1/keys.json';

    var xhttp;
    xhttp=new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let keys = this.responseText;
            bindKeys(keys);
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();

    
}

function bindKeys(keys){
    
    let keysObj = JSON.parse(keys);
    
    var socket = io();
    var keys = document.querySelectorAll('.key');
    for(var key of keys){
        key.addEventListener('click', function(ev){
            socket.emit('keyPress', keysObj[ev.target.dataset.key]);
        })
    }
}