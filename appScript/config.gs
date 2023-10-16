const Constants = {
  manageSheetName: "Nome da Planilha", //nome da planilha de notas.
  admEmail: 'email@deEnvio.com.br' //email em qual vai ser enviado os emails.
}

const Strategy = {
  isFirstSend: 'PRIMEIRO ENVIO',
  isBillingSend: 'EMAIL DE COBRANÇA DE CONFIRMAÇÃO',
  isOnDay: 'ESTÁ EM DIA',
  isDeliveryBillingSend: 'COBRANÇA DE ENTREGA',
  isDeliveryExpiredBillingSend: 'COBRANÇA APÓS VENCIMENTO',
  isBillingAttest: 'COBRANÇA DE ATESTE',
  strategyNoImplemented: 'AGUARDANDO AÇÃO',
  emailIsEmpty: 'CAMPO DE E-MAIL VAZIO'
}


//Titulo  do Email de Primeiro Envio 
function primeiroEnvioSubject(NumeroEmpenho) {
  return `🛑 👉🏽Envio de Nota de Empenho ${NumeroEmpenho} - Instituto Federal de São Paulo (Comprasnet) - Câmpus Capivari - UASG da Licitação: 158154👈🏽 🛑`
}

//Titulo  do Email de cobrança de confirmação
function cobrancaDeConfirmacaoSubject(NumeroEmpenho) {
  return `🛑 👉🏽 Nota de empenho  ${NumeroEmpenho} - Confirmação de Recebimento - IFSP Câmpus Capivari👈🏽 🛑`
}

//Titulo  do Email de cobrança de entrega.
function cobrancaDeEntregaSubject(NumeroEmpenho) {
  return `🛑 👉🏽 Nota de empenho  ${NumeroEmpenho} - Posição sobre Entrega de Mercadoria ou Serviço - IFSP Câmpus Capivari👈🏽 🛑`
}

//Titulo  do Email de cobrança de entrega vencido.
function cobrancaDeEntregaVencidoSubject(NumeroEmpenho) {
  return `🛑 👉🏽 Nota de empenho  ${NumeroEmpenho} - Posição sobre Entrega de Mercadoria ou Serviço - IFSP Câmpus Capivari - URGENTE👈🏽 🛑`
}

//Titulo  do Email de cobrança de ateste.
function cobrancaDeAtesteSubject(NumeroEmpenho) {
  return `🛑 👉🏽 Nota de empenho  ${NumeroEmpenho} - ***ATENÇÃO***Pedido de conferência do item - ATESTE DA NOTA FISCAL 👈🏽 🛑`
}
