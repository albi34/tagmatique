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
            "posts": _.shuffle(response)
        });
      });
  },
	getLocal: function(req, res) {
		var params = {
			lat: req.param('lat'),
			long: req.param('long')
		};
		Hashtag.getLocal(params,
			function(response) {
				res.send({
						"success": true,
						"posts": _.shuffle(response.posts),
						"tags": response.tags
				});
			});
	},
	search: function(req, res) {
    Hashtag.search(params,
      function(response) {
        res.send({
            "success": true,
            "posts": _.shuffle(response)
        });
      });
  }
};
