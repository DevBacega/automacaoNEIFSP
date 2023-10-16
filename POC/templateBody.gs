function templateBody(email = "teste@teste", webhook = "http://webhook", valor = "100.00"){
  //colocar um array para varios parametros.
  const dataEmail = emailTemplateSheet.getDataRange().getValues();
  const template = HtmlService.createTemplate(dataEmail[0][1])
  template.email = email
  template.webhook = webhook
  template.valor = valor
  const body = template.evaluate().getContent()
  return body
}

function templateCobrarRecebimento() {
  
}