'use strict'

function checkAuthData(data) {
  console.log(`[BACK-END] Функция checkAuthData()`);
  const MODE = data.mode;
  console.log(`[BACK-END] MODE ---> ${MODE}`);
  
  let response = {
    success: false,
    successMessage: '',
    errorMessage: '',
    userSheetId: null,
    mode: null,
    isRemember: false,
    email: null,
    sshPassword: null

  }

  if (MODE == undefined) {
    console.log("[BACK-END] Не указан нужный процесс. MODE == undefined")
    response.errorMessage = "Не указан нужный процесс. MODE == undefined";
    return response;
  }

  if (MODE == "localStorageMode") {
    console.log("[BACK-END] MODE == localStorageMode");
    let email = data.email;
    let sshPassword = data.sshPassword;
    let sheetId = data.sheetId;
    console.log(`[BACK-END] email ---> ${email}`);
    console.log(`[BACK-END] sshPassword ---> ${sshPassword}`);
    console.log(`[BACK-END] sheetId ---> ${sheetId}`);

    if (email != undefined && sshPassword != undefined && sheetId != undefined) {
      let sheetData = ENVIRONMENT_PROCESSOR.returnDataSheet();
      let emailRange = sheetData.createTextFinder(email.toLowerCase()).matchEntireCell(true).findNext();
      if (emailRange == null) {
        response.errorMessage = "Такого пользователя не существует";
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
        response.errorMessage = "Такого пользователя не существует";
        return response;
      }
      indexOf = arrOfValues.indexOf(sshPassword);
      if (indexOf === -1) {
        response.errorMessage = "Неправильный пароль";
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
      response.mode = MODE;
      return response;
    }
    console.log(`[BACK-END] Один из параметров - undefined `);
    return response;
  }




  if (MODE == "loginFormMode") {
    console.log("[BACK-END] MODE == loginFormMode");
    console.log("[BACK-END] Проверка логина пароля")
    let email = data.email;
    let password = data.password;
    let isRemember = data.isRemember;

    if (email != undefined && password != undefined) {
      console.log(`[BACK-END] email ---> ${email}`);
      console.log(`[BACK-END] password ---> ${password}`);
      let sshPassword = String(AUTH.returnHashCode(String(password)));
      console.log(`[BACK-END] hashedPaword ---> ${sshPassword}`);

      let sheetData = ENVIRONMENT_PROCESSOR.returnDataSheet();
      let emailRange = sheetData.createTextFinder(email.toLowerCase()).matchEntireCell(true).findNext();
      console.log(`[BACK-END] emailRange ---> ${emailRange}`);
      if (emailRange == null) {
        response.errorMessage = "Такого пользователя не существует";
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
        console.log("[BACK-END] Такого пользователя не существует")
        response.errorMessage = "Такого пользователя не существует";
        return response;
      }
      indexOf = arrOfValues.indexOf(sshPassword);
      if (indexOf === -1) {
        console.log(`[BACK-END] Неправильный пароль  hashedPaword ---> ${sshPassword}`);
        console.log(`[BACK-END] TYPE OF hashedPaword ---> ${typeof sshPassword}`);
        response.errorMessage = "Неправильный пароль";
        return response;
      }
      console.log("[BACK-END] email и пароль валидные.")
      if (isRemember) {
        response.isRemember = isRemember;
      }
      response.success = true;
      response.successMessage = "email и пароль валидные."
      response.userSheetId = arrOfValues[2];
      response.email = email;
      response.sshPassword = sshPassword;

      console.log(`[BACK-END] arrOfValues[2] ---> ${arrOfValues[2]}`)
      response.mode = MODE;
      return response;
    }
    console.log(`[BACK-END] Один из параметров - undefined `);
    return response;
  }





  console.log(`[BACK-END] Неправильный MODE `);
  response.errorMessage = 'Неправильный MODE';
  return response;








}



