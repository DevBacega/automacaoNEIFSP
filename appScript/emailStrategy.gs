function getStrategy(row, headers) {

  const email = row[headers.EmailFornecedor]
  if(!email || email == 'undefined' || email?.length <= 0) {
    return Strategy.emailIsEmpty
  }

  const isFirstSend = !row[headers.DataEnvio];
  if (isFirstSend) {
    return Strategy.isFirstSend
  }

  const isBillingSend = !!row[headers.DataEnvio] && row[headers.Confirmou] !== 'Sim'
  if (isBillingSend) {
    return Strategy.isBillingSend
  }

  const isOnDay = !!row[headers.DataEnvio] && row[headers.Confirmou] == 'Sim' && row[headers.ItemEntregue] == 'Não' && (getDateTodayDif(row[headers.PrazoEntrega]) >= 0 && getDateTodayDif(row[headers.PrazoEntrega]) < 7)
  if (isOnDay) {
    return Strategy.isOnDay
  }

  const isDeliveryBillingSend = !!row[headers.DataEnvio] && row[headers.Confirmou] == 'Sim' && row[headers.ItemEntregue] == 'Não' && getDateTodayDif(row[headers.PrazoEntrega]) == 7
  if (isDeliveryBillingSend) {
    return Strategy.isDeliveryBillingSend
  }

  const prazoEntregaVencido = getDateTodayDif(row[headers.PrazoEntrega]) <= 0
  const cobrarACada3Dias = getDateTodayDif(row[headers.UltimoEnvioEmail]) <= 1 
  
  const isDeliveryExpiredBillingSend = !!row[headers.DataEnvio] && prazoEntregaVencido && row[headers.ItemEntregue] == 'Não' && (!row[headers.UltimoEnvioEmail] || cobrarACada3Dias)
  if (isDeliveryExpiredBillingSend) {
    return Strategy.isDeliveryExpiredBillingSend
  }

  const isBillingAttestSend = !!row[headers.DataEnvio] && row[headers.Confirmou] == 'Sim' && row[headers.ItemEntregue] == 'Sim' && row[headers.Situacao] == 'Em Ateste'
  if(isBillingAttestSend) {
    return Strategy.isBillingAttest
  }

  return Strategy.strategyNoImplemented
}

function executeStrategyEmail(headers, indexRow, row, richRow) {
  const emailStrategy = getStrategy(row, headers)
  const manageSheet = new ManageSheet(Constants.manageSheetName)
  const emailBuilder = new EmailBuilder(row, richRow)
  switch (emailStrategy) {
    case Strategy.emailIsEmpty:
      manageSheet.sheet.getRange(indexRow + 1, manageSheet.headers.DataEnvio + 1).setValue(new Date().toLocaleString("pt-BR"))
      return {
        fornecedor: row[headers.Fornecedor],
        email: '',
        tipo: Strategy.emailIsEmpty
      }
    case Strategy.isFirstSend:
      emailBuilder.firstSendEmail()
      manageSheet.sheet.getRange(indexRow + 1, manageSheet.headers.DataEnvio + 1).setValue(new Date().toLocaleString("pt-BR"))
      return {
        fornecedor: row[headers.Fornecedor],
        email: row[headers.EmailFornecedor],
        tipo: Strategy.isFirstSend
      }
    case Strategy.isBillingSend:
      emailBuilder.billingReceiptEmail()
      return {
        fornecedor: row[headers.Fornecedor],
        email: row[headers.EmailFornecedor],
        tipo: Strategy.isBillingSend
      }
    case Strategy.isOnDay:
      return {
        fornecedor: row[headers.Fornecedor],
        email: row[headers.EmailFornecedor],
        tipo: Strategy.isOnDay
      }
    case Strategy.isDeliveryBillingSend:
      emailBuilder.deliveryBillingEmail()
      return {
        fornecedor: row[headers.Fornecedor],
        email: row[headers.EmailFornecedor],
        tipo: Strategy.isDeliveryBillingSend
      }
    case Strategy.isDeliveryExpiredBillingSend:
      emailBuilder.deliveryExpiredBillingEmail()
      return {
        fornecedor: row[headers.Fornecedor],
        email: row[headers.EmailFornecedor],
        tipo: Strategy.isDeliveryExpiredBillingSend
      }
    case Strategy.isBillingAttest:
      emailBuilder.billingAttestEmail()
      return {
        fornecedor: row[headers.Fornecedor],
        email: row[headers.EmailFornecedor],
        tipo: Strategy.isBillingAttest
      }
    default:
      return {
          fornecedor: row[headers.Fornecedor],
          email: row[headers.EmailFornecedor],
          tipo: Strategy.strategyNoImplemented
        }
  }
}