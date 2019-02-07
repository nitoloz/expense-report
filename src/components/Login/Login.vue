<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-4 offset-sm-4 text-left">
                <div class="card mt-5">
                    <div class="card-body">
                        <h3 class="text-center">Sign In</h3>
                        <form>
                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="Email address">
                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control" id="formGroupExampleInput2"
                                       placeholder="Password">
                            </div>
                            <button type="button" class="btn btn-primary btn-block">Sign in</button>
                        </form>
                        <hr/>
                        <button type="button" class="btn btn-danger btn-block">Sign in with Google</button>
                        <button type="button" class="btn btn-dark btn-block">Sign in with Github</button>
                    </div>
                </div>
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
