<template>
    <div>
        <button type="button" class="btn btn-primary float-right" v-on:click="selectFileClick()">Upload file</button>
        <input type="file"
               ref="fileInput"
               v-on:change="fileChanged"
               accept=".csv"/>
    </div>
</template>

<script>
    import {db} from '../../main'
    import UploadFileProcessor from '../../services/UploadFileProcessor';
    import ExpenseItem from '../../enums/ExpenseItem';

    const uploadFileProcessor = new UploadFileProcessor();

    export default {
        name: 'ExpenseReportUpload',
        methods: {
            selectFileClick: function () {
                this.$refs.fileInput.click();
            },
            fileChanged: function () {
                let reader = new FileReader();
                let parsedFileName = uploadFileProcessor.processFileName(this.$refs.fileInput.files[0].name);
                let monthYearDate = parsedFileName.monthYearDate;
                reader.onload = function () {
                    db.collection('expenses').doc(monthYearDate).delete();
                    db.collection('expenses').doc(monthYearDate).set({
                        uploaded: new Date(),
                        invoiceIssueDate: parsedFileName.exactDate
                    });
                    const expenses = uploadFileProcessor.processUploadedFile(reader.result);
                    let autoClassifiedExpenses = uploadFileProcessor.autoClassifyExpenses(expenses)
                        .sort((a, b) => !a[ExpenseItem.EXPENSE_TYPE] ? -1
                            : !b[ExpenseItem.EXPENSE_TYPE] ? 1
                                : a[ExpenseItem.EXPENSE_TYPE].localeCompare(b[ExpenseItem.EXPENSE_TYPE  ]));

                    db.collection("presetExpenses").get().then(function (presetExpenses) {
                        presetExpenses.forEach(function (presetExpense) {
                            autoClassifiedExpenses.push(presetExpense.data())
                        });
                        autoClassifiedExpenses.forEach((expense, index) => db.collection('expenses')
                            .doc(monthYearDate).collection('data').doc(index.toString()).set(expense))
                    });
                };
                reader.readAsText(this.$refs.fileInput.files[0]);
            }
        },
        data() {
            return {
                file: null
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    input {
        display: none;
    }
</style>
