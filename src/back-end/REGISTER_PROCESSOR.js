'use strict'

const REGISTER_PROCESSOR = {
  userEmail: null,
  userPassword: null,
  confirmationCode: null,

  saveUserData: function (email, password, confirmationCode) {
    REGISTER_PROCESSOR.userEmail = email;
    REGISTER_PROCESSOR.userPassword = password; 
    REGISTER_PROCESSOR.confirmationCode = confirmationCode; 
  },



}