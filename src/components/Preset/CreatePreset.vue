<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                Create new
            </div>
        </div>
    </div>
</template>

<script>

  import {db} from '../../main'
  import ExpenseItem from '../../enums/ExpenseItem';

  export default {
    name: 'CreatePreset',
    props: {},
    components: {},
    methods: {
      addExpense: function (expense) {
        db.collection('presetExpenses').doc(id).delete();
      }
    },
    data() {
      return {
        ExpenseItem: ExpenseItem
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
