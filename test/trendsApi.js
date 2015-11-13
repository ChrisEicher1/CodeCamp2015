'use strict';

let Promise = require('bluebird');
let trendsApi = require('../lib/trendsApi.js');

trendsApi.getTrends()
.then(data => {
  console.log(data);
},err => {
  throw err;
});
