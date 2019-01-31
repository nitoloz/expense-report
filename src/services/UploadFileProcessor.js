import ExpenseTypes from '../enums/ExpenseTypes';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default class UploadFileProcessor {

  processUploadedFile(result) {
    let allTransactions = [];
    let data = result.split(/\r\n|\n/).map(line => line.split(';'));
    const amountColumnLabel = data[0][data[0].length - 1];
    for (let i = 1; i < data.length; i++) {
      let expense = {};
      data[i].forEach((item, index) => expense[data[0][index].trim()] = item.trim());
      expense[amountColumnLabel] = expense[amountColumnLabel] ? parseInt(expense[amountColumnLabel]) : 0;
      allTransactions.push(expense);
    }
    return allTransactions.filter(transaction => transaction[amountColumnLabel] < 0);
  }

  processFileName(fileName) {
    const splitFileName = fileName.substring(23, 33).split('-');
    return `${months[parseInt(splitFileName[1]) - 1]} ${splitFileName[0]}`;
  }

  extendReportWithMonthlyExpenses(expenseMonth) {
    return [
      {
        'Betrag in EUR': -720,
        'Konto-/Kartennummer': "434499xxxxxx7017",
        ExpenseType: ExpenseTypes.HAUS,
        Kaufdatum: expenseMonth,
        'Umsatz/Ort': "Flat payment"
      },
      {
        'Betrag in EUR': -69,
        'Konto-/Kartennummer': "434499xxxxxx7017",
        ExpenseType: ExpenseTypes.HAUS,
        Kaufdatum: expenseMonth,
        'Umsatz/Ort': "Gas payment"
      },
      {
        'Betrag in EUR': -58,
        'Konto-/Kartennummer': "434499xxxxxx7017",
        ExpenseType: ExpenseTypes.HAUS,
        Kaufdatum: expenseMonth,
        'Umsatz/Ort': "Electricity payment"
      },
      {
        'Betrag in EUR': -26,
        'Konto-/Kartennummer': "434499xxxxxx7017",
        ExpenseType: ExpenseTypes.HAUS,
        Kaufdatum: expenseMonth,
        'Umsatz/Ort': "Klarmobil mobile"
      },
      {
        'Betrag in EUR': -13,
        'Konto-/Kartennummer': "434499xxxxxx7017",
        ExpenseType: ExpenseTypes.HAUS,
        Kaufdatum: expenseMonth,
        'Umsatz/Ort': "PremiumSIM mobile"
      },
      {
        'Betrag in EUR': -35,
        'Konto-/Kartennummer': "434499xxxxxx7017",
        ExpenseType: ExpenseTypes.HAUS,
        Kaufdatum: expenseMonth,
        'Umsatz/Ort': "Fitness 7/11"
      },
      {
        'Betrag in EUR': -20,
        'Konto-/Kartennummer': "434499xxxxxx7017",
        ExpenseType: ExpenseTypes.HAUS,
        Kaufdatum: expenseMonth,
        'Umsatz/Ort': "Internet Unitymedia"
      }
    ]
  }
}