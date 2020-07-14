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

  if (MODE == 1) {
    let email = data.email;
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

  if (MODE == 2) {
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
    response.errorMessage = 'Коды не совпадают.';
    return response;
  }

  if (MODE == 3) {
    let resultArray = ENVIRONMENT_PROCESSOR.createNewEnvironment();
    response.success = true;
    response.successMessage = 'Окружение успешно создано';
    response['newUser'] = true;
    response['email'] = resultArray[0];
    response['passwordSSH'] = resultArray[1];
    response['userSheetId'] = resultArray[2];
    return response;
  }

}






