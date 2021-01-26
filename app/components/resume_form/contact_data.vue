<template>
    <div>
        <h3>Контактная информация</h3>
        <div class="form-group has-danger">
            <label for="phoneNumber">Номер телефона</label>
            <input type="text" class="form-control" id="phoneNumber" placeholder="+7(123)456-78-90" v-model="phoneNumber"
                :class="{
                    'is-valid': phoneNumber && ($v.phoneNumber.required && $v.phoneNumber.phoneFormat),
                    'is-invalid': phoneNumber && !($v.phoneNumber.required && $v.phoneNumber.phoneFormat)
                }"
            >
            <div class="invalid-feedback" v-if="! $v.phoneNumber.required">Обязательное поле</div>
            <div class="invalid-feedback" v-else-if="! $v.phoneNumber.phoneFormat">Неверный формат номера</div>
        </div>
        <div class="form-group has-danger">
            <label for="email">E-mail</label>
            <input type="email" class="form-control" id="email" placeholder="mail@mailbox.com" v-model="email"
                :class="{
                    'is-valid': email && ($v.email.required && $v.email.email),
                    'is-invaid': email && !($v.email.required && $v.email.email)
                }"
            >
            <div class="invalid-feedback" v-if="! $v.email.required">Обязательное поле</div>
            <div class="invalid-feedback" v-else-if="! $v.email.email">Неверный формат</div>
        </div>
    </div>
</template>
<script>
    import {required, email} from 'vuelidate/lib/validators';

    export default {
        name: 'ContactData',
        validations: {
            phoneNumber: {
                required,
                phoneFormat: val => /^([+]?[0-9\s-\(\)]{6,10})*$/.test(val)
            },
            email: {
                required,
                email
            }
        },
        computed: {
            email: {
                get: function() {
                    return this.$store.getters.RESUME.email;
                },
                set: function(value) {
                    this.$store.commit({
                        type: 'SET_EMAIL',
                        value
                    })
                }
            }, 
            phoneNumber: {
                get: function() {
                    return this.$store.getters.RESUME.phoneNumber;
                },
                set: function(value) {
                    this.$store.commit({
                        type: 'SET_PHONE_NUMBER',
                        value
                    })
                }
            }
        }
    }
</script>