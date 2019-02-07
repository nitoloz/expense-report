<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                Login
            </div>
        </div>
    </div>
</template>

<script>

  import {db} from '../../main'
  import ExpenseItem from '../../enums/ExpenseItem';


  export default {
    name: 'Login',
    props: {},
    components: {},
    methods: {
      signIn: function () {
        console.log('Signed in');
      }
    },
    data() {
      return {
        email: '',
        password: ''
      }
    },
    mounted() {
      // if (this.selectedMonth) {
      //     this.monthSelected();
      // }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
