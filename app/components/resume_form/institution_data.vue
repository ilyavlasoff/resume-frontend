<template>
    <div>
        <div class="form-group">
            <label for="institutionName">Учебное заведение</label>
            <input type="text" list="institutionListOptions" class="form-control" id="institutionName" v-model="institutionQuery">
            <datalist id="institutionListOptions">
                <option v-for="institutionOption in institutionList" :key="institutionOption.id" :value="institutionOption.title"></option>
            </datalist>
        </div>
        <div class="form-group">
            <label for="facultyName">Факультет</label>
            <input type="text" class="form-control" id="facultyName" list="facultyListOptions" v-model="facultyQuery">
            <datalist id="facultyListOptions">
                <option v-for="facultyOption in facultyList" :key="facultyOption.id" :value="facultyOption.title"></option>
            </datalist>
        </div>
        <div class="form-group">
            <label for="facultyName">Специализация</label>
            <input type="text" class="form-control" id="specialityName" v-model="specialityName">
        </div>
        <template v-if="allowGraduation">
            <label for="graduateYear">Год окончания</label>
            <select class="form-select" id="graduateYear" v-model="graduationYear">
                <option v-for="year in years" :key="year">{{year}}</option>
            </select>
        </template>
        <div>
            <button class="btn btn-sm btn-outline-primary" @click="$emit('cancel-add')">Отмена</button>
            <button class="btn btn-sm btn-primary" @click="$emit('add-new', institution)">Добавить</button>
        </div>
    </div>
</template>
<script>
import _ from 'lodash';
import { VkApiInstance } from '../../api/vk_api';

export default {
    name: 'InstitutionData', 
    props: [
        'allowGraduation'
    ],
    data: function() {
        return {
            years: new Array(101).fill(1).map( (_, i) => String((new Date().getFullYear() - 100) + i) ).reverse(),
            institutionList: [],
            institutionQuery: null,
            facultyList: [],
            facultyQuery: null,
            specialityName: null,
            graduationYear: (new Date()).getFullYear(),
        }
    }, 
    computed: {
        institution: function() {
            return {
                institution: this.institutionQuery,
                faculty: this.facultyQuery,
                speciality: this.specialityName,
                graduated: this.graduationYear
            }
        }
    },
    watch: {
        institutionQuery: function() {
            this.debouncedInstitutionList();
        },
        facultyQuery: function() {
            this.debouncedFacultyList();
        }
    },
    created: function(){
        this.debouncedInstitutionList = _.debounce(this.getInstitutuonList, 800);
        this.debouncedFacultyList = _.debounce(this.getFacultyList, 800);
    },
    methods: {
        getInstitutuonList: function() {
            VkApiInstance.getInstitutions({
                q: this.institutionQuery,
                count: 5,
            }, (json) => {
                if (! json.response) {
                    return;
                }
                this.institutionList = json.response.items;
            }, (err) => {
                console.log('Error: ' + err);
            });
        },
        getFacultyList: function() {
            let universityId = this.institutionList.find(el => el.title === this.institutionQuery);
            if (! universityId) {
                return;
            }
            //console.log(universityId.id);
            VkApiInstance.getFaculties({
                q: this.facultyQuery,
                count: 5,
                'university_id': universityId.id,
            }, (json) => {
                if (! json.response) {
                    return;
                }
                this.facultyList = json.response.items;
            }, (err) => {
                console.log('Error: ' + err);
            });
        }
    }
}
</script>