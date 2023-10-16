function getDateTodayDif(date = "02/02/2023") {
  let formatDate = typeof date !== 'string' ? date.toLocaleDateString('pt-BR') : date
  const today = new Date()
  today.setHours(0,0,0,0)
  const divideString = formatDate.split("/")
  const formatedDate = new Date(`${divideString[1]}/${divideString[0]}/${divideString[2]}`)
  const timeDifference = formatedDate.getTime() - today.getTime()
  const days = timeDifference / (1000 * 3600 * 24)
  console.log(days)
  return days
}

function convertDateToLocaleDatestring(date) {
  return typeof date !== 'string' ? date.toLocaleDateString('pt-BR') : date
}

function convertValueToCurrency(value) {
  const formatedValue = typeof value !== 'string' ? value : value.replace(',', '.')
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(formatedValue)
}