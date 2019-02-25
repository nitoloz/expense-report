<template>
    <div>
        <button type="button" class="btn btn-secondary float-right ml-2" v-on:click="classify()">Classify</button>
    </div>
</template>

<script>
  import {db} from '../../main'
  import UploadFileProcessor from '../../services/UploadFileProcessor';

  const uploadFileProcessor = new UploadFileProcessor();

  export default {
    name: 'MonthlyExpenseReportProcessor',
    props: {selectedMonth: String},
    methods: {
      classify: function () {

      }
    },
    data() {
      return {}
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
