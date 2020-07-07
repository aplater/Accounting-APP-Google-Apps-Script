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