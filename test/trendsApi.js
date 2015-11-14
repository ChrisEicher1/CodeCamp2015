'use strict';

let Promise = require('bluebird');
let trendsApi = require('../lib/trendsApi.js');

let method = process.argv[2];
let count = process.argv[3];
if(! method) {
  console.log('method is undefined!');
  console.log(process.argv);
  process.exit(1);
}
if(! count) {
  console.log('count is undefined!');
  console.log(process.argv);
  process.exit(1);
}
console.log('method: %s, count: %s',method,count);
trendsApi[method](count)
.then(data => {
  console.log('showing trendsAPi.%s',method);
  console.log(data);
  console.log(data.trends.length);
},err => {
  throw err;
});
