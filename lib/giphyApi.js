'use strict';

let Promise = require('bluebird');
let giphy = require('giphy')('dc6zaTOxFJmzC');
let request = require('request');

const API_KEY = 'dc6zaTOxFJmzC';

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
let search = function(query) {
  return new Promise(function(resolve,reject) {
    request.get('http://api.giphy.com/v1/gifs/search?q='
    +query.trim().split(" ").join('+')+'&api_key='+API_KEY
    +'&count=10',
    function(err,response,body) {
      if(!err && response.statusCode == 200) {
        let result = JSON.parse(body);
        resolve(result.data[
          Math.floor(Math.random()*result.data.length)
        ].images.fixed_height.url);
      }
      if(err) {
        reject(err);
      }
    });
  });
}
exports.getRandom = getRandom;
exports.getMostTrending = getMostTrending;
exports.getGifById = getGifById;
exports.search = search;
