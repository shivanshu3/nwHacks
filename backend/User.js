//Modules:
var HashSet = require('./HashSet.js');
var HashMap = require('hashmap').HashMap;

var User = function(userid, name, token){
	//Instance variables:
	this.userid = userid;
	this.name = name;
	this.token = token;
	this.invisiblePages = new HashSet();  //Hashset
	this.likes = new HashSet();	  //Hashset of likes
	this.unionPagesPopularity = new HashMap();	//Hashmap PageID -> Number of Likes
	this.unionPagesRecents = new HashMap();		//Hashmap PageID -> Time liked
	this.friends = new HashSet();		  //The set of friends:
};

User.prototype.addFriend = function(User) {
	this.friends.add(User);
};

User.prototype.removeFriend = function(User){
	this.friends.remove(User);
};

User.prototype.getSetOfFriends = function(){
	return this.friends;
};

module.exports = User;
