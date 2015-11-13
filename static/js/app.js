console.log('Script has loaded');

var socket = io();

socket.on('gameCreated', function(data){
	 Materialize.toast('I am a toast!', 4000);
})