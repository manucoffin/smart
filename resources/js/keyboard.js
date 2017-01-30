window.addEventListener('load', init, false);

function init(){
    
    let url = '../keyboards/'+keyboardName+'.json';

    var xhttp;
    xhttp=new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let keys = this.responseText;
            buildKeyboard(keys);
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
            socket.emit('keyPress', keysObj.keys[ev.target.dataset.key]);
        })
    }
}

function buildKeyboard(keys){
    let keysObj = JSON.parse(keys);
    
    var frag = document.createDocumentFragment();
    
    for (var key in keysObj.keys) {
        if (keysObj.keys.hasOwnProperty(key)) {         
            let btn = document.createElement('div');
            btn.setAttribute('class', 'key');
            btn.setAttribute('data-key', key);
            btn.textContent = key
            
            frag.appendChild(btn);
        }
    }
    
    document.getElementById('keyboard').appendChild(frag);
}