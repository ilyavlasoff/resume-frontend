<template>
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-10">
                <div class="row mt-5">
                    <div class="col">
                        <PersonalData></PersonalData>
                    </div>
                    <div class="col offset-md-1">
                        <ProfessionalSkills></ProfessionalSkills>
                    </div>
                </div>
                <div class="row mt-5">
                    <div class="col">
                        <EducationData></EducationData>
                    </div>
                    <div class="col offset-md-1">
                        <ContactData></ContactData>
                    </div>
                </div>
                <div class="row mt-5">
                    <div class="col">
                        <JobData></JobData>
                    </div>
                    <div class="col offset-md-1">
                        <AboutData></AboutData>
                    </div>
                </div>
                <div class="row mt-5 justify-content-center">
                    <div class="col-6">
                        <ResumeTemplate></ResumeTemplate>
                        <div class="row justify-content-center">
                            <button type="button" class="btn btn-primary mb-5" @click="saveEditedResume">Сохранить</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Modal
            :title="modalTitle"
            :content="modalContent"
            :mainButtonText="modalMainButtonText"
            :secondaryButtonText="modalSecondaryButtonText"
        ></Modal>
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
    import Modal from './modal';

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
            Modal
        },
        props: ['id'],
        data: function() { 
            return {
                modalTitle: null, 
                modalContent: null,
                modalMainButtonText: null,
                modalSecondaryButtonText: null
            }
        },
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
        }
    }
</script>
<style>
</style>