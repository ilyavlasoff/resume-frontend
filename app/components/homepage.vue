<template>
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-11">
                <div class="mt-5">
                    <h1 class="display-4 text-center">Резюме</h1>
                    <div class="row justify-content-center mt-5">
                        <HomepageColumn 
                            v-for="(item, key) in columnNames" 
                            :key="item"
                            :columnTitle="item"
                            :columnFilter="key"
                        ></HomepageColumn>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import draggable from 'vuedraggable';
    import HomepageColumn from './homepage_column';

    export default {
        name: 'Homepage',
        components: {
            draggable,
            HomepageColumn
        }, 
        data: function() {
            return {
                timer: null
            }
        },
        methods: {
            updateData: function() {
                this.$store.dispatch('LOAD_LIST');
            }
        },
        mounted: function() {
            this.updateData();
            this.timer = setInterval(this.updateData, 60000);
        }, 
        beforeDestroy: function() {
            clearInterval(this.timer);
            this.$store.commit('CLEAR_CARD_LIST');
        },
        computed: {
            columnNames: function() {
                return this.$store.getters.STATUS_LIST;
            }
        }
    }
</script>
<style>
</style>