<template>
    <div class="w-100">
        <h3>Личные качества</h3>
        <div class="form-group">
            <label for="personalQualities">Личные качества</label>
            <textarea id="personalQualities" class="form-control" 
            placeholder="Опишите свои личные качества" v-model="personalQualities"></textarea>
        </div>
        <div class="form-group">
            <label for="aboutMe">О себе</label>
            <textarea id="aboutMe" class="form-control" 
            placeholder="Напишите пару слов о себе - это может быть важным для работодателя" 
            v-model="aboutMyself"></textarea>
        </div>
        <h3>Статус</h3>
        <Status></Status>
    </div>
</template>
<script>
import Status from './status_data';

export default {
    name: 'AboutData',
    components: {
        Status
    },
    computed: {
        aboutMyself: {
            get: function() {
                return this.$store.getters.RESUME.aboutMyself;
            }, 
            set: function(value) {
                this.$store.commit({
                    type: 'SET_ABOUT',
                    value
                });
            }
        },
        personalQualities: {
            get: function() {
                return this.$store.getters.RESUME.personalQualities;
            },
            set: function(value) {
                this.$store.commit({
                    type: 'SET_PERSONAL_QUALITIES',
                    value
                })
            }
        }
    }
}
</script>