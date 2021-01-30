<template>
    <div class="w-100">
        <h3>Опыт работы</h3>
        <div>
            <label>Наличие опыта работы</label>
            <select class="form-select custom-select" aria-label="Default select example" v-model="experienceLevel">
                <option v-for="(experience, key) in experienceLevelOptions" :key="key" :value="key">
                    {{ experience.value }}
                </option>
            </select>
            <div v-if="displayAddWorkplaceSection">
                <div>
                    <ExperienceItem
                        v-for="(workplace, key) in workplaces" :key="key"
                        :itemKey="workplace.id"
                        :experienceType="'job'"
                        :organizationName="workplace.organizationName"
                        :activityName="workplace.postName"
                        :timeInterval="`${('0' + (workplace.startDate.getMonth() + 1)).slice(-2)}.${workplace.startDate.getFullYear()}-${( '0' + (workplace.endDate.getMonth() + 1)).slice(-2)}.${workplace.endDate.getFullYear()}`"
                        @delete-item="deleteWorkplace"
                    ></ExperienceItem>
                </div>
                <button type="button" class="btn btn-primary mt-3" @click="displayWorkplaceAddForm = true;" v-if="! displayWorkplaceAddForm">Добавить место работы</button>
                <PreviuosJobs 
                    v-else
                    @cancel-add="displayWorkplaceAddForm = false"
                    @add-new="addNewWorkplace"
                ></PreviuosJobs>
            </div>
        </div>
    </div>
</template>
<script>
    import PreviuosJobs from './previous_jobs';
    import ExperienceItem from './experience_item';

    export default {
        name: 'ProfessionalSkills',
        components: {
            PreviuosJobs,
            ExperienceItem
        },
        data: function() {
            return {
                displayWorkplaceAddForm: null,
                displayAddWorkplaceSection: null
            }
        },
        watch: {
            experienceLevel: function() {
                this.displayAddWorkplaceSection = this.experienceLevelOptions[this.experienceLevel].requireJobPlaceForm;
            }
        },
        computed: {
            experienceLevelOptions: function() {
                return this.$store.getters.EXPERIENCE_LEVELS;
            },
            workplaces: {
                get: function() {
                    return this.$store.getters.RESUME.workplaces;
                },
                set: function(value) {
                    this.$store.commit({
                        type: 'SET_WORKPLACES',
                        value
                    })
                }
            }, 
            experienceLevel: {
                get: function() {
                    let level = this.$store.getters.RESUME.experienceLevel;

                    if (! level) {
                        return 'notStated';
                    }

                    return level;
                },
                set: function(value) {
                    this.$store.commit({
                        type: 'SET_EXPERIENCE_LEVEL',
                        value
                    })
                }
            }
        },
        methods: {
            addNewWorkplace: function(data) {
                this.$store.commit({
                    type: 'ADD_WORKPLACE',
                    value: data
                });
                
                this.displayWorkplaceAddForm = false;
            },
            deleteWorkplace: function(key) {
                this.$store.commit({
                    type: 'REMOVE_WORKPLACE', 
                    value: key
                })
            }
        }
    }
</script>