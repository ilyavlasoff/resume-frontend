<template>
    <div class="w-100">
        <h3>Персональная информация</h3>
        <div>
            <div class="form-group has-danger">
                <label for="lastNameInput">Фамилия</label>
                <input type="text" class="form-control" id="lastNameInput" 
                    v-model="lastName" placeholder="Иванов" 
                    :class="{ 'is-invalid': lastName && !($v.lastName.required && $v.lastName.maxLength && $v.lastName.validFormat), 
                    'is-valid': lastName && ($v.lastName.required && $v.lastName.maxLength && $v.lastName.validFormat) }"
                >
                <div v-if="! $v.lastName.required" class="invalid-feedback">Обязательное поле</div>
                <div v-else-if="! $v.lastName.validFormat" class="invalid-feedback">Неверный формат фамилии</div>
                <div v-else-if="! $v.lastName.maxLength" class="invalid-feedback">Длина фамилии не более {{$v.lastName.maxLength.max}}</div>
            </div>
            <div class="form-group has-danger">
                <label for="firstNameInput">Имя</label>
                <input type="text" class="form-control" id="firstNameInput" v-model="firstName" placeholder="Иван"
                    :class="{
                        'is-valid': firstName && ($v.firstName.required && $v.firstName.maxLength && $v.firstName.validFormat),
                        'is-invalid': firstName && !($v.firstName.required && $v.firstName.maxLength && $v.firstName.validFormat)
                    }"
                >
                <div v-if="! $v.firstName.required" class="invalid-feedback">Обязательное поле</div>
                <div v-else-if="! $v.firstName.validFormat" class="invalid-feedback">Неверный формат имени</div>
                <div v-else-if="! $v.firstName.maxLength" class="invalid-feedback">Дина не более {{$v.firstName.maxLength.max}}</div>
            </div>
            <div class="form-group">
                <label for="patronymicInput">Отчество</label>
                <input type="text" class="form-control" id="patronymicInput" v-model="patronymic" placeholder="Иванович">
                <small id="patronymicTip" class="form-text text-muted">В случае отсутствия отчества оставьте поле пустым.</small>
            </div>
            <div class="gender-form">
                <label>Пол</label>
                <div class="row">
                    <div class="col" v-for="(genderOption, genderKey) in genderList" :key="genderKey">
                        <div class="form-check">
                        <input class="form-check-input" type="radio" name="genderInput" :id="genderKey" :value="genderKey" v-model="gender">
                        <label class="form-check-label" :for="genderKey">
                            {{ genderOption }}
                        </label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label for="birthDay">Дата рождения</label>
                <input type="date" class="form-control" id="birthDay" v-model="birthday">
            </div>
            <div class="form-group">
                <label for="livingCityInput">Гражданство</label>
                <input type="text" class="form-control" list="countryListOptions" id="citizenCountry" placeholder="Россия" v-model="country">
                <datalist id="countryListOptions">
                    <option v-for="countryOption in countryOptionsList" :key="countryOption.id">
                        {{countryOption.title}}
                    </option>
                </datalist>
            </div>
            <div class="form-group">
                <label for="livingCityInput">Город проживания</label>
                <input type="text" class="form-control" id="livingCityInput" list="citiesListOptions" placeholder="Москва" v-model="city">
                <datalist id="citiesListOptions">
                    <option v-for="cityOption in cityOptionsList" :key="cityOption.id" :value="cityOption.fullName"></option>
                </datalist>
            </div>
            <div class="form-group custom-file" v-if="!directLinkFormForPhoto">
                <label for="userPhoto" class="custom-file-label">{{ photoName }}</label>
                <input type="file" ref="file" class="form-control custom-file-input" id="userPhoto" @change="uploadFile()">
                <small id="patronymicTip" class="form-text text-muted">Вы также можете добавить фото по <a class="ph-option-text" @click="directLinkFormForPhoto = true;">прямой ссылке</a></small>
            </div>
            <div class="form-group" v-if="directLinkFormForPhoto">
                <label for="userPhotoDirectLink">Ваше фото</label>
                <input type="url" class="form-control" id="userPhotoDirectLink" placeholder="Вставьте ссылку" v-model="photo">
                <small id="patronymicTip" class="form-text text-muted">Вы также можете <a class="ph-option-text" @click="directLinkFormForPhoto = false;">загрузить фото с компьютера</a></small>
            </div>
        </div>
    </div>
</template>
<script>
import _ from 'lodash';
import { required, minLength, maxLength } from 'vuelidate/lib/validators';
import { ResumeApiInstance } from '../../api/resume_api';
import { VkApiInstance } from '../../api/vk_api';
import { config } from '../../config';

export default {
    name: 'PersonalData', 
    data: function() {
        return {
            directLinkFormForPhoto: false,
            cityOptionsList: [],
            countryOptionsList: [],
            photoFile: null,
            photoName: 'Ваше фото'
        }
    }, 
    computed: {
        genderList: function() {
            return this.$store.getters.GENDER_LIST;
        },
        lastName: {
            get: function() {
                return this.$store.getters.RESUME.lastName;
            },
            set: function(value) {
                this.$store.commit({
                    type: 'SET_LAST_NAME',
                    value
                })
            }
        },
        firstName: {
            get: function() {
                return this.$store.getters.RESUME.firstName;
            },
            set: function(value) {
                this.$store.commit({
                    type: 'SET_FIRST_NAME',
                    value
                })
            }
        },
        patronymic: {
            get: function() {
                return this.$store.getters.RESUME.patronymic;
            },
            set: function(value) {
                this.$store.commit({
                    type: 'SET_PATRONYMIC',
                    value
                })
            }
        },
        birthday: {
            get: function() {
                let bd =  this.$store.getters.RESUME.birthday;
                if (! bd) {
                    bd = new Date();
                }
                return new Date(bd.getTime()-(bd.getTimezoneOffset()*60*1000)).toISOString().split('T')[0]
            },
            set: function(value) {
                this.$store.commit({
                    type: 'SET_BIRTHDAY',
                    value: new Date(value)
                })
            }
        },
        country: {
            get: function() {
                return this.$store.getters.RESUME.country;
            },
            set: function(value) {
                this.$store.commit({
                    type: 'SET_COUNTRY',
                    value
                })
            }
        },
        city: {
            get: function() {
                return this.$store.getters.RESUME.city;
            },
            set: function(value) {
                this.$store.commit({
                    type: 'SET_CITY',
                    value
                })
            }
        },
        gender: {
            get: function() {
                let genderName = this.$store.getters.RESUME.gender;

                if (! genderName) {
                    return 'notStated';
                }

                return genderName;
            },
            set: function(value) {
                console.log(value);
                this.$store.commit({
                    type: 'SET_GENDER',
                    value
                })
            }
        },
        photo: {
            get: function() {
                return this.$store.getters.RESUME.photo;
            },
            set: function(value) {
                this.$store.commit({
                    type: 'SET_PHOTO',
                    value
                })
            }
        },
    },
    created: function(){
        this.debouncedCountry = _.debounce(this.getCountryName, 500);
        this.debouncedCity = _.debounce(this.getCityName, 500);
    },
    watch: {
        city: function() {
            this.debouncedCity();
        },
        country: function() {
            this.debouncedCountry();
        }
    },
    methods: {
        getCityName: function() {
            let selectedCountry = this.countryOptionsList.find((el) => el.title === this.country);
            if (! selectedCountry) {
                return;
            }
            VkApiInstance.getCityList({
                'country_id': selectedCountry.id,
                'q': this.city,
                'count': 5,
            }, (json) => {
                this.cityOptionsList = json.response.items.map(function(item){
                    return {
                        id: item.id,
                        fullName: `${item.title}${item.area ? ', ' + item.area: ''}${item.region ? ', ' + item.region: ''}`
                    }
                })
            }, () => {
                console.log('Error' + error);
            });
        }, 
        getCountryName: function() {
            ResumeApiInstance.countriesList({
                q: this.country,
                count: 7
            }, (json) => {
                let response = JSON.parse(json.data);
                if (response.status !== 'success') {
                    console.log(json.error);
                    return;
                }
                this.countryOptionsList = response.data;
            }, (error) => {
                console.log('Error');
            })
        },
        uploadFile: function() {
            this.file = this.$refs.file.files[0];
            let formData = new FormData();
            formData.append('userpic', this.file);
            ResumeApiInstance.uploadFile(formData, (response) => {
                const data = JSON.parse(response.data);
                if (data.status === 'success') {
                    this.photo = `${config.uploadedFileBasePath}${data.path}`;
                    photoName = 'Загружено новое фото';
                } else {
                    console.log('Error');
                }
            }, (error) => {
                console.log(error);
            })
        }
    },
    validations: {
        lastName: {
            required, 
            validFormat: val => /^[A-Za-zА-Яа-я\s]+$/.test(val),
            maxLength: maxLength(20)
        }, 
        firstName: {
            required, 
            validFormat: val => /^[A-Za-zА-Яа-я\s]+$/.test(val),
            maxLength: maxLength(20)
        },
    }
}
</script>
<style scoped>
    .gender-form {
        margin-bottom: 20px;
    }
    .ph-option-text {
        text-decoration: underline;
    }
</style>