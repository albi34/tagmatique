/**
 * HashtagController
 *
 * @description :: Server-side logic for managing hashtags
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


module.exports = {

	index: function(req, res) {

    Hashtag.getIndex(
      function(response) {
				res.send({
            "success": true,
            "posts": response
        });
      });
  },
	search: function(req, res) {
		var params = utils.reqParams(req);
    Hashtag.search(params,
      function(response) {
        res.send({
            "success": true,
            "posts": response
        });
      });
  }
};
