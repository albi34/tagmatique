
var TwitterCli = require('twitter');
var client = new TwitterCli(sails.config.twitter);
var Promise = require('bluebird');


module.exports = {
	trending_tags: "",

	getPlace : function(coords, cb){
		var params = {
			long: coords.long,
			lat: coords.lat
		};
		client.get('trends/closest', params, function(error, res, response){
			if (!error) {
				console.log("place");
				console.log(res);
				this.place = res[0].woeid;
				cb(this.place);
			}
			else {
				console.log(error);
			}
		});
	},

	getTrendingTag: function(place, cb){
	  var params = {id:place};
		console.log(params);
		client.get('trends/place', params, function(error, tags, response){
			if (!error) {
				cb(tags[0].trends);
			}
			else {
				console.log(error);
			}
		});
	},
	getPostsByCoords: function(coords, cb) {
		return new Promise(function (resolve) {
			var cache_place_key = "getPlace-" + coords.long + "-" + coords.lat;
			utils.getRedisKey(cache_place_key, function (response) {
	      if (response) {
					resolve(JSON.parse(response));
				}
				else {
					Twitter.getPlace(coords, function(place){

						// We cache the location of the user for 30 minutes to limit API calls
						utils.setRedisKey(cache_place_key, JSON.stringify(place), 1800);

						resolve(place);
					});
				}
			});
		})
			.then(function(place){
				return new Promise(function (resolve) {
					var cache_trending_key = "getTrendingTag-" + place;
					utils.getRedisKey(cache_trending_key, function (response) {
				      if (response) {
								resolve(JSON.parse(response));
							}
							else {
								Twitter.getTrendingTag(place, function (tags) {
									// We cache the trending tags of the user location for 30 minutes to limit API calls
									utils.setRedisKey(cache_trending_key, JSON.stringify(tags), 1800);
									resolve(tags);
								});
							}
					});
			})
			.then(function(trending_tags){
				var geocode = coords.lat + "," + coords.long + ",5mi";
				var params = {q: "", geocode:geocode};
					var cache_trending_tweets = "getTrendingTweets-" + geocode;
					utils.getRedisKey(cache_trending_tweets, function (response) {
						if (response) {
							cb(JSON.parse(response));
						}
						else {
							client.get('search/tweets', params, function(error, tweets, response){
		 					 if (!error) {
		 						 // We cache the trending tweets of the user location for 5 minutes to limit API calls
								 var tweetsResponse = {
									 tweets: tweets,
									 trending_tags:trending_tags
								 };
		 						 utils.setRedisKey(cache_trending_tweets, JSON.stringify(tweetsResponse), 300);
		 						 cb(tweetsResponse);
		 					 }
		 					 else {
		 						 console.log(error);
		 					 }
		 				 });
						}
					});

			 });
			});
	},
	getPosts: function(cb) {
		return new Promise(function (resolve) {
				var cache_trending_key = "getTrendingTag-1";
				utils.getRedisKey(cache_trending_key, function (response) {
					if (response) {
						resolve(JSON.parse(response));
					}
					else {
						Twitter.getTrendingTag(1, function (tags) {
							// We cache the trending tags for 30 minutes to limit API calls
							utils.setRedisKey(cache_trending_key, JSON.stringify(tags), 1800);
							resolve(tags);
						});
					}
				});
			})
			.then(function(trending_tags){
				var queried_trends = "";
				var total_trends = trending_tags.length;
			_.each(trending_tags, function(tag,index){
					queried_trends += tag.name;
					if(index < total_trends - 1){
						queried_trends += " OR ";
					}
			});
				var params = {q: queried_trends};
			 	 client.get('search/tweets', params, function(error, tweets, response){
			 		 if (!error) {
			 			 cb(tweets);
			 		 }
			 		 else {
			 			 console.log(error);
			 		 }
			 	 });
			});
  }
};
