<template>
    <div>
        <button type="button" class="btn btn-primary" v-on:click="selectFileClick()">Select file</button>
        <input type="file"
               ref="fileInput"
               v-on:change="fileChanged"
               accept=".csv"/>
    </div>
</template>

<script>

    export default {
        name: 'ExpenseReportUpload',
        props: {
            item: String
        },
        methods: {
            selectFileClick: function () {
                this.$refs.fileInput.click();
            },
            fileChanged: function () {
                let reader = new FileReader();
                let fileName = this.$refs.fileInput.files[0].name.substring(23, 33);
                reader.onload = function () {
                    let allTransactions = [];
                    let data = reader.result.split(/\r\n|\n/).map(line => line.split(';'));
                    const amountColumnLabel = data[0][data[0].length - 1];
                    for (let i = 1; i < data.length; i++) {
                        let expense = {};
                        data[i].forEach((item, index) => expense[data[0][index].trim()] = item.trim());
                        expense[amountColumnLabel] = expense[amountColumnLabel] ? parseInt(expense[amountColumnLabel]) : 0;
                        allTransactions.push(expense);
                    }
                    let spendings = allTransactions.filter(transaction => transaction[amountColumnLabel] < 0);
                    let storedSpendings = localStorage.getItem('spendings') ? JSON.parse(localStorage.getItem('spendings')) : {};
                    storedSpendings[fileName] = spendings;
                    localStorage.setItem('spendings', JSON.stringify(storedSpendings));
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
