<template>
    <div class="w-100">
        <h3>Специальность</h3>
        <div class="form-group">
            <label for="sphereName">Профессиональная сфера</label>
            <input type="text" class="form-control" id="sphereName" placeholder="IT и коммуникации" v-model="sphere">
        </div>
        <div class="form-group">
            <label for="specialityName">Желаемая должность</label>
            <input type="text" class="form-control" id="specialityName" placeholder="Программист" v-model="desiredPost">
        </div>
        <div class="form-group">
            <label>Заработная плата</label>
            <div class="row">
                <div class="col">
                    <label for="salaryFrom">от</label>
                    <input type="text" class="form-control" id="salaryFrom" placeholder="0" v-model="salaryMin"
                    :class="{
                        'is-valid': salaryMin && $v.salaryMin.validFormat,
                        'is-invalid': salaryMin && !$v.salaryMin.validFormat
                    }"
                    >
                    <div v-if="! $v.salaryMin.validFormat" class="invalid-feedback">Должен содержать только цифры</div>
                </div>
                <div class="col">
                    <label for="salaryTo">до</label>
                    <input type="text" class="form-control" id="salaryTo" placeholder="1000000" v-model="salaryMax"
                    :class="{
                        'is-valid': salaryMax && $v.salaryMax.validFormat,
                        'is-invalid': salaryMax && !$v.salaryMax.validFormat 
                    }"
                    >
                    <div v-if="! $v.salaryMax.validFormat" class="invalid-feedback">Должен содержать только цифры</div>
                </div>
            </div>
        </div>
        <div class="form-group">
            <label for="mainSkills">Ключевые навыки</label>
            <textarea class="form-control" id="mainSkills" v-model="skills"></textarea>
        </div>
    </div>
</template>
<script>
export default {
    name: 'JobData',
    computed: {
        sphere: {
            get: function() {
                return this.$store.getters.RESUME.sphere;
            },
            set: function(value) {
                this.$store.commit({
                    type: 'SET_SPHERE',
                    value
                })
            }
        },
        desiredPost: {
            get: function() {
                return this.$store.getters.RESUME.desiredPost;
            },
            set: function(value) {
                this.$store.commit({
                    type: 'SET_POST',
                    value
                })
            }
        },
        salaryMin: {
            get: function() {
                return this.$store.getters.RESUME.salaryMin;
            },
            set: function(value) {
                this.$store.commit({
                    type: 'SET_SALARY_MIN',
                    value
                })
            }
        },
        salaryMax: {
            get: function() {
                return this.$store.getters.RESUME.salaryMax;
            },
            set: function(value) {
                this.$store.commit({
                    type: 'SET_SALARY_MAX',
                    value
                })
            }
        },
        skills: {
            get: function() {
                return this.$store.getters.RESUME.skills;
            },
            set: function(value) {
                this.$store.commit({
                    type: 'SET_SKILLS',
                    value
                })
            }
        }
    },
    validations: {
        salaryMax: {
            validFormat: val => /^\d+$/.test(val)
        },
        salaryMin: {
            validFormat: val => /^\d+$/.test(val)
        }
    }
}
</script>