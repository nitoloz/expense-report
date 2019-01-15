<template>
    <div class="row">
        <div v-for="type in types" :key="type.name" class="col-sm-3">
            <div class="card mt-1">
                <div class="card-body" v-on:click="click(type.name)">
                    {{ type.name }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'ExpenseTypesList',
    props: {},
    methods: {
        click: (type) => {
          alert(`Selected  ${type} type!`);
        }
    },
    data() {
      return {
        types: [
          {
            name: 'Lebensmittel'
          },
          {
            name: 'Restaurants'
          },
          {
            name: 'Transport'
          },
          {
            name: 'Reisen'
          },
          {
            name: 'Haus'
          },
          {
            name: 'Unterhaltung'
          },
          {
            name: 'Shopping'
          },
          {
            name: 'Lehre'
          },
          {
            name: 'Medizin'
          },
          {
            name: 'Haushaltswaren'
          },
          {
            name: 'Sonstig'
          }
        ]
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    /*h3 {*/
    /*margin: 40px 0 0;*/
    /*}*/
    /*ul {*/
    /*list-style-type: none;*/
    /*padding: 0;*/
    /*}*/
    /*li {*/
    /*display: inline-block;*/
    /*margin: 0 10px;*/
    /*}*/
    /*a {*/
    /*color: #42b983;*/
    /*}*/
</style>
