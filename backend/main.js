//Modules:
var DataManager = require('./DataManager.js');
var Router = require('./Router.js');

var HashMap = require('hashmap').HashMap;


var t = new HashMap();

//Initialization:
var dataManager = new DataManager();

//we want to user info from the front end here:
dataManager.addUser(100000197805890,'CAACEdEose0cBANfuPbNluiwzFITD6GSZCVOPBjxX3ewRryk86aIYSXvcFG2NrYE0OaFE49rqLukYoqPswbEEXZAZBnyt7R7AMeqvWXNZAHtTP332Bl0itxmd9PPpcN2X2ALnpwHDTqti9rsE1FLwxDrP9bBsodn3EGYdz2VfBO6MIZAzVC5ufRMDN9hO73BspVt8fnF5XdbIdF90VTlW9C6ErJbgMmSAZD', "lol");
var router = new Router(3000, dataManager);
