'use strict'

let Route = {};
Route.path = function (route, callback) {
  Route[route] = callback;
}

function doGet(e) {
  console.log(e);
    Route.path("home", loadHome);
    if (Route[e.parameters.v]) {

      console.log(e);
      return Route[e.parameters.v]();
    } else {

      console.log(e);
      return render("src/front-end/loginPage/index");
    }
}

function loadHome() {
  console.log('Начал загрузку кабинета')
  return render("src/front-end/homePage/index");
}

    // TODO: сделать проверку на дубликаты email
// function checkExistEmail(email) {
//   let emailsArr = ENVIRONMENT_PROCESSOR.returnDataSheet()
//     .getSheetValues(2, 3, 100, 1)
//     .reduce((accumulatorArray, currentValue) => {
//       accumulatorArray.push(currentValue[0]);
//       return accumulatorArray;
//     }, []);
//   if (emailsArr.indexOf(email) === -1) {
//     return [null, false];
//   }
//   return [null, true];
// }



function startRegisterProcess(email, password) {
  try {
    let confirmationCode = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    PropertiesService.getScriptProperties().setProperty('confirmationCode', confirmationCode);
    PropertiesService.getScriptProperties().setProperty('newUserEmail', email);
    PropertiesService.getScriptProperties().setProperty('newUserPassword', password);
    MAIL_SENDER.sendCode(email, confirmationCode);
    return { success: true }
  } catch (e) {
    MAIL_SENDER.sendError(e);
    return { success: false }
  }
}


function checkConfirmCode(confirmationCode) {
  let scriptConfirmCode = PropertiesService.getScriptProperties().getProperty('confirmationCode');
  let code = confirmationCode.trim();
  if (code == scriptConfirmCode) {
    PropertiesService.getScriptProperties().deleteProperty('confirmationCode');
    return { success: true }
  }
  return { success: false }
}


function createNewEnvironment() {
  return ENVIRONMENT_PROCESSOR.createNewEnvironment();
}










































//Called from the client with form data, basic validation for blank values
function formSubmit(object) {
  for (var field in object) {
    if (object[field] == '') {
      return { success: false, message: `${field} не может быть пустым!`}
    }
  }
  if (!validateEmail(object.email)) {
    return { success: false, message: 'Неправильный формат email!' }
  }
  let passwordSSH = String(object.password).hashCode();
  let sheet = SPREADSHEET_APP.returnLoginPage();
  let emailFinder = sheet.createTextFinder(object.email).matchEntireCell(true).findNext();
  let passwordFinder = sheet.createTextFinder(passwordSSH).matchEntireCell(true).findNext();
  if (emailFinder == null) {
    return { success: false, message: 'Неправильный email!' }
  }
  if (passwordFinder == null) {
    return { success: false, message: 'Неправильный пароль!' }
  }
  let emailRow = emailFinder.getRow();
  let userName = sheet.getRange(emailRow, 3).getValue();
  console.log(`emailRow is ${emailRow}. name is ${userName}`)
  let hours = new Date().getHours();
  let text = '';
  // switch (hours) {
  //   case (hours < 5): text = `Доброй ночи, ${}`;
  // }

  return { success: "home", message: 'Авторизация успешно пройдена!', sshKey: passwordSSH }
}