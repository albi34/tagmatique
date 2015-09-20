/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var React = require('react');
var ReactPropTypes = React.PropTypes;
var _ = require('underscore');
var HashtagActions = require('../actions/HashtagActions');
var HashtagItem = require('./HashtagItem.react');

var HashtagSection = React.createClass({

  propTypes: {
    posts: ReactPropTypes.array.isRequired,
    geo: ReactPropTypes.object.isRequired
  },
  componentWillReceiveProps: function(nextProps) {
      if((!this.props.geo.coords && nextProps.geo.coords && nextProps.geo.coords.latitude) || (this.props.geo.coords && (this.props.geo.coords.latitude !== nextProps.geo.coords.latitude))){
          // We just received new coordinates: need to update the API calls
            console.log("loading geo");
          HashtagActions.loadGeo(nextProps.geo.coords.longitude, nextProps.geo.coords.latitude);
      }
  },
  componentDidUpdate: function(prevProps, prevState) {
    console.log("update!");
    if(prevProps.geo.coords){
      console.log("same");

    }
    else {
    }
  },
  /**
   * @return {object}
   */
  render: function() {
    // This section should be hidden by default
    // and shown when there are hashtags.
    if (Object.keys(this.props.posts).length < 1) {
      return null;
    }

    var allPosts = this.props.posts;
    var posts = [];
    _.each(allPosts, function(post){
      posts.push(<HashtagItem post={post} key={post.id}/>);
    });

    return (
      <section id="main" class="row">
        <div id="hashtags">{posts}</div>
      </section>
    );
  },



});

module.exports = HashtagSection;
