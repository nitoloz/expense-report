<template>
    <div class="container">
        <div class="row">
            <div class="col-md-4 offset-md-4 col-sm-8 offset-sm-2 text-left">
                <div class="card mt-5">
                    <div class="card-body">
                        <h3 class="text-center">Sign In</h3>
                        <form>
                            <div class="form-group">
                                <input type="email" class="form-control" placeholder="Email address" v-model="email">
                            </div>
                            <div class="form-group">
                                <input type="password" class="form-control" id="formGroupExampleInput2"
                                       v-model="password" placeholder="Password">
                            </div>
                            <button type="button" class="btn btn-primary btn-block" @click="signIn">Sign in</button>
                        </form>
                        <hr/>
                        <button type="button" class="btn btn-danger btn-block" @click="googleSignIn">Sign in with
                            Google
                        </button>
                        <button type="button" class="btn btn-dark btn-block" @click="githubSignIn">Sign in with Github
                        </button>
                        <hr/>
                        <div class="text-center">
                            Don't have an account yet?
                            <button type="button" class="btn btn-link no-vertical-align" @click="signUp">Sign Up
                            </button>
                        </div>
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
      signIn: function () {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(() => this.$router.push('/expenses'));
      },
      googleSignIn: function () {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(() => this.$router.push('/expenses'));
      },
      githubSignIn: function () {
        const provider = new firebase.auth.GithubAuthProvider();
        firebase.auth().signInWithPopup(provider).then(() => this.$router.push('/expenses'));
      },
      signUp: function () {
        // this.$router.push('/signup')
      }
    },
    data() {
      return {
        email: '',
        password: ''
      }
    },
    mounted() {
      let that = this;
      firebase.auth().onAuthStateChanged(function (user) {
        that.$router.push('/expenses');
      });
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .no-vertical-align {
        vertical-align: initial;
    }
</style>
