/**
 * Hashtag.js
 *
 * @description :: This model will fetch posts from social networks and return them to the controller
 */
var Promise = require('bluebird');
module.exports = {

  getIndex: function (cb) {
      return new Promise(function (resolve) {
          Twitter.getPosts(function (posts) {
            resolve(posts);
          });
        })
        .then(function (twitter_posts) {
            return twitter_posts.statuses;
        }).map(function(twitter_posts){
          return new Promise(function (resolve) {
          Hashtag.mapNode(twitter_posts, "twitter", function(mapped){
            resolve(mapped);
          });
        });
      })
      .then(function (mapped_twitter) {
        return new Promise(function (resolve) {
          Instagram.getPosts(function (posts) {
            resolve(posts);
          });
        }).map(function(instagram_posts){
          return new Promise(function (resolve) {
          Hashtag.mapNode(instagram_posts, "instagram", function(mapped){
            resolve(mapped);
          });
        });
      }).then(function(mapped_instagram){
        var array_mapped = mapped_instagram.concat(mapped_twitter);
        cb(array_mapped);
      });
      });
  },
  search: function (params, cb) {
    return new Promise(function (resolve) {
        Twitter.getPosts(function (posts) {
          resolve(posts);
        });
      })
      .then(function (twitter_posts) {
        return new Promise(function (resolve) {
          Instagram.getPosts(function (posts) {
            var posts_array = posts.concat(twitter_posts);
            resolve(posts_array);
          });
        });
      })
      .then(function (all_posts) {
        cb(all_posts);
      });
  },
  mapNode: function(data, type, cb){
    var mapped = {
      "network": type,
      "message": "",
      "author": "",
      "id": data.id,
      "link": "",
      "picture": ""
    };

    // Twitter post
    if(type === "twitter"){
      mapped.message = data.text;
      mapped.author = data.user.screen_name;
      mapped.link = "https://www.twitter.com/" + mapped.author + "/" + data.id_str;
      if(data.entities.media) {
        mapped.picture = data.entities.media[0].media_url;
      }
      else {
        mapped.picture = data.user.profile_background_image_url_https;
      }
    }
    else {
      mapped.message = data.caption.text;
      mapped.author = data.user.username;
      mapped.link = data.link;
      mapped.picture = data.images.standard_resolution.url;
    }
    cb(mapped);
  }
};
