'use strict'

function registerProcessor(data) {
  const MODE = data.mode;


  let response = {
    success: false,
    successMessage: '',
    errorMessage: ''
  }






  if(MODE == undefined) {
    response.errorMessage = "Не указан нужный процесс."
    return response;
  }

  if (MODE == 'startRegister') {
    let email = data.email;
    if(isDuplicate(email)) {
      response.errorMessage = "Такой email уже существует"
      return response;
    };
    let password = data.password;
    let confirmationCode = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    PropertiesService.getScriptProperties().setProperty('confirmationCode', confirmationCode);
    PropertiesService.getScriptProperties().setProperty('newUserEmail', email);
    PropertiesService.getScriptProperties().setProperty('newUserPassword', password);
    MAIL_SENDER.sendCode(email, confirmationCode);
    response.success = true;
    response.successMessage = 'Письмо отправлено';
    return response;
  }




  if (MODE == 'checkConfirmationCode') {
    let userConfirmationCode = data.userConfirmationCode;
    let scriptConfirmCode = PropertiesService.getScriptProperties().getProperty('confirmationCode');
    if (userConfirmationCode == undefined) {
      response.errorMessage = "Не получен код подтверждения от пользователя."
      return response;
    } else if (userConfirmationCode == scriptConfirmCode) {
      PropertiesService.getScriptProperties().deleteProperty('confirmationCode');
      response.success = true;
      response.successMessage = 'Код подтверждения совпал.';
      return response;
    }
    response.errorMessage = 'Неправильный код. Попробуйте снова.';
    return response;
  }

  if (MODE == 'finishRegister') {
    let resultArray = ENVIRONMENT_PROCESSOR.createNewEnvironment();
    response.success = true;
    response.successMessage = 'Окружение успешно создано';

    response['mode'] = 'loginFormMode';
    response['email'] = resultArray[0];
    response['sshPassword'] = resultArray[1];
    response['userSheetId'] = resultArray[2];
    response['isRemember'] = true;

    return response;
  }

}






function isDuplicate (email) {
  let sheetData = ENVIRONMENT_PROCESSOR.returnDataSheet();
  let emailRange = sheetData.createTextFinder(email.toLowerCase()).matchEntireCell(true).findNext();
  if (emailRange == null) {
    return false;
  }
  return true;
}