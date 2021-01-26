<template>
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-10">
                <div class="row mt-5">
                    <div class="col">
                        <ResumeForm @save-resume="saveResume"></ResumeForm>
                    </div>
                    <div class="col offset-md-1">
                        <ResumeTemplate></ResumeTemplate>
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
    import ResumeForm from './resume_form/resume_form';
    import ResumeTemplate from './resume_template/resume_template';
    import { ResumeApiInstance } from '../api/resume_api'
    import Modal from './modal';

    export default {
        name: 'Resume',
        components: {
            ResumeForm, 
            ResumeTemplate,
            Modal
        },
        data: function() { 
            return {
                modalTitle: null, 
                modalContent: null,
                modalMainButtonText: null,
                modalSecondaryButtonText: null
            }
        },
        methods: {
            saveResume: function() {
                ResumeApiInstance.createResume(JSON.stringify(this.$store.getters.RESUME), 
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
            this.$store.commit({
                type: 'SET_RESUME',
                value: {}
            })
        }
    }
</script>
<style>
</style>