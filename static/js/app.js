console.log('Script has loaded');


var updateGif = function(req)
{
	if ($("#" + req.id).length){
		$("#"+req.id).attr('src', req.url);
	} else {
		console.log("You dun.");
		var newImg = $('<img id="'+req.id+'" src="'+req.url+'">');
		console.log(newImg);
		newImg.appendTo('#profileDiv');
	}
}

var newGame = function()
{
	$('#content').empty();
	var div = $('<div class="row full"></div>')
  	var profileDiv = $('<div id="profileDiv" class="col s3"></div>');
  	var playDiv = $('<div class="col s9"></div>');
  	var row1 = $('<div class=row1></div>')
  	var row2 = $('<div class=row2></div>')
  	var row3 = $('<div class=row3></div>')
  	div.appendTo('#content');
  	playDiv.appendTo('#content');
  	row1.appendTo('#content');
  	row2.appendTo('#content');
  	row3.appendTo('#content');
  	profileDiv.appendTo(".row");
}

var socket = io();  
socket.on('gameCreated', function(data){
  newGame();
  //updateGif({ id: '765', url: 'https://media.giphy.com/media/13zZ0FyrgNWwLu/giphy.gif' })


  //updateGif({ id: '123', url: 'https://media.giphy.com/media/13NBiMh0Z7pqta/giphy.gif' })
})

socket.on('gif', updateGif);