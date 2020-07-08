'use strict'

const MAIL_SENDER = {
  sendCode: function (email, confirmationCode) {
    let subject = "Accounting APP - confirmation code";
    let body = '';
    let hBody = returnCodeMailString(confirmationCode);
    GmailApp.sendEmail(email, subject, body, {htmlBody: hBody});
  },

  sendError: function(e) {
    let error = `${e.message} ${e.stack}`;
    GmailApp.sendEmail('yevudo@gmail.com', 'Script error', error);
  }
}

