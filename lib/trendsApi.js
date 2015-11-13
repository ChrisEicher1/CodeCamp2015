'use strict';

let request = require('request');


const API_KEY = '3b645b6a92dfa3733a9dcdb660dd528f8bb98ff5';
const SITE = 'http://api.whatthetrend.com/api/v2/trends.json?api_key='+API_KEY
  +'&count=2';

module.exports.getTrends = function(){
  return new Promise(function(resolve,reject){
    request.get(SITE,function(err,response,body){
      if(!err && respones.statusCode ===200){
        resolve(body);
      }
      if(err) {
        reject(err);
      }
  });
};
