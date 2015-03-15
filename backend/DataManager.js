//Required modules:
var HashMap = require('hashmap').HashMap;
var HashSet = require('./HashSet.js');
var User = require('./User.js');
var FBGraph = require('fbgraph');
var Page = require('./Page.js');
var Like = require('./Like.js');

var DataManager = function(){
	//Instance variables:
	this.usersHashMap;	//HashMap userid -> user
	this.pagesHashMap;	//HashMap pageid -> page
	this.usersHashMap = new HashMap();
	this.pagesHashMap = new HashMap();
	this.graph = new HashMap();
};


DataManager.prototype.addUser = function(userid, token){
	var _this = this;

	if(this.usersHashMap.has(userid)){
		this.usersHashMap.get(userid).token = token;
	}else{
		this.createNewUser(userid, token, function(newUser){
			//add node (userobject) to graph
			_this.addNewNodeToGraph(newUser);
			return;//HAVENT TESTED THE FOLLOWING CODE:
			//for each friend in the userobject's set of friends, add 
			//userobject to the set of friend's friends
			this.updateNeighborSets(User);
			//compute the union of pages liked by userobjects friends
			newUser.union = this.union(newUser);
		});
	}
};

DataManager.prototype.createNewUser = function(userid, token, callback){
	var _this = this;

	var options = { //set for making an http request
		timeout: 3000,
		pool: {
			maxSockets: Infinity
		},
		headers: {
			connection: "keep-alive"
		}
	};

	FBGraph.setAccessToken(token);

	FBGraph.setOptions(options).get('/' + userid + '/friends', function(err, res){
		var friends = res.data;
		var friendIDs = [];
		for(var i=0; i<friends.length; i++){
			friendIDs.push(friends[i].id);
		}

		FBGraph.setOptions(options).get('/' + userid + '/likes?limit=100', function(err, res){
			var moviePages = res.data.filter(function(element){
				return element.category == 'Movie';
			});
			
			FBGraph.setOptions(options).get('/me', function(err, res){
				console.log(res.name);

				//Seting up the new user:
				var newUser = new User(userid, res.name, token);

				//Likes:
				for(var i=0; i<moviePages.length; i++){
					var page = _this.getCreatePage(moviePages[i].id, moviePages[i].name);
					var likeTime = new Date(moviePages[i].create_time);
					var like = new Like(page, likeTime);
					newUser.likes.add(like);
				}

				//Friends:
				for(var i=0; i<friendIDs.length; i++){
					if(_this.usersHashMap.has(friendIDs[i])){
						var friend = _this.usersHashMap.get(friendIDs[i]);
						newUser.friends.add(friend);
					}
				}

				//Store the user in the hashmap:
				_this.usersHashMap.set(userid, newUser);

				//Done initializing the user!
				callback(newUser);
			});
		});

	});

	//return newUser;
};

DataManager.prototype.getCreatePage = function(pageID, title){
	if(this.pagesHashMap.has(pageID)){
		return this.pagesHashMap.get(pageID);
	}else{
		var newPage = new Page(pageID, title);
		this.pagesHashMap.set(pageID, newPage);
		return newPage;
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
	
			//console.log(User.friends);

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
