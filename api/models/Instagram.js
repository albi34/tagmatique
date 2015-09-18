
var ig = require('instagram-node').instagram();
ig.use({ access_token: '51684c45ad6d4614afcde0a4666a8ef7' });
ig.use({ client_id: 'a7620c2834c74a4d9d3f48950b2f146a', client_secret: '17b49171705d40acbd9d3ea1d8221aa7' });


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
