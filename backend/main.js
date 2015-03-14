//Modules:
var DataManager = require('./DataManager.js');
var Router = require('./Router.js');

var HashMap = require('hashmap').HashMap;


var t = new HashMap();

//Initialization:
var dataManager = new DataManager();

<<<<<<< HEAD
//we want to user info from the front end here:
dataManager.addUser(100000197805890,'CAACEdEose0cBANfuPbNluiwzFITD6GSZCVOPBjxX3ewRryk86aIYSXvcFG2NrYE0OaFE49rqLukYoqPswbEEXZAZBnyt7R7AMeqvWXNZAHtTP332Bl0itxmd9PPpcN2X2ALnpwHDTqti9rsE1FLwxDrP9bBsodn3EGYdz2VfBO6MIZAzVC5ufRMDN9hO73BspVt8fnF5XdbIdF90VTlW9C6ErJbgMmSAZD', "lol");
=======
dataManager.addUser(0,934323249, "fall of the roman empire");
dataManager.addUser(1,934323249, "charlie bit me");

>>>>>>> d4c2d9b32bc169a2207ddbcd902ee51869535fd7
var router = new Router(3000, dataManager);
