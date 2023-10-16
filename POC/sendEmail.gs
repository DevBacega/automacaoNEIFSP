function sendEmail() {
  for( var nRow = 1 ; nRow < dataSheet.length; nRow++ )
 {
   var row = dataSheet[nRow];
   if(row[sendIndex] == true && row[firstSendIndex] == 'NÃO')
   { 
     sendEmailViaGoogle(row[idIndex],row[valueIndex],row[emailIndex])
     activeSheet.getRange(nRow + 1, firstSendIndex + 1).setValue('SIM')
     activeSheet.getRange(nRow + 1, dateFirtSendIndex + 1).setValue(new Date().toLocaleString("pt-BR"))
   }
  }
}