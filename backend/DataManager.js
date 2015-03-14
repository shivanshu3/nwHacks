//Required modules:
var HashMap = require('hashmap').HashMap;
var HashSet = require('./HashSet.js');
var User = require('./User.js');
var FBGraph = require('fbgraph');

var DataManager = function(){
	//Instance variables:
	this.usersHashMap;	//HashMap userid -> user
	this.pagesHashMap;	//HashMap pageid -> page
	this.usersHashMap = new HashMap();
	this.pagesHashMap = new HashMap();
	this.graph = new HashMap();
};


DataManager.prototype.addUser = function(userid, token,name){
	if(this.usersHashMap.has(userid)){
		this.usersHashMap.get(userid).token = token;
	}else{

		var options = { //set for making an http request
    		timeout:  3000
  			, pool:     { maxSockets:  Infinity }
  			, headers:  { connection:  "keep-alive" }
		};

		FBGraph.setAccessToken(token);

		var friendslist = FBGraph.setOptions(options).get('/' + userid + '/friends', function(err, res) {
    		console.log(res); 
  		});

		//1. create new userobject
		newUser = new User(userid, name, token);
		//2. add to usersHashMap
		this.usersHashMap.set(userid,newUser);
		
		//3. add node (userobject) to graph
		this.addNewNodeToGraph(newUser);
			
		//4. for each friend in the userobject's set of friends, add 
		//	 userobject to the set of friend's friends
		this.updateNeighborSets(User);
		//5. compute the union of pages liked by userobjects friends

		newUser.union = this.union(newUser);

	}
};

DataManager.prototype.addNewNodeToGraph = function(User){
	if(!this.graph.has(User.userid))
	{
		this.graph.set(User.userid, User);
	}

};

DataManager.prototype.updateNeighborSets = function(User){
	var setOfFriends = User.friends;
	
	if(typeof setOfFriends == 'undefined')
		return;

	for(var it = 0; it<setOfFriends.length; it++){
		currFriend = setOfFriends[i];
		//append the new user to the friends sets of its neighbors 
		graph.get(currFriend.addFriend(newUser));

		//update the union list of the neighbors too.
		for(var i = 0; i < User.likedPages.length; i++){
			currPageID = User.likedPages[i];
			if(currFriend.union.has(currPageID)){
				currFriend.union.set(currPageID, currFriend.union.get(currPageID)++);
			}else{
				currFriend.union.set(currPageID,1);
			}
		}
	}

};

DataManager.prototype.union = function(User){
	union = new HashMap();

	var setOfFriends = User.friends;

	if(typeof setOfFriends == 'undefined')
	return;


	for(var it = 0; it<setOfFriends.length; it++){
			userFriend = setOfFriends[it];
			for(var j = 0; j < userFriend.likedPages.length; j++){
				currPageID = userFriend.likedPages[j].pageID;
				if(union.has(currPageID)){
					union.set(currPageID, union.get(currPageID)++);
				}else{
					union.set(currPageID, 1);
				}
			}
	}

	return union;
};

module.exports = DataManager;
