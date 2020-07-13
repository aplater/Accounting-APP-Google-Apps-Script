'use strict'

function loadHomeData(categories, sheetId) {
  let categoriesObject;
  let userSheetId;
  if (categories != null) {
    categoriesObject = array[0];
  } else {
    let categoriesPage = SpreadsheetApp.openById(sheetId).getSheetByName('categories');
    categoriesObject = ENVIRONMENT_PROCESSOR.returnCategoriesObject(categoriesPage);
  }

  return [categoriesObject, 'home'];


}