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






function render (fileName, paramsForPage) {
  let tempPage = HtmlService.createTemplateFromFile(fileName);
  if (paramsForPage) {
    for (let key in paramsForPage) {
      tempPage[key] = paramsForPage[key];
    }
  }
  return tempPage.evaluate();

}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
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