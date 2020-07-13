'use strict'

const LOGGER = {
  logString: '',

  add: function (string) {
    LOGGER.logString += string;
  },

  saveLogs: function () {
    const ROOT_FOLDER = DriveApp.getRootFolder().getFoldersByName('Accounting APP').next();
    let date = DATE_MNGR.returnCurrentDate();
    let currDate = DATE_UTILS.formatDate(date, 'yyyy.MM.dd');
    let file;
    let logFileName = `${currDate}__LOG__.txt`;
    let fileIterator = ROOT_FOLDER.getFilesByName(logFileName);
    while (fileIterator.hasNext()) {
      file = fileIterator.next();
    }
    if (file != null) {
      let content = file.getAs(MimeType.PLAIN_TEXT);
      let allText = content.getDataAsString() + '\n' + LOGGER.logString;
      file.setContent(allText);
    } else {
      file = logsFolder.createFile(logFileName, LOGGER.logString);
    }
  }

}
