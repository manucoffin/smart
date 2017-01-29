window.addEventListener('load', init, false);

function init(){
    var socket = io();
    var keys = document.querySelectorAll('.key');
    for(var key of keys){
        key.addEventListener('click', function(){
            socket.emit('key', this.dataset.key);
        })
    }
}