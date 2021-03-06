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
  let deal = function(room,count){
    //console.dir(allGames[room])
    let cards = [];
    for(var i =0;i < count; i++){
      cards.push(allGames[room].deck[allGames[room].deck.length-1]);
      allGames[room].deck.pop();
    }
    return cards;
  }
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
    let playerId = metaData.player;
    let query = metaData.query;
    return gifApi.search(query)
    .then(data => {
      //console.log(metaData);
      allGames[room].players[playerId].gif = data;
      io.to(room).emit('gif',{id: playerId, url: data});
    },err => {
      console.warn(err);
    });
  };
  let dealCountToPlayer = function(metaData){
    let room = metaData.room;
    let playerId = metaData.player;
    let count = metaData.count;
    let cards =  deal(room,count);
    console.log(cards);
    if(! allGames[room].players[playerId].hand){
      allGames[room].players[playerId].hand = [];
    }
    allGames[room].players[playerId].hand.concat(cards);
    _.each(cards,function(card){
      console.log('dealing %s ',card);
      io.to(playerId).emit('deal',card);
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
      allGames[gameUuid].deck = _.shuffle(trends);
      io.to(gameUuid).emit('gameCreated',{game_id:gameUuid});
      sendRoomGifs(gameUuid);
      _.each(players,function(socket){
        let metaData = {room: gameUuid,player: socket.id, count:5}
        dealCountToPlayer(metaData);
      });
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
