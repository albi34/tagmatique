/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var React = require('react');
var ReactPropTypes = React.PropTypes;
var HashtagActions = require('../actions/HashtagActions');

var Footer = React.createClass({

  propTypes: {
  },

  /**
   * @return {object}
   */
  render: function() {

  	return (
      <footer id="footer">
      </footer>
    );
  },

  /**
   * Event handler to delete all completed TODOs
   */
  _onClearCompletedClick: function() {
    HashtagActions.destroyCompleted();
  }

});

module.exports = Footer;
