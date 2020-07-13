'use strict'

const DATE_MNGR = {

  formatDate: function (date, format) {
    return Utilities.formatDate(date, Session.getScriptTimeZone(), format);
  },

  returnCurrentDate: (function () {
    let date;
    return function () {
      if (!date) {
        date = new Date();
      }
      return date;
    };
  })()

}