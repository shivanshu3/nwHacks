//Modules:
var DataManager = require('./DataManager.js');
var Router = require('./Router.js');

var HashMap = require('hashmap').HashMap;


var t = new HashMap();

//Initialization:
var dataManager = new DataManager();

dataManager.addUser(0,934323249, "fall of the roman empire");
dataManager.addUser(1,934323249, "charlie bit me");

var router = new Router(3000, dataManager);
