/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var React = require('react');
var HashtagActions = require('../actions/HashtagActions');
var HashtagTextInput = require('./HashtagTextInput.react');

var Header = React.createClass({

  /**
   * @return {object}
   */
  render: function() {
    return (
      <header id="header">
        <h1>Hashtags</h1>
        <HashtagTextInput
          id="search"
          placeholder="Search for hashtags"
          onSave={this._onSave}
        />
      </header>
    );
  },

  /**
   * Event handler called within HashtagTextInput.
   * Defining this here allows HashtagTextInput to be used in multiple places
   * in different ways.
   * @param {string} text
   */
  _onSave: function(text) {
    if (text.trim()){
      HashtagActions.create(text);
    }

  }

});

module.exports = Header;
