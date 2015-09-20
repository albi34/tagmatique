/*
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * TodoActions
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var HashtagConstants = require('../constants/HashtagConstants');

var HashtagActions = {


  load: function() {
    AppDispatcher.dispatch({
      actionType: HashtagConstants.HASHTAG_LOAD
    });
  },

  loadGeo: function(long, lat){
    AppDispatcher.dispatch({
      actionType: HashtagConstants.HASHTAG_LOAD_GEO,
      long:long,
      lat:lat
    });
  },

  /**
   * @param  {string} tag
   */
  search: function(tag) {
    AppDispatcher.dispatch({
      actionType: HashtagConstants.HASHTAG_SEARCH,
      tag: tag
    });
  },








};

module.exports = HashtagActions;
