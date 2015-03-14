//Modules:
var HashSet = require('./HashSet.js');

var User = function(name){
	//Instance variables:
	this.name = name;
	this.token;
	this.invisiblePages;  //Hashset
	this.likedPages;	  //Hashset
	this.unionPages;	  //Hashmap PageID -> Number of Likes

	//The set of friends:
	this.friends;
};

module.exports = User;
