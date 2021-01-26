<template>
    <div>
        <div class="form-group">
            <label for="organizationName">Наименование организации</label>
            <input type="text" class="form-control" id="organizationName" v-model="organizationName">
        </div>
        <div class="form-group">
            <label for="institutionName">Должность</label>
            <input type="text" class="form-control" id="postName" v-model="postName">
        </div>
        <div class="form-group">
            <label for="institutionName">Начало работы</label>
            <div class="row">
                <div class="col">
                    <select id="startJobMonth" v-model="startJobMonthValue" class="form-select custom-select">
                        <option v-for="(month, index) in monthsList" :key="month" :value="index">{{ month }}</option>
                    </select>
                </div>
                <div class="col">
                    <select id="startJobYear" v-model="startJobYearValue" class="form-select custom-select">
                        <option v-for="year in yearsList" :key="year" :value="year">{{ year }}</option>
                    </select>
                </div>
            </div>
            <label for="institutionName">Окончание работы</label>
            <div class="row">
                <div class="col">
                    <select id="endJobMonth" v-model="endJobMonthValue" class="form-select custom-select">
                        <option v-for="(month, index) in monthsList" :key="month" :value="index">{{ month }}</option>
                    </select>
                </div>
                <div class="col">
                    <select id="endJobYear" v-model="endJobYearValue" class="form-select custom-select">
                        <option v-for="year in yearsList" :key="year" :value="year">{{ year }}</option>
                    </select>
                </div>
            </div>
        </div>
        <div>
            <button class="btn btn-sm btn-outline-primary" @click="$emit('cancel-add')">Отмена</button>
            <button class="btn btn-sm btn-primary" @click="$emit('add-new', jobData)">Добавить</button>
        </div>
    </div>
</template>
<script>
const moment = require('moment');
moment.locale('ru'); 
let currentDate = new Date();

export default {
    name: 'PreviuosJobs',
    data: function() {
        return {
            monthsList: moment.months(),
            yearsList: new Array(51).fill(1).map( (_, i) => String((new Date().getFullYear() - 50) + i) ).reverse(),
            organizationName: null,
            postName: null,
            startJobMonthValue: currentDate.getMonth(),
            startJobYearValue: currentDate.getFullYear() - 1,
            endJobMonthValue: currentDate.getMonth(),
            endJobYearValue: currentDate.getFullYear()
        }
    },
    computed: {
        jobData: function() {
            return {
                startDate: new Date(this.startJobYearValue, this.startJobMonthValue),
                endDate: new Date(this.endJobYearValue, this.startJobMonthValue),
                organizationName: this.organizationName,
                postName: this.postName
            }
        }
    }
}
</script>