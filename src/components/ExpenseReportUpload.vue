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
  import {db} from '../main'
  import UploadFileProcessor from '../services/UploadFileProcessor';

  const uploadFileProcessor = new UploadFileProcessor();

  export default {
    name: 'ExpenseReportUpload',
    methods: {
      selectFileClick: function () {
        this.$refs.fileInput.click();
      },
      fileChanged: function () {
        let reader = new FileReader();
        let fileName = uploadFileProcessor.processFileName(this.$refs.fileInput.files[0].name);
        reader.onload = function () {
          db.collection('expenses').doc(fileName).delete();
          db.collection('expenses').doc(fileName).set({uploaded: new Date()});

          let spendings = uploadFileProcessor.processUploadedFile(reader.result)
              .concat(uploadFileProcessor.extendReportWithMonthlyExpenses(fileName));
          spendings.forEach((expense, index) => db.collection('expenses').doc(fileName).collection('data').doc(index.toString()).set(expense));
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
