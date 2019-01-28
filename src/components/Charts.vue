<template>
    <div>
        <h3> Charts</h3>
        <article v-for="expense in expenses">
            <h1> {{expense.id}}:{{ expense }}</h1>
        </article>
    </div>
</template>

<script>

  import {db} from '../main'

  // import * as d3 from 'd3';

  export default {
    name: 'Charts',
    components: {},
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
