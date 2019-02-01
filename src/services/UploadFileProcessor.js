import ExpenseTypes from '../enums/ExpenseTypes';
import ExpenseItem from "../enums/ExpenseItem";

const months = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];

const autoSelectedTypes = [
  {
    type: ExpenseTypes.LEBENSMITTEL,
    expenses: ['rewe', 'aldi sued', 'tegut', 'lidl', 'too good to go', 'alnatura']
  },
  {
    type: ExpenseTypes.SHOPPING,
    expenses: ['amazon', 'computerunive', 'conrad', 'karstadt', 'aliexpress', 'yves rocher', 'mango', 'h&m', 'amzn', 'saturn']
  },
  {
    type: ExpenseTypes.REISEN,
    expenses: ['heinemann', 'flixbus', 'tuifly', 'condor', 'rent-a-car', 'hotel', 'auto europe', 'esso']
  },
  {
    type: ExpenseTypes.RESTAURANTS,
    expenses: ['nordsee', 'starbucks', 'kamonsushibar', 'cafe bar celona', 'restaurant', 'hooters', 'sushi',
      'moti mahal', 'lieferheld', 'mcdonalds']
  },
  {
    type: ExpenseTypes.MEDIZIN,
    expenses: ['apotheke',]
  },
  {
    type: ExpenseTypes.TRANSPORT,
    expenses: ['rmv.de']
  },
  {
    type: ExpenseTypes.HAUSHALTSWAREN,
    expenses: ['mueller', 'dm-drogerie', 'das depot']
  },
  {
    type: ExpenseTypes.UNTERHALTUNG,
    expenses: ['steamgames', 'itunes']
  }
];

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

  autoClassifyExpenses(expenses) {
    expenses.filter(expense => !expense[ExpenseItem.EXPENSE_TYPE]).forEach(expense => {
      const autoSelectedType = autoSelectedTypes.find(type =>
          type.expenses.some(classifiedExpense =>
              expense[ExpenseItem.EXPENSE_NAME].toLowerCase().indexOf(classifiedExpense) !== -1));
      if (autoSelectedType) {
        expense[ExpenseItem.EXPENSE_TYPE] = autoSelectedType.type
      }
    });
    return expenses;
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