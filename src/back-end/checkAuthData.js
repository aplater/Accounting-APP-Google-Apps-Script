'use strict'

function checkAuthData(localStorageDataArray) {
  console.log(`Функция checkAuthData`)
  console.log(`typeof localStorageDataArray`)
  console.log(typeof localStorageDataArray)

  console.log(`localStorageDataArray`)
  console.log(localStorageDataArray)

  let sheetData = ENVIRONMENT_PROCESSOR.returnDataSheet();
  let emailRange = sheetData.createTextFinder(localStorageDataArray[0].toLowerCase()).matchEntireCell(true).findNext();
  if (emailRange == null) {
    console.log(`emailRange`)
    console.log(emailRange)
    return {success: false}
  }
  let row = emailRange.getRow();
  console.log(`row --> ${row}`)
  console.log(sheetData.getSheetValues(row, 3, 1, 3))
  let arrOfValues = sheetData.getSheetValues(row, 3, 1, 3)[0].reduce((array, item)=>{
    array.push(String(item));
    return array;
  }, []);
  console.log(`arrOfValues`)
  console.log(arrOfValues)

  let authorized = true;
  console.log(`authorized`)
  console.log(authorized)


  for (let i = 0; i < localStorageDataArray.length; i++) {
    let indexOf = arrOfValues.indexOf(localStorageDataArray[i]);
    if (indexOf == -1) {
      authorized = false;
      break
    }
  };

  console.log(`authorized`)
  console.log(authorized)

  if (authorized === true) {
    return {success: true, userSheetId: localStorageDataArray[2],  newUser: false}
  }
  return  {success: false}

}