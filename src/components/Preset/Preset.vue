<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <CreatePreset/>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <PresetList :presetExpenses="presetExpenses"/>
            </div>
        </div>
    </div>
</template>

<script>

  import {db} from '../../main'
  import ExpenseItem from '../../enums/ExpenseItem';
  import PresetList from './PresetList';
  import CreatePreset from './CreatePreset';

  export default {
    name: 'Preset',
    props: {selectedMonth: String},
    components: {PresetList, CreatePreset},
    data() {
      return {
        presetExpenses: [],
        ExpenseItem: ExpenseItem
      }
    },
    firestore() {
      return {
        presetExpenses: db.collection('presetExpenses').orderBy(ExpenseItem.PURCHASE_AMOUNT, "asc")
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
