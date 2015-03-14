//Modules:
var HashSet = require('./HashSet.js');

var Page = function(title){
	//Instance variables:
	this.title = title;
	this.description;
	this.imageURL;
	this.pageID;
};

module.exports = Page;
