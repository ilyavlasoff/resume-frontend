<template>
    <div class="row d-flex justify-content-center">
        <div class="jumbotron">
            <img :src="photo" class="rounded-circle ph">
            <h1>{{ `${resume.lastName} ${resume.firstName} ${resume.patronymic}`}}</h1>
            <p class="lead">Личная информация</p>
            <p>ФИО:{{`${resume.lastName} ${resume.firstName} ${resume.patronymic}`}}</p>
            <p>Пол: {{genderData[resume.gender]}}</p>
            <p>Дата рождения: {{resume.birthday ? `${('0'+resume.birthday.getDay()).slice(-2)}.${('0'+(resume.birthday.getMonth() + 1)).slice(-2)} ${resume.birthday.getFullYear()}` : 'Не указано'}}</p>
            <p>Место проживания: {{`${resume.country}, ${resume.city}`}}</p>
            <hr class="my-4">
            <p class="lead">Образование</p>
            <p>Уровень образования: {{resume.educationLevel ? educationData[resume.educationLevel].name : ''}}</p>
            <ol><li v-for="education in resume.educations" :key="education.institution + education.faculty">
                {{`${education.institution}, ${education.faculty},специальность ${education.speciality}, год окончания ${education.graduated}`}}
            </li></ol>
            <hr class="my-4">
            <p class="lead">Специализация</p>
            <p>Сфера проф. деятельности: {{resume.sphere}}</p>
            <p>Желаемая должность: {{resume.desiredPost}}</p>
            <p>Заработная плата: {{resume.salaryMin}}-{{resume.salaryMax}}</p>
            <p>Профессиональные навыки: {{resume.skills}}</p>
            <hr class="my-4">
            <p class="lead">Контактная информация</p>
            <p>Телефон: {{resume.phoneNumber}}</p>
            <p>Email: {{resume.email}}</p>
            <hr class="my-4">
            <p class="lead">Опыт работы</p>
            <p>Опыт работы: {{resume.experienceLevel ? experienceLevelData[resume.experienceLevel].value : ''}}</p>
            <ol><li v-for="workplace in resume.workplaces" :key="workplace.organizationName + workplace.postName">
                {{`Компания ${workplace.organizationName}, ${workplace.postName}, период ${('0' + (workplace.startDate.getMonth() + 1)).slice(-2)}.${workplace.startDate.getFullYear()}-${('0' + (workplace.endDate.getMonth() + 1)).slice(-2)}.${workplace.endDate.getFullYear()}`}}
            </li></ol>
            <hr class="my-4">
            <p class="lead">Личные качества</p>
            <p>Личные качества: {{resume.personalQualities}}</p>
            <p>О себе: {{resume.aboutMyself}}</p>
            
        </div>
    </div>
</template>
<script>
export default {
    name: 'ResumeTemplate',
    computed: {
        resume: function() {
            return this.$store.getters.RESUME;
        },
        photo: function() {
            return this.resume.photo ? this.resume.photo :  
                'https://w7.pngwing.com/pngs/219/345/png-transparent-computer-software-computer-icons-team-members-photography-team-logo.png';
        },
        genderData: function() {
            return this.$store.getters.GENDER_LIST;
        },
        educationData: function() {
                return this.$store.getters.EDUCATION_LEVELS;
        },
        experienceLevelData: function() {
                return this.$store.getters.EXPERIENCE_LEVELS;
        }
    }
}
</script>
<style scoped>
    .jumbotron-container {
        width: 100%;
    }
    .ph {
        width: 75px; 
        height: 75px;
    }
</style>