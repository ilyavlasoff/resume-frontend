<template>
    <div class="exp-item p-2 mt-2">
        <div class="row mx-0">
            <div class="col-2">
                <i class="fas fa-user-graduate fa-2x action-symbol" v-if="experienceType === 'education'"></i>
                <i class="fas fa-suitcase fa-2x action-symbol" v-if="experienceType === 'job'"></i>
            </div>
            <div class="col-8">
                <p>{{ activityName }}</p>
                <small>{{ organizationName }}</small>
                <small>{{ timeInterval }}</small>
            </div>
            <div class="col-2 px-0">
                <i class="far fa-times-circle del-button" @click="$emit('delete-item', itemKey)"></i>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'ExperienceItem', 
        props: {
            'itemKey': Symbol,
            'experienceType': String,
            'organizationName': String,
            'activityName': String,
            'timeInterval': String
        }
    }
</script>
<style>
    .exp-item {
        background-color: #f7f7f9;
    }
    .del-button {
        float: right;
    }
    .action-symbol {
        float: left;
    }
</style>