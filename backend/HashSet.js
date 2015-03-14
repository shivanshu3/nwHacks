//Required modules:
var HashMap = require('hashmap').HashMap;

/**
 * The constructor.
 */
var HashSet = function(){
	//Instance variables:
	this.hashmap = new HashMap();
};

/**
 * Adds the given key to the set.
 */
HashSet.prototype.add = function(key){
	this.hashmap.set(key, key);
};

/**
 * Removes the given key from the set.
 */
HashSet.prototype.remove = function(key){
	this.hashmap.remove(key);
};

/**
 * Removes all keys from this set.
 */
HashSet.prototype.clear = function(){
	this.hashmap.clear();
};

/**
 * Returns true if the set contains the given key.
 * Returns false otherwise.
 */
HashSet.prototype.contains = function(key){
	return this.hashmap.has(key);
};

/**
 * Returns all the keys contained in this set
 * as an array.
 */
HashSet.prototype.keys = function(){
	return this.hashmap.keys();
};

module.exports = HashSet;
