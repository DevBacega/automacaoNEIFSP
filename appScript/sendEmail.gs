function automaticSender() {
  const manageSheet = new ManageSheet(Constants.manageSheetName)
  let sentEmails = []
  let htmlBody = ''
  let htmlErrorBody = ''
  try {
    for (let indexRow = 2; indexRow < manageSheet.dataSheet.length; indexRow++) {
      const row = manageSheet.dataSheet[indexRow];
      if (row[manageSheet.headers.Finalizado] !== 'Sim') {
        try {
          const richRow = manageSheet.richDataSheet[indexRow]
          const sentEmail = executeStrategyEmail(manageSheet.headers, indexRow, row, richRow)
          registerSentEmail(manageSheet, indexRow, sentEmail.tipo)
          sentEmails.push(sentEmail)
        }
        catch (error) {
          htmlErrorBody = htmlErrorBody.concat(`Fornecedor: ${row[manageSheet.headers.Fornecedor]},
          Email: ${row[manageSheet.headers.EmailFornecedor]},
          Error: ${error}`)
        }
      }
    }

    if (sentEmails.length > 0) {
      htmlBody = htmlBody.concat(sentEmails.map(obj =>
        `Fornecedor: ${obj.fornecedor}, 
      Email: ${obj.email}, 
      Tipo: ${obj.tipo}<br>`))
    } else {
      htmlBody = 'Nenhum Fornecedor a ser cobrado.'
    }

    if (htmlErrorBody.length > 1) {
      htmlBody.concat(`<br><br><br>////ERROS////<br><br><br> ${htmlErrorBody}`)
    }

    MailApp.sendEmail({
      to: Constants.admEmail,
      subject: 'Envio automatico de cobrança - Emails enviados',
      htmlBody: htmlBody
    })

  } catch (error) {
    MailApp.sendEmail({
      to: Constants.admEmail,
      cc: 'dev.victor.bacega@gmail.com',
      subject: `Erro no envio de emails: ${new Date().toLocaleString("pt-BR")}`,
      htmlBody: error
    })
  }
}

function sendEmail() {
  try {
    const manageSheet = new ManageSheet(Constants.manageSheetName)

    for (let indexRow = 2; indexRow < manageSheet.dataSheet.length; indexRow++) {
      const row = manageSheet.dataSheet[indexRow];
      const richRow = manageSheet.richDataSheet[indexRow]
      const executar = row[manageSheet.headers.Executar]
      if (executar == true && row[manageSheet.headers.Finalizado] !== 'Sim') {
        const sentEmail = executeStrategyEmail(manageSheet.headers, indexRow, row, richRow)
        registerSentEmail(manageSheet, indexRow, sentEmail.tipo)
      }
    }
  } catch (error) {
    MailApp.sendEmail({
      to: Constants.admEmail,
      cc: 'dev.victor.bacega@gmail.com',
      subject: `Erro no envio de emails: ${new Date().toLocaleString("pt-BR")}`,
      htmlBody: error
    })
  }
}

function registerSentEmail(manageSheet, indexRow, type) {
  manageSheet.sheet.getRange(indexRow + 1, manageSheet.headers.TipoEmailEnviado + 1).setValue(type)
  if(type !== Strategy.isOnDay) {
  manageSheet.sheet.getRange(indexRow + 1, manageSheet.headers.UltimoEnvioEmail + 1).setValue(new Date().toLocaleString("pt-BR"))
  }
}


