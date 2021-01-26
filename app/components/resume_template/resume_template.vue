<template>
    <div class="row d-flex justify-content-center">
        <div class="jumbotron" style="width: 100%;">
            <img src="https://w7.pngwing.com/pngs/219/345/png-transparent-computer-software-computer-icons-team-members-photography-team-logo.png" style="width: 75px; height: 75px;" class="rounded-circle">
            <h1>{{ `${resume.lastName} ${resume.firstName} ${resume.patronymic}`}}</h1>
            <p class="lead">Личная информация</p>
            
            <hr class="my-4">
            <p class="lead">Образование</p>
            
            
            <hr class="my-4">
            <p class="lead">Специализация</p>

            <hr class="my-4">
            <p class="lead">Контактная информация</p>

            <hr class="my-4">
            <p class="lead">Опыт работы</p>

            <hr class="my-4">
            <p class="lead">Личные качества</p>

            
        </div>
    </div>
</template>
<script>
export default {
    name: 'ResumeTemplate',
    computed: {
        resume: function() {
            return this.$store.getters.RESUME;
        }
    }
}
</script>
<style scoped>
    img {
        height: 100px;
        width: 100px;
    }
</style>