<template>
    <div>
        <h2 class="row">
            <div class="col-sm-1"><i class="fas fa-chevron-left mr-5" v-on:click="$emit('click-left')"></i></div>
            <div class="col-sm-10 expense-item-property">
                <div class="width-60">{{ item[ExpenseItem.EXPENSE_NAME] }},</div>
                <div class="width-20">{{ item[ExpenseItem.PURCHASE_DATE] }},</div>
                <div class="width-20">{{ item[ExpenseItem.PURCHASE_AMOUNT]}} EUR</div>
            </div>
            <div class="col-sm-1"><i class="fas fa-chevron-right ml-5" v-on:click="$emit('click-right')"></i></div>
        </h2>
    </div>
</template>

<script>
  import ExpenseItem from '../enums/ExpenseItem.js';

  export default {
    name: 'ExpenseItem',
    props: {
      item: Object
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
    i {
        cursor: pointer;
    }

    .expense-item-property div {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        float: left;
    }

    .width-60 {
        width: 60%
    }

    .width-20 {
        width: 20%
    }

</style>
