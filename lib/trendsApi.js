'use strict';

let request = require('request');


const API_KEY = '3b645b6a92dfa3733a9dcdb660dd528f8bb98ff5';
const SITE = 'http://api.whatthetrend.com/api/v2/trends.json?api_key='+API_KEY
  +'&count=';

module.exports.getTrends = function(count){
  return new Promise(function(resolve,reject){
    if(_.isUndefined(count)) {
      count = 1;
    }
    request.get(SITE+count,function(err,response,body){
      if(!err && response.statusCode ===200){
        resolve(body);
      }
      if(err) {
        reject(err);
      }
    });
  });
};
