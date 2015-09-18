
var Twitter = require('twitter');
var client = new Twitter(sails.config.twitter);


module.exports = {

	getPosts: function(cb) {
  var params = {q: 'montreal'};
   client.get('search/tweets', params, function(error, tweets, response){
     if (!error) {
       cb(tweets);
     }
     else {
       console.log(error);
     }
   });
  }
};
