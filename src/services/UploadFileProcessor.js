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
}