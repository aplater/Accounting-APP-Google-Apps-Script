'use strict'

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