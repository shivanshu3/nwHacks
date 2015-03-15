//Modules:
var HashSet = require('./HashSet.js');

var Page = function(pageID, title){
	//Instance variables:
	this.title = title;
	this.description;
	this.imageURL;
	this.pageID = pageID;
};

module.exports = Page;
