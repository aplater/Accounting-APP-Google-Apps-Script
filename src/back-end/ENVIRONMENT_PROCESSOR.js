'use strict'

const ENVIRONMENT_PROCESSOR = {
  appDataSheetId: '1BXr4qF0AsUED4aHPd-TBn9lgGmtYzxgTtF05eXssnP0',
  templateSheetId: '1_MC2DRDQ0p-5f6FOoHIjwP0QpY7B6jiwsoHpakVGSf4',
  folderId: "1WM7OOsh8usHsaSViKcim1-44gsa4ES8C",

  returnDataSheet: (function () {
    let sheet;
    return function () {
      if (!sheet) {
        sheet = SpreadsheetApp.openById(ENVIRONMENT_PROCESSOR.appDataSheetId).getSheetByName("users");
      }
      return sheet;
    };
  })(),

  returnTemplateSheet: (function () {
    let sheet;
    return function () {
      if (!sheet) {
        sheet = SpreadsheetApp.openById(ENVIRONMENT_PROCESSOR.templateSheetId);
      }
      return sheet;
    };
  })(),

  createNewEnvironment: function () {

    // записать email и пароль(закодировав) в свою таблицу
    let email = PropertiesService.getScriptProperties().getProperty('newUserEmail');
    let passwordSSH = PropertiesService.getScriptProperties().getProperty('newUserPassword');
    passwordSSH = AUTH.returnHashCode(passwordSSH);
    let dataSheet = ENVIRONMENT_PROCESSOR.returnDataSheet();
    let lastRowNum = dataSheet.getLastRow();
    let newId = Number(dataSheet.getRange(`A${lastRowNum}`).getValue()) + 1;
    let date = new Date();
    let aliases = '';
    let isDeleted = false;
    // создать новую таблицу с названием по email (сделав копию шаблона) и расшарить пользователю
    let folder = DriveApp.getFolderById(ENVIRONMENT_PROCESSOR.folderId);
    let file = DriveApp.getFileById(ENVIRONMENT_PROCESSOR.templateSheetId);
    let newFileId = file.makeCopy(email, folder).getId();
    let rowData = [newId, date, email, passwordSSH, newFileId, aliases, isDeleted];
    dataSheet.getRange((lastRowNum + 1), 1, 1, (rowData.length)).setValues([rowData]);
    let resultArray = [email, passwordSSH, newFileId];
    PropertiesService.getScriptProperties().deleteAllProperties();
    console.log(`newFileId ---> ${newFileId}`)
    return resultArray;

    // return categoriesObject;
  },


  returnCategoriesObject: function (categoriesPage) {
    let lastRow = categoriesPage.getLastRow();
    let categoriesData = categoriesPage.getSheetValues(1, 1, (lastRow -1), 2).slice(1);
    let categoriesObject = categoriesData.reduce((categoriesMap, row) => {
      const CATEGORY_NAME = String(row[0]).trim();
      let category = categoriesMap[CATEGORY_NAME];
      if (!category) {
        category = [];
        categoriesMap[CATEGORY_NAME] = category;
      }
      const SUB_CATEGORY = String(row[1]).trim();
      category.push(SUB_CATEGORY);
      return categoriesMap;
    }, {});
    return categoriesObject;
  }
}