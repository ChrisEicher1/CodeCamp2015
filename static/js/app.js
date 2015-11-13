console.log('Script has loaded');

var socket = io();

socket.on('gameCreated', function(data){
  Materialize.toast('I am a toast!', 4000);
  var content = $('#content');
  content.remove();
  content.append('<image src="https://media.giphy.com/media/13zZ0FyrgNWwLu/giphy.gif" />')
})
