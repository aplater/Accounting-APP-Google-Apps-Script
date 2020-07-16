function returnCategories(sheetId) {
  let categoriesPage = SpreadsheetApp.openById(sheetId).getSheetByName('categories');
  let categoriesObject = ENVIRONMENT_PROCESSOR.returnCategoriesObject(categoriesPage);
  console.log(categoriesObject)
  return true;
}