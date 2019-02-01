<template>
    <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light">
        <router-link class="navbar-brand" to="/classify">Classify</router-link>
        <div class="collapse navbar-collapse" id="navbarText">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <router-link class="nav-link" to="/classify">Expenses</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/charts">Charts</router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
  export default {
    name: 'Navbar'
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
