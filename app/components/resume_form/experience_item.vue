<template>
    <div class="item-container">
        <div class="row">
            <div class="col-2">
                <i class="fas fa-user-graduate fa-2x" v-if="experienceType === 'education'"></i>
                <i class="fas fa-suitcase fa-2x" v-if="experienceType === 'job'"></i>
            </div>
            <div class="col-8">
                <p>{{ activityName }}</p>
                <small>{{ organizationName }}</small>
                <small>{{ timeInterval }}</small>
            </div>
            <div class="col-2">
                <i class="far fa-times-circle" @click="$emit('delete-item', itemKey)"></i>
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