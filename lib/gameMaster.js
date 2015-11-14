'use strict';

let Promise = require('bluebird');
let uuid = require('uuid');
let _ = require('lodash');

let gifApi = require('./giphyApi.js');
let trendsApi = require('./trendsApi.js');

let allGames={};
let trends = [];
let getAllTrends = Promise.coroutine(function*(){
  return [].concat(yield trendsApi.getTrends(10),
    yield trendsApi.getActiveTrends(10),
    yield trendsApi.getSpamTrends(10),
    yield trendsApi.getEarthTrends(10));
});
module.exports = function(io) {
  let sendRandomGif = function(room,player){
    return gifApi.getRandom()
    .then(data => {
      allGames[room].players[player.id].gif = data;
    },err => {
      console.warn(err);
    });
  };
  let sendSearchGif = function(metaData){
    let room = metaData.room;
    let player = metaData.playerId;
    let query = metaData.query;
    return gifApi.search(query)
    .then(data => {
      allGames[room].players[playerId].gif = data;
      io.to(room).emit('new_gif',{id: playerId, url: data
    },err => {
      console.warn(err);
    });
  };
  let sendRoomGifs = function(room){
    let promises = _.map(allGames[room]['players'],function(player){
      return sendRandomGif(room,player);
    });
    return Promise.all(promises)
    .then( () => {
      _.each(allGames[room]['players'],function(player){
        io.to(room).emit('gif',{id: player.id, url: player.gif});
      });
    });
  }
  let createGame = (players) => {
    let gameUuid = uuid.v1();
    allGames[gameUuid] = {
      state: 'newGame',
      players: {}
    };
    _.each(players,function(socket){
      socket.join(gameUuid);
      allGames[gameUuid]['players'][socket.id] = {id: socket.id};
    })
    getAllTrends()
    .then(data => {
      trends = data;
      console.log(trends);
      io.to(gameUuid).emit('gameCreated',{room_id:gameUuid});
      sendRoomGifs(gameUuid);
    });
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
        allGames[metaData.game]['state'] = 'votingState';
        io.to(metaData.game).emit('Next Turn');
      }
    }
  };

  //return from module exports
  return {
    createGame: createGame,
    playCard: playCard,
    sendSearchGif: sendSearchGif
  };
}
