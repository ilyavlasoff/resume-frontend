<template>
    <div>
        <keep-alive>
            <component :is="componentPart"></component>
        </keep-alive>
        <div class="action-button-container mt-4">
            <button type="button" class="btn btn-secondary" @click="goBack" v-if="currentComponentPartIndex !== 0">Назад</button>
            <button type="button" class="btn btn-primary" 
                @click="goNextStep">{{ currentComponentPartIndex === componentNames.length - 1? "Завершить": "Далее"}}</button>
        </div>
    </div>
</template>
<script>
    import PersonalData from './personal_data';
    import ProfessionalSkills from './professional_skills';
    import EducationData from './education_data';
    import ContactData from './contact_data';
    import JobData from './job_data';
    import AboutData from './about_data';

    export default {
        name: 'ResumeForm', 
        data: function() {
            return {
                currentComponentPartIndex: 0,
                componentNames: [
                    'PersonalData', 
                    'ProfessionalSkills', 
                    'EducationData',
                    'ContactData',
                    'JobData',
                    'AboutData'
                ]
            }
        },
        components: {
            PersonalData, 
            ProfessionalSkills, 
            EducationData,
            ContactData,
            JobData,
            AboutData
        },
        computed: {
            componentPart: function() {
                return this.componentNames[this.currentComponentPartIndex];
            }
        },
        methods: {
            goBack: function() {
                if (this.currentComponentPartIndex !== 0) {
                    this.currentComponentPartIndex--;
                }
            }, 
            goNextStep: function() {
                if (this.currentComponentPartIndex !== this.componentNames.length - 1) {
                    this.currentComponentPartIndex++;
                } else {
                    this.$emit('save-resume')
                }
            }
        }
    }
</script>
<style scoped>
    .action-button-container {
        display: flex; 
        flex-direction: row; 
        justify-content: flex-end;
    }
</style>