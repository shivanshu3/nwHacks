//Modules:
var HashSet = require('./HashSet.js');
var HashMap = require('hashmap').HashMap;

var User = function(userid, name, token){
	//Instance variables:
	this.userid = userid;
	this.name = name;
	this.token = token;
	this.invisiblePages = new HashSet();  //Hashset
	this.likedPages = new HashSet();	  //Hashset
	this.unionPages = new HashMap();	  //Hashmap PageID -> Number of Likes
	this.friends = new HashSet();		  //The set of friends:

};


User.addFriend = function(User) {
	this.friends.add(User);
};

User.removeFriend = function(User){
	this.friends.remove(User);
};

User.getSetOfFriends = function(){
	return this.friends;
};

module.exports = User;
