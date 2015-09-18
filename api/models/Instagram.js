
var ig = require('instagram-node').instagram();
ig.use({ access_token: sails.config.instagram.access_token });
ig.use({ client_id: sails.config.instagram.client_id, client_secret: sails.config.instagram.client_secret });


module.exports = {

	getPosts: function(cb) {

  var params = 'montreal';
  ig.tag_media_recent(params, function(error, medias, pagination, remaining, limit) {
    if (!error) {
      cb(medias);
    }
    else {
      console.log(error);
    }
  });

  }
};
