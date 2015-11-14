console.log('Script has loaded');

var socket = io();
var game_room;

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

var dealCard = function(card)
{
	var c = createCard(card.value);
	c.click(function (evt) {
  		socket.emit('card_played', { room: game_room, key: evt.target.outerText });
        evt.stopPropagation();
  	});
  	c.appendTo('#row3');
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
    $('#input_text').keyup(function (evt) {
      if (evt.keyCode == 13) {
        socket.emit('new_gif', { room: game_room, query: evt.target.value })
        evt.target.value = '';
      }
    })
}

socket.on('gameCreated', function(msg){
  game_room = msg.game_id
  newGame();
  //updateGif({ id: '765', url: 'https://media.giphy.com/media/13zZ0FyrgNWwLu/giphy.gif' })
  //updateGif({ id: '123', url: 'https://media.giphy.com/media/13NBiMh0Z7pqta/giphy.gif' })
})
socket.on('gif', updateGif);

socket.on('deal', dealCards);
