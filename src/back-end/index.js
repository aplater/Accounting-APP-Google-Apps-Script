'use strict'

let Route = {};
Route.path = function (route, callback) {
  Route[route] = callback;
}

function doGet(e) {

    Route.path("home", loadHome);
    if (Route[e.parameters.v]) {
      console.log(`загрузка домашней страницы`);

      console.log(e);
      return Route[e.parameters.v](e);
    } else {
      console.log(`обычная загрузка`);
      console.log(e);
      return render("src/front-end/loginPage/index");
    }
}

function loadHome(e) {
  return render("src/front-end/homePage/index", {title: e.parameters.sheetId});
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

