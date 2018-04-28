'use strict';

(function () {


  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  window.util = {

    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },

    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },

    getRandomInt: function (min, max) {
      return Math.floor(Math.random() * ((max + 1) - min)) + min;
    },

    getRandomItem: function (array) {
      return array[Math.floor(Math.random() * array.length)];
    }

  };

})();
