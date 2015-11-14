console.log('Script has loaded');


var updateGif = function(req)
{
	if ($("#" + req.id).length){
		$("#"+req.id).attr('src', req.url);
	} else {
		var newImg = $('<img class="col s12" id="'+req.id+'" src="'+req.url+'">');
		newImg.appendTo('#profileDiv');
	}
}

var createCard = function(s)
{
	var card = $('<div class="card col s2 z-depth-3 full valign-wrapper"><h5 class="valign">'+s+'</h5></div>');
	return card;
}

var newGame = function()
{
	$('#content').empty();
  	var profileDiv = $('<div id="profileDiv" class="col s3"></div>');
  	var playDiv = $('<div class="col s9"></div>');
  	var row1 = $('<div class="row" id="row1"></div>')
  	var row2 = $('<div class="row" id="row2"></div>')
  	var row3 = $('<div class="row" id="row3"></div>')
  	var input = $('<div class="input-field col s12">'+
            	'<input id="input_text" type="text" length="10">'+
            	'<label for="input_text">Change gif</label>'+
          		'</div>');
  	var rowHeight = Math.floor($(document).height() / 3.5);
  	profileDiv.appendTo('#content');
  	playDiv.appendTo('#content');
  	row1.height(rowHeight);
  	row2.height(rowHeight);
  	row3.height(rowHeight);
  	row1.appendTo(playDiv);
  	row2.appendTo(playDiv);
  	row3.appendTo(playDiv);
  	input.appendTo(profileDiv);
  	var card = createCard("testCard1-1");
  	card.appendTo('#row3');
  	card = createCard("testCard2-1");
  	card.appendTo("#row2");
  	card = createCard("testCard2-2")
  	card.appendTo("#row2");
  	card = createCard("testCard1-2")
  	card.appendTo("#row3");
  	card = createCard("test")
}

var socket = io();  
socket.on('gameCreated', function(data){
  newGame();
  //updateGif({ id: '765', url: 'https://media.giphy.com/media/13zZ0FyrgNWwLu/giphy.gif' })


  //updateGif({ id: '123', url: 'https://media.giphy.com/media/13NBiMh0Z7pqta/giphy.gif' })
})

socket.on('gif', updateGif);