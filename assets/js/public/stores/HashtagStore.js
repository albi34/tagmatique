/*
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * TodoStore
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var HashtagConstants = require('../constants/HashtagConstants');
var assign = require('object-assign');
var $ = require('jquery');

var CHANGE_EVENT = 'change';

var _posts = [];

/**
 * Get the Hashtags posts
 * @param  {object} params query parameters
 */
function getPosts(params) {
  var url = "http://localhost:1337/hashtags/";

  var options = params;
  $.get(url, options, function(result) {
    _posts = result.posts;
    HashtagStore.emitChange();
 });
}

function getGeo(params) {
    var url = "http://localhost:1337/hashtags/geo/";
    console.log(params);
    var options = params;
    $.get(url + options.lat + "/" + options.long, "", function(result) {
      _posts = result.posts;
      HashtagStore.emitChange();
   });
}


var HashtagStore = assign({}, EventEmitter.prototype, {

  /**
   * Get the entire collection of Hashtags.
   * @return {object}
   */
   init: function() {
     getPosts();
   },
  getAll: function() {
    return _posts;
  },
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all actions
AppDispatcher.register(function(action) {
  var searchtxt;
  var long;
  var lat;

  switch(action.actionType) {
    case HashtagConstants.HASHTAG_LOAD:
      getPosts("");
      break;
    case HashtagConstants.HASHTAG_LOAD_GEO:
      console.log(action);
      long = action.long;
      lat = action.lat;
      getGeo({lat:lat, long:long});
      break;
    case HashtagConstants.HASHTAG_SEARCH:
      searchtxt = action.tag.trim();
      if (searchtxt !== '') {
        getPosts({tags:searchtxt});
      }
      break;

    default:
      // no op
  }
});

module.exports = HashtagStore;
