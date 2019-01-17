<template>
    <div>
        <button type="button" class="btn btn-primary">Select file</button>
        <button type="button" class="btn btn-secondary"> Upload file</button>
    </div>
</template>

<script>

  export default {
    name: 'ExpenseReportUpload',
    props: {
      item: String
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
