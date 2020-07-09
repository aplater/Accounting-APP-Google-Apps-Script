'use strict'

let Route = {};
Route.path = function (route, callback) {
  Route[route] = callback;
}

function doGet(e) {
    return render("src/front-end/loginPage/index");

  // console.log(e);
//   Route.path("home", loadHome);
//   if (Route[e.parameters.v]) {

//     console.log(e);
//     return Route[e.parameters.v]();
//   } else {

//     console.log(e);
//     return render("src/front-end/login/index");
//   }
}


function startRegisterProcess(email, password) {
  try {
    return {success: true} // убрать потом
    let confirmationCode = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    REGISTER_PROCESSOR.saveUserData(email, password, confirmationCode);
    MAIL_SENDER.sendCode(email, confirmationCode);
    return {success: true}
  } catch (e) {
    MAIL_SENDER.sendError(e);
    return {success: false}
  }
}
