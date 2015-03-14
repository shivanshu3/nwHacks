//Modules:
var DataManager = require('./DataManager.js');
var Router = require('./Router.js');

//Initialization:
var dataManager = new DataManager();
var router = new Router(3000, dataManager);
