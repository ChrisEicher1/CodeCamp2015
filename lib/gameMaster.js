'use strict';

let Promise = require('bluebird');
let uuid = require('uuid');
let _ = require('lodash');

let allGames = {
}
module.exports = function(io) {
  let createGame = (players) => {
    let gameUuid = uuid.v1();
    allGames[gameUuid] = {
      players: {}
    };
    _.each(players,function(socket){
      socket.join(gameUuid);
      allGames[gameUuid].players[socket.id] = {};
    })
    io.to(gameUuid).emit('gameCreated');
  };

  let playCard = (metaData) => {
    if(! allGames[metaData.game][metaData.player].hasPlayed) {
      io.emit(metaData.player, 'deleteCard');
      let allPlayed = true;
      for(player in allGames[metaData.game.players]) {
        if(!player.hasPlayed){
          allPlayed = false;
        }
      }
      if(allPlayed) {
        //nextTurn();
        io.to.(metaData.game).emit('Next Turn');
      }
    }
  };

  //return from module exports
  return {
    createGame: createGame
    playCard: playCard
  };
}
