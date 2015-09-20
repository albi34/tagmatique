/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

/**
 * This component operates as a "Controller-View".  It listens for changes in
 * the TodoStore and passes the new data to its children.
 */

var Footer = require('./Footer.react');
var Header = require('./Header.react');
var HashtagSection = require('./HashtagSection.react');
var React = require('react');
var _ = require('underscore');
var HashtagStore = require('../stores/HashtagStore');
var GeoStore = require('../stores/GeoStore');

function getHashtagState() {
  var all_posts = HashtagStore.getAll();
  if (Object.keys(all_posts).length < 1) {
      HashtagStore.init();
  }
  return {
    posts:all_posts
  };
}

function getGeoState(){
  var geo = GeoStore.getCurrentGeo();
  if (Object.keys(geo).length < 1) {
    GeoStore.init();
  }
  return {
    geo: geo
  };
}

var HashtagApp = React.createClass({

  getInitialState: function() {
    var hashtagState = getHashtagState();
    var geoState = getGeoState();
    return _.extend(hashtagState, geoState);
  },

  componentDidMount: function() {

    HashtagStore.addChangeListener(this._onChange);
    GeoStore.addChangeListener(this._onGeo_Change);
  },

  componentWillUnmount: function() {

    HashtagStore.removeChangeListener(this._onChange);
    GeoStore.removeChangeListener(this._onGeo_Change);
  },

  /**
   * @return {object}
   */
  render: function() {
    return (
      <div>
        <Header />
        <HashtagSection
          posts={this.state.posts}
          geo={this.state.geo}
        />
        <Footer />
      </div>
    );
  },

  /**
   * Event handler for 'change' events coming from the TodoStore
   */
  _onChange: function() {
    this.setState(getHashtagState());
  },
  _onGeo_Change: function() {
    this.setState(getGeoState());
  }

});

module.exports = HashtagApp;
