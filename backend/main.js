//Modules:
var DataManager = require('./DataManager.js');
var Router = require('./Router.js');

var HashMap = require('hashmap').HashMap;


var t = new HashMap();

//Initialization:
var dataManager = new DataManager();

//we want to user info from the front end here:
dataManager.addUser(112312,934323249, "lol");
var router = new Router(3000, dataManager);
