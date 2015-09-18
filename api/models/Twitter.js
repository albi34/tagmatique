
var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: 'qJKodfrEGOYPwPrHnEfSnaAPy',
  consumer_secret: 'F4mTNMIkVQ0QLE8sAQxhsP5jTwfefgFiEfWWtRK4i5AGl2ITyQ',
  access_token_key: '250600329-X4nFFh7aacVYHptObrxvoGxzNdIyXVzbT9nvocJU',
  access_token_secret: '9ofLIe2SrX55jaxMQ3G38UtabZc2eO6hTnyF8ezYKvCua'
});


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
