function sendEmailViaGoogle(id, valor, email) {
  const webhook = returnWebHookUrlWithParameters(id, valor)

  MailApp.sendEmail({
    to: email,
    subject: 'Teste de envio com app script',
    htmlBody: templateBody(email, webhook, valor)
  })
}
