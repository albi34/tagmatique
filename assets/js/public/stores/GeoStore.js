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
var assign = require('object-assign');

var CHANGE_EVENT = 'geo_change';

var _geo = {};

/**
 * Get/Ask for geolocation
 */
function getGeo() {
  var options = {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000};
  navigator.geolocation.getCurrentPosition( function(position, error, options){
    _geo = position;
    GeoStore.emitChange();
    if(error){
      console.log(error);
    }
  });
}


var GeoStore = assign({}, EventEmitter.prototype, {

  /**
   * Get the entire collection of Hashtags.
   * @return {object}
   */
   init: function() {
     getGeo();
   },
  getCurrentGeo: function() {
    return _geo;
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


module.exports = GeoStore;
