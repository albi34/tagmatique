
var redis = require("redis");
var redis_client = redis.createClient();

module.exports = {

  setRedisKey: function(key, value, expires) {

    console.log("Caching results of the "+key+" function");
    redis_client.set(key, value);
    redis_client.expire(key, expires);
  },
  getRedisKey: function(key, cb){
    redis_client.get(key, function (err, reply) {
        if(err){
          console.log(err);
          cb(null);
        }
        else {
          console.log("Fetching cached value of the "+key+" function");
          cb(reply);
        }
    });
  }

};
