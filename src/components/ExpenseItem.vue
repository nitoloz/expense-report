<template>
    <div class="hello">
        <h1><i class="fas fa-chevron-left mr-5" v-on:click="$emit('click-left')"></i>{{ item }} <i
                class="fas fa-chevron-right ml-5" v-on:click="$emit('click-right')"></i></h1>
    </div>
</template>

<script>
    export default {
        name: 'ExpenseItem',
        props: {
            item: String
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    i {
        cursor: pointer;
    }
</style>
