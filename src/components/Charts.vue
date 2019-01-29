<template>
    <div>
        <PieChart :data="expenses"/>
    </div>
</template>

<script>

  import {db} from '../main'
  import PieChart from './PieChart';

  export default {
    name: 'Charts',
    components: {PieChart},
    methods: {},
    data() {
      return {
        expenses: []
      }
    },
    firestore() {
      return {
        // expenses: db.collection('expenses').doc('2018-12-10').collection('data')
        expenses: db.collection('expenses').doc('2018-08-08').collection('data')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
