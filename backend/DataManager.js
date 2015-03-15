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
};

DataManager.prototype.addUser = function(userid, token){
	var _this = this;

	console.log('New user request');

	if(this.usersHashMap.has(userid)){
		this.usersHashMap.get(userid).token = token;
	}else{
		this.createNewUser(userid, token, function(newUser){
			_this.initializePopularityUnion(newUser);
			_this.updateNeighborPopularityUnions(newUser);
			_this.initializeRecentsUnion(newUser);
			_this.updateNeighborRecentsUnion(newUser);
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

	FBGraph.setOptions(options).get('/' + userid + '/friends' + '?access_token=' + token, function(err, res){
		var friends = res.data;
		var friendIDs = [];
		for(var i=0; i<friends.length; i++){
			friendIDs.push(friends[i].id);
		}

		FBGraph.setOptions(options).get('/' + userid + '/likes' + '?access_token=' + token + '&limit=100', function(err, res){
			var moviePages = res.data.filter(function(element){
				return element.category == 'Movie';
			});
			
			FBGraph.setOptions(options).get('/me' + '?access_token=' + token, function(err, res){
				//Seting up the new user:
				var newUser = new User(userid, res.name, token);

				//Likes:
				for(var i=0; i<moviePages.length; i++){
					var page = _this.getCreatePage(moviePages[i].id, moviePages[i].name);
					var likeTime = new Date(moviePages[i].created_time);
					var like = new Like(page, likeTime);
					newUser.likes.add(like);
				}

				//Friends:
				for(var i=0; i<friendIDs.length; i++){
					if(_this.usersHashMap.has(friendIDs[i])){
						var friend = _this.usersHashMap.get(friendIDs[i]);
						newUser.friends.add(friend);
						friend.friends.add(newUser);
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

/**
 * Given the page details (pageID and title),
 * it either retrives that page from the hashmap if it exists,
 * or creates it, puts it in the hashmap and returns it if
 * it did not exist.
 */
DataManager.prototype.getCreatePage = function(pageID, title){
	if(this.pagesHashMap.has(pageID)){
		return this.pagesHashMap.get(pageID);
	}else{
		var newPage = new Page(pageID, title);
		this.pagesHashMap.set(pageID, newPage);
		return newPage;
	}
};

DataManager.prototype.updateNeighborPopularityUnions = function(user){
	var setOfFriends = user.friends.keys();
	
	if(setOfFriends == undefined)
		return;

	//Initialize the userPages array which contains the user's liked pages:
	var userLikes = user.likes.keys();
	var userPages = [];
	for(var i=0; i<userLikes.length; i++){
		userPages.push(userLikes[i].page);
	}

	for(var it = 0; it<setOfFriends.length; it++){
		currFriend = setOfFriends[it];

		//update the union list of the neighbors too.
		for(var i=0; i<userPages.length; i++){
			if(currFriend.unionPagesPopularity.has(userPages[i].pageID)){
				currFriend.unionPagesPopularity.set(userPages[i].pageID, currFriend.unionPagesPopularity.get(userPages[i].pageID) + 1);
			}else{
				currFriend.unionPagesPopularity.set(userPages[i].pageID, 1);
			}
		}
	}
};

DataManager.prototype.initializePopularityUnion = function(user){
	var union = new HashMap();

	var setOfFriends = user.friends.keys();

	if(typeof setOfFriends == 'undefined')
		return;

	for(var it = 0; it<setOfFriends.length; it++){
		userFriend = setOfFriends[it];
		var userFriendLikes = userFriend.likes.keys();
		for(var j = 0; j < userFriendLikes.length; j++){
			var currPageID = userFriendLikes[j].page.pageID;
			if(union.has(currPageID)){
				union.set(currPageID, union.get(currPageID) + 1);
			}else{
				union.set(currPageID, 1);
			}
		}
	}

	user.unionPagesPopularity = union;
};

DataManager.prototype.initializeRecentsUnion = function(user){
	var union = new HashMap();

	var setOfFriends = user.friends.keys();

	if(typeof setOfFriends == 'undefined')
		return;

	for(var it = 0; it<setOfFriends.length; it++){
		userFriend = setOfFriends[it];
		var userFriendLikes = userFriend.likes.keys();
		for(var j = 0; j < userFriendLikes.length; j++){
			var currPageID = userFriendLikes[j].page.pageID;
			if(union.has(currPageID)){
				//If this like is newer, store this newer time instead:
				if(userFriendLikes[j].time.getTime() < union.get(currPageID).getTime()){
					union.set(currPageID, userFriendLikes[j].time);
				}
			}else{
				union.set(currPageID, userFriendLikes[j].time);
			}
		}
	}

	user.unionPagesRecents = union;
};

DataManager.prototype.updateNeighborRecentsUnion = function(user){
	var setOfFriends = user.friends.keys();

	if(setOfFriends == undefined)
		return;

	//Initialize the userLikes array which contains the user's liked pages with time:
	var userLikes = user.likes.keys();

	for(var it = 0; it<setOfFriends.length; it++){
		currFriend = setOfFriends[it];

		//update the union list of the neighbors too.
		for(var i=0; i<userLikes.length; i++){
			if(currFriend.unionPagesRecents.has(userLikes[i].page.pageID)){
				if(userLikes[i].time.getTime() < currFriend.unionPagesRecents.get(userLikes[i].page.pageID).getTime()){
					currFriend.unionPagesRecents.set(userLikes[i].page.pageID, currFriend.unionPagesRecents.get(userLikes[i].page.pageID) + 1);
				}
			}else{
				currFriend.unionPagesRecents.set(userLikes[i].page.pageID, userLikes[i].time);
			}
		}
	}
};

module.exports = DataManager;
