<template>
    <div>
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
            <div>
                <label>Пол</label>
                <div class="row">
                    <div class="col">
                        <div class="form-check">
                        <input class="form-check-input" type="radio" name="genderInput" id="maleGender" value="male" v-model="gender">
                        <label class="form-check-label" for="maleGender">
                            Мужской
                        </label>
                        </div>
                    </div>
                    <div class="col">
                        <div class="form-check">
                        <input class="form-check-input" type="radio" name="genderInput" id="femaleGender" value="female" v-model="gender">
                        <label class="form-check-label" for="femaleGender">
                            Женский
                        </label>
                        </div>
                    </div>
                    <div class="col">
                        <div class="form-check">
                        <input class="form-check-input" type="radio" name="genderInput" id="notStatedGender" value="notStated" v-model="gender">
                        <label class="form-check-label" for="notStatedGender">
                            Не указано
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
                    <option v-for="countryOption in countryOptionsList" :key="countryOption"></option>
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
                <label for="userPhoto" class="custom-file-label">Ваше фото</label>
                <input type="file" ref="file" class="form-control custom-file-input" id="userPhoto" @change="uploadFile()">
                <small id="patronymicTip" class="form-text text-muted">Вы также можете добавить фото по <a style="text-decoration: underline;" @click="directLinkFormForPhoto = true;">прямой ссылке</a></small>
            </div>
            <div class="form-group" v-if="directLinkFormForPhoto">
                <label for="userPhotoDirectLink">Ваше фото</label>
                <input type="url" class="form-control" id="userPhotoDirectLink" placeholder="Вставьте ссылку" v-model="photo">
                <small id="patronymicTip" class="form-text text-muted">Вы также можете <a style="text-decoration: underline;" @click="directLinkFormForPhoto = false;">загрузить фото с компьютера</a></small>
            </div>
        </div>
    </div>
</template>
<script>
import _ from 'lodash';
import { required, minLength, maxLength } from 'vuelidate/lib/validators';
import { ResumeApiInstance } from '../../api/resume_api';
import { config } from '../../config';

export default {
    name: 'PersonalData', 
    data: function() {
        return {
            directLinkFormForPhoto: false,
            cityOptionsList: [],
            countryOptionsList: [],
            photoFile: null
        }
    }, 
    computed: {
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
                    value
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
        cityNameData: function() {
            this.debouncedCity();
        },
        countryNameData: function() {
            //this.debouncedCountry();
        }
    },
    methods: {
        getCityName: function() {
            this.$jsonp('https://api.vk.com/method/database.getCities', {
                'country_id': 1,
                'q': this.cityNameData,
                'count': 5,
                'access_token': '7119a7d97119a7d97119a7d988716fa52e771197119a7d9111ec6e3896e7f0e64470757',
                'v': '5.52',
                'lang': 'ru'
            }).then(json => {
                this.cityOptionsList = json.response.items.map(function(item){
                    return {
                        id: item.id,
                        fullName: `${item.title}, ${item.area ? item.area + ', ': ''}${item.region ? item.region: ''}`
                    }
                })
                console.log(json);
            }).catch(error => {
                console.log('Error' + error);
            })
        }, 
        getCountryName: function() {
            this.$jsonp('https://api.vk.com/method/database.getCountries', {
                'need_all': 1,
                'count': 5,
                'access_token': '7119a7d97119a7d97119a7d988716fa52e771197119a7d9111ec6e3896e7f0e64470757',
                'v': '5.52',
                'lang': 'ru'
            }).then(json => {
                console.log(json);
            }).catch(error => {
                console.log('Error' + error);
            })
        },
        uploadFile: function(params) {
            this.file = this.$refs.file.files[0];
            let formData = new FormData();
            formData.append('userpic', this.file);
            console.log('Try to send');
            ResumeApiInstance.uploadFile(formData, (response) => {
                const data = JSON.parse(response.data);
                if (data.status === 'success') {
                    this.photo = `${config.uploadedFileBasePath}${data.path}`;
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

</style>