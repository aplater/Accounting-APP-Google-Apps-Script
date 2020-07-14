'use strict'

function checkLoginForm (inputsData) {
  let dataSheet = ENVIRONMENT_PROCESSOR.returnDataSheet();
  if (inputsData.loginFormEmail && inputsData.loginFormPassword) {
    return {success: true}
  } else {
    console.log('нет данных')
    return {success: false}
  }


}




