'use strict';

let request = require('request');


const API_KEY = '3b645b6a92dfa3733a9dcdb660dd528f8bb98ff5';
const TRENDING = 'http://api.whatthetrend.com/api/v2/trends.json?api_key='+API_KEY
  +'&count=';
const SPAM = 'http://api.whatthetrend.com/api/v2/trends/spam.json?api_key='+API_KEY
  +'&count=';
const ACTIVE = 'http://api.whatthetrend.com/api/v2/trends/active.json?api_key='
  +API_KEY+'&count=';


module.exports.getTrends = function(count){
  return new Promise(function(resolve,reject){
    if(! count){
      count = 1;
    }
    request.get(TRENDING+count,function(err,response,body){
      if(!err && response.statusCode ===200){
        let obj = JSON.parse(body);
        resolve(obj);
      }
      if(err) {
        reject(err);
      }
    });
  });
};
module.exports.getActiveTrends = function(count){
  return new Promise(function(resolve,reject){
    if(! count){
      count = 1;
    }
    request.get(ACTIVE+count,function(err,response,body){
      if(!err && response.statusCode ===200){
        let obj = JSON.parse(body);
        resolve(obj);
      }
      if(err) {
        reject(err);
      }
    });
  });
};

module.exports.getSpamTrends = function(count){
  return new Promise(function(resolve,reject){
    if(! count){
      count = 1;
    }
    request.get(SPAM+count,function(err,response,body){
      if(!err && response.statusCode ===200){
        let obj = JSON.parse(body);
        resolve(obj);
      }
      if(err) {
        reject(err);
      }
    });
  });
};
