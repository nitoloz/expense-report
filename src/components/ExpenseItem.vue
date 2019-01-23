<template>
    <div>
        <h2 class="row">
            <div class="col-sm-1"><i class="fas fa-chevron-left mr-5" v-on:click="$emit('click-left')"></i></div>
            <div class="col-sm-10">
                {{ item['Umsatz/Ort'] }},
                {{ item['Kaufdatum'] }},
                {{ item['Betrag in EUR']}} EUR
            </div>
            <div class="col-sm-1"><i class="fas fa-chevron-right ml-5" v-on:click="$emit('click-right')"></i></div>
        </h2>
    </div>
</template>

<script>
    export default {
        name: 'ExpenseItem',
        props: {
            item: Object
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    i {
        cursor: pointer;
    }
</style>
