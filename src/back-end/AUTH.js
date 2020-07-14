'use strict'

const AUTH = {

  /** проверка валидности email
   * @returns {Boolean}
   */
  validateEmail: function (email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  },

  /** получение хеша строки
   * @param {String} string - строка, хеш которой нужно получить.
   * @returns {Number} hash
   */
  returnHashCode: function(string) {
    let hash = 12345567; 
    let charset = null;
    if (string.length === 0) {
      return hash
    };
    for (let i = 0; i < string.length; i++) {
      charset = string.charCodeAt(i);
      hash = ((hash << 5) - hash) + charset;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  },















}