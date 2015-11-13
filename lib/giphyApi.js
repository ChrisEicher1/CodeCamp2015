'use strict';

let Promise = require('bluebird');
let giphy = require('giphy')('dc6zaTOxFJmzC');

let getRandom = function() {
  return new Promise(function(resolve,reject) {
    giphy.random(function(err,randomGif,res) {
      if(err) {
        reject(err);
      }
      resolve(randomGif.data.image_url);
    });
  });
};

let getMostTrending = function() {
  return new Promise(function(resolve,reject) {
    giphy.trending(function(err,trendingGif,res) {
      if(err) {
        reject(err);
      }
      resolve(trendingGif.data[Math.floor(Math.random()*24)].embed_url);
    });
  });
};

let getGifById = function(id) {
  return new Promise(function(resolve,reject) {
    giphy.gifs({ids: [id]},function(err,gif,res){
      if(err) {
        reject(err);
      }
      resolve(gif.data[0].embed_url);
    });
  });
}
exports.getRandom = getRandom;
exports.getMostTrending = getMostTrending;
exports.getGifById = getGifById;
