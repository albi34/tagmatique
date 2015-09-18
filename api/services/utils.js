module.exports = {

  reqParams: function(req, params) {
    if (params === undefined || !params) params = {};

    var hashtag = req.param('tag');

    params.hashtag = hashtag;

    return params;
  }

};
