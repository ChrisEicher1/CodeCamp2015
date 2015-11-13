'use strict';

let Promise = require('bluebird');
let trendsApi = require('../lib/trendsApi.js');

let count = process.argv[2];
if(! count){
  console.log('count is undefined! %s');
  console.log(process.argv);
  process.exit(1);
}
trendsApi.getTrends(count)
.then(data => {
  console.log(data);
  console.log(data.trends.length);
},err => {
  throw err;
});
