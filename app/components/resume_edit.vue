<template>
    <div class="container-fluid">
        <div class="row justify-content-center mt-5">
            <div class="col-5">
                <div class="row mb-5">
                    <PersonalData></PersonalData>
                </div>
                <div class="row mb-5">
                    <ContactData></ContactData>
                </div>
                <div class="row mb-5">
                    <EducationData></EducationData>
                </div>
            </div>
            <div class="col-5 ml-5">
                <div class="row mb-5">
                    <ProfessionalSkills></ProfessionalSkills>
                </div>
                <div class="row mb-5">
                    <JobData></JobData>
                </div>
                <div class="row mb-5">
                    <AboutData></AboutData>
                </div>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-6">
                <ResumeTemplate></ResumeTemplate>
                <div class="row justify-content-center">
                    <button type="button" class="btn btn-primary mb-5" @click="saveEditedResume">Сохранить</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import PersonalData from '../components/resume_form/personal_data';
    import ProfessionalSkills from '../components/resume_form/professional_skills';
    import EducationData from '../components/resume_form/education_data';
    import ContactData from '../components/resume_form/contact_data';
    import JobData from '../components/resume_form/job_data';
    import AboutData from '../components/resume_form/about_data';
    import ResumeTemplate from '../components/resume_template/resume_template';
    import { ResumeApiInstance } from '../api/resume_api'

    export default {
        name: 'Resume',
        components: {
            PersonalData, 
            ProfessionalSkills, 
            EducationData,
            ContactData,
            JobData,
            AboutData,
            ResumeTemplate,
        },
        props: ['id'],
        methods: {
            saveEditedResume: function() {
                ResumeApiInstance.editResume(this.id, JSON.stringify(this.$store.getters.RESUME), 
                    (response) => {
                        const data = JSON.parse(response.data);
                        if (data.status === 'success') {
                            this.$router.push({ name: 'home' })
                        } else {
                            console.log('err');
                        }
                    }, (err) => {
                        console.log(err);
                        this.$router.push({ name: 'home' })
                    });
            }
        },
        mounted: function() {
            this.$store.dispatch('LOAD_RESUME', {
                id: this.id
            });
        },
        beforeDestroy: function() {
            this.$store.commit('SET_EMPTY_RESUME');
        }
    }
</script>