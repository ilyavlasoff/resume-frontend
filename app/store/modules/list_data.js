const state = {
    statusList: {
        new: "Новый",
        interview: "Назначено собеседование",
        accepted: "Принят",
        rejected: "Отказ"
    },
    genderList: {
        male: 'Мужской',
        female: 'Женский',
        notStated: 'Не указано'
    },
    educationLevels: {
        'notStated': {name: 'Не указано', requireAdditionalFields: false}, 
        'mid': {name: 'Среднее', requireAdditionalFields: false}, 
        'midSpecial': {name: 'Среднее специальное', requireAdditionalFields: true, allowGraduationYear: true}, 
        'incompletedHigher': {name: 'Неоконченное высшее', requireAdditionalFields: true, allowGraduationYear: false}, 
        'higher': {name: 'Высшее', requireAdditionalFields: true, allowGraduationYear: true}, 
    },
    experienceLevelOptions: {
        'notStated': {value: 'Не указан', requireJobPlaceForm: false},
        'noExp': {value: 'Без опыта', requireJobPlaceForm: false},
        'startingExp': {value: 'Начинающий (1-3 года)', requireJobPlaceForm: true},
        'middleExp': {value: 'Средний (3-5 лет)', requireJobPlaceForm: true},
        'experiencedExp': {value: 'Опытный (более 5 лет)', requireJobPlaceForm: true}
    }
}

const getters = {
    STATUS_LIST: state => {
        return state.statusList;
    },
    GENDER_LIST: state => {
        return state.genderList;
    },
    EDUCATION_LEVELS: state => {
        return state.educationLevels;
    },
    EXPERIENCE_LEVELS: state => {
        return state.experienceLevelOptions;
    }
}

const mutations = {}

const actions = {}

export default {
    state,
    getters,
    mutations,
    actions
}