<template>
    <div class="row d-flex justify-content-center">
        <div class="jumbotron" style="width: 100%;">
            <img :src="photo" style="width: 75px; height: 75px;" class="rounded-circle">
            <h1>{{ `${resume.lastName} ${resume.firstName} ${resume.patronymic}`}}</h1>
            <p class="lead">Личная информация</p>
            <p>ФИО:{{`${resume.lastName} ${resume.firstName} ${resume.patronymic}`}}</p>
            <p>Пол: {{resume.gender}}</p>
            <p>Дата рождения: {{resume.birthday ? `${('0'+resume.birthday.getDay()).slice(-2)}.${('0'+(resume.birthday.getMonth() + 1)).slice(-2)} ${resume.birthday.getFullYear()}` : 'Не указано'}}</p>
            <p>Место проживания: {{`${resume.country}, ${resume.city}`}}</p>
            <hr class="my-4">
            <p class="lead">Образование</p>
            <p>Уровень образования: {{resume.educationLevel}}</p>
            <p v-for="education in resume.educations" :key="education.institution + education.faculty">
                {{`${education.institution}, ${education.faculty}, ${education.speciality} ${education.graduated}`}}
            </p>
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
            <p>Опыт работы: {{resume.experienceLevel}}</p>
            <p v-for="workplace in resume.workplaces" :key="workplace.organizationName + workplace.postName">
                {{`Компания ${workplace.organizationName}, ${workplace.postName}, период ${workplace.startDate}-${workplace.endDate}`}}
            </p>
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
        }
    }
}
</script>