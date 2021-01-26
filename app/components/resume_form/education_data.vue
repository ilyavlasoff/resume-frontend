<template>
    <div>
        <h3>Образование</h3>
        <select class="form-select custom-select" v-model="educationLevel">
            <option v-for="(educationLevel, key) in educationLevels" 
                :key="key"
                :value="key"
            >
                {{ educationLevel.name }}
            </option>
        </select>

        <div v-if="requireAdditionalFields.requireAdditional">
            <div>
                <experience-item
                    v-for="(institution, key) in educations" :key="key"
                    :itemKey="institution.id"
                    :experienceType="'education'"
                    :organizationName="`${institution.institution} ${institution.faculty}`"
                    :activityName="institution.speciality"
                    :timeInterval="institution.graduated ? institution.graduated: `-`"
                    @delete-item="deleteEducation"
                ></experience-item>
            </div>
            <button class="btn btn-primary" type="button" 
                @click="addInstitutionFormVisible = true;"
                v-if="!addInstitutionFormVisible"
            >
                Добавить место обучения
            </button>
            <InstitutionData v-if="addInstitutionFormVisible" 
                :allowGraduation="requireAdditionalFields.allowGraduationYear"
                @cancel-add="cancelAdd"
                @add-new="addNew"
            ></InstitutionData>
        </div>
    </div>
</template>
<script>
    import InstitutionData from './institution_data';
    import ExperienceItem from './experience_item';

    export default {
        name: 'EducationData',
        components: {
            InstitutionData,
            ExperienceItem
        },
        data: function() {
            return {
                addInstitutionFormVisible: false,
                educationLevels: {
                    'notStated': {name: 'Не указано', requireAdditionalFields: false}, 
                    'mid': {name: 'Среднее', requireAdditionalFields: false}, 
                    'midSpecial': {name: 'Среднее специальное', requireAdditionalFields: true, allowGraduationYear: true}, 
                    'incompletedHigher': {name: 'Неоконченное высшее', requireAdditionalFields: true, allowGraduationYear: false}, 
                    'higher': {name: 'Высшее', requireAdditionalFields: true, allowGraduationYear: true}, 
                },
                requireAdditionalFields: false
            }
        },
        watch: {
            educationLevel: function() {
                this.requireAdditionalFields = {
                    'requireAdditional': this.educationLevels[this.educationLevel].requireAdditionalFields, 
                    'allowGraduationYear': this.educationLevels[this.educationLevel].allowGraduationYear
                };
            }
        },
        computed: {
            educationLevel: {
                get: function() {
                    let level = this.$store.getters.RESUME.educationLevel;

                    console.log('Get level ' + level);

                    if (! level) {
                        return 'notStated';
                    }

                    return level;
                }, 
                set: function(value) {
                    console.log('Value ' + value);
                    this.$store.commit({
                        type: 'SET_EDUCATION_LEVEL',
                        value
                    });
                }
            },
            educations: {
                get: function() {
                    return this.$store.getters.RESUME.educations;
                }, 
                set: function(value) {
                    this.$store.commit({
                        type: 'SET_EDUCATIONS',
                        value
                    })
                }
            },
        }, 
        methods: {
            cancelAdd: function() {
                this.addInstitutionFormVisible = false;
            }, 
            addNew: function(data) {
                this.$store.commit({
                    type: 'ADD_EDUCATION',
                    value: data
                });
                this.addInstitutionFormVisible = false;
            },
            deleteEducation: function(key) {
                this.$store.commit({
                    type: 'REMOVE_EDUCATION',
                    value: key
                })
            }
        }
    }
</script>