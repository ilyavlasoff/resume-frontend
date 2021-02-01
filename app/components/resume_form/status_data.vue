<template>
    <div class="form-group">
        <label for="statusSelect">Статус резюме</label>
        <select class="custom-select" id="statusSelect" v-model="selectedStatus">
            <option v-for="(value, key) in statusList" :key="key" :value="key">{{value}}</option>
        </select>
    </div>
</template>
<script>
    export default {
        name: 'Status',
        computed: {
            selectedStatus: {
                set: function(value) {
                    this.$store.commit({
                        type: 'SET_RESUME_STATUS', 
                        value
                    });
                },
                get: function() {
                    const currentStatus = this.$store.getters.RESUME.status;
                    if (! currentStatus) {
                        const defaultStatus = Object.keys(this.statusList)[0];
                        this.selectedStatus = defaultStatus;
                        return defaultStatus;
                    }
                    return currentStatus;
                }
            },
            statusList: function() {
                return this.$store.getters.STATUS_LIST
            }
        }
    }
</script>