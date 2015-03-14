/**
 * This is the Router class
 *
 * @author  Shivanshu Goyal
 */

//Modules:
var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');

/**
 * The constructor. Following parameters are needed:
 * expressJSPort: The port on which Express.js listens for HTTP requests
 */
var Router = function(expressJSPort){
	//Instance variables:
	this.expressApp;

	//Initializing the router:
	this.initializeExpress();
	this.initializeHTTPEndpoints();
	this.expressApp.listen(expressJSPort);
};

/** PRIVATE METHODS **/

/**
 * Initializes Express.js.
 */
Router.prototype.initializeExpress = function(){
	//Setting up Express. HTTP request parsing middleware:
	var app = express();
	app.use(bodyParser.json()); // for parsing application/json
	app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
	app.use(multer()); // for parsing multipart/form-data

	//Enable cross origin requests:
	app.use(function(req, res, next){
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		next();
	});

	//Storing the Express.js app instance in 'this' instance:
	this.expressApp = app;
};

/**
 * Initializes the HTTP endpoints.
 */
Router.prototype.initializeHTTPEndpoints = function(){
	var app = this.expressApp;
	var _this = this;

	//GET Params example:
	app.get('/paramsexample/:name', function(req, res){
		res.send(req.params);
		console.log('Params Example Served');
	});

	//GET query example:
	app.get('/getexample', function(req, res){
		res.send(req.query);
		console.log('Get Example Served');
	});

	//POST query example:
	app.post('/postexample', function (req, res) {
		res.send(req.body);
		console.log('Post Example Served');
	});
};

/** Socket.io Endpoints end **/

module.exports = Router;
