<template>
    <div class="row">
        <div v-for="type in types" :key="type.name" class="col-sm-3">
            <div class="card mt-2" v-bind:class="{ selected: type.name===selectedType }">
                <div class="card-body" v-on:click="$emit('select-type', type.name)">
                    <h5 class="card-title"> {{ type.name }}</h5>
                    <i class="fas fa-8x" v-bind:class="type.icon"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ExpenseTypesList',
        props: {
            selectedType: String
        },
        data() {
            return {
                types: [
                    {
                        name: 'Lebensmittel',
                        icon: 'fa-apple-alt'
                    },
                    {
                        name: 'Restaurants',
                        icon: 'fa-utensils'
                    },
                    {
                        name: 'Transport',
                        icon: 'fa-bus-alt'
                    },
                    {
                        name: 'Reisen',
                        icon: 'fa-plane'
                    },
                    {
                        name: 'Haus',
                        icon: 'fa-home'
                    },
                    {
                        name: 'Unterhaltung',
                        icon: 'fa-beer'
                    },
                    {
                        name: 'Shopping',
                        icon: 'fa-shopping-cart'
                    },
                    {
                        name: 'Lehre',
                        icon: 'fa-user-graduate'
                    },
                    {
                        name: 'Medizin',
                        icon: 'fa-briefcase-medical'
                    },
                    {
                        name: 'Haushaltswaren',
                        icon: 'fa-hammer'
                    },
                    {
                        name: 'Sonstig',
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
