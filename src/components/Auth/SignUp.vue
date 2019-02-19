<template>
    <div class="container">
        <div class="row">
            <div class="col-md-4 offset-md-4 col-sm-8 offset-sm-2 text-left">
                <div class="card mt-5">
                    <div class="card-body">
                        <h3 class="text-center">Sign Up</h3>
                        <form>
                            <div class="form-group">
                                <input type="email" class="form-control" placeholder="Email address" v-model="email">
                            </div>
                            <div class="form-group">
                                <input type="password" class="form-control"
                                       v-model="password" placeholder="Password">
                            </div>
                            <div class="form-group">
                                <input type="password" class="form-control"
                                       v-model="repeatedPassword" placeholder="Repeat password">
                            </div>
                            <button type="button" class="btn btn-primary btn-block" @click="signUp">Sign up</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

  import firebase from 'firebase/app';
  import 'firebase/auth';

  export default {
    name: 'Login',
    props: {},
    components: {},
    methods: {
      signUp: function () {
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(() => this.$router.push('/expenses'));
      }
    },
    data() {
      return {
        email: '',
        password: '',
        repeatedPassword: ''
      }
    },
    mounted() {
      let that = this;
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          that.$router.push('/expenses');
        }
      });
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
