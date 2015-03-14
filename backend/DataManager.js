//Required modules:
var HashMap = require('hashmap').HashMap;

var DataManager = function(){
	//Instance variables:
	this.usersHashMap;	//HashMap userid -> user
	this.pagesHashMap;	//HashMap pageid -> page
};

DataManager.prototype.initializeGraph = function(){
	this.usersHashMap = new HashMap();
	this.pagesHashMap = new HashMap();
};

DataManager.prototype.addUser = function(userid, token){
	if(this.usersHashMap.has(userid)){
		this.usersHashMap.get(userid).token = token;
	}else{

	}
};

module.exports = DataManager;
