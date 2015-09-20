/**
 * Hashtag.js
 *
 * @description :: This model will fetch posts from social networks and return them to the controller
 */
var Promise = require('bluebird');

module.exports = {

  getIndex: function (cb) {
    var cache_key = "getIndex";
    utils.getRedisKey(cache_key, function (response) {
      // We have cache available
      // console.log(response);
      // console.log(response.length);
      if (response && response.length > 1) {
        cb(JSON.parse(response));
      } else {
        return new Promise(function (resolve) {
            Twitter.getPosts(function (posts) {
              resolve(posts);
            });
          })
          .then(function (twitter_posts) {
            return twitter_posts.statuses;
          }).map(function (twitter_posts) {
            return new Promise(function (resolve) {
              Hashtag.mapNode(twitter_posts, "twitter", function (mapped) {
                resolve(mapped);
              });
            });
          })
          .then(function (mapped_twitter) {
            return new Promise(function (resolve) {
              Instagram.getPosts(function (posts) {
                resolve(posts);
              });
            }).map(function (instagram_posts) {
              return new Promise(function (resolve) {
                Hashtag.mapNode(instagram_posts, "instagram", function (mapped) {
                  resolve(mapped);
                });
              });
            }).then(function (mapped_instagram) {
              var array_mapped = mapped_instagram.concat(mapped_twitter);

              // cache the results for 5 minutes
              utils.setRedisKey(cache_key, JSON.stringify(array_mapped), 300);

              cb(array_mapped);
            });
          });
      }
    });

  },
  getLocal: function (coords, cb) {
    var trending_tags = "";
    return new Promise(function (resolve) {
        Twitter.getPostsByCoords(coords, function (posts) {
          trending_tags = posts.trending_tags;
          resolve(posts.tweets);
        });
      })
      .then(function (twitter_posts) {
        return twitter_posts.statuses;
      }).map(function (twitter_posts) {
        return new Promise(function (resolve) {
          Hashtag.mapNode(twitter_posts, "twitter", function (mapped) {
            resolve(mapped);
          });
        });
      })
      .then(function (mapped_twitter) {
        return new Promise(function (resolve) {
          Instagram.getPostsByCoords(coords, function (posts) {
            resolve(posts);
          });
        }).map(function (instagram_posts) {
          return new Promise(function (resolve) {
            Hashtag.mapNode(instagram_posts, "instagram", function (mapped) {
              resolve(mapped);
            });
          });
        }).then(function (mapped_instagram) {
          var array_mapped = {
            posts: mapped_instagram.concat(mapped_twitter),
            tags: trending_tags
          };
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
  mapNode: function (data, type, cb) {
    var mapped = {
      "network": type,
      "message": "",
      "author": "",
      "id": data.id,
      "link": "",
      "picture": ""
    };
    // Twitter post
    if (type === "twitter") {
      mapped.message = data.text;
      mapped.author = data.user.screen_name;
      mapped.link = "https://www.twitter.com/" + mapped.author + "/status/" + data.id_str;
      if (data.entities.media) {
        mapped.picture = data.entities.media[0].media_url;
      } else {
        mapped.picture = data.user.profile_background_image_url_https;
      }
    } else {
      if (data.caption) {
        mapped.message = data.caption.text;
      }
      mapped.author = data.user.username;
      mapped.link = data.link;
      if (data.images) {
        mapped.picture = data.images.standard_resolution.url;
      }
    }
    cb(mapped);
  }
};
