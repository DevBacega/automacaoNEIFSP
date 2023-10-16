var id= SpreadsheetApp.getActiveSpreadsheet().getId();
var activeSheet = SpreadsheetApp.openById(id).getActiveSheet();
var emailTemplateSheet = SpreadsheetApp.openById(id).getSheetByName("emailTemplatePrimeiroEnvio")

// Get all the data from the sheet
var dataSheet = activeSheet.getDataRange().getValues();

// Get the headers and get the index of the ldap and the approval status
// using the names you use in the headers
const headers = dataSheet[0];
const idIndex = headers.indexOf('Id'); 
const sendIndex = headers.indexOf('ENVIAR');
const emailIndex = headers.indexOf('email')
const firstSendIndex = headers.indexOf('PRIMEIRO ENVIO')
const valueIndex = headers.indexOf('VALOR')
const dateFirtSendIndex = headers.indexOf('DATA 1 ENVIO')
const confirmIndex = headers.indexOf('CONFIRMOU')
