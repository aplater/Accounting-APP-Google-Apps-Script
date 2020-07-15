'use strict'

function checkAuthData(data) {
  console.log(`[BACK-END] Функция checkAuthData()`);
  const MODE = data.mode;
  console.log(`[BACK-END] MODE ---> ${MODE}`);
  
  let response = {
    success: false,
    successMessage: '',
    errorMessage: '',
    newUser: false,
    userSheetId: null
  }

  if (MODE == undefined) {
    console.log("[BACK-END] Не указан нужный процесс. MODE == undefined")
    response.errorMessage = "Не указан нужный процесс. MODE == undefined";
    return response;
  }

  if (MODE == 1) {
    console.log("[BACK-END] MODE == 1");
    let email = data.email;
    let password = data.password;
    let sheetId = data.sheetId;
    console.log(`[BACK-END] email ---> ${email}`);
    console.log(`[BACK-END] password ---> ${password}`);
    console.log(`[BACK-END] sheetId ---> ${sheetId}`);

    if (email != undefined && password != undefined && sheetId != undefined) {
      let sheetData = ENVIRONMENT_PROCESSOR.returnDataSheet();
      let emailRange = sheetData.createTextFinder(email.toLowerCase()).matchEntireCell(true).findNext();
      if (emailRange == null) {
        response.errorMessage = "Отсутствует email";
        return response;
      }
      let row = emailRange.getRow();
      console.log(`row --> ${row}`)
      console.log(sheetData.getSheetValues(row, 3, 1, 3));
      let arrOfValues = sheetData.getSheetValues(row, 3, 1, 3)[0].reduce((array, item) => {
        array.push(String(item));
        return array;
      }, []);

      console.log(`arrOfValues`)
      console.log(arrOfValues)
      let indexOf = arrOfValues.indexOf(email);
      if (indexOf === -1) {
        response.errorMessage = "Не совпал email";
        return response;
      }
      indexOf = arrOfValues.indexOf(password);
      if (indexOf === -1) {
        response.errorMessage = "Не совпал пароль";
        return response;
      }
      indexOf = arrOfValues.indexOf(sheetId);
      if (indexOf === -1) {
        response.errorMessage = "Не совпал sheetId";
        return response;
      }
      response.success = true;
      response.successMessage = "Все три поля - валидные."
      response.userSheetId = sheetId;
      return response;
    }
    console.log(`[BACK-END] Один из параметров - undefined `);
    return response;
  }




  if (MODE == 2) {
    console.log("[BACK-END] MODE == 2");
    console.log("[BACK-END] Проверка логина пароля")
    let email = data.email;
    let password = data.password;
    if (email != undefined && password != undefined) {
      console.log(`[BACK-END] email ---> ${email}`);
      console.log(`[BACK-END] password ---> ${password}`);
      let hashedPaword = String(AUTH.returnHashCode(String(password)));
      console.log(`[BACK-END] hashedPaword ---> ${hashedPaword}`);

      let sheetData = ENVIRONMENT_PROCESSOR.returnDataSheet();
      let emailRange = sheetData.createTextFinder(email.toLowerCase()).matchEntireCell(true).findNext();
      console.log(`[BACK-END] emailRange ---> ${emailRange}`);
      if (emailRange == null) {
        response.errorMessage = "Отсутствует email";
        return response;
      }
      let row = emailRange.getRow();
      console.log(`[BACK-END] row ---> ${row}`);
      let arrOfValues = sheetData.getSheetValues(row, 3, 1, 3)[0].reduce((array, item) => {
        array.push(String(item));
        return array;
      }, []);

      console.log(`[BACK-END] arrOfValues ---> ${arrOfValues}`);
      let indexOf = arrOfValues.indexOf(email);
      if (indexOf === -1) {
        console.log("[BACK-END] Не совпал email")
        response.errorMessage = "Не совпал email";
        return response;
      }
      indexOf = arrOfValues.indexOf(hashedPaword);
      if (indexOf === -1) {
        console.log(`[BACK-END] Не совпал пароль  hashedPaword ---> ${hashedPaword}`);
        console.log(`[BACK-END] TYPE OF hashedPaword ---> ${typeof hashedPaword}`);
        response.errorMessage = "Не совпал пароль";
        return response;
      }
      console.log("[BACK-END] email и пароль валидные.")
      response.success = true;
      response.successMessage = "email и пароль валидные."
      response.userSheetId = arrOfValues[2];
      console.log(`[BACK-END] arrOfValues[2] ---> ${arrOfValues[2]}`)

      return response;
    }
    console.log(`[BACK-END] Один из параметров - undefined `);
    return response;
  }








}



