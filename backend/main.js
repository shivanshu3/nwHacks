//Modules:
var DataManager = require('./DataManager.js');
var Router = require('./Router.js');

var HashMap = require('hashmap').HashMap;


var t = new HashMap();
t.set("1","11");
t.set("2","22");
t.set("3","33");


//Initialization:
var dataManager = new DataManager();
dataManager.addUser(112312,934323249, "lol");
var router = new Router(3000, dataManager);
