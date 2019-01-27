<template>
    <div>
        <h3> Charts</h3>
    </div>
</template>

<script>
    import * as d3 from 'd3';

    export default {
        name: 'Charts',
        components: {

        },
        methods: {

        },
        data() {
            return {
                expenses: [],
            }
        },
        created: function () {
            this.months = Object.keys(JSON.parse(localStorage.getItem('spendings')))
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
