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
var HashtagActions = require('../actions/HashtagActions');
var HashtagTextInput = require('./HashtagTextInput.react');

var classNames = require('classnames');

var HashtagItem = React.createClass({

  propTypes: {
   post: ReactPropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
    };
  },

  /**
   * @return {object}
   */
  render: function() {
    var post = this.props.post;
    var tagClasses = "col-xs-3 tag";
    var contentClasses = "tag-content";
    var divStyle = {
      backgroundImage: 'url(' + post.picture + ')'
    };
    return (
      <a style={divStyle} href={post.link} className={tagClasses} target="blank" key={post.id}>
       <div className={contentClasses}><span className="tag-author">@{post.author}</span><br/><span className="tag-message">{post.message}</span></div>
     </a>
    );
  }


});

module.exports = HashtagItem;
