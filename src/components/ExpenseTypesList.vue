<template>
    <div class="row">
        <div v-for="type in types" :key="type.name" class="col-sm-3">
            <div class="card mt-2" v-bind:class="{ selected: type.name===selectedType }">
                <div class="card-body" v-on:click="$emit('select-type', type.name)">
                    <h5 class="card-title"> {{ type.name }}</h5>
                    <i class="fas fa-6x" v-bind:class="type.icon"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import ExpenseTypes from '../enums/ExpenseTypes';

  export default {
    name: 'ExpenseTypesList',
    props: {
      selectedType: String
    },
    data() {
      return {
        types: [
          {
            name: ExpenseTypes.LEBENSMITTEL,
            icon: 'fa-apple-alt'
          },
          {
            name: ExpenseTypes.RESTAURANTS,
            icon: 'fa-utensils'
          },
          {
            name: ExpenseTypes.TRANSPORT,
            icon: 'fa-bus-alt'
          },
          {
            name: ExpenseTypes.REISEN,
            icon: 'fa-plane'
          },
          {
            name: ExpenseTypes.HAUS,
            icon: 'fa-home'
          },
          {
            name: ExpenseTypes.UNTERHALTUNG,
            icon: 'fa-beer'
          },
          {
            name: ExpenseTypes.SHOPPING,
            icon: 'fa-shopping-cart'
          },
          {
            name: ExpenseTypes.LEHRE,
            icon: 'fa-user-graduate'
          },
          {
            name: ExpenseTypes.MEDIZIN,
            icon: 'fa-briefcase-medical'
          },
          {
            name: ExpenseTypes.HAUSHALTSWAREN,
            icon: 'fa-hammer'
          },
          {
            name: ExpenseTypes.SONSTIG,
            icon: 'fa-bullseye'
          }
        ]
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .card {
        cursor: pointer;
    }

    .card:hover {
        background: lightgrey;
    }

    .card.selected {
        background: lightgrey;

    }
</style>
