<template>
    <div class="col px-3 column-container">
        <div class="row mx-2 column-title">
            <h3 class="justify-content-center">{{columnTitle}} ({{ currentList.length }})</h3>
        </div>
        <div class="list-group overflow-auto column">
            <draggable :list="currentList" group="gr">
                <a v-for="item in currentList" :key="item.id" class="list-group-item list-group-item-action flex-column align-items-start" 
                    @click="openEditPage(item.id)">
                    <div class="d-flex w-100 justify-content-between">
                        <img :src="item.photo" class="rounded-circle ph">
                        <div class="col">
                            <h5>{{`${item.firstName} ${item.lastName} ${item.patronymic}`}}</h5>
                            <p>Возраст: {{parseInt((Date.now() - new Date(item.birthday)) / (1000*60*60*24*365))}}</p>
                            <p>Должность: {{item.desiredPost}}</p>
                        </div>
                    </div>
                </a>
            </draggable>
        </div>                            
    </div>
</template>
<script>
    import draggable from 'vuedraggable';
    import { ResumeApiInstance } from '../api/resume_api';

    export default {
        name: 'HomepageColumn',
        props: ['columnFilter', 'columnTitle'],
        components: {
            draggable
        },
        data: function() {
            return {
                currentList: []
            }
        },
        watch: {
            fullList: function() {
                this.currentList = this.$store.getters.RESUME_CARD_FILTER(this.columnFilter);
            },
            currentList: function() {
                this.currentList.filter(el => el.status !== this.columnFilter).forEach(el => {
                    ResumeApiInstance.updateStatus(el.id, {
                        status: this.columnFilter
                    }, (response) => {
                        const data = JSON.parse(response.data);
                        if (data.status === 'success') {
                            console.log('Status changed');
                        } else {
                            console.log('Error');
                        }
                    }, (error) => {
                         console.log(error);
                    })
                });
            }
        },
        computed: {
            fullList: function() {
                return this.$store.getters.RESUME_CARD;
            },
            data: {
                get: function() {
                    this.$store.getters.RESUME_CARD_FILTER(this.columnFilter);
                },
                set: function(item) {
                    this.$store.dispatch('UPDATE_STATUS', {
                        id: item.id,
                        status: ''
                    });
                }
            }
        },
        methods: {
            openEditPage: function(id) {
                this.$router.push({name: 'edit', params: {id: id}})
            }
        }
    }
</script>
<style scoped>
    .column-container {
        border-right: 1px solid #f7f7f9;
        height: 700px;
    }
    .column {
        max-height: 800px;
    }
    .ph {
        width: 75px; 
        height: 75px;
    }
    .column-title {
        height: 80px;
    }
</style>