class EmailBuilder {

  constructor(row, richRow) {
    this._row = row
    this._richRow = richRow
  }

  _processEmail(to, subject, htmlBody, requisitante) {
    MailApp.sendEmail({
      to,
      subject,
      htmlBody,
      cc: `clt.cpv@ifsp.edu.br, cap.cpv@ifsp.edu.br, ${requisitante}`
    })
  }

  firstSendEmail() {
    const headers = new ManageSheet(Constants.manageSheetName).headers
    const emailAdress = this._row[headers.EmailFornecedor]
    const requisitante = this._row[headers.EmailRequisitante]
    const subject = primeiroEnvioSubject(this._row[headers.NEmpenho])
    let template = HtmlService.createTemplateFromFile('PrimeiroEnvio')
    template.Fornecedor = this._row[headers.Fornecedor]
    template.CNPJ = this._row[headers.CNPJ]
    template.Envio1 = convertDateToLocaleDatestring(new Date())
    template.Valor = convertValueToCurrency(this._row[headers.Valor])
    template.Procedimento = this._row[headers.Procedimento]
    template.NEmpenho = this._row[headers.NEmpenho]
    template.NuvemIFSP = this._richRow[headers.NuvemIFSP].getLinkUrl()
    template.PrazoEntrega = this._row[headers.PrazoEntrega]
    template.PrazoEntregaEmDias = this._row[headers.PrazoDeEntregaEmDias]
    template.ProcessoOriginal = this._row[headers.ProcessoOriginal]
    template.ProcessoDeAquisicao = this._row[headers.ProcessoDeAquisicao]
    template.ProcessoSRP = this._row[headers.ProcessoSRP]
    template.ContatoEmpresa = this._row[headers.ContatoEmpresa]
    template.EmailFornecedor = this._row[headers.EmailFornecedor]
    template.Telefone = this._row[headers.Telefone]
    template.ContatoEmpresa = this._row[headers.ContatoEmpresa]
    template.PrazoDeEntregaEmDias = this._row[headers.PrazoDeEntregaEmDias]
    const htmlBody = template.evaluate().getContent()
    this._processEmail(emailAdress, subject, htmlBody, requisitante)
  }

  billingReceiptEmail() {
    const headers = new ManageSheet(Constants.manageSheetName).headers
    const emailAdress = this._row[headers.EmailFornecedor]
    const requisitante = this._row[headers.EmailRequisitante]
    const subject = cobrancaDeConfirmacaoSubject(this._row[headers.NEmpenho])
    const template = HtmlService.createTemplateFromFile('CobrancaDeConfirmacao')
    template.Fornecedor = this._row[headers.Fornecedor]
    template.CNPJ = this._row[headers.CNPJ]
    template.Envio1 = convertDateToLocaleDatestring(this._row[headers.DataEnvio])
    template.Valor = convertValueToCurrency(this._row[headers.Valor])
    template.Procedimento = this._row[headers.Procedimento]
    template.NEmpenho = this._row[headers.NEmpenho]
    template.NuvemIFSP = this._richRow[headers.NuvemIFSP].getLinkUrl()
    template.PrazoEntrega = this._row[headers.PrazoEntrega]
    template.PrazoDeEntregaEmDias = this._row[headers.PrazoDeEntregaEmDias]
    template.ProcessoOriginal = this._row[headers.ProcessoOriginal]
    template.ProcessoDeAquisicao = this._row[headers.ProcessoDeAquisicao]
    template.ProcessoSRP = this._row[headers.ProcessoSRP]
    const htmlBody = template.evaluate().getContent()
    this._processEmail(emailAdress, subject, htmlBody, requisitante)
  }

  deliveryBillingEmail() {
    const headers = new ManageSheet(Constants.manageSheetName).headers
    const subject = cobrancaDeEntregaSubject(this._row[headers.NEmpenho])
    const emailAdress = this._row[headers.EmailFornecedor]
    const requisitante = this._row[headers.EmailRequisitante]
    const template = HtmlService.createTemplateFromFile('CobrancaDeRecebimento')
    template.Fornecedor = this._row[headers.Fornecedor]
    template.CNPJ = this._row[headers.CNPJ]
    template.NEmpenho = this._row[headers.NEmpenho]
    template.Valor = convertValueToCurrency(this._row[headers.Valor])
    template.Procedimento = this._row[headers.Procedimento]
    template.Envio1 = convertDateToLocaleDatestring(this._row[headers.DataEnvio])
    template.Confirmacao = this._row[headers.Confirmacao]
    template.PrazoDeEntregaEmDias = this._row[headers.PrazoDeEntregaEmDias]
    template.PrazoEntrega = this._row[headers.PrazoEntrega]
    template.NuvemIFSP = this._richRow[headers.NuvemIFSP].getLinkUrl()
    const htmlBody = template.evaluate().getContent()
    this._processEmail(emailAdress, subject, htmlBody, requisitante)
  }

  deliveryExpiredBillingEmail() {
    const headers = new ManageSheet(Constants.manageSheetName).headers
    const subject = cobrancaDeEntregaVencidoSubject(this._row[headers.NEmpenho])
    const emailAdress = this._row[headers.EmailFornecedor]
    const requisitante = this._row[headers.EmailRequisitante]
    const template = HtmlService.createTemplateFromFile('CobrancaDeEntregaVencida')
    template.Fornecedor = this._row[headers.Fornecedor]
    template.CNPJ = this._row[headers.CNPJ]
    template.NEmpenho = this._row[headers.NEmpenho]
    template.Valor = convertValueToCurrency(this._row[headers.Valor])
    template.Procedimento = this._row[headers.Procedimento]
    template.Envio1 = convertDateToLocaleDatestring(this._row[headers.DataEnvio])
    template.Confirmacao = this._row[headers.Confirmacao]
    template.PrazoDeEntregaEmDias = this._row[headers.PrazoDeEntregaEmDias]
    template.PrazoEntrega = this._row[headers.PrazoEntrega]
    const htmlBody = template.evaluate().getContent()
    this._processEmail(emailAdress, subject, htmlBody, requisitante)
  }

  billingAttestEmail() {
    const headers = new ManageSheet(Constants.manageSheetName).headers
    const subject = cobrancaDeAtesteSubject(this._row[headers.NEmpenho])
    const emailAdress = this._row[headers.EmailRequisitante]
    const template = HtmlService.createTemplateFromFile('CobrancaDeAteste')
    template.DataRecebimento = this._richRow[headers.DataRecebimento]
    template.Fornecedor = this._row[headers.Fornecedor]
    template.CNPJ = this._row[headers.CNPJ]
    template.NuvemIFSP = this._richRow[headers.NuvemIFSP].getLinkUrl()
    const htmlBody = template.evaluate().getContent()
    this._processEmail(emailAdress, subject, htmlBody)
  }

}

